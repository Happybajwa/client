import { Add, Delete, Remove } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { isTemplateExpression } from "typescript";
import Agent from "../../App/Api/Agent";
import { useStoreContext } from "../../App/Context/StoreContext";
import BasketSummary from "./BasketSummary";


export default function BasketPage() {

  const { basket, setBasket, removeItem } = useStoreContext()
  const [status, setStatus] = useState({
    loading: false,
    name: ''
  });

  function handleAddItem(productId: number, name: string) {
    setStatus({ loading: true, name });
    Agent.Basket.addItem(productId)
      .then(basket => setBasket(basket))
      .catch(error => console.log(error))
      .finally(() => setStatus({ loading: false, name: '' }))
  }

  function handleRemoveItem(productId: number, quantity = 1, name: string) {
    setStatus({ loading: true, name });
    Agent.Basket.removeItem(productId, quantity)
      .then(basket => removeItem(productId, quantity))
      .catch(error => console.log(error))
      .finally(() => setStatus({ loading: false, name: '' }))
  }
  if (!basket) return <Typography variant="h3" textAlign="center" marginTop={3}>Your Basket is Empty</Typography>

  return (
    <>
    <TableContainer component={Paper} sx={{ marginTop: 3 }}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="right">Subtotal</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {basket.items.map((item) => (
            <TableRow
              key={item.productId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                <Box display='flex' alignItems='center'>
                  <img src={item.pictureUrl} alt={item.name} style={{ height: 50, marginRight: 20 }}></img>
                  <span>{item.name}</span>
                </Box>
              </TableCell>
              <TableCell align="right">${item.price.toFixed(2)}</TableCell>
              <TableCell align="center">
                <LoadingButton 
                  loading={status.loading && status.name === 'rem' + item.productId}
                  onClick={() => handleRemoveItem(item.productId, 1, 'rem' + item.productId)} 
                  color="primary">
                  <Remove></Remove>
                </LoadingButton>
                {item.quantity}
                <LoadingButton 
                  loading={status.loading && status.name === 'add' + item.productId}
                  onClick={() => handleAddItem(item.productId, 'add' + item.productId)} color="primary">
                  <Add></Add>
                </LoadingButton>
              </TableCell>
              <TableCell align="right">${(item.quantity * item.price).toFixed(2)}</TableCell>
              <TableCell align="right">
                <LoadingButton 
                  loading={status.loading && status.name === 'del' + item.productId}
                  onClick={() => handleRemoveItem(item.productId, item.quantity, 'del' + item.productId)}
                  color="error">
                  <Delete></Delete>
                </LoadingButton>
              </TableCell>
            </TableRow>
          ))}          
        </TableBody>
      </Table>
    </TableContainer>
    <Grid container>
      <Grid item xs={6}/>
      <Grid item xs={6}>
            <BasketSummary></BasketSummary>
            <Button component={Link}
             to='/checkoutPage'
             variant="contained"
             size='large'
             fullWidth
             sx={{marginTop:2}}
             >Checkout</Button>
      </Grid>
    </Grid>
    </>
  )
};
