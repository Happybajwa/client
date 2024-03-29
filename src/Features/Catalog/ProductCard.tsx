import { Avatar, Button, Card, CardActions, CardContent, CardMedia, Typography, CardHeader } from "@mui/material";
import { Link } from "react-router-dom";
import { Product } from "../../App/Models/Product";
import LoadingButton from '@mui/lab/LoadingButton';
import { useAppDispatch, useAppSelector } from "../../App/Store/ConfigureStore";
import { addBasketItemAsync, setBasket } from "../Basket/BasketSlice";

interface Props {
    product: Product;
}

export default function ProductsCard({ product }: Props) {
    const { status } = useAppSelector(state => state.basket)
    const dispatch = useAppDispatch();

    return (
        <Card>
            <CardHeader color='#00b1d2'
                avatar={
                    <Avatar sx={{ bgcolor: "secondary.main" }}>
                        {product.name.charAt(0).toUpperCase()}
                    </Avatar>
                }
                title={product.name.toUpperCase()}
                titleTypographyProps={{
                    sx: { fontWeight: 'bold', color: 'primary.main' }
                }
                }
            />
            <CardMedia
                component="img"
                image={product.pictureUrl}
                title={product.name}
                alt="Photo"
                sx={{p:2}}
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
                    <LoadingButton loading={status.includes('pendingAddItem' + product.id)}
                        onClick={() => dispatch(addBasketItemAsync({ productId: product.id , quantity:1}))}
                        size="small">Add to cart</LoadingButton>
                    <Button component={Link} to={`/catalog/${product.id}`} size="small">View</Button>
                </CardActions>
            </CardActions>
        </Card>
    )
}