import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import AlbumExplorerPage from './modules/album/pages/AlbumExplorerPage';
import RelocationPage from './modules/countrises/pages/RelocationCatalog/RelocationPage';
import RelocationDetail from './modules/countrises/pages/RelocationCatalog/RelocationDetail/RelocationDetail';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/album" replace />,
      },
      {
        path: 'album/*',
        element: <AlbumExplorerPage />,
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