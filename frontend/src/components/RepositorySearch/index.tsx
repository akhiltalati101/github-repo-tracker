import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { Repository } from '../RepositoryTracker';

interface RepositorySearchProps {
  onAddRepository: (repo: Repository) => void;
}

const RepositorySearch = ({ onAddRepository }: RepositorySearchProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    try {
      // Parse GitHub URL or owner/repo format
      let githubUrl = searchQuery;

      console.log('githubUrl', githubUrl);

      setSearchQuery('');
    } catch (error) {
      console.error('Failed adding repository:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <TextField
        id="outlined-basic"
        variant='outlined'
        placeholder='github url'
        InputProps={{
          endAdornment: (
            <Button
              variant='outlined'
              onClick={handleSearch}
              disabled={isLoading}
            >
              {isLoading ? 'Adding...' : 'Add'}
            </Button>
          )
        }}
        sx={{ m: 0.5 }}
        onChange={(e) => { setSearchQuery(e.target.value) }}
        value={searchQuery}
      />
    </div>

  );
};

export default RepositorySearch;