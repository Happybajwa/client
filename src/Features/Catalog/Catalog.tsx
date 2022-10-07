import { useState, useEffect } from "react";
import Agent from "../../App/Api/Agent";
import LoadingComponent from "../../App/Layout/LoadingComponent";
import { Product } from "../../App/Models/Product";
import ProductList from "./ProductList";

export default function Catalog() {

    const [products, setProducts] = useState<Product[]>([]);
    const [Loading, setLoading] = useState(true);



    useEffect(() => {
      Agent.Catalog.list()
      .then(products => setProducts(products))
      .catch(error => console.log(error))
      .finally(() => setLoading(false))
    }, []);

    if(Loading) return <LoadingComponent message="Loading Products"/>
    return (
        <ProductList products={products}></ProductList>
    );
}