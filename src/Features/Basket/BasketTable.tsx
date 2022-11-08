import { Remove, Add, Delete } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Box } from "@mui/material";
import { BasketItem } from "../../App/Models/Basket";
import { useAppSelector, useAppDispatch } from "../../App/Store/ConfigureStore";
import { removeBasketItemAsync, addBasketItemAsync } from "./BasketSlice";


interface Props{
    items:BasketItem[];
    isBasket?:boolean;
}

export default function BasketTable({items, isBasket = true}: Props) {
    const {status} = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();
    return (
        <TableContainer component={Paper} sx={{ marginTop: 3 }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right">Subtotal</TableCell>
              {isBasket && 
              <TableCell align="right"></TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>      
            {items.map((item) => (
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
                {isBasket && 
                  <LoadingButton
                    loading={status === 'pendingRemoveItem' + item.productId + 'rem'}
                    onClick={() => dispatch(removeBasketItemAsync
                      ({ productId: item.productId, quantity: 1, name: 'rem' }))}
                    color="primary">
                    <Remove></Remove>
                  </LoadingButton>}
                  {item.quantity}
                  {isBasket && 
                  <LoadingButton
                    loading={status === 'pendingAddItem' + item.productId}
                    onClick={() => dispatch(addBasketItemAsync({ productId: item.productId, quantity: 1 }))} color="primary">
                    <Add></Add>
                  </LoadingButton>}
                </TableCell>
                <TableCell align="right">${(item.quantity * item.price).toFixed(2)}</TableCell>
                {isBasket && 
                <TableCell align="right">
                  <LoadingButton
                    loading={status.includes('pendingRemoveItem' + item.productId + 'del')}
                    onClick={() => dispatch(removeBasketItemAsync({ productId: item.productId, quantity: item.quantity, name: 'del' }))}
                    color="error">
                    <Delete></Delete>
                  </LoadingButton>
                </TableCell>}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
}