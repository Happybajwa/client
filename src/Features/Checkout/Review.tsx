import { Grid, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../App/Store/ConfigureStore';
import BasketSummary from '../Basket/BasketSummary';
import BasketTable from '../Basket/BasketTable';


export default function Review() {
  
  const { basket } = useAppSelector(state => state.basket);
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      {basket &&
      <BasketTable items={basket.items} isBasket={false}/>}
      <Grid container>
        <Grid item xs={6}/>
        <Grid item xs={6}>        
          <BasketSummary></BasketSummary>
        </Grid>
      </Grid>
    </>
  );
}