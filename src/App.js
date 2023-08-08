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
import AppLayout from "./components/AppLayout";
import DetailOrder from "./pages/detailOrder";
import AppAdminLayout from "./components/AppAdminLayout";
import AdminLogin from "./pages/admin/login";
import AdminHome from "./pages/admin/home";

function App() {
    const { user, loadingUser } = useContext(AppContext);
    const router = createBrowserRouter([
        {
            path: "/",
            element: <AppLayout>
                <Home />
            </AppLayout>,
        },
        {
            path: "/new-order",
            element: <AppLayout>
                <NewOrder />
            </AppLayout>,
        },
        {
            path: "/detail-order/:orderNumber",
            element: <AppLayout>
                <DetailOrder />
            </AppLayout>,
        },
        ...(user ? [] : [{
            path: "/admin/login",
            element: <AppAdminLayout>
                <AdminLogin />
            </AppAdminLayout>
        },{
            path: "/login",
            element: <AppLayout>
                <PhoneOtpBox />
            </AppLayout>,
        }]),
        {
            path: '/admin',
            element: <AppAdminLayout>
                <AdminHome />
            </AppAdminLayout>
        }
    ]);
    if (loadingUser) {
        return <></>
    }
    return  <RouterProvider router={router} />;
    // if (loadingUser) {
    //     return <></>;
    // }
    // if (user) {
    //     return <div className="text-black">login</div>;
    // }
    // return <PhoneOtpBox />;
}

export default App;
