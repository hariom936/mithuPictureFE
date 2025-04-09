import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  Box,
  CssBaseline,
  List,
  ListItem,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Menu,
  ListItemIcon
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../config/api';
const drawerWidth = 240;

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  role: string;
}

// Optional: If you have only 2 roles in your app
const ROLE_OPTIONS = ['client', 'admin'];

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Profile Menu State
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openProfileMenu = Boolean(anchorEl);

  // Fetch user list on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
            `${API_ENDPOINTS.userList}?page=1&limit=10`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          
        setUsers(response.data.data.users);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };
    fetchUsers();
  }, []);

  // ==================
  //  EDIT USER LOGIC
  // ==================
  const handleOpenEdit = (user: User) => {
    setCurrentUser(user);
    setOpenEditDialog(true);
  };

  const handleCloseEdit = () => {
    setOpenEditDialog(false);
    setCurrentUser(null);
  };

  const handleSaveEdit = async () => {
    if (!currentUser) return;

    try {
      const token = localStorage.getItem('token');
      await axios.patch(
        `${API_ENDPOINTS.updateUser}?userId=${currentUser.id}`,
        {
          first_name: currentUser.first_name,
          last_name: currentUser.last_name,
          email: currentUser.email,
          phone: currentUser.phone,
          role: currentUser.role,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Update local state
      setUsers((prevUsers) =>
        prevUsers.map((u) => (u.id === currentUser.id ? currentUser : u))
      );

      handleCloseEdit();
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };

  // ==================
  //  DELETE USER LOGIC
  // ==================
  const handleDelete = async (user: User) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_ENDPOINTS.deleteUser}?userId=${user.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      setUsers((prev) => prev.filter((u) => u.id !== user.id));
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };
  

  // ==================
  //  EDIT DIALOG HANDLERS
  // ==================
  const handleEditFieldChange = (field: keyof User, value: string) => {
    if (!currentUser) return;
    setCurrentUser({ ...currentUser, [field]: value });
  };

  // ==================
  //  PROFILE MENU
  // ==================
  const handleProfileMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleViewProfile = () => {
    // TODO: open a profile page or dialog for the logged-in user
    alert('View Profile detail - not yet implemented');
    handleProfileMenuClose();
  };

  const handleChangePassword = () => {
    // TODO: open a change-password flow
    alert('Change password - not yet implemented');
    handleProfileMenuClose();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    handleProfileMenuClose();
    navigate('/');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* TOP BAR (AppBar) */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: '#6a1b9a', // Purple color
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              textAlign: 'center',
              fontWeight: 'bold',
            }}
          >
            Mithu Picture
          </Typography>

          {/* PROFILE MENU BUTTON (Top Right) */}
          <Button
            color="inherit"
            onClick={handleProfileMenuClick}
            sx={{ textTransform: 'none' }}
          >
            Profile
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={openProfileMenu}
            onClose={handleProfileMenuClose}
          >
            <MenuItem onClick={handleViewProfile}>
              <ListItemIcon>
                <PersonIcon fontSize="small" />
              </ListItemIcon>
              View Profile
            </MenuItem>
            <MenuItem onClick={handleChangePassword}>
              <ListItemIcon>
                <LockIcon fontSize="small" />
              </ListItemIcon>
              Change Password
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* SIDE BAR (Drawer) */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          // No margin or padding
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />
        <List>
          <ListItem>
            <ListItemText
              primary="Users"
              primaryTypographyProps={{ fontWeight: 'bold' }}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Service"
              primaryTypographyProps={{ fontWeight: 'bold' }}
            />
          </ListItem>
        </List>
      </Drawer>

      {/* MAIN CONTENT */}
      <Box
        component="main"
        // We remove left margin so there's no gap
        sx={{
          flexGrow: 1,
          pt: 3,
          // If you want truly 0 gap, use px: 0
          // We'll do px: 2 for minimal buffer from the left
          px: 0,
        }}
      >
        {/* Ensures content starts below the fixed AppBar */}
        <Toolbar />

        {/* USER LIST */}
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', ml: 2 }}>
          User List
        </Typography>

        <Box sx={{ ml: 2, mr: 2 }}>
          <TableContainer component={Paper} elevation={3}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>First Name</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Last Name</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Phone</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Role</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.first_name}</TableCell>
                    <TableCell>{user.last_name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <IconButton
                        color="primary"
                        onClick={() => handleOpenEdit(user)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(user)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {/* EDIT DIALOG */}
        <Dialog open={openEditDialog} onClose={handleCloseEdit} fullWidth>
          <DialogTitle>Edit User</DialogTitle>
          <DialogContent>
            {currentUser && (
              <Box display="flex" flexDirection="column" gap={2} mt={1}>
                <TextField
                  label="First Name"
                  value={currentUser.first_name}
                  onChange={(e) =>
                    handleEditFieldChange('first_name', e.target.value)
                  }
                />
                <TextField
                  label="Last Name"
                  value={currentUser.last_name}
                  onChange={(e) =>
                    handleEditFieldChange('last_name', e.target.value)
                  }
                />
                <TextField
                  label="Email"
                  value={currentUser.email}
                  onChange={(e) =>
                    handleEditFieldChange('email', e.target.value)
                  }
                />
                <TextField
                  label="Phone"
                  value={currentUser.phone}
                  onChange={(e) =>
                    handleEditFieldChange('phone', e.target.value)
                  }
                />
                <TextField
                  select
                  label="Role"
                  value={currentUser.role}
                  onChange={(e) =>
                    handleEditFieldChange('role', e.target.value)
                  }
                >
                  {ROLE_OPTIONS.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEdit} color="inherit">
              Cancel
            </Button>
            <Button variant="contained" onClick={handleSaveEdit}>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default Dashboard;
