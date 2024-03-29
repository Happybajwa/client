import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Paper } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FieldValues, useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { signInUser } from './AccountSlice';
import { useAppDispatch } from '../../App/Store/ConfigureStore';
import { history } from '../..';
import { useMemo } from 'react';




export default function Login() {

  const dispatch = useAppDispatch();
  const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm();
  const location = useLocation();
  const navigate = useNavigate();

  const from = useMemo(() => {
    const state = location.state as { from: Location };
    if (state && state.from && state.from.pathname) {
      return state.from?.pathname;
    }
    return null;
  }, [location]);

  async function submitForm(data: FieldValues) {
    try {
      await dispatch(signInUser(data));
      navigate(from || '/catalog');
    }
    catch (error) {
      console.log(error);
    }
  }

  return (
    <Container component={Paper} maxWidth="sm"
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4, mt: 2 }}>
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Box component="form" onSubmit={handleSubmit(submitForm)} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          fullWidth
          label="Username"
          autoComplete="email"
          autoFocus
          {...register('username', { required: 'Username is required' })}
          error={!!errors.username}
          helperText={errors?.username?.message?.toString()}
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
        <LoadingButton

          loading={isSubmitting}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </LoadingButton>
        <Grid container>
          <Grid item xs>
            <Link to="/register">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link to="/register">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}