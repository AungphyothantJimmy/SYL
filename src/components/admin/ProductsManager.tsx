import { useState, type FormEvent } from "react";
import { Pencil, Plus, Trash2, ExternalLink } from "lucide-react";
import { Link as RouterLink } from "react-router-dom";
import { useContent } from "../../context/ContentContext";
import {
  createProduct,
  deleteProduct,
  updateProduct,
} from "../../lib/api";
import { asset } from "../../lib/defaults";
import { formatPrice } from "../../lib/format";
import { resolveImage } from "../../lib/images";
import type { Product, ProductInput } from "../../lib/types";
import ImageField from "./ImageField";
import {
  Alert,
  Button,
  CheckboxField,
  Modal,
  Section,
  Spinner,
  TextArea,
  TextField,
} from "./ui";

const emptyProduct = (sortOrder: number): ProductInput => ({
  name: "",
  description: "",
  price: 0,
  category: "",
  image_url: null,
  is_signature: true,
  sort_order: sortOrder,
});

const toInput = (product: Product): ProductInput => ({
  name: product.name,
  description: product.description ?? "",
  price: product.price ?? 0,
  category: product.category ?? "",
  image_url: product.image_url,
  is_signature: product.is_signature,
  sort_order: product.sort_order,
});

export default function ProductsManager() {
  const { data, loading, refresh } = useContent();
  const [form, setForm] = useState<ProductInput>(emptyProduct(1));
  const [editing, setEditing] = useState<Product | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyProduct(data.products.length + 1));
    setError(null);
    setModalOpen(true);
  };

  const openEdit = (product: Product) => {
    setEditing(product);
    setForm(toInput(product));
    setError(null);
    setModalOpen(true);
  };

  const closeModal = () => {
    if (saving) return;
    setModalOpen(false);
    setEditing(null);
    setError(null);
  };

  const update = <K extends keyof ProductInput>(
    key: K,
    value: ProductInput[K],
  ) => setForm((current) => ({ ...current, [key]: value }));

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setError(null);
    try {
      if (editing) {
        await updateProduct(editing.id, form);
        setNotice(`Updated “${form.name}”.`);
      } else {
        await createProduct(form);
        setNotice(`Added “${form.name}”.`);
      }
      await refresh();
      setModalOpen(false);
      setEditing(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save product.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (product: Product) => {
    if (!window.confirm(`Delete “${product.name}”? This cannot be undone.`)) {
      return;
    }
    try {
      await deleteProduct(product.id);
      await refresh();
      setNotice(`Deleted “${product.name}”.`);
    } catch (err) {
      setNotice(
        err instanceof Error ? err.message : "Could not delete product.",
      );
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="mt-1 text-sm text-gray-500">
            Items marked as signature appear on the homepage.
          </p>
        </div>
        <Button onClick={openCreate}>
          <Plus size={16} />
          Add product
        </Button>
      </div>

      {notice && <Alert type="success">{notice}</Alert>}

      <Section title="All products">
        {loading ? (
          <Spinner />
        ) : data.products.length === 0 ? (
          <p className="py-8 text-center text-sm text-gray-500">
            No products yet. Add your first item.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-xs uppercase tracking-wide text-gray-500">
                  <th className="py-2 pr-3">Item</th>
                  <th className="py-2 pr-3">Category</th>
                  <th className="py-2 pr-3">Price</th>
                  <th className="py-2 pr-3">Signature</th>
                  <th className="py-2 pr-3">Order</th>
                  <th className="py-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.products.map((product, index) => (
                  <tr key={product.id} className="align-middle">
                    <td className="py-3 pr-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={resolveImage(
                            product.image_url,
                            asset(`s${(index % 12) + 1}.jpg`),
                          )}
                          alt=""
                          className="h-12 w-12 rounded-md object-cover"
                        />
                        <span className="font-medium text-gray-900">
                          {product.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 pr-3 text-gray-600">
                      {product.category || "—"}
                    </td>
                    <td className="py-3 pr-3 text-gray-600">
                      {formatPrice(product.price)}
                    </td>
                    <td className="py-3 pr-3">
                      {product.is_signature ? (
                        <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                          Yes
                        </span>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    <td className="py-3 pr-3 text-gray-600">
                      {product.sort_order}
                    </td>
                    <td className="py-3">
                      <div className="flex justify-end gap-1">
                        <RouterLink
                          to={`/item/${product.id}`}
                          aria-label={`View ${product.name} on site`}
                          className="inline-flex items-center justify-center rounded-md px-2 py-1.5 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
                        >
                          <ExternalLink size={16} />
                        </RouterLink>
                        <Button
                          variant="ghost"
                          onClick={() => openEdit(product)}
                          aria-label={`Edit ${product.name}`}
                        >
                          <Pencil size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => void handleDelete(product)}
                          aria-label={`Delete ${product.name}`}
                          className="text-red-600 hover:bg-red-50 hover:text-red-700"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Section>

      <Modal
        open={modalOpen}
        title={editing ? "Edit product" : "Add product"}
        onClose={closeModal}
        footer={
          <>
            <Button variant="secondary" onClick={closeModal} disabled={saving}>
              Cancel
            </Button>
            <Button type="submit" form="product-form" disabled={saving}>
              {saving ? "Saving..." : "Save product"}
            </Button>
          </>
        }
      >
        <form id="product-form" className="space-y-4" onSubmit={handleSubmit}>
          {error && <Alert>{error}</Alert>}

          <TextField
            label="Name"
            required
            value={form.name}
            onChange={(event) => update("name", event.target.value)}
            placeholder="Diamond Ring"
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <TextField
              label="Price (MMK)"
              type="number"
              min="0"
              step="0.01"
              required
              value={form.price}
              onChange={(event) => update("price", Number(event.target.value))}
            />
            <TextField
              label="Category"
              value={form.category}
              onChange={(event) => update("category", event.target.value)}
              placeholder="Rings"
            />
          </div>

          <TextArea
            label="Description"
            value={form.description}
            onChange={(event) => update("description", event.target.value)}
            placeholder="A short description of this piece."
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <TextField
              label="Sort order"
              type="number"
              value={form.sort_order}
              onChange={(event) =>
                update("sort_order", Number(event.target.value))
              }
              hint="Lower numbers appear first."
            />
            <CheckboxField
              label="Show in signature items"
              checked={form.is_signature}
              onChange={(event) =>
                update("is_signature", event.target.checked)
              }
              hint="Signature items are shown on the homepage."
            />
          </div>

          <ImageField
            label="Product image"
            value={form.image_url}
            onChange={(value) => update("image_url", value)}
            folder="products"
          />
        </form>
      </Modal>
    </div>
  );
}
