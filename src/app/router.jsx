import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import AlbumPage from '../modules/album/pages/AlbumPage';
import RelocationPage from '../modules/album/pages/RelocationPage';
import RelocationDetail from './modules/countrises/pages/RelocationCatalog/RelocationDetail';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/relocation/south-korea" replace />,
      },
      {
        path: 'album',
        element: <AlbumPage />,
      },
      {
        path: 'relocation',
        element: <RelocationPage />,
      },
      {
        path: 'relocation/:countryId',
        element: <RelocationDetail />,
      },
    ],
  },
]);