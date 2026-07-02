import { Link, useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { QuantityStepper } from '../components/QuantityStepper';
import { removeFromCart, updateQuantity } from '../slices/cartSlice';
import { formatCurrency } from '../utils/storage';

export default function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector((state) => state.cart.items);
  const totalItems = items.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  if (items.length === 0) {
    return <EmptyState title="Your bag is empty" description="Looks like you have not added anything yet." actionLabel="Continue shopping" onAction={() => navigate('/products')} />;
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
      <section className="grid gap-4">
        <div className="soft-card rounded-[2rem] bg-white p-6">
          <p className="eyebrow">Shopping bag</p>
          <h1 className="mt-1 text-3xl font-semibold">Your Cart</h1>
        </div>

        <div className="grid gap-4">
          {items.map((item) => (
            <article key={`${item.id}-${item.variantKey}`} className="soft-card rounded-[2rem] bg-white p-4 sm:p-5">
              <div className="grid gap-4 sm:grid-cols-[112px_1fr]">
                <img src={item.image} alt={item.name} className="h-28 w-full rounded-3xl object-cover" />
                <div className="flex flex-col gap-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <Link to={`/product/${item.slug}`} className="text-lg font-semibold hover:underline">{item.name}</Link>
                      <p className="text-sm text-neutral-500">{item.category}</p>
                      <p className="mt-1 text-xs text-neutral-400">{item.variantKey}</p>
                    </div>
                    <div className="text-right text-lg font-bold">{formatCurrency(item.price * (item.quantity || 1))}</div>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <QuantityStepper value={item.quantity || 1} onChange={(quantity) => dispatch(updateQuantity({ id: item.id, variantKey: item.variantKey, quantity }))} />
                    <button type="button" onClick={() => dispatch(removeFromCart({ id: item.id, variantKey: item.variantKey }))} className="secondary-btn">
                      <FaTrash /> Remove
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <aside className="soft-card h-fit rounded-[2rem] bg-white p-6 lg:sticky lg:top-24">
        <h2 className="text-2xl font-semibold">Order Summary</h2>
        <div className="mt-4 grid gap-3 text-sm text-neutral-600">
          <SummaryRow label="Total items" value={totalItems} />
          <SummaryRow label="Shipping" value="Free" accent />
          <SummaryRow label="Subtotal" value={formatCurrency(subtotal)} bold />
        </div>
        <div className="mt-6 grid gap-3">
          <button type="button" onClick={() => navigate('/checkout')} className="primary-btn">Proceed to checkout</button>
          <Link to="/products" className="secondary-btn justify-center">Continue shopping</Link>
        </div>
      </aside>
    </div>
  );
}

function EmptyState({ title, description, actionLabel, onAction }) {
  return (
    <div className="soft-card rounded-[2rem] bg-white p-10 text-center">
      <h1 className="text-3xl font-semibold">{title}</h1>
      <p className="mt-2 text-neutral-600">{description}</p>
      <button type="button" onClick={onAction} className="mt-6 primary-btn">{actionLabel}</button>
    </div>
  );
}

function SummaryRow({ label, value, accent, bold }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl bg-neutral-50 px-4 py-3">
      <span className={bold ? 'font-semibold text-neutral-950' : 'text-neutral-600'}>{label}</span>
      <span className={`${accent ? 'text-emerald-600' : 'text-neutral-950'} ${bold ? 'font-semibold' : ''}`}>{value}</span>
    </div>
  );
}