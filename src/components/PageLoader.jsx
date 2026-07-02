import React from 'react';

export function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="glass-panel rounded-3xl px-8 py-6 text-center">
        <div className="mx-auto mb-3 h-12 w-12 animate-spin rounded-full border-4 border-neutral-200 border-t-neutral-900" />
        <p className="text-sm uppercase tracking-[0.28em] text-neutral-500">Loading Velora</p>
      </div>
    </div>
  );
}