import { RouteType } from "./auth-routes";

//pages
import Dashboard from "../pages/users-dashboard/dashboard";
import BooksPage from "../pages/users-dashboard/books";
import Account from "../pages/users-dashboard/account";
import BookRequestPage from "../pages/users-dashboard/book-request-page";
import StaffPage from "../pages/users-dashboard/staff-page";
import StudentsPage from "../pages/users-dashboard/students-page";
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
        path: '/staff',
        component:<StaffPage />
    },
    {
        path: '/students',
        component:<StudentsPage />
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