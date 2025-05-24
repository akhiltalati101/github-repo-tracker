import React, { useState } from 'react';
import RepositorySearch from '../RepositorySearch';
import RepositoryList from '../RepositoryList';
import ReleaseNotesPanel from '../ReleaseNotesPanel';
import { Box, CssBaseline, Divider, Drawer, Toolbar } from '@mui/material';
import AppBar from '../AppBar';
import { ADD_REPOSITORY, REFRESH_ALL_REPOSITORIES, DELETE_REPOSITORY, MARK_RELEASE_AS_SEEN, GET_REPOSITORIES } from '../../graphql/queries'
import { useMutation, useQuery } from '@apollo/client';

export interface Repository {
  id: string;
  name: string;
  full_name: string;
  description: string;
  has_unseen_releases: boolean;
  latest_release?: {
    id: string;
    name: string;
    tag_name: string;
    published_at: string;
    body?: string;
    is_seen: boolean;
  };
}

const RepositoryTracker = () => {
  const { data } = useQuery(GET_REPOSITORIES);
  const [refreshAllRepositories] = useMutation(REFRESH_ALL_REPOSITORIES);
  const [trackedRepos, setTrackedRepos] = useState<Repository[]>([]);
  const [selectedRepository, setSelectedRepository] = useState<Repository | undefined>(undefined);
  const [addRepository] = useMutation(ADD_REPOSITORY);
  const [markReleaseAsSeen] = useMutation(MARK_RELEASE_AS_SEEN);
  const [deleteRepository] = useMutation(DELETE_REPOSITORY);


  // Refresh repositories when refresh is clicked
  React.useEffect(() => {
    refreshAllRepositories();
  }, [])

  // Update trackedRepos when data is loaded
  React.useEffect(() => {
    if (data?.repositories) {
      setTrackedRepos(data.repositories.map((repo: any) => ({
        id: repo.id,
        name: repo.name,
        full_name: repo.full_name,
        description: repo.description,
        has_unseen_releases: repo.has_unseen_releases,
        latest_release: repo.latest_release ?? undefined
      })));
    }
  }, [data]);

  const handleAddRepository = async (url: string) => {
    const { data } = await addRepository({
      variables: {
        url
      }
    }
    );

    if (data?.addRepository) {
      setTrackedRepos([...trackedRepos, data.addRepository])
    }
  };

  const handleRemoveRepository = async (id: string) => {
    const { data } = await deleteRepository({
      variables: {
        id
      }
    })

    if (data) {
      const newTrackedRepos = trackedRepos.filter((trackedRepo) => trackedRepo.id !== id);
      setTrackedRepos([...newTrackedRepos]);
      if (selectedRepository && selectedRepository.id === id) {
        setSelectedRepository(undefined);
      }
    }
  };

  const handleSelectRepository = (repo: Repository) => {
    setSelectedRepository(repo);
  };

  const handleMarkAsSeen = async (id: string) => {
    await markReleaseAsSeen(
      {
        variables: {
          releaseId: id,
        }
      }
    );
  };

  const drawerWidth = 300;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar />
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <RepositorySearch onAddRepository={handleAddRepository} />
          <Divider />
          <RepositoryList
            repositories={trackedRepos}
            onRemoveRepository={handleRemoveRepository}
            onSelectRepository={handleSelectRepository}
            selectedRepository={selectedRepository ?? undefined}
            onMarkAsSeen={handleMarkAsSeen}
          />
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <ReleaseNotesPanel
          repository={selectedRepository ?? undefined}
        />
      </Box>
    </Box>
  );
};

export default RepositoryTracker;