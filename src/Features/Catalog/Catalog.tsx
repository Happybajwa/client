import { Box } from "@mui/material";
import { useEffect } from "react";
import LoadingComponent from "../../App/Layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../App/Store/ConfigureStore";
import { fetchProductsAsync, productSelectors } from "./CatalogSlice";
import ProductList from "./ProductList";

export default function Catalog() {

  const products = useAppSelector(productSelectors.selectAll);
  const { productsLoaded, status } = useAppSelector(state => state.catalog)
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!productsLoaded) dispatch(fetchProductsAsync());
  }, [productsLoaded, dispatch]);

  if (status.includes('pending')) return <LoadingComponent message="Loading Products" />
  return (
    <Box sx={{ marginTop: 2 }}>
      <ProductList products={products}></ProductList>
    </Box>
  );
}