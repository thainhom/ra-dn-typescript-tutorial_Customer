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
    id: "root",
    path: "/",
    Component: DefaultLayout,
    children: [
      {
        index: true,
        Component: DashboardPage,
      },
      {
        path: "/contact",
        Component: Contacts,
      },
      {
        path: "/cart",
        Component: Cart,
      },

      {
        path: "/orders",
        Component: HistoryOrders,
      },
      {
        path: "/products",
        Component: ProductsAll,
      },
    ],
  },
];

const router: Router = createBrowserRouter(routes);

export default router;
