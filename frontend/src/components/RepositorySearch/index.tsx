import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';

interface RepositorySearchProps {
  onAddRepository: (url: string) => void;
}

const RepositorySearch = ({ onAddRepository }: RepositorySearchProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    try {
      onAddRepository(searchQuery)
      setSearchQuery('');
    } catch (error) {
      console.error('Failed adding repository:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
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

  );
};

export default RepositorySearch;