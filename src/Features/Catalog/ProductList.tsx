import { Avatar, Grid, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { Product } from "../../App/Models/Product";
import { useAppSelector } from "../../App/Store/ConfigureStore";
import ProductsCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";

interface Props {
    products: Product[];
}

export default function ProductList({ products }: Props) {
    const { productsLoaded } = useAppSelector(state => state.catalog);
    return (
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {products.map((product) => {
                return (
                    <Grid item xs={4} sm={4} md={4} sx={{mt:2}} key={product.id}>
                        {!productsLoaded ? (<ProductCardSkeleton />) : (
                            <ProductsCard product={product}></ProductsCard>
                        )}

                    </Grid>
                );
            })}
        </Grid>
    )
}