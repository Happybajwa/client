import { TableContainer, Paper, Table, TableBody, TableRow, TableCell, Typography, ListItem } from "@mui/material";
import { useStoreContext } from "../../App/Context/StoreContext";
import { Basket } from "../../App/Models/Basket";


export default function BasketSummary() {

    const {basket} = useStoreContext();
    const subtotal = basket?.items.reduce((sum, item) => sum + (item.quantity*item.price), 0) ?? 0;;
    const deliveryFee = subtotal > 100 ? 0 : 15;

    return (
        <>
            <TableContainer component={Paper} variant={'outlined'}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={2}>Subtotal</TableCell>
                            <TableCell align="right">${subtotal.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Delivery fee*</TableCell>
                            <TableCell align="right">${deliveryFee.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Total</TableCell>
                            <TableCell align="right">${(subtotal + deliveryFee).toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <span style={{fontStyle: 'italic'}}>*Orders over $100 qualify for free delivery</span>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}