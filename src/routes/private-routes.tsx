import { RouteType } from "./auth-routes";

//pages
import Dashboard from "../pages/users-dashboard/dashboard";
import BooksPage from "../pages/users-dashboard/books";
import Account from "../pages/users-dashboard/account";
import BookRequestPage from "../pages/users-dashboard/book-request-page";
// import NotFoundPage from "../pages/Not-found";

const privateRoutes: RouteType[] = [
    {
        path: '/users-dashboard',
        component:<Dashboard/>
    },
    
    {
        path: '/books',
        component:<BooksPage />
    },
    {
        path: '/book-requests',
        component:<BookRequestPage />
    },
    {
        path: '/users',
        component:<BooksPage />
    },
    {
        path: '/account',
        component:<Account />
    },
    // {
    //     path: '*',
    //     component: <NotFoundPage/>
    // },
    
];

export default privateRoutes;