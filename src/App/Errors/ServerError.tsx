import { Button, Divider, Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { Link, Route, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";


export default function ServerError() {

    const history = useNavigate();
    const { state } = useLocation();

    return (
        <Container component={Paper} sx={{ marginTop: 2 }}>
            {state?.error ? (
                <>
                    <Typography variant="h3" gutterBottom>This is a server error</Typography>
                    <Divider></Divider>
                    <Typography>{state.error.detail || 'Internal server error'}</Typography>
                </>
            ) : (
                <>
                <Typography variant="h3" color='error' gutterBottom>This is a Server Error</Typography>
                <Divider></Divider>
                </>
            )}
            <Button sx={{fontWeight:'800'}} fullWidth component={Link} to='/catalog'>Go back to Shop</Button>
        </Container>
    )
}