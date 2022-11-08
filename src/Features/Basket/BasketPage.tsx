import { Button, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../App/Store/ConfigureStore";
import BasketSummary from "./BasketSummary";
import BasketTable from "./BasketTable";

export default function BasketPage() {

  const { basket } = useAppSelector(state => state.basket);

  if(!basket) return <Typography variant="h3" textAlign="center" marginTop={3}>Your Basket is Empty</Typography>
  return (
    <>
      <BasketTable items={basket.items}/>
      <Grid container>
        <Grid item xs={6}/>
        <Grid item xs={6}>        
          <BasketSummary></BasketSummary>
            <Button component={Link}
            to='/checkoutPage'
            variant="contained"
            size='large'
            fullWidth
            sx={{ marginTop: 2 }}
          >Checkout</Button>
        </Grid>
      </Grid>
    </>
  )
};
