import React, { useState } from 'react';
import RepositorySearch from '../RepositorySearch';
import RepositoryList from '../RepositoryList';
import ReleaseNotesPanel from '../ReleaseNotesPanel';
import { Box, CssBaseline, Divider, Drawer, Grid, InputAdornment, List, ListItemButton, ListItemIcon, ListItemText, Paper, TextField, Toolbar, Typography, CircularProgress } from '@mui/material';
import AppBar from '../AppBar';

export interface Repository {
  id: string;
  name: string;
  fullName: string;
  description: string;
  hasUnseenRelease: boolean;
  latestRelease?: {
    version: string;
    releaseDate: string;
    seen: boolean;
    notes?: string;
  };
}

const RepositoryTracker = () => {
  const [trackedRepos, setTrackedRepos] = useState<Repository[]>([]);
  const [selectedRepository, setSelectedRepository] = useState<Repository | undefined>(trackedRepos[0]);

  const handleAddRepository = (repo: Repository) => {
    console.log(repo);
  };

  const handleRemoveRepository = (id: string) => {
    console.log(id);
  };

  const handleSelectRepository = (repo: Repository) => {
    setSelectedRepository(repo);
  };

  const handleMarkAsSeen = (id: string) => {
    console.log(id);
  };

  const drawerWidth = 240;

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
              selectedRepository={selectedRepository}
              onMarkAsSeen={handleMarkAsSeen}
            />
        </Box>
      </Drawer>
    </Box>
  );
};

export default RepositoryTracker;