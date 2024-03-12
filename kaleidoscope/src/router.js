// Views
import Login from "./views/auth/Login";
import Register from "./views/auth/Register";
import AdminDash from "./views/dashboards/admin";
import DeleteProduct from "./views/dashboards/admin/DeleteProduct";
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
        route: '/admin/products',
        // role: 'admin',
        component: <AdminDash />
    },
    {
        route: '/admin/delete',
        // role: 'admin',
        component: <DeleteProduct />
    },
    // Client ------------------------------------------
    {
        route: '/client',
        // role: 'client',
        component: <ClientDash />
    },
];

export default routes;