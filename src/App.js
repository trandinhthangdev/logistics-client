import logo from "./logo.svg";
import "./App.css";
import PhoneOtpBox from "./components/PhoneOtpBox";
import React, { useContext, useEffect, useState } from "react";
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
import Profile from "./pages/profile";
import { Toaster } from "react-hot-toast";
import LoadingBg from "./components/LoadingBg";
import AdminChat from "./pages/admin/chat";
import AdminTrackingOrder from "./pages/admin/trackingOrder";

function App() {
    const { user, loadingUser, loading } = useContext(AppContext);
    const router = createBrowserRouter([
        {
            path: "/",
            element: (
                <AppLayout>
                    <Home />
                </AppLayout>
            ),
        },
        {
            path: "/new-order",
            element: (
                <AppLayout>
                    <NewOrder />
                </AppLayout>
            ),
        },
        {
            path: "/detail-order/:orderNumber",
            element: (
                <AppLayout>
                    <DetailOrder />
                </AppLayout>
            ),
        },
        ...(user
            ? [
                  ...(user.email
                      ? [
                            {
                                path: "/admin",
                                element: (
                                    <AppAdminLayout>
                                        <AdminHome />
                                    </AppAdminLayout>
                                ),
                            },
                            {
                                path: "/admin/chat",
                                element: (
                                    <AppAdminLayout>
                                        <AdminChat />
                                    </AppAdminLayout>
                                ),
                            },
                            {
                                path: "/admin/tracking/:orderNumber",
                                element: (
                                    <AppAdminLayout>
                                        <AdminTrackingOrder />
                                    </AppAdminLayout>
                                ),
                            },
                        ]
                      : [
                            {
                                path: "/profile",
                                element: (
                                    <AppLayout>
                                        <Profile />
                                    </AppLayout>
                                ),
                            },
                        ]),
              ]
            : [
                  {
                      path: "/admin/login",
                      element: (
                          <AppAdminLayout>
                              <AdminLogin />
                          </AppAdminLayout>
                      ),
                  },
                  {
                      path: "/login",
                      element: (
                          <AppLayout>
                              <PhoneOtpBox />
                          </AppLayout>
                      ),
                  },
              ]),
    ]);
    if (loadingUser) {
        return <></>;
    }
    return (
        <>
            <Toaster toastOptions={{ duration: 4000 }} />
            {loading && <LoadingBg />}
            <RouterProvider router={router} />
        </>
    );
    // if (loadingUser) {
    //     return <></>;
    // }
    // if (user) {
    //     return <div className="text-black">login</div>;
    // }
    // return <PhoneOtpBox />;
}

export default App;
