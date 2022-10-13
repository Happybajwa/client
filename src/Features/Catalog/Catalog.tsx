import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, Pagination, Paper, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
import LoadingComponent from "../../App/Layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../App/Store/ConfigureStore";
import { fetchFilterAsync, fetchProductsAsync, productSelectors } from "./CatalogSlice";
import ProductList from "./ProductList";

const sortOptions = [
  { value: 'name', label: 'Alphabetical' },
  { value: 'priceDesc', label: 'Price - High to Low' },
  { value: 'Price', label: 'Price - Low to High' }
]

export default function Catalog() {

  const products = useAppSelector(productSelectors.selectAll);
  const { productsLoaded, status, filtersLoaded, gender, size } = useAppSelector(state => state.catalog)
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!productsLoaded) dispatch(fetchProductsAsync());
  }, [productsLoaded, dispatch]);

  useEffect(() => {
    if (!filtersLoaded) dispatch(fetchFilterAsync());
  }, [dispatch, filtersLoaded]);

  if (status.includes('pending')) return <LoadingComponent message="Loading Products" />
  return (
    <Grid container spacing={4} sx={{ mt: 1 }}>
      <Grid item xs={3} sx={{ mt: 9, ml: -10 }}>
        <Paper sx={{ mb: 2 }}>
          <TextField
            label='Search Products'
            variant="outlined"
            fullWidth
          />
        </Paper>
        <Paper sx={{ mb: 2, p: 2 }}>
          <FormControl>
            <RadioGroup>
              {sortOptions.map(({ value, label }) => (
                <FormControlLabel value={value} control={<Radio />} label={label} key={value} />
              ))}
            </RadioGroup>
          </FormControl>
        </Paper>
        <Paper sx={{ mb: 2, p: 2 }}>
          <FormGroup>
            {gender.map(gender => (
              <FormControlLabel control={<Checkbox />} label={gender} key={gender} />
            ))}
          </FormGroup>
        </Paper>
        <Paper sx={{ mb: 2, p: 2 }}>
          <FormGroup>
            {size.map(size => (
              <FormControlLabel control={<Checkbox />} label={size} key={size} />
            ))}
          </FormGroup>
        </Paper>
      </Grid>
      <Grid item xs={9}>
        <ProductList products={products} />
      </Grid>
      <Grid item xs={3}/>
      <Grid item xs={9}>
        <Box display='flex' sx={{mt:10 ,ml:-10 ,mr:8}} justifyContent='space-between' alignItems='center'>
          <Typography>
            Displaying 1-6 of 20 Items
          </Typography>
          <Pagination count={6} color="primary" size="large"></Pagination>
        </Box>
      </Grid>
    </Grid>
  );
}