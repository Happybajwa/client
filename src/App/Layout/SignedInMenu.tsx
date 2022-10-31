import { Button, Menu, Fade, MenuItem } from "@mui/material";
import { useState } from "react";
import { signOut } from "../../Features/Account/AccountSlice";
import { clearBasket } from "../../Features/Basket/BasketSlice";
import { useAppDispatch, useAppSelector } from "../Store/ConfigureStore";

export default function SignedInMenu(){


    const dispatch= useAppDispatch();
    const {user} = useAppSelector(state => state.account)

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: any) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    return (
      <>
        <Button 
        color="inherit"
        sx={{typography:'h6'}}
        onClick={handleClick}>
          {user?.email}
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My Orders</MenuItem>
          <MenuItem onClick={() => {
            dispatch(signOut());
            dispatch(clearBasket())}}>Logout</MenuItem>
        </Menu>
      </>
    );
}