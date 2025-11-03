import { createBrowserRouter } from 'react-router';
import { lazy } from 'react';
import MainLayout from '../Components/Layout/MainLayout';
import Error from '../Pages/Error';

// Lazy load components
const Home = lazy(() => import('../Pages/Home'));
const MyBookings = lazy(() => import('../Pages/MyBookings'));
const Blogs = lazy(() => import('../Pages/Blogs'));
const DoctorDetails = lazy(() => import('../Pages/DoctorDetails'));

const router = createBrowserRouter([
    {
        path: '/',
        Component: MainLayout,
        children: [
            {
                path: '/',
                Component: Home
            },
            {
                path: '/doctor/:id',
                Component: DoctorDetails
            },
            {
                path: '/my-bookings',
                Component: MyBookings
            },
            {
                path: '/blogs',
                Component: Blogs
            }
        ]
    },
    {
        path: '*',
        Component: Error
    }
]);

export default router;