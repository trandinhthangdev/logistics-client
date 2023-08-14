import logo from "./logo.svg";
import "./App.css";
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
import Page404 from "./pages/404";
import ModalLogin from "./components/ModalLogin";
import Login from "./pages/login";
import { mainRoutes } from "./routes";

function App() {
    const { user, userInfo, loading, isAdmin, isAuthModal, setIsAuthModal } =
        useContext(AppContext);
    const router = createBrowserRouter([
        ...mainRoutes
            .map((route, index) => {
                const {
                    component: ComponentRoute,
                    path,
                    isExact,
                    isClient,
                } = route;
                if (!isAdmin && route.isAdmin) {
                    return undefined;
                }
                if (route.isAdmin) {
                    if (isAdmin) {
                        return {
                            path: path,
                            element: (
                                <AppAdminLayout>
                                    <ComponentRoute />
                                </AppAdminLayout>
                            ),
                        };
                    } else {
                        return undefined;
                    }
                } else {
                    if (route.isClient ? !!user : true) {
                        return {
                            path: path,
                            element: (
                                <AppLayout>
                                    <ComponentRoute />
                                </AppLayout>
                            ),
                        };
                    }
                }
            })
            .filter((item) => !!item),
        {
            path: "*",
            element: isAdmin ? (
                <AppAdminLayout>
                    <Page404 />
                </AppAdminLayout>
            ) : (
                <AppLayout>
                    <Page404 />
                </AppLayout>
            ),
        },
    ]);
    const router2 = createBrowserRouter([
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
                            {
                                path: "/",
                                element: (
                                    <AppLayout>
                                        <Home />
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
                              <Login />
                          </AppLayout>
                      ),
                  },
                  {
                      path: "/",
                      element: (
                          <AppLayout>
                              <Home />
                          </AppLayout>
                      ),
                  },
              ]),
        {
            path: "*",
            element: isAdmin ? (
                <AppAdminLayout>
                    <Page404 />
                </AppAdminLayout>
            ) : (
                <AppLayout>
                    <Page404 />
                </AppLayout>
            ),
        },
    ]);
    if (user === undefined || userInfo === undefined) {
        return <></>;
    }
    return (
        <>
            <Toaster toastOptions={{ duration: 4000 }} />
            {loading && <LoadingBg />}
            <RouterProvider router={router} />
            {isAuthModal && (
                <ModalLogin
                    open={true}
                    onClose={() => {
                        setIsAuthModal(false);
                    }}
                />
            )}
        </>
    );
}

export default App;
