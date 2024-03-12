// Views
import Login from "./views/auth/Login";
import Register from "./views/auth/Register";
import AdminDash from "./views/dashboards/admin";
import ClientDash from "./views/dashboards/client";

const routes = [
    // Auth --------------------------------------------
    {
        route: '/login',
        // role: 'auth',
        component: <Login />
    },
    {
        route: '/register',
        // role: 'auth',
        component: <Register />
    },
    // Admin -------------------------------------------
    {
        route: '/admin',
        // role: 'admin',
        component: <AdminDash />
    },
    // Client ------------------------------------------
    {
        route: '/client',
        // role: 'client',
        component: <ClientDash />
    },
];

export default routes;