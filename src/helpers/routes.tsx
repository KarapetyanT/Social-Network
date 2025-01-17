import { createBrowserRouter } from "react-router-dom";
import { Login } from "../pages/login";
import { Signup } from "../pages/signup";
import { Layout } from "../pages/auth/layout";
import { Profile } from "../pages/auth/profile";
import { Settings } from "../pages/auth/settings";
import { Account } from "../pages/auth/account";
import { Requests} from "../pages/auth/profile/requests";
import { Followings } from "../pages/auth/profile/src/followings";
import { Followers } from "../pages/auth/profile/src/followers";



export const routes = createBrowserRouter([
    { path: '', element: <Login /> },
    { path: 'signup', element: <Signup /> },
    {
        path: 'profile',
        element: <Layout />,
        children: [
            { path: '', element: <Profile /> },
            { path: 'settings', element: <Settings /> },
            {path: ':id', element: <Account />},
            {path: 'requests', element: <Requests />},
            {path: 'followers', element: <Followers />},
            {path: 'followings', element: <Followings />}
        ]
    }
])