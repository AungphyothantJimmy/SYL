import { useEffect, useState, type FormEvent } from "react";
import { Plus, RotateCcw, Save, Trash2 } from "lucide-react";
import { useContent } from "../../context/ContentContext";
import { saveSettings } from "../../lib/api";
import type { SiteSettings, Stat } from "../../lib/types";
import ImageField from "./ImageField";
import {
  Alert,
  Button,
  Section,
  SelectField,
  TextArea,
  TextField,
} from "./ui";

const statColors = ["green", "blue", "yellow", "red", "purple", "gray"];

export default function SiteContentManager() {
  const { data, refresh } = useContent();
  const [settings, setSettings] = useState<SiteSettings>(data.settings);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    setSettings(data.settings);
  }, [data.settings]);

  const update = <K extends keyof SiteSettings>(
    key: K,
    value: SiteSettings[K],
  ) => setSettings((current) => ({ ...current, [key]: value }));

  const updateStat = <K extends keyof Stat>(
    index: number,
    key: K,
    value: Stat[K],
  ) => {
    setSettings((current) => ({
      ...current,
      about_stats: current.about_stats.map((stat, statIndex) =>
        statIndex === index ? { ...stat, [key]: value } : stat,
      ),
    }));
  };

  const addStat = () => {
    update("about_stats", [...settings.about_stats, { label: "", color: "green" }]);
  };

  const removeStat = (index: number) => {
    update(
      "about_stats",
      settings.about_stats.filter((_, statIndex) => statIndex !== index),
    );
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setError(null);
    setNotice(null);
    try {
      const saved = await saveSettings(settings);
      setSettings(saved);
      await refresh();
      setNotice("Site content saved.");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not save site content.",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Site Content</h1>
          <p className="mt-1 text-sm text-gray-500">
            Edit every section of the public website.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              setSettings(data.settings);
              setNotice(null);
              setError(null);
            }}
            disabled={saving}
          >
            <RotateCcw size={16} />
            Reset
          </Button>
          <Button type="submit" disabled={saving}>
            <Save size={16} />
            {saving ? "Saving..." : "Save changes"}
          </Button>
        </div>
      </div>

      {notice && <Alert type="success">{notice}</Alert>}
      {error && <Alert>{error}</Alert>}

      <Section
        title="Store & Hero"
        description="The first screen visitors see."
      >
        <TextField
          label="Store name"
          value={settings.store_name}
          onChange={(event) => update("store_name", event.target.value)}
        />
        <TextArea
          label="Hero title"
          value={settings.hero_title}
          onChange={(event) => update("hero_title", event.target.value)}
          hint="Line breaks are preserved."
        />
        <TextArea
          label="Hero subtitle"
          value={settings.hero_subtitle}
          onChange={(event) => update("hero_subtitle", event.target.value)}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField
            label="Primary button text"
            value={settings.hero_cta_text}
            onChange={(event) => update("hero_cta_text", event.target.value)}
          />
          <TextField
            label="Secondary button text"
            value={settings.hero_secondary_text}
            onChange={(event) =>
              update("hero_secondary_text", event.target.value)
            }
          />
        </div>
        <ImageField
          label="Hero background image"
          value={settings.hero_image_url}
          onChange={(value) => update("hero_image_url", value)}
          folder="site"
        />
      </Section>

      <Section
        title="Signature Items section"
        description="Heading text for the product grid."
      >
        <TextField
          label="Heading"
          value={settings.signature_heading}
          onChange={(event) => update("signature_heading", event.target.value)}
        />
        <TextArea
          label="Subheading"
          value={settings.signature_subheading}
          onChange={(event) =>
            update("signature_subheading", event.target.value)
          }
        />
      </Section>

      <Section title="Featured Collections section">
        <TextField
          label="Heading"
          value={settings.featured_heading}
          onChange={(event) => update("featured_heading", event.target.value)}
        />
        <TextArea
          label="Subheading"
          value={settings.featured_subheading}
          onChange={(event) =>
            update("featured_subheading", event.target.value)
          }
        />
      </Section>

      <Section title="About section">
        <TextField
          label="Title"
          value={settings.about_title}
          onChange={(event) => update("about_title", event.target.value)}
        />
        <TextArea
          label="Body"
          value={settings.about_body}
          onChange={(event) => update("about_body", event.target.value)}
          hint="Use blank lines to separate paragraphs."
          className="min-h-40"
        />
        <ImageField
          label="About image"
          value={settings.about_image_url}
          onChange={(value) => update("about_image_url", value)}
          folder="site"
        />

        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Stats</span>
            <Button type="button" variant="secondary" onClick={addStat}>
              <Plus size={16} />
              Add stat
            </Button>
          </div>

          <div className="space-y-2">
            {settings.about_stats.map((stat, index) => (
              <div
                key={index}
                className="flex flex-col gap-2 rounded-md border border-gray-200 p-3 sm:flex-row sm:items-center"
              >
                <input
                  value={stat.label}
                  onChange={(event) =>
                    updateStat(index, "label", event.target.value)
                  }
                  placeholder="Label"
                  className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-gray-900 focus:outline-none"
                />
                <div className="w-full sm:w-40">
                  <SelectField
                    label="Color"
                    value={stat.color}
                    onChange={(event) =>
                      updateStat(index, "color", event.target.value)
                    }
                  >
                    {statColors.map((color) => (
                      <option key={color} value={color}>
                        {color}
                      </option>
                    ))}
                  </SelectField>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => removeStat(index)}
                  aria-label="Remove stat"
                  className="text-red-600 hover:bg-red-50 hover:text-red-700"
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            ))}

            {settings.about_stats.length === 0 && (
              <p className="text-sm text-gray-500">
                No stats yet. Add one to show a highlight.
              </p>
            )}
          </div>
        </div>
      </Section>

      <Section
        title="Store History section"
        description="Tell the story of your store."
      >
        <TextField
          label="Title"
          value={settings.store_history_title}
          onChange={(event) => update("store_history_title", event.target.value)}
        />
        <TextArea
          label="Body"
          value={settings.store_history_body}
          onChange={(event) => update("store_history_body", event.target.value)}
          hint="Use blank lines to separate paragraphs."
          className="min-h-40"
        />
        <ImageField
          label="Image"
          value={settings.store_history_image_url}
          onChange={(value) => update("store_history_image_url", value)}
          folder="site"
        />
      </Section>

      <Section
        title="Footer & Contact"
        description="Shown at the bottom of every page."
      >
        <TextArea
          label="Footer description"
          value={settings.footer_description}
          onChange={(event) =>
            update("footer_description", event.target.value)
          }
        />
        <ImageField
          label="Footer logo"
          value={settings.footer_logo_url}
          onChange={(value) => update("footer_logo_url", value)}
          folder="site"
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <TextField
            label="Address"
            value={settings.contact_address}
            onChange={(event) => update("contact_address", event.target.value)}
          />
          <TextField
            label="Phone"
            value={settings.contact_phone}
            onChange={(event) => update("contact_phone", event.target.value)}
          />
          <TextField
            label="Email"
            type="email"
            value={settings.contact_email}
            onChange={(event) => update("contact_email", event.target.value)}
          />
          <TextArea
            label="Opening hours"
            value={settings.contact_hours}
            onChange={(event) => update("contact_hours", event.target.value)}
            hint="Line breaks are preserved."
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <TextField
            label="Facebook URL"
            type="url"
            value={settings.facebook_url}
            onChange={(event) => update("facebook_url", event.target.value)}
            placeholder="https://facebook.com/..."
          />
          <TextField
            label="Instagram URL"
            type="url"
            value={settings.instagram_url}
            onChange={(event) => update("instagram_url", event.target.value)}
            placeholder="https://instagram.com/..."
          />
        </div>
        <p className="text-xs text-gray-500">
          Leave a social link empty to hide its icon.
        </p>
      </Section>

      <div className="flex justify-end pb-8">
        <Button type="submit" disabled={saving}>
          <Save size={16} />
          {saving ? "Saving..." : "Save changes"}
        </Button>
      </div>
    </form>
  );
}
