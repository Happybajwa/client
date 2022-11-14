import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button, Typography, Box, Avatar, Grid } from "@mui/material";
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom";
import Agent from "../../App/Api/Agent"
import LoadingComponent from "../../App/Layout/LoadingComponent";
import { Order } from "../../App/Models/Order";



export default function OrderDetail() {

    const [order, setOrder] = useState<Order | null>();
    const [loading, setLoading] = useState(true);
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        Agent.Orders.fetch(Number(id))
            .then(order => setOrder(order))
            .catch(err => console.log(err))
            .finally(() => setLoading(false))
    }, [id])
    
    return (
        <>
        
            <Box display='flex' justifyContent='space-between'>
                <Typography sx={{ p: 2 }} gutterBottom variant='h4'>#Order {order?.id} - {order?.orderStatus}</Typography>
                <Button sx={{ m: 2 }} size='large' variant="contained"
                    component={Link} to={'/Order'}
                >Back to Orders</Button>
            </Box>
            <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Product Name</TableCell>
                            <TableCell align="right">Image</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="right">Quantity</TableCell>
                            <TableCell align="right">Subtotal</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {order?.orderItemsDto.map((order) => (
                            <TableRow
                                key={order.productId}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {order.productName}
                                </TableCell>
                                <TableCell align="right">
                                    <img src={order.pictureUrl} style={{ height: 50, marginRight: 20 }}></img>
                                </TableCell>
                                <TableCell align="right">${order.price.toFixed(2)}</TableCell>
                                <TableCell align="right">{order.quantity}</TableCell>
                                <TableCell align="right">${(order.price * order.quantity).toFixed(2)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}