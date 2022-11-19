
import { Paper, Typography, Box, Grid, Button } from "@mui/material";
import { Link } from "react-router-dom";

import { useAppSelector } from "../../App/Store/ConfigureStore";


export default function MyProfile() {
    const { user } = useAppSelector(state => state.account)
    return (
        <Box component={Paper} sx={{ p: 2, mt: 2, textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
                User Details
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                    <Typography color="black">Your registered email is: {user?.email}</Typography>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <Typography color="black">You are registered as a {user?.roles}</Typography>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <Typography color="red">To delete your account or update any details please email us at admin@test.com</Typography>
                </Grid>
            </Grid>
            <Button    component={Link} to={'/catalog'} sx={{mt:2}}  variant='contained' fullWidth>Go to catalog</Button>
        </Box>
    )
}