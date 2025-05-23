import { Octokit } from '@octokit/rest';
import dotenv from 'dotenv';

dotenv.config();

export class GitHubService {
  private octokit: Octokit;

  constructor() {
    this.octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN,
    });
  }

  async getRepository(owner: string, repo: string) {
    try {
      const { data } = await this.octokit.rest.repos.get({ owner, repo });
      return data;
    } catch (error) {
      throw new Error(`Failed to fetch repository: ${error}`);
    }
  }

  async getLatestRelease(owner: string, repo: string) {
    try {
      const { data } = await this.octokit.rest.repos.getLatestRelease({ owner, repo });
      return data;
    } catch (error) {
      // Repository might not have releases
      return null;
    }
  }

  async getAllReleases(owner: string, repo: string) {
    try {
      const { data } = await this.octokit.rest.repos.listReleases({ 
        owner, 
        repo,
        per_page: 10 
      });
      return data;
    } catch (error) {
      return [];
    }
  }
}