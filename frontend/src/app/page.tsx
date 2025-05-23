'use client';

import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { getApolloClient } from '../apollo/client';
import RepositoryTracker from '../components/RepositoryTracker';
import AppBar from '../components/AppBar';

export default function Home() {
  return (
    <ApolloProvider client={getApolloClient()}>
      <div className="App">
        <main className="container mx-auto p-4">
          <RepositoryTracker />
        </main>
      </div>
    </ApolloProvider>
  );
}