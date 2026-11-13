import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import AlbumExplorer from '../components/albumExplorer/AlbumExplorer';

export default function AlbumExplorerPage() {
  const { '*': splat } = useParams();
  const location = useLocation();

  return <AlbumExplorer splat={splat} locationKey={location.key} />;
}