import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function NotFound() {
return(
    <Container component={Paper} sx={{marginTop:2, display:'flex-box',textAlign:'center'}}>
        <Typography gutterBottom variant="h3" color="#E8AC67" marginTop='30px' paddingTop="30px">
            Oops We could not found what you are looking for!</Typography>
        <img src="../notfound.png"></img>
        <Divider></Divider>
        <Button sx={{fontWeight:'800'}} fullWidth component={Link} to='/catalog'>Go back to Shop</Button>
    </Container>
)
}