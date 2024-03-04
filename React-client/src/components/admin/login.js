import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import Home from '../main/home'

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            Chaya A
            {' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const defaultTheme = createTheme();

export default function Login({ isAdmin, setIsAdmin }) {
    const [isError, setError] = React.useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        try {
            const response = await fetch("http://localhost:8787/login/", {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: data.get("user-name"),
                    password: data.get("password")
                })
            })
            if (response.status === 401) {
                throw new Error('Unauthorized');
            }
            setError(false);
            setIsAdmin(true);
        }
        catch (error) {
            setError(true);
            document.getElementById("user-name").value = "";
            document.getElementById("password").value = "";
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            {
                isAdmin ? <Home isAdmin={isAdmin} setIsAdmin={setIsAdmin}></Home> :
                    <>
                        <Grid container component="main" sx={{ height: '100vh' }}>
                            <CssBaseline />
                            <Grid
                                item
                                xs={false}
                                sm={4}
                                md={7}
                                sx={{
                                    backgroundImage: 'url(https://img.lovepik.com/background/20211021/medium/lovepik-business-men-background-image_401706194.jpg)',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundColor: (t) =>
                                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                            />
                            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                                <Box
                                    sx={{
                                        my: 8,
                                        mx: 4,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Avatar sx={{ m: 1 }}>
                                        <LockPersonIcon />
                                    </Avatar>
                                    <Typography component="h1" variant="h5">
                                        Log in
                                    </Typography>
                                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="user-name"
                                            label="User Name"
                                            name="user-name"
                                            autoComplete="user-name"
                                            autoFocus
                                        />
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="password"
                                            label="Password"
                                            type="password"
                                            id="password"
                                            autoComplete="current-password"
                                        />
                                        <FormControlLabel
                                            control={<Checkbox value="remember" color="primary" />}
                                            label="Remember me"
                                        />
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{ mt: 3, mb: 2 }}
                                        >
                                            Log In
                                        </Button>
                                        {isError && <Alert variant="filled" severity="error">
                                            Incorrect password or user name — check it out!
                                        </Alert>
                                        }
                                        <Copyright sx={{ mt: 5 }} />
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </>
            }
        </ThemeProvider>
    );
}