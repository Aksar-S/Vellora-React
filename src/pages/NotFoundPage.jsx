import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="soft-card rounded-[2rem] bg-white p-10 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-2 text-4xl font-semibold">Page not found</h1>
      <p className="mt-3 text-neutral-600">The page you requested does not exist.</p>
      <Link to="/" className="mt-6 primary-btn">Back home</Link>
    </div>
  );
}