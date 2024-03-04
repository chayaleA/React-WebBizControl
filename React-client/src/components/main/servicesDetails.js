import * as React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { observer } from "mobx-react-lite"
import { toJS } from 'mobx'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Fab, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import ClearIcon from '@mui/icons-material/Clear';
import SingleService from './singleService';
import HeaderAppBar from './headerAppBar';
import MakeNewAppointment from '../users/makeNewAppointment';
import Store from "../dataStores/services"

const theme = createTheme();

const ServicesDetails = observer(({ isAdmin, setIsAdmin }) => {
    const [edit, setEdit] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [idService, setIdService] = useState(10);
    const { register, handleSubmit } = useForm();
    const [amountOfImages, setAmountOfImages] = React.useState(3);

    const imageArr = [];

    const handleChange = (event) => {
        setAmountOfImages(event.target.value);
    };

    const handleChange2 = (event) => {
        imageArr.push({ img: event.target.value })
    };

    const handleClose = () => {
        setEdit(false);
        setOpen(false);
    };

    const s = toJS(Store.services);

    function handleSubmitForm(event) {
        event.id = idService;
        setIdService(idService + 1)
        event.arrPictures = imageArr
        Store.addService(event);
        setEdit(false);
    };

    return (
        <>
            {isAdmin && <HeaderAppBar isAdmin={isAdmin} setIsAdmin={setIsAdmin}></HeaderAppBar>}
            {!isAdmin && <MakeNewAppointment array={s}></MakeNewAppointment>}
            <ThemeProvider theme={theme}  >
                {
                    !edit ? <>
                        {isAdmin &&
                                <Fab color="primary" aria-label="add"
                                 onClick={(e) => { setEdit(true); setOpen(true); }}
                                 sx={{ mt: 18, mb: 5 }}>
                                    <AddIcon />
                                </Fab>
                        }
                        <Grid container spacing={4}
                            sx={!isAdmin ? { mt: 20 } : { mt: 0 }}
                        >
                            {s?.map((ser) => {
                                return (<SingleService key={ser.id} {...ser} isAdmin={isAdmin} setIsAdmin={setIsAdmin}></SingleService>)
                            })
                            }
                        </Grid>
                    </> : <>
                        <Dialog open={open} onClose={handleClose}>
                            <DialogActions>
                                <Button onClick={handleClose}>
                                    <ClearIcon></ClearIcon>
                                </Button>
                            </DialogActions>
                            <DialogTitle>Enter the detailes of the new service</DialogTitle>
                            <DialogContent>
                                <Container component="main" maxWidth="xs"  >
                                    <Box component="form" onSubmit={handleSubmit(handleSubmitForm)} noValidate sx={{ mt: -3, ml: 1 }}>
                                        <TextField
                                            {...register("name")}
                                            autoFocus
                                            margin="dense"
                                            fullWidth
                                            id="name"
                                            label="name"
                                            sx={{ mb: 2 }}
                                            variant="standard"
                                        />
                                        <TextField
                                            {...register("description")}
                                            autoFocus
                                            margin="dense"
                                            fullWidth
                                            id="description"
                                            label="description"
                                            sx={{ mb: 2 }}
                                            variant="standard"
                                        />
                                        <TextField
                                            {...register("price")}
                                            autoFocus
                                            margin="dense"
                                            fullWidth
                                            id="price"
                                            label="price"
                                            sx={{ mb: 2 }}
                                            variant="standard"
                                        />
                                        <TextField
                                            {...register("duration")}
                                            autoFocus
                                            margin="dense"
                                            fullWidth
                                            id="duration"
                                            label="duration"
                                            sx={{ mb: 2 }}
                                            variant="standard"
                                        />
                                        <TextField
                                            {...register("serviceMedia")}
                                            autoFocus
                                            margin="dense"
                                            fullWidth
                                            id="serviceMedia"
                                            label="serviceMedia"
                                            sx={{ mb: 2 }}
                                            variant="standard"
                                        />
                                        <FormControl>
                                            <FormLabel id="demo-radio-buttons-group-label">Enter the amount of the
                                                images that you whould like to have in the gallery</FormLabel>
                                            <RadioGroup
                                                aria-labelledby="demo-radio-buttons-group-label"
                                                defaultValue="3"
                                                name="radio-buttons-group"
                                                onChange={handleChange}
                                            >
                                                <FormControlLabel value="3" control={<Radio />} label="3" />
                                                <FormControlLabel value="6" control={<Radio />} label="6" />
                                                <FormControlLabel value="9" control={<Radio />} label="9" />
                                            </RadioGroup>
                                        </FormControl>
                                        {
                                            Array.from({ length: amountOfImages }).map((_, i) => (
                                                <React.Fragment key={i}>
                                                    <TextField
                                                        autoFocus
                                                        margin="dense"
                                                        fullWidth
                                                        id={`serviceMedia${i}`}
                                                        label={`Enter address of the image ${i + 1} for the portfolio review`}
                                                        sx={{ mb: 2 }}
                                                        variant="standard"
                                                        onChange={handleChange2}
                                                    />
                                                </React.Fragment>
                                            ))
                                        }
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            sx={{ mt: 3, mb: 2, display: 'flex', justifyContent: 'flex-end' }}
                                        >
                                            <SaveIcon />
                                        </Button>
                                    </Box>
                                </Container>
                            </DialogContent>
                        </Dialog>
                    </>
                }
            </ThemeProvider >
        </>
    );
})

export default ServicesDetails;

