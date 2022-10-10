import { LoadingButton } from "@mui/lab";
import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Agent from "../../App/Api/Agent";
import NotFound from "../../App/Errors/NotFound";
import LoadingComponent from "../../App/Layout/LoadingComponent";
import { Product } from "../../App/Models/Product";
import { useAppDispatch, useAppSelector } from "../../App/Store/ConfigureStore";
import { addBasketItemAsync, setBasket } from "../Basket/BasketSlice";




export default function ProductDetails() {

    const { id } = useParams<{ id: string}>();
    const {basket, status} = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
       Agent.Catalog.details(Number(id))
       .then(response => setProduct(response))
       .catch(error => console.log(error))
       .finally(() => setLoading(false))
    }, [id])

    if (loading) return <LoadingComponent message='Loading Product'/>
    if (!product) return <NotFound/>

    return (
        <Grid container spacing={6}>
            <Grid item xs={6}>
                <img src={product.pictureUrl} alt={product.name} style={{ width: '100%' }} />
            </Grid>
            <Grid item xs={6}>
                <Typography variant='h3'>{product.name}</Typography>
                <Divider sx={{ mb: 2 }} />
                <Typography variant='h4'>${product.price.toFixed(2)}</Typography>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>{product.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Description</TableCell>
                                <TableCell>{product.description}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Size</TableCell>
                                <TableCell>{product.size}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Gender</TableCell>
                                <TableCell>{product.gender}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Quantity in Stock</TableCell>
                                <TableCell>{product.quantityInStock}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Grid container spacing={2} marginTop={2}>
                <Grid item xs={6}>
                    <Link to='/catalog' style={{textDecoration:'none'}}>
                    <LoadingButton sx={{height:'55px'}}
                            color='primary'
                            size='large'
                            variant="contained"
                            fullWidth>Go Back</LoadingButton>
                    </Link>                     
                    </Grid>
                    <Grid item xs={6}>
                            <LoadingButton sx={{height:'55px'}}
                            color='primary'
                            size='large'
                            variant="contained"
                            fullWidth 
                            loading={status.includes('pendingAddItem'+product.id)}
                            onClick={() => dispatch(addBasketItemAsync({productId:product.id}))} >Add to Cart</LoadingButton>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}