import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button } from "@mui/material";
import { Component, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Agent from "../../App/Api/Agent";
import LoadingComponent from "../../App/Layout/LoadingComponent";
import { Order } from "../../App/Models/Order";


export default function Orders() {

    const [orders, setOrders] = useState<Order[] | null> (null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        Agent.Orders.list()
        .then(orders => setOrders(orders))
        .catch(err => console.log(err))
        .finally(() => setLoading(false))
    }, [])
    
  const navigate = useNavigate();

  const toOrderDetail=(id:number)=>{
  navigate('./OrderDetail',{state:{id}});
  }

    if(loading) return <LoadingComponent message="Loading Your Orders..."/>
    return(
        <TableContainer component={Paper} sx={{marginTop:2}}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Order Number</TableCell>
              <TableCell align="right">Total</TableCell>
              <TableCell align="right">Order Date</TableCell>
              <TableCell align="right">Order Status</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders?.map((order) => (
              <TableRow
                key={order.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {order.id}
                </TableCell>
                <TableCell align="right">${order.total.toFixed(2)}</TableCell>
                <TableCell align="right">{order.orderDate.split('T')[0]}</TableCell>
                <TableCell align="right">{order.orderStatus}</TableCell>
                <TableCell align="right">
                <Button component={Link} to={`/orderDetail/${order.id}`} size="small">View</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
}