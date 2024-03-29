import { Grid, Paper } from "@mui/material";
import { useEffect } from "react";
import AppPagination from "../../App/Components/AppPagination";
import CheckBoxButton from "../../App/Components/CheckBoxButtons";
import RadioButtonGroup from "../../App/Components/RadioButtonGroup";
import LoadingComponent from "../../App/Layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../App/Store/ConfigureStore";
import { fetchFilterAsync, fetchProductsAsync, productSelectors, setPageNumber, setProductParams } from "./CatalogSlice";
import ProductList from "./ProductList";
import ProductSearch from "./ProductSearch";

const sortOptions = [
  { value: 'name', label: 'Alphabetical' },
  { value: 'priceDesc', label: 'Price - High to Low' },
  { value: 'Price', label: 'Price - Low to High' }
]

export default function Catalog() {

  const products = useAppSelector(productSelectors.selectAll);
  const { productsLoaded, filtersLoaded, gender, size, ProductParams, pageData } = useAppSelector(state => state.catalog)
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!productsLoaded) dispatch(fetchProductsAsync());
  }, [productsLoaded, dispatch]);

  useEffect(() => {
    if (!filtersLoaded) dispatch(fetchFilterAsync());
  }, [dispatch, filtersLoaded]);

  if (!filtersLoaded) return <LoadingComponent message="Loading Products" />
  return (
    <Grid container sx={{mt:-2}} display='flex' marginTop={10} justifyContent='space-between' spacing={{ xs: 2, md: 3 }}>
      <Grid item xs={3}>
        <Paper sx={{ mb: 2, mt:2}}>
          <ProductSearch></ProductSearch>
        </Paper>
        <Paper sx={{ mb: 2, p: 2}}>
          <RadioButtonGroup
            selectedValue={ProductParams.orderBy}
            options={sortOptions}
            onChange={(e) => dispatch(setProductParams({ orderBy: e.target.value }))}
          />
        </Paper>
        <Paper sx={{ mb: 2, p: 2 }}>
          <CheckBoxButton
            items={gender}
            checked={ProductParams.gender}
            onChange={(items: string[]) => dispatch(setProductParams({ gender: items }))}
          />
        </Paper>
        <Paper sx={{ mb: 2, p: 2 }}>
          <CheckBoxButton
            items={size}
            checked={ProductParams.size}
            onChange={(items: string[]) => dispatch(setProductParams({ size: items }))}
          />
        </Paper>
      </Grid>
      <Grid item xs={9}>
        <ProductList products={products} />
      </Grid>
      <Grid item xs={3} />
      <Grid item xs={9} sx={{ mb: 1 }}>
        {pageData &&
          <AppPagination
            pageData={pageData}
            onPageChange={(page: number) => dispatch(setPageNumber({ pageNumber: page }))}
          />}
      </Grid>
    </Grid>
  );
}