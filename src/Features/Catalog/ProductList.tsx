import { Avatar, Grid, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { Product } from "../../App/Models/Product";
import ProductsCard from "./ProductCard";

interface Props {
    products: Product[];
}

export default function ProductList({ products }: Props) {
    return (
        <Grid container spacing={4}>
            {products.map((product) => {
                return (
                    <Grid item xs={3} key={product.id}>
                        <ProductsCard product={product}></ProductsCard>
                    </Grid>
                );
            })}
        </Grid>
    )
}