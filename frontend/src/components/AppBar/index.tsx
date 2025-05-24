import { AppBar as MuiAppBar, Toolbar, Typography, Button } from '@mui/material';

interface AppBarProps {
  onRefreshRepositories: () => void;
}

const AppBar = ({
  onRefreshRepositories
}: AppBarProps) => {
  return (
    <MuiAppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Github Repository Tracker
        </Typography>
        <Button color="inherit" onClick={() => onRefreshRepositories()}>Refresh Repositories</Button>
        <Button color="inherit">Logout</Button>
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
