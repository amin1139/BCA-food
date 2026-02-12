import React, { lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import App from "./App";
import RestaurantList  from "./src/component/Body";
// import RestaurantMenu from "./src/component/RestaurantMenu";
// import AboutUs from "./src/component/About";
import ErrorPage from "./src/pages/ErrorPage";

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
            }
        ]
    }
])

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
 
root.render(<RouterProvider router={router}/>);
