import logo from "./logo.svg";
import "./App.css";
import PhoneOtpBox from "./components/PhoneOtpBox";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "./contexts/AppContext";
import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Link,
} from "react-router-dom";
import Home from "./pages/home";
import NewOrder from "./pages/newOrder";
const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/new-order",
        element: <NewOrder />,
    },
]);
function App() {
    // const { user, loadingUser } = useContext(AppContext);

    return <RouterProvider router={router} />;
    // if (loadingUser) {
    //     return <></>;
    // }
    // if (user) {
    //     return <div className="text-black">login</div>;
    // }
    // return <PhoneOtpBox />;
}

export default App;
