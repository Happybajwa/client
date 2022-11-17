import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import Agent from "../../App/Api/Agent";
import LoadingComponent from "../../App/Layout/LoadingComponent";
import { useAppDispatch } from "../../App/Store/ConfigureStore";
import { setBasket } from "../Basket/BasketSlice";
import CheckoutPage from "./CheckoutPage";

const stripePromise = loadStripe('pk_test_51M54W9GKSSsYfZ5pFX3byL4MPZfRv2e7PJBPcdgMBBUO2Tbk2zeWLxg662WvsLwIc8QOexSiWXxrGnsnCuV4wBhz00uvLDHUkX');

export default function CheckoutWrapper() {

    const dispatch = useAppDispatch();
    const[loading, setLoading] = useState(true);

    useEffect(() => {
        Agent.Payment.createPaymentIntent()
        .then(basket => dispatch(setBasket(basket)))
        .catch(err => console.log(err))
        .finally(() => setLoading(false))
    }, [dispatch]);

    if(loading) return <LoadingComponent message = 'Loading Checkout...'/>

    return (
        <Elements stripe={stripePromise}>
            <CheckoutPage />
        </Elements>
    )
}