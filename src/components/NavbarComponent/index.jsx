import React from "react";
import "./style.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import CreateBill from "../../features/CreateBill";
import Home from "../../features/Home";
import {
  Collapse,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  Button,
  NavLink,
} from "reactstrap";
import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { SiInvoiceninja } from "react-icons/si";
import CustomerManagement from "../../features/CustomerManagement";
import ProductManagement from "../../features/ProductManagement";
import InvoiceManagement from "../../features/InvoiceManagement";
import StoreInformation from "../../features/StoreInformation";

const NavbarComponent = () => {
  const [collapsed, setCollapsed] = useState(true);
  const toggleNavbar = () => setCollapsed(!collapsed);
  return (
    <>
      <Router>
        <Navbar>
          <NavbarBrand href="/" className="mr-auto">
            E-inv
            <SiInvoiceninja />
            ice
          </NavbarBrand>
          <Button
            outline
            color="white"
            onClick={toggleNavbar}
            className="mr-2 btn-light navbar-btn-menu"
          >
            <AiOutlineMenu />
          </Button>

          <Collapse isOpen={!collapsed} navbar>
            <Nav navbar>
              <NavItem>
                <Link to="/taodon" onClick={toggleNavbar}>
                  <NavLink>Tạo hóa đơn</NavLink>
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/quanlykhachhang" onClick={toggleNavbar}>
                  <NavLink>Quản lý khách hàng</NavLink>
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/quanlysanpham" onClick={toggleNavbar}>
                  <NavLink>Quản lý sản phẩm</NavLink>
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/quanlyhoadon" onClick={toggleNavbar}>
                  <NavLink>Quản lý hóa đơn</NavLink>
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/thongtincuahang" onClick={toggleNavbar}>
                  <NavLink>Thông tin cửa hàng</NavLink>
                </Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/taodon">
            <CreateBill />
          </Route>
          <Route exact path="/quanlykhachhang">
            <CustomerManagement />
          </Route>
          <Route exact path="/quanlysanpham">
            <ProductManagement />
          </Route>
          <Route exact path="/quanlyhoadon">
            <InvoiceManagement />
          </Route>
          <Route exact path="/thongtincuahang">
            <StoreInformation />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default NavbarComponent;
