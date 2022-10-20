import { Margin, ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Box, colors, IconButton, List, ListItem, makeStyles, Switch, Toolbar, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../Store/ConfigureStore";



interface Props {
    darkMode: boolean;
    handleThemeChange: () => void;
}
const midLinks = [
    { title: 'catalog', path: '/catalog' },
    { title: 'about', path: '/about' },
    { title: 'contact', path: '/contact' }
]
const rightLinks = [
    { title: 'register', path: '/register' },
    { title: 'login', path: '/login' }
]

const navStyle = {
    color:'White',
    textDecoration: 'none',
    typography: 'h6',
    '&:hover': {
        color: '#FBDA43'
    },
    '&.active': {
        color: '#FBDA43'
    }
}

export default function Header({ darkMode, handleThemeChange }: Props) {

    const {basket} = useAppSelector(state => state.basket);
    
    const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
            <Toolbar sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <Box
                    component="img"
                    sx={{
                        height: 70,
                        marginRight:-23
                    }}
                    alt="cool-Collection logo"
                    src="../cool.png"
                ></Box>
                <Box sx={{ml:2}}>
                    <Typography variant="h6" component={NavLink}
                        to='/home'
                        end
                        sx={navStyle}>
                        COOL COLLECTIONS
                    </Typography>
                    <Switch checked={darkMode} onChange={handleThemeChange} />
                </Box>

                <List sx={{ display: 'flex'}}>
                    {midLinks.map(({ title, path }) => (
                        <ListItem component={NavLink}
                            to={path}
                            key={path}
                            sx={navStyle}>
                            {title.toUpperCase()}
                        </ListItem>
                    ))}
                </List>
                <Box display='flex' alignItems='center' >
                    <IconButton component={Link} to={`/basket`} size="medium" sx={navStyle}>
                        <Badge badgeContent={itemCount} color='secondary'>
                            <ShoppingCart></ShoppingCart>
                        </Badge>
                    </IconButton>
                    <List sx={{ display: 'flex', color:'#2676CE'}}>
                        {rightLinks.map(({ title, path }) => (
                            <ListItem component={NavLink}
                                to={path}
                                key={path}
                                sx={navStyle}>
                                {title.toUpperCase()}
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Toolbar>
            </Container>
        </AppBar>
    )
}