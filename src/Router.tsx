import React from 'react';
import { RouteObject, useRoutes, Navigate } from 'react-router-dom';
import { lazyLoadRoutes } from './utils/lazy-load-route.helper.tsx';

const public_routes: RouteObject[] = [
  {
    path: '/',
    element: lazyLoadRoutes(() => import('layouts/main/MainLayout.tsx')),
    children: [
      {
        path: '',
        element: lazyLoadRoutes(() => import('pages/main/MainPage/MainPage.tsx')),
      },
      {
        path: '*',
        element: <Navigate to={`/`} />,
      },
    ],
  },
];

const getRoutes = () => {
  return [...public_routes];
};

export const Router: React.FC = () => {
  const routes = useRoutes(getRoutes());
  return routes;
};

export default Router;
