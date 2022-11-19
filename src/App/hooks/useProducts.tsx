import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../Store/ConfigureStore";
import { productSelectors, fetchProductsAsync, fetchFilterAsync } from "../../Features/Catalog/CatalogSlice";

export default function useProducts(){
    const products = useAppSelector(productSelectors.selectAll);
    const { productsLoaded, filtersLoaded, gender, size, pageData } = useAppSelector(state => state.catalog)
    const dispatch = useAppDispatch();
  
    useEffect(() => {
      if (!productsLoaded) dispatch(fetchProductsAsync());
    }, [productsLoaded, dispatch]);
  
    useEffect(() => {
      if (!filtersLoaded) dispatch(fetchFilterAsync());
    }, [dispatch, filtersLoaded]);
    
  return {
    products,
    productsLoaded,
    filtersLoaded,
    gender,
    size,
    pageData
  }
}