import React from 'react';
import { Card, CardContent, Typography, IconButton, Button, Box, Chip, Paper, CardActions, List, ListItem } from '@mui/material';
import { NotificationsActive as NotificationsActiveIcon, Delete as DeleteIcon, Visibility as VisibilityIcon } from '@mui/icons-material';
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
            m: 0.5,
          },
        }}
      >
        <Typography variant='h6'>
          No Repositories being tracked currently.
          <br/>
          Add a Github Link to begin tracking.
        </ Typography>
      </Box>
    );
  }

  return (
    <List sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {repositories.map((repo) => (
        <ListItem disablePadding>
        <Card key={repo.id}
          sx={{
            m: 2,
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
          <CardContent>
            <Typography variant="h5" component="div">
              {repo.name}
            </Typography>
            <Typography variant="body2">
              {repo.description}
            </Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: 'flex-end', pr: 2, pb: 2 }}>
            <Button
              variant="contained"
              startIcon={<VisibilityIcon />}
              onClick={() => {
                repo.has_unseen_releases = false;
                onMarkAsSeen(repo.latest_release.id)
              }}
              color={repo.has_unseen_releases ? 'success' : 'inherit'}
              disabled={!repo.has_unseen_releases}
            >
              {repo.has_unseen_releases ? 'Mark Seen' : 'No New Items'}
            </Button>

            <IconButton
              aria-label="delete"
              onClick={(e) => {
                // To stop the click to bubble up and select the current repo for display.
                e.stopPropagation();
                onRemoveRepository(repo.id);
              }}
              sx={{
                ml: 1,
                '&:hover': {
                  color: 'error.main',
                },
              }}
            >
              <DeleteIcon />
            </IconButton>
          </CardActions>
        </Card>
      </ListItem>
      ))}
    
    </List>
  );
};

export default RepositoryList;