import { Box, Paper, Typography } from "@mui/material";


export default function AboutPage() {

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 2,
            textAlign: 'justify',
            padding:4
            
        }} component={Paper}>
            <Typography variant="h4" padding={2}>
                Welcome to cool collections by Harpreet Singh. I am
                a Student at Manukau Institute of technology, Manukau, Auckland.
                This is a Student Project and Everything on this website is a demo.
            </Typography>
            <Typography variant="h6" padding={2}>Manukau Institute of technology</Typography>
            <img src="/images/home/MIT.jpg"/>
            <Typography variant="h6" color={'red'} padding={2}> Note: please do enter your personal details on any form of this website.</Typography>

        </Box>
    )
}