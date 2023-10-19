import { createBrowserRouter, RouteObject } from "react-router-dom";
import { Router } from "@remix-run/router";

import DefaultLayout from "../layouts/DefaultLayout";

import DashboardPage from "../pages/DashboardPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/Register";
import Cart from "../pages/Cart/Cart";
import HistoryOrders from "../pages/orders/HistoryOrders";
import Contacts from "../pages/contacts/Contacts";
import ProductsAll from "../pages/products/ProductsAll";
const routes: RouteObject[] = [
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/register",
    Component: RegisterPage,
  },
  {
    path: "/carts",
    Component: Cart,
  },
  {
    path: "/contact",
    Component: Contacts,
  },
  {
    path: "/orders",
    Component: HistoryOrders,
  },
  {
    path: "/products",
    Component: ProductsAll,
  },
  {
    id: "root",
    path: "/",
    Component: DefaultLayout,
    children: [
      {
        index: true,
        Component: DashboardPage,
      },
    ],
  },
];

const router: Router = createBrowserRouter(routes);

export default router;
