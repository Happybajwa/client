import Catalog from "../../Features/Catalog/Catalog";
import { Container, createTheme, CssBaseline, Switch, ThemeProvider, Typography } from "@mui/material";
import Header from "./Header";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../../Features/Home/Home";
import AboutPage from "../../Features/About/About";
import ContactPage from "../../Features/Contact/Contact";
import ProductDetails from "../../Features/Catalog/ProductDetails";
import  'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from "react-toastify";
import ServerError from "../Errors/ServerError";
import NotFound from "../Errors/NotFound";
import BasketPage from "../../Features/Basket/BasketPage";
import { useStoreContext } from "../Context/StoreContext";
import { getCookie } from "../Util/Util";
import Agent from "../Api/Agent";
import LoadingComponent from "./LoadingComponent";
import CheckoutPage from "../../Features/Checkout/CheckoutPage";

function App() {

  const{setBasket} = useStoreContext();
  const[loading, setLoading] = useState(true);

  useEffect(() => {
    const buyerId = getCookie('buyerId')
    if(buyerId) {
      Agent.Basket.get()
        .then(basket => setBasket(basket))
        .catch(error => console.log(error))
        .finally(() => setLoading(false));
    }else {
      setLoading(false)
    }
  },[setBasket])

  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? 'dark' : 'light';

  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === 'light' ? '#eaeaea' : '#121212'
      }
    }
  })

  function handleThemeChange() {
    setDarkMode(!darkMode)
  }

  if(loading) return <LoadingComponent message="Initializing app..."/>

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position='bottom-right' hideProgressBar theme="colored"></ToastContainer>
      <CssBaseline></CssBaseline>
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange}></Header>
      <Container>
        <Routes>
            <Route path='/Home' element={<HomePage/>} />
            <Route path='/Catalog' element={<Catalog/>} />
            <Route path='/Catalog/:id' element={<ProductDetails />} />
            <Route path='/about' element={<AboutPage />} />
            <Route path='/contact' element={<ContactPage />} />
            <Route path='/server-error' element={<ServerError/>} />
            <Route path='/basket' element={<BasketPage/>} />
            <Route path='/checkoutPage' element={<CheckoutPage/>} />
            <Route path='*' element={<NotFound/>} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;
