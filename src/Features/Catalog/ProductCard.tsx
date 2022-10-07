import { ListItem, ListItemAvatar, Avatar, ListItemText, Button, Card, CardActions, CardContent, CardMedia, Typography, Box, Grid, CardHeader } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import Agent from "../../App/Api/Agent";
import { Product } from "../../App/Models/Product";
import LoadingButton from '@mui/lab/LoadingButton';
import { StoreContext, useStoreContext } from "../../App/Context/StoreContext";

interface Props {
    product: Product;
}

export default function ProductsCard({ product }: Props) {
    const [loading, setLoading] = useState(false);

    const {setBasket} = useStoreContext();

    function handleAddItem(productId:number) {
        setLoading(true);
        Agent.Basket.addItem(productId)
        .then(basket => setBasket(basket))
            .catch(error => console.log(error))
            .finally(()=> setLoading(false))
    }
    return (
        <Card sx={{marginTop: 9, marginBottom: -12}}>
            <CardHeader color='#00b1d2'
                avatar={
                    <Avatar sx={{bgcolor:"secondary.main"}}>
                        {product.name.charAt(0).toUpperCase()}
                    </Avatar>
                }
                title={product.name.toUpperCase()}
                titleTypographyProps={{
                    sx:{fontWeight:'bold',color:'primary.main'}
                }   
                }
            />
            <CardMedia
                component="img"
                image={product.pictureUrl}
                title={product.name}
                alt="Photo"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" color='primary.main'>
                    ${(product.price).toFixed(2)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.size} / {product.gender}
                </Typography>
            </CardContent>
            <CardActions>
                <CardActions>
                    <LoadingButton loading={loading} 
                    onClick={() => handleAddItem(product.id)} 
                    size="small">Add to cart</LoadingButton>
                    <Button component={Link} to={`/catalog/${product.id}`} size="small">View</Button>
                </CardActions>
            </CardActions>
        </Card>
    )
}