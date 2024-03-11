import Login from "./views/auth/Login";
import Register from "./views/auth/Register";

const routes = [
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
];

export default routes;