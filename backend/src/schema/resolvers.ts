import { client } from '../db/connection';
import { GitHubService } from '../services/githubService';

const githubService = new GitHubService();

// Helper function to parse GitHub URL
const parseGitHubUrl = (url: string) => {
  const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
  if (!match) {
    throw new Error('Invalid GitHub URL format');
  }
  return {
    owner: match[1],
    repo: match[2]
  };
};

export const resolvers = {
  Query: {
    repositories: async () => {
      const result = await client.query(`
        SELECT r.*, 
               CASE WHEN lr.id IS NOT NULL AND lr.is_seen = false THEN true ELSE false END as has_unseen_releases
        FROM repositories r
        LEFT JOIN releases lr ON r.id = lr.repository_id
        ORDER BY r.created_at DESC
      `);
      return result.rows;
    },

    repository: async (_: any, { id }: { id: string }) => {
      const result = await client.query(`
        SELECT r.*, 
               CASE WHEN lr.id IS NOT NULL AND lr.is_seen = false THEN true ELSE false END as has_unseen_releases
        FROM repositories r
        LEFT JOIN releases lr ON r.id = lr.repository_id
        WHERE r.id = $1
      `, [id]);
      return result.rows[0];
    }
  },

  Mutation: {
    addRepository: async (_: any, { url }: { url: string }) => {
      const { owner, repo } = parseGitHubUrl(url);
      
      // Get repository data from GitHub
      const githubRepo = await githubService.getRepository(owner, repo);
        
      // Insert repository into database
      const repoResult = await client.query(`
        INSERT INTO repositories (github_id, name, owner, full_name, description, url)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *
      `, [
        githubRepo.id,
        githubRepo.name,
        githubRepo.owner.login,
        githubRepo.full_name,
        githubRepo.description,
        githubRepo.html_url
      ]);

      // Get latest release if exists
      const latest_release = await githubService.getLatestRelease(owner, repo);
      if (latest_release) {
        await client.query(`
          INSERT INTO releases (
            repository_id, 
            github_release_id, 
            tag_name, 
            name, 
            body, 
            published_at
          )
          VALUES ($1, $2, $3, $4, $5, $6)
        `, [
          repoResult.rows[0].id,
          latest_release.id,
          latest_release.tag_name,
          latest_release.name,
          latest_release.body,
          latest_release.published_at
        ]);
      }

      return {
        ...repoResult.rows[0],
        has_unseen_releases: latest_release ? true : false
      };
    },

    markReleaseAsSeen: async (_: any, { releaseId }: { releaseId: string }) => {
      const result = await client.query(`
        UPDATE releases
        SET is_seen = true
        WHERE id = $1
        RETURNING *
      `, [releaseId]);
      return result.rows[0];
    },

    refreshRepository: async (_: any, { repositoryId }: { repositoryId: string }) => {
      // Get repository details
      const repoResult = await client.query(
        'SELECT * FROM repositories WHERE id = $1',
        [repositoryId]
      );
      const repo = repoResult.rows[0];

      // Get latest release from GitHub
      const latest_release = await githubService.getLatestRelease(repo.owner, repo.name);
      
      if (latest_release) {
        // Check if this release already exists
        const existingRelease = await client.query(
          'SELECT * FROM releases WHERE github_release_id = $1',
          [latest_release.id]
        );

        if (!existingRelease.rows[0]) {
          // Insert new release
          await client.query(`
            INSERT INTO releases (
              repository_id,
              github_release_id,
              tag_name,
              name,
              body,
              published_at,
              is_seen
            )
            VALUES ($1, $2, $3, $4, $5, $6)
          `, [
            repo.id,
            latest_release.id,
            latest_release.tag_name,
            latest_release.name,
            latest_release.body,
            latest_release.published_at,
            false,
          ]);
        }
      }

      // Get updated repository with latest release info
      const updatedRepo = await client.query(`
        SELECT r.*, 
               CASE WHEN lr.id IS NOT NULL AND lr.is_seen = false THEN true ELSE false END as has_unseen_releases
        FROM repositories r
        LEFT JOIN releases lr ON r.id = lr.repository_id
        WHERE r.id = $1
      `, [repositoryId]);

      return updatedRepo.rows[0];
    },

    refreshAllRepositories: async () => {
      const repos = await client.query('SELECT * FROM repositories');
      
      const updatedRepos = await Promise.all(
        repos.rows.map(repo => 
          resolvers.Mutation.refreshRepository(null, { repositoryId: repo.id })
        )
      );

      return updatedRepos;
    },

    deleteRepository: async (_: any, { id }: { id: string }) => {
      try {
        // Delete the repository (cascade will handle related releases)
        await client.query('DELETE FROM repositories WHERE id = $1', [id]);
        return true;
      } catch (error) {
        console.error('Error deleting repository:', error);
        return false;
      }
    }
  },

  Repository: {
    latest_release: async (parent: any) => {
      const result = await client.query(`
        SELECT * FROM releases
        WHERE repository_id = $1
        ORDER BY published_at DESC
        LIMIT 1
      `, [parent.id]);
      return result.rows[0];
    }
  }
};
