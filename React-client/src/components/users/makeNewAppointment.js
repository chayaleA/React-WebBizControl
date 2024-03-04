import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Box, Container } from "@mui/system";
import SaveIcon from '@mui/icons-material/Save';
import ClearIcon from '@mui/icons-material/Clear';
import StoreMeetings from "../dataStores/meetings"

export default function MakeNewAppointment({ array }) {
    const initialIdService = JSON.parse(localStorage.getItem('idService')) || 20;
    const [idService, setIdService] = useState(initialIdService);
    const { register, handleSubmit } = useForm();
    const [open, setOpen] = useState(false);
    const [nameService, setNameService] = React.useState('');

    const handleChange = (event) => {
        setNameService(event.target.value);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function handleSubmitDetails(event) {
        handleClose();
        event.id = idService;
        setIdService(idService + 1)
        event.serviceName = nameService;
        const selectedService = array?.find((ser) => ser.name === nameService);
        event.serviceDescription = selectedService.description;
        event.servicePrice = selectedService.price;
        StoreMeetings.addMeeting(event);
    }

    return (
        <>
            <Button
                onClick={handleClickOpen}
                variant="contained"
                color="primary"
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                }}
            >
                Make an appointment
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogActions>
                    <Button onClick={handleClose}>
                        <ClearIcon></ClearIcon>
                    </Button>
                </DialogActions>
                <DialogTitle>Enter your details</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To make an appointment, please enter your detailes here. We
                        will send updates occasionally.
                    </DialogContentText>
                    <Container component="main" maxWidth="xs"  >
                        <Box component="form" onSubmit={handleSubmit(handleSubmitDetails)} noValidate sx={{ mt: -3, ml: 1 }}>
                            <Box sx={{ minWidth: 120, mt: 8 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">name service</InputLabel>
                                    <Select
                                        labelId="NameService"
                                        id="NameService"
                                        value={nameService}
                                        label="NameService"
                                        onChange={handleChange}
                                    >
                                        {array?.map((ser) => {
                                            return (<MenuItem key={ser.name} value={ser.name}>{ser.name}</MenuItem>);
                                        })
                                        }
                                    </Select>
                                </FormControl>

                            </Box>
                            <TextField
                                {...register("dateTime")}
                                autoFocus
                                margin="dense"
                                fullWidth
                                id="date"
                                label="choose data for the meeting"
                                type="date"
                                sx={{ mb: 2 }}
                                variant="standard"
                                required
                            />
                            <TextField
                                {...register("clientName")}
                                autoFocus
                                margin="dense"
                                fullWidth
                                id="clientName"
                                label="clientName"
                                sx={{ mb: 2 }}
                                variant="standard"
                                required
                            />
                            <TextField
                                {...register("clientPhone")}
                                autoFocus
                                margin="dense"
                                fullWidth
                                id="clientPhone"
                                label="clientPhone"
                                sx={{ mb: 2 }}
                                variant="standard"
                                required
                            />
                            <TextField
                                {...register("clientEmail")}
                                autoFocus
                                margin="dense"
                                fullWidth
                                id="clientEmail"
                                label="clientEmail"
                                type="email"
                                sx={{ mb: 2 }}
                                variant="standard"
                                required
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
        </>
    )
}