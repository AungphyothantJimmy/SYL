import { Link } from "react-router-dom";
import { Image, LayoutGrid, Store } from "lucide-react";
import { useContent } from "../../context/ContentContext";
import { isSupabaseConfigured } from "../../lib/supabase";
import { Alert, Section } from "./ui";

const cards = [
  {
    to: "/admin/products",
    title: "Products",
    description: "Add, edit, reorder, and remove jewelry items.",
    icon: Store,
  },
  {
    to: "/admin/featured",
    title: "Featured Collections",
    description: "Manage the collections highlighted on the homepage.",
    icon: LayoutGrid,
  },
  {
    to: "/admin/content",
    title: "Site Content",
    description: "Edit hero, about, contact, and social media content.",
    icon: Image,
  },
];

export default function AdminDashboard() {
  const { data, refresh, loading } = useContent();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Everything shown on the public website is managed here.
        </p>
      </div>

      {!isSupabaseConfigured && (
        <Alert type="info">
          Supabase is not configured. Add your project URL and anon key to{" "}
          <code>.env</code> to begin managing content.
        </Alert>
      )}

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Products</p>
          <p className="mt-1 text-3xl font-bold">{data.products.length}</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Featured collections</p>
          <p className="mt-1 text-3xl font-bold">{data.featured.length}</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Signature items</p>
          <p className="mt-1 text-3xl font-bold">
            {data.products.filter((product) => product.is_signature).length}
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.to}
            to={card.to}
            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-gray-900 hover:shadow-md"
          >
            <card.icon size={22} className="text-gray-900" />
            <h2 className="mt-3 font-semibold text-gray-900">{card.title}</h2>
            <p className="mt-1 text-sm text-gray-500">{card.description}</p>
          </Link>
        ))}
      </div>

      <Section
        title="Refresh content"
        description="The public site loads the latest data from the database each time it opens. Use this button if you changed data outside this dashboard."
      >
        <button
          type="button"
          onClick={() => void refresh()}
          disabled={loading}
          className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:text-gray-400"
        >
          {loading ? "Refreshing..." : "Refresh data"}
        </button>
      </Section>
    </div>
  );
}
