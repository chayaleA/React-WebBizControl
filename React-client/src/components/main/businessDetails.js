import * as React from 'react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { observer } from "mobx-react-lite"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Avatar, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Fab, Grid, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import MdPhone from '@mui/icons-material/Phone';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import StarsIcon from '@mui/icons-material/Stars';
import SaveIcon from '@mui/icons-material/Save';
import ClearIcon from '@mui/icons-material/Clear';
import CoPresentIcon from '@mui/icons-material/CoPresent';
import businessData from '../dataStores/businessData';

const theme = createTheme();

const BusinessDetails = observer(({ isAdmin }) => {

    const [edit, setEdit] = useState(false);
    const { register, handleSubmit } = useForm();
    const business = businessData.data;
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setEdit(false);
        setOpen(false);
    };

    function handleSubmitForm(event) {
        businessData.createOrUpdateBusinessdata(event);
        setEdit(false);
    };

    return (
        <>
            <ThemeProvider theme={theme}  >
                <Container component="main" maxWidth="xs">
                    {edit && isAdmin ?
                        <Grid item xs={12} sm={6} md={4} lg={3} >
                            <Dialog open={open} onClose={handleClose}>
                                <DialogActions>
                                    <Button onClick={handleClose}>
                                        <ClearIcon></ClearIcon>
                                    </Button>
                                </DialogActions>
                                <DialogTitle>Enter your details</DialogTitle>
                                <DialogContent>
                                    <Container component="main" maxWidth="xs"  >
                                        <Box component="form" onSubmit={handleSubmit(handleSubmitForm)} noValidate sx={{ mt: -3, ml: 1 }}>
                                            <TextField
                                                {...register('name')}
                                                id="BusinessName"
                                                label="Business Name"
                                                defaultValue={business.name}
                                                sx={{ mt: 5, mb: 2 }}
                                                variant="standard"
                                                autoFocus
                                                margin="dense"
                                                fullWidth
                                            />
                                            <TextField
                                                {...register('address')}
                                                id="Address"
                                                label="Address"
                                                defaultValue={business.address}
                                                sx={{ mb: 2 }}
                                                variant="standard"
                                                autoFocus
                                                margin="dense"
                                                fullWidth
                                            />
                                            <TextField
                                                {...register('phone')}
                                                id="phone"
                                                label="phone"
                                                defaultValue={business.phone}
                                                sx={{ mb: 2 }}
                                                variant="standard"
                                                autoFocus
                                                margin="dense"
                                                fullWidth
                                            />
                                            <TextField
                                                {...register('owner')}
                                                id="owner"
                                                label="owner"
                                                defaultValue={business.owner}
                                                sx={{ mb: 2 }}
                                                variant="standard"
                                                autoFocus
                                                margin="dense"
                                                fullWidth
                                            />
                                            <TextField
                                                {...register('logo')}
                                                id="logo"
                                                label="logo"
                                                defaultValue={business.logo}
                                                sx={{ mb: 2 }}
                                                variant="standard"
                                                autoFocus
                                                margin="dense"
                                                fullWidth
                                            />
                                            <TextField
                                                {...register('description')}
                                                id="description"
                                                label="description"
                                                defaultValue={business.description}
                                                sx={{ mb: 2 }}
                                                variant="standard"
                                                autoFocus
                                                margin="dense"
                                                fullWidth
                                            />
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                sx={{ mt: 3, mb: 2 }}
                                            >
                                                <SaveIcon />
                                            </Button>
                                        </Box>
                                    </Container>
                                </DialogContent>
                            </Dialog>
                        </Grid>
                        :
                        <Box>
                            <Box noValidate
                                sx={{
                                    mt: isAdmin ? 15 : 2,
                                    border: isAdmin && '6px solid #ccc',
                                    borderRadius: isAdmin && '12px',
                                    padding: '15px',
                                }}>
                                <br></br>
                                <List
                                    sx={{
                                        width: '100%',
                                        maxWidth: 360,
                                        bgcolor: 'background.paper',
                                    }}
                                >
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <CoPresentIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={business.name} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <InsertEmoticonIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={business.owner} />
                                    </ListItem>
                                    <Divider variant="inset" component="li" />
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <MdPhone />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={business.phone} />
                                    </ListItem>
                                    <Divider variant="inset" component="li" />
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <FmdGoodIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={business.address} />
                                    </ListItem>
                                    <Divider variant="inset" component="li" />
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <StarsIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={business.description} />
                                    </ListItem>
                                </List>
                                {isAdmin &&
                                        <Fab color="primary" aria-label="add an alarm"
                                          onClick={(e) => { setEdit(true); setOpen(true); }}
                                          sx={{ mt: 5, mb: 7 }}>
                                            <EditIcon />
                                        </Fab>
                                }
                            </Box>
                        </Box>
                    }
                </Container>
            </ThemeProvider>
        </>
    );
})

export default BusinessDetails;