import React from 'react';

export function QuantityStepper({ value, onChange }) {
  return (
    <div className="inline-flex items-center overflow-hidden rounded-full border border-neutral-200 bg-white">
      <button type="button" className="px-3 py-2 text-sm font-semibold" onClick={() => onChange(Math.max(1, value - 1))}>
        -
      </button>
      <span className="min-w-10 px-3 py-2 text-center text-sm font-semibold">{value}</span>
      <button type="button" className="px-3 py-2 text-sm font-semibold" onClick={() => onChange(value + 1)}>
        +
      </button>
    </div>
  );
}