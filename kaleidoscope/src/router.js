// Views
import Login from "./views/auth/Login";
import Register from "./views/auth/Register";
import AdminDash from "./views/dashboards/admin";
import DeleteProduct from "./views/dashboards/admin/DeleteProduct";
import UpdateProduct from "./views/dashboards/admin/UpdateProduct";
import ClientDash from "./views/dashboards/client";

// Routes
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
    {
        route: '/admin/update',
        // role: 'admin',
        component: <UpdateProduct />
    },
    // Client ------------------------------------------
    {
        route: '/client',
        // role: 'client',
        component: <ClientDash />
    },
];

export default routes;