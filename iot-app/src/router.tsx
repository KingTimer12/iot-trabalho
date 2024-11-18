import { Default } from '@/layout';
import React from 'react';
import { Navigate, createBrowserRouter } from 'react-router-dom';

const Home = React.lazy(() => import('@/pages/home'));

const routes = createBrowserRouter([
  {
    path: '',
    element: <Default />,
    children: [
      { index: true, element: <Navigate to="home" /> },
      { path: 'home', element: <Home /> },
    ],
  },
]);

export default routes;
