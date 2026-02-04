import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import App from "./App";
import RestaurantList  from "./src/component/Body";
import About from "./src/pages/About";
import ErrorPage from "./src/pages/ErrorPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: '/',
                element: <RestaurantList/>
            },
            {
                path: 'restaurants',
                element: <RestaurantList/>
            },
            {
                path: 'about',
                element: <About />
            }
        ]
    }
])

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(<RouterProvider router={router}/>);
