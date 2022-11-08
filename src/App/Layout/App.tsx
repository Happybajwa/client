import Catalog from "../../Features/Catalog/Catalog";
import { Container, createTheme, CssBaseline, Switch, ThemeProvider, Typography } from "@mui/material";
import Header from "./Header";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../../Features/Home/Home";
import AboutPage from "../../Features/About/About";
import ContactPage from "../../Features/Contact/Contact";
import ProductDetails from "../../Features/Catalog/ProductDetails";
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from "react-toastify";
import ServerError from "../Errors/ServerError";
import NotFound from "../Errors/NotFound";
import BasketPage from "../../Features/Basket/BasketPage";
import { getCookie } from "../Util/Util";
import Agent from "../Api/Agent";
import LoadingComponent from "./LoadingComponent";
import { useAppDispatch } from "../Store/ConfigureStore";
import { setBasket } from "../../Features/Basket/BasketSlice";
import Register from "../../Features/Account/Register";
import Login from "../../Features/Account/Login";
import { fetchCurrentUser } from "../../Features/Account/AccountSlice";
import { PrivateRoute } from "./PrivateRoute";
import CheckoutPage from "../../Features/Checkout/CheckoutPage";
import Orders from "../../Features/Orders/Orders";
import OrderDetail from "../../Features/Orders/OrderDetail";

function App() {

  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buyerId = getCookie('buyerId');
    dispatch(fetchCurrentUser());
    if (buyerId) {
      Agent.Basket.get()
        .then(basket => dispatch(setBasket(basket)))
        .catch(error => console.log(error))
        .finally(() => setLoading(false));
    } else {
      setLoading(false)
    }
  }, [dispatch])

  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? 'dark' : 'light';

  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === 'light' ? '#E5E4E2' : '#121212'
      }
    }
  })

  function handleThemeChange() {
    setDarkMode(!darkMode)
  }

  if (loading) return <LoadingComponent message="Initializing app..." />

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position='bottom-right' hideProgressBar theme="colored"></ToastContainer>
      <CssBaseline></CssBaseline>
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange}></Header>
      <Container>
        <Routes>
          <Route path='/Home' element={<HomePage />} />
          <Route path='/Catalog' element={<Catalog />} />
          <Route path='/Catalog/:id' element={<ProductDetails />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/contact' element={<ContactPage />} />
          <Route path='/server-error' element={<ServerError />} />
          <Route path='/basket' element={<BasketPage />} />
          <Route element={<PrivateRoute />}>
            <Route path='/CheckoutPage' element={<CheckoutPage/>} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path='/Order' element={<Orders/>} />
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/OrderDetail/:id'  element={<OrderDetail />}/>
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;
