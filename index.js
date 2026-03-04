import React, { lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import App from "./App";
import RestaurantList  from "./src/component/Body";
import ErrorPage from "./src/pages/ErrorPage";
import Cart from "./src/component/Cart";

const RestaurantMenu = lazy(() => import('./src/component/RestaurantMenu'))
const AboutUs =lazy(()=> import('./src/component/About'))

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
                path: 'restaurants/:resId',
                element: <Suspense fallback={<h1>LOADING .....</h1>}><RestaurantMenu/></Suspense>
            },
            {
                path: 'about',
                element: <Suspense fallback={<h1>LOADING .....</h1>}><AboutUs/></Suspense>
            },
            {
                path: '/cart',
                element: <Cart />
            }
        ]
    }
    
])

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
 
root.render(<RouterProvider router={router}/>);
