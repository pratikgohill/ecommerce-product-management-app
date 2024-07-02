import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Button,
} from "@mui/material";
import { Category } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import Home from "./Home";
import ComboList from "../components/ComboList";
import ProductForm from "./ProductForm";
import ComboForm from "./ComboForm";
import Cart from "../components/Cart";

const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Category sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            eCommerce-App
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem>
                <Link component={Home} to="/">
                  Homed
                </Link>
              </MenuItem>
              <MenuItem>
                <Link component={ComboList} to="/combos">
                  Combo Products
                </Link>
              </MenuItem>
              <MenuItem>
                <Link component={ProductForm} to="/create-product">
                  Add Product
                </Link>
              </MenuItem>
              <MenuItem>
                <Link component={ComboForm} to="/create-combo">
                  Add Combo
                </Link>
              </MenuItem>
              <MenuItem>
                <Link component={Cart} to="/cart">
                  Cart
                </Link>
              </MenuItem>
            </Menu>
          </Box>
          <Category sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            eCommerce-App
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button sx={{ my: 2, color: "white", display: "block" }}>
              <Link component={Home} to="/">
                Home
              </Link>
            </Button>
            <Button sx={{ my: 2, color: "white", display: "block" }}>
              <Link component={ComboList} to="/combos">
                Combo Products
              </Link>
            </Button>

            <Button sx={{ my: 2, color: "white", display: "block" }}>
              <Link component={ProductForm} to="/create-product">
                Add Product
              </Link>
            </Button>

            <Button sx={{ my: 2, color: "white", display: "block" }}>
              <Link component={ComboForm} to="/create-combo">
                Add Combo
              </Link>
            </Button>

            <Button sx={{ my: 2, color: "white", display: "block" }}>
              <Link component={Cart} to="/cart"></Link>
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
