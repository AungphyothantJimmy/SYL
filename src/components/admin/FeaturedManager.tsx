import { useState, type FormEvent } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useContent } from "../../context/ContentContext";
import {
  createFeatured,
  deleteFeatured,
  updateFeatured,
} from "../../lib/api";
import { asset } from "../../lib/defaults";
import { resolveImage } from "../../lib/images";
import type { FeaturedCollection, FeaturedInput } from "../../lib/types";
import ImageField from "./ImageField";
import {
  Alert,
  Button,
  Modal,
  Section,
  Spinner,
  TextArea,
  TextField,
} from "./ui";

const emptyFeatured = (sortOrder: number): FeaturedInput => ({
  title: "",
  description: "",
  image_url: null,
  link: "",
  sort_order: sortOrder,
});

const toInput = (collection: FeaturedCollection): FeaturedInput => ({
  title: collection.title,
  description: collection.description ?? "",
  image_url: collection.image_url,
  link: collection.link ?? "",
  sort_order: collection.sort_order,
});

export default function FeaturedManager() {
  const { data, loading, refresh } = useContent();
  const [form, setForm] = useState<FeaturedInput>(emptyFeatured(1));
  const [editing, setEditing] = useState<FeaturedCollection | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyFeatured(data.featured.length + 1));
    setError(null);
    setModalOpen(true);
  };

  const openEdit = (collection: FeaturedCollection) => {
    setEditing(collection);
    setForm(toInput(collection));
    setError(null);
    setModalOpen(true);
  };

  const closeModal = () => {
    if (saving) return;
    setModalOpen(false);
    setEditing(null);
    setError(null);
  };

  const update = <K extends keyof FeaturedInput>(
    key: K,
    value: FeaturedInput[K],
  ) => setForm((current) => ({ ...current, [key]: value }));

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setError(null);
    try {
      if (editing) {
        await updateFeatured(editing.id, form);
        setNotice(`Updated “${form.title}”.`);
      } else {
        await createFeatured(form);
        setNotice(`Added “${form.title}”.`);
      }
      await refresh();
      setModalOpen(false);
      setEditing(null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not save collection.",
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (collection: FeaturedCollection) => {
    if (
      !window.confirm(
        `Delete “${collection.title}”? This cannot be undone.`,
      )
    ) {
      return;
    }
    try {
      await deleteFeatured(collection.id);
      await refresh();
      setNotice(`Deleted “${collection.title}”.`);
    } catch (err) {
      setNotice(
        err instanceof Error ? err.message : "Could not delete collection.",
      );
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Featured Collections
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            These appear in the “Featured Collections” section of the homepage.
          </p>
        </div>
        <Button onClick={openCreate}>
          <Plus size={16} />
          Add collection
        </Button>
      </div>

      {notice && <Alert type="success">{notice}</Alert>}

      <Section title="All collections">
        {loading ? (
          <Spinner />
        ) : data.featured.length === 0 ? (
          <p className="py-8 text-center text-sm text-gray-500">
            No featured collections yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-xs uppercase tracking-wide text-gray-500">
                  <th className="py-2 pr-3">Collection</th>
                  <th className="py-2 pr-3">Link</th>
                  <th className="py-2 pr-3">Order</th>
                  <th className="py-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.featured.map((collection, index) => (
                  <tr key={collection.id} className="align-middle">
                    <td className="py-3 pr-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={resolveImage(
                            collection.image_url,
                            asset(`f${(index % 3) + 1}.png`),
                          )}
                          alt=""
                          className="h-12 w-12 rounded-md object-cover"
                        />
                        <div>
                          <p className="font-medium text-gray-900">
                            {collection.title}
                          </p>
                          <p className="text-xs text-gray-500">
                            {collection.description}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 pr-3 text-gray-600">
                      {collection.link ? (
                        collection.link
                      ) : (
                        <span className="text-gray-500">Collection page</span>
                      )}
                    </td>
                    <td className="py-3 pr-3 text-gray-600">
                      {collection.sort_order}
                    </td>
                    <td className="py-3">
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          onClick={() => openEdit(collection)}
                          aria-label={`Edit ${collection.title}`}
                        >
                          <Pencil size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => void handleDelete(collection)}
                          aria-label={`Delete ${collection.title}`}
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
        title={editing ? "Edit collection" : "Add collection"}
        onClose={closeModal}
        footer={
          <>
            <Button variant="secondary" onClick={closeModal} disabled={saving}>
              Cancel
            </Button>
            <Button type="submit" form="featured-form" disabled={saving}>
              {saving ? "Saving..." : "Save collection"}
            </Button>
          </>
        }
      >
        <form id="featured-form" className="space-y-4" onSubmit={handleSubmit}>
          {error && <Alert>{error}</Alert>}

          <TextField
            label="Title"
            required
            value={form.title}
            onChange={(event) => update("title", event.target.value)}
            placeholder="Diamond Rings"
          />

          <TextArea
            label="Description"
            value={form.description}
            onChange={(event) => update("description", event.target.value)}
            placeholder="Brilliant cuts that capture eternal love"
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <TextField
              label="External URL (optional)"
              value={form.link}
              onChange={(event) => update("link", event.target.value)}
              placeholder="https://example.com"
              hint="Leave empty to use the built-in collection detail page. Enter a full https:// URL to link somewhere else instead."
            />
            <TextField
              label="Sort order"
              type="number"
              value={form.sort_order}
              onChange={(event) =>
                update("sort_order", Number(event.target.value))
              }
              hint="Lower numbers appear first."
            />
          </div>

          <ImageField
            label="Collection image"
            value={form.image_url}
            onChange={(value) => update("image_url", value)}
            folder="featured"
          />
        </form>
      </Modal>
    </div>
  );
}
