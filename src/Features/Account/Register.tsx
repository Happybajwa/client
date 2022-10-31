import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Alert, AlertTitle, List, ListItem, ListItemText, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import Agent from '../../App/Api/Agent';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { history } from '../..';




export default function Register() {

    const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm()
    const [validationError, setValidationError] = useState([]);
    return (
        <Container component={Paper} maxWidth="sm"
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4, mt: 2 }}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Register
            </Typography>
            <Box component="form" onSubmit={handleSubmit((data) =>
                Agent.Account.register(data)
                .then(() => {
                    toast.success('Registration Successful. Please Login');
                    history.push('/login')
                })
                .catch(error => setValidationError(error)))} noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    fullWidth
                    label="Username"
                    autoComplete="name"
                    autoFocus
                    {...register('username', { required: 'Username is required' })}
                    error={!!errors.username}
                    helperText={errors?.username?.message?.toString()}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    label="Email Address"
                    autoComplete="email"
                    {...register('email', 
                    { required: 'Email is required',
                      pattern:{
                        value:/^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/,
                        message:"Not a valid email address"
                    }})}
                    error={!!errors.email}
                    helperText={errors?.email?.message?.toString()}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    {...register('password', { required: 'Password is required' })}
                    error={!!errors.password}
                    helperText={errors?.password?.message?.toString()}
                />
                {validationError.length > 0 &&
                    <Alert severity="error">
                        <AlertTitle>Validation Error</AlertTitle>
                        <List>
                            {validationError.map(error => (
                                <ListItem key={error}>
                                    <ListItemText>
                                        {error}
                                    </ListItemText>
                                </ListItem>
                            ))}
                        </List>
                    </Alert>
                }
                <LoadingButton
                    loading={isSubmitting}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Register
                </LoadingButton>
                <Grid container>
                    <Grid item xs>
                        <Link to="/register">
                            Forgot password?
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link to="/login">
                            {"Already have an account? Sign In"}
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}