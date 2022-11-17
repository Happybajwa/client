import { Box, Button, Paper, Step, StepLabel, Stepper, Typography } from "@mui/material";
import { useState } from "react";
import PaymentForm from "./PaymentForm";
import AddressForm from "./AddressForm";
import Review from "./Review";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { validationFunction } from "./CheckoutValidation";
import Agent from "../../App/Api/Agent";
import { useAppDispatch, useAppSelector } from "../../App/Store/ConfigureStore";
import { LoadingButton } from "@mui/lab";
import { clearBasket } from "../Basket/BasketSlice";
import { CardNumberElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Link } from "react-router-dom";
const steps = ['Shipping address', 'Review your order', 'Payment details'];

function getStepContent(step: number) {
    switch (step) {
        case 0:
            return <AddressForm />;
        case 1:
            return <Review />;
        case 2:
            return <PaymentForm />;
        default:
            throw new Error('Unknown step');
    }
}


export default function CheckoutPage() {
    const [activeStep, setActiveStep] = useState(0);
    const [orderNumber, setOrderNumber] = useState(0);
    const { basket } = useAppSelector(state => state.basket);
    const [loading, setLoading] = useState(false);
    const dispatch = useAppDispatch();
    const [paymentMessage, setPaymentMessage] = useState('');
    const [paymentSucceeded, setPaymentSucceeded] = useState(false);
    const stripe = useStripe();
    const elements = useElements();

    const currentPageValidation = validationFunction[activeStep];
    const methods = useForm({
        mode: 'all',
        resolver: yupResolver(currentPageValidation)
    });

    async function submitOrder(data: FieldValues) {
        setLoading(true);
        const { nameOnCard, saveAddress, ...shippingAddress } = data;
        if (!stripe || !elements) return;//stripe is not ready

        try {
            const cardElement = elements.getElement(CardNumberElement);
            const paymentResult = await stripe.confirmCardPayment(basket?.clientSecret!, {
                payment_method: {
                    card: cardElement!,
                    billing_details: {
                        name: nameOnCard
                    }
                }
            });
            if (paymentResult.paymentIntent?.status === 'succeeded') {
                const orderNumber = await Agent.Orders.create({ saveAddress, shippingAddress })
                setOrderNumber(orderNumber);
                setPaymentSucceeded(true);
                setPaymentMessage('Thank you -  We have received your payment');
                setActiveStep(activeStep + 1);
                dispatch(clearBasket());
                setLoading(false);
            } else {
                setPaymentMessage(paymentResult.error?.message!);
                setPaymentSucceeded(false);
                setLoading(false);
                setActiveStep(activeStep + 1);
            }
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    }

    const handleNext = async (data: FieldValues) => {
        if (activeStep === steps.length - 1) {
            await submitOrder(data);
        }
        else {
            setActiveStep(activeStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    return (
        <FormProvider {...methods}>
            <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                <Typography component="h1" variant="h4" align="center">
                    Checkout
                </Typography>
                <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <>
                    {activeStep === steps.length ? (
                        <>
                            <Typography variant="h5" gutterBottom>
                                {paymentMessage}
                            </Typography>
                            {paymentSucceeded ? (
                                <Typography variant="subtitle1">
                                    Your order number is #{orderNumber}. We have not emailed your order
                                    confirmation, and will not send you an update when your order has
                                    shipped as this is a Student Project!
                                    <br></br>
                                    To Check Stripe Payments. Click Below
                                    <br></br>
                                    <a href={'https://dashboard.stripe.com/test/payments'} target={'_blank'}>Click here</a>
                                </Typography>
                                
                            ):(
                                <Button variant="contained" onClick={handleBack}>
                                    Go Back and Try Again
                                </Button>
                            )}
                        </>
                    ) : (
                        <form onSubmit={methods.handleSubmit(handleNext)}>
                            {getStepContent(activeStep)}
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                {activeStep !== 0 && (
                                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                                        Back
                                    </Button>
                                )}
                                <LoadingButton
                                    variant="contained"
                                    type="submit"
                                    sx={{ mt: 3, ml: 1 }}
                                >
                                    {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                                </LoadingButton>
                            </Box>
                        </form>
                    )}
                </>
            </Paper>
        </FormProvider>
    );
}

