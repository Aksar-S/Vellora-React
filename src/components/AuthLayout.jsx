import React from 'react';
import { Outlet } from 'react-router-dom';

export function AuthLayout() {
  return (
    <main className="page-enter mx-auto flex min-h-screen w-full max-w-7xl items-center px-4 py-8 sm:px-6 lg:px-8">
      <Outlet />
    </main>
  );
}