import { useState } from "react";
import { pathToRegexp } from 'path-to-regexp';
import routes from "../../router";

const LayoutAuth = ({ children }) => {
    var child = children;
    var userInfo = {};
    var isLoggedStorage;
    try {
        userInfo = JSON.parse(localStorage.getItem('user'));
        isLoggedStorage = Boolean(localStorage.getItem('access_token') && localStorage.getItem('user'));
    } catch (error) { }

    const [userData, setUserData] = useState(userInfo);
    const [isLogged, setIsLogged] = useState(isLoggedStorage);

    const findMatchingRoute = (routes, currentPathname) => {
        for (const route of routes) {
            const regexRoute = pathToRegexp(route.route);

            if (regexRoute.test(currentPathname)) {
                return route;
            }
        }

        return null;
    }

    const matchingRoute = findMatchingRoute(routes, window.location.pathname);

    if (matchingRoute?.role) {
        if (matchingRoute.role === 'general') {

        } else if (matchingRoute.role === 'auth') {
            if (isLogged) {
                child = false;
                window.location.replace('/');
            }
        } else {
            if (!isLogged) {
                child = false;
                localStorage.clear();
                window.location.replace('/login')
            }

            if (typeof matchingRoute.role === 'string') {
                if (matchingRoute.role !== userData?.role) {
                    child = false;
                    localStorage.clear();
                    window.location.replace('/login');
                }
            } else if (typeof matchingRoute.role === 'object') {
                if (matchingRoute.role.includes(userData?.role)) {
                    child = false;
                    localStorage.clear();
                    window.location.replace('/login');
                }
            }
        }
    }

    return (
        <>
            {children}
        </>
    );
}

export default LayoutAuth;
