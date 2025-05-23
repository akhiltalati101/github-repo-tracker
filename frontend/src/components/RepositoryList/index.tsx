import React from 'react';
import { Card, CardContent, Typography, IconButton, Button, Box, Chip, Paper } from '@mui/material';
import { NotificationsActive as NotificationsActiveIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { Repository } from '../RepositoryTracker';

interface RepositoryListProps {
  repositories: Repository[];
  onRemoveRepository: (id: string) => void;
  onSelectRepository: (repo: Repository) => void;
  selectedRepository?: Repository;
  onMarkAsSeen: (id: string) => void;
}

const RepositoryList = ({ 
  repositories, 
  onRemoveRepository, 
  onSelectRepository, 
  selectedRepository,
  onMarkAsSeen 
}: RepositoryListProps) => {
  if (repositories.length === 0) {
    return (
      <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: 128,
          height: 128,
        },
      }}
    >
      <Paper elevation={3}>
        No Repositories being tracked currently.
        Add a Github Link to begin tracking.
      </ Paper>
    </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {repositories.map((repo) => (
        <Card
          key={repo.id}
          sx={{
            cursor: 'pointer',
            transition: 'all 0.2s',
            border: selectedRepository?.id === repo.id ? '2px solid #1976d2' : '1px solid #e0e0e0',
            '&:hover': {
              boxShadow: 3,
              borderColor: selectedRepository?.id === repo.id ? '#1976d2' : '#bdbdbd',
            },
          }}
          onClick={() => onSelectRepository(repo)}
        >
          <CardContent sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1, minWidth: 0 }}>
                {repo.latestRelease && !repo.latestRelease.seen && (
                  <NotificationsActiveIcon sx={{ color: 'success.main' }} />
                )}
                <Box sx={{ minWidth: 0 }}>
                  <Typography variant="h6" component="div" sx={{ fontWeight: 500 }} noWrap>
                    {repo.name}
                  </Typography>
                  {repo.latestRelease && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                      <Chip
                        label={repo.latestRelease.version}
                        size="small"
                        color={repo.latestRelease.seen ? 'default' : 'primary'}
                      />
                      <Typography variant="caption" color="text.secondary">
                        {new Date(repo.latestRelease.releaseDate).toLocaleDateString()}
                      </Typography>
                      {!repo.latestRelease.seen && (
                        <Chip
                          label="New!"
                          size="small"
                          color="error"
                          sx={{ ml: 1 }}
                        />
                      )}
                    </Box>
                  )}
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {repo.latestRelease && !repo.latestRelease.seen && (
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      onMarkAsSeen(repo.id);
                    }}
                  >
                    Mark as seen
                  </Button>
                )}
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveRepository(repo.id);
                  }}
                  sx={{
                    color: 'text.secondary',
                    '&:hover': {
                      color: 'error.main',
                    },
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default RepositoryList;