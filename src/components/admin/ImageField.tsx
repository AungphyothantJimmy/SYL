import { useRef, useState } from "react";
import { ImagePlus, Link2, Trash2 } from "lucide-react";
import { uploadImage } from "../../lib/api";
import { resolveImage } from "../../lib/images";
import { Button } from "./ui";

type Props = {
  label: string;
  value: string | null;
  onChange: (value: string | null) => void;
  folder: "products" | "featured" | "site";
  hint?: string;
};

export default function ImageField({
  label,
  value,
  onChange,
  folder,
  hint,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    setError(null);
    setUploading(true);
    try {
      const url = await uploadImage(file, folder);
      onChange(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div>
      <span className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </span>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="h-28 w-40 shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
          {value ? (
            <img
              src={resolveImage(value, value)}
              alt=""
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-xs text-gray-400">
              No image
            </div>
          )}
        </div>

        <div className="flex-1 space-y-2">
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
            >
              <ImagePlus size={16} />
              {uploading ? "Uploading..." : "Upload image"}
            </Button>

            {value && (
              <Button
                type="button"
                variant="ghost"
                onClick={() => onChange(null)}
              >
                <Trash2 size={16} />
                Remove
              </Button>
            )}
          </div>

          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(event) => handleFile(event.target.files?.[0])}
          />

          <label className="flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2">
            <Link2 size={16} className="shrink-0 text-gray-400" />
            <input
              type="text"
              value={value ?? ""}
              onChange={(event) => onChange(event.target.value || null)}
              placeholder="…or paste an image URL"
              className="w-full bg-transparent text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
            />
          </label>

          {hint && <p className="text-xs text-gray-500">{hint}</p>}
          {error && <p className="text-xs text-red-600">{error}</p>}
        </div>
      </div>
    </div>
  );
}
