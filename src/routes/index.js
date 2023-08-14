import AdminChat from "../pages/admin/chat";
import AdminHome from "../pages/admin/home";
import AdminLogin from "../pages/admin/login";
import AdminTrackingOrder from "../pages/admin/trackingOrder";
import DetailOrder from "../pages/detailOrder";
import Home from "../pages/home";
import Login from "../pages/login";
import NewOrder from "../pages/newOrder";
import Profile from "../pages/profile";
import * as links from "./links";
export const mainRoutes = [
    {
        component: Home,
        path: links.PATH_HOME,
        isExact: true,
    },
    {
        component: Login,
        path: links.PATH_LOGIN,
        isExact: true,
    },
    {
        component: NewOrder,
        path: links.PATH_NEW_ORDER,
        isExact: true,
    },
    {
        component: DetailOrder,
        path: links.PATH_DETAIL_ORDER,
        isExact: true,
    },
    {
        component: Profile,
        path: links.PATH_PROFILE,
        isExact: true,
        isClient: true,
    },
    {
        component: AdminHome,
        path: links.PATH_ADMIN,
        isExact: true,
        isAdmin: true,
    },
    {
        component: AdminLogin,
        path: links.PATH_ADMIN_LOGIN,
        isExact: true,
    },
    {
        component: AdminChat,
        path: links.PATH_ADMIN_CHAT,
        isExact: true,
        isAdmin: true,
    },
    {
        component: AdminTrackingOrder,
        path: links.PATH_ADMIN_TRACKING,
        isExact: true,
        isAdmin: true,
    },
];
