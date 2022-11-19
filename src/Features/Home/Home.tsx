import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Slider from "react-slick";

export default function HomePage() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    return (
        <Link to='/catalog'>
            <Box sx={{ pt: 2 }}>

                <Slider {...settings}>
                    <div>
                        <img src="/images/home/p2.png" alt="photo"
                            style={{
                                display: 'block',
                                width: '100%',
                                maxHeight: 750
                            }} />
                    </div>
                    <div>
                        <img src="/images/home/p1.png" alt="photo"
                            style={{
                                display: 'block',
                                width: '100%',
                                maxHeight: 750
                            }} />
                    </div>
                    <div>
                        <img src="/images/home/p3.png" alt="photo"
                            style={{
                                display: 'block',
                                width: '100%',
                                maxHeight: 750
                            }} />
                    </div>
                </Slider>

                <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center' sx={{ p: 4 }}>
                    <Typography variant="h2">Welcome to Cool Collections</Typography>
                    <Typography variant="caption">Click here to Shopping</Typography>
                </Box>

            </Box>
        </Link>
    )
}