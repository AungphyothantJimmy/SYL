import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { fetchSiteData } from "../lib/api";
import { defaultSiteData } from "../lib/defaults";
import { isSupabaseConfigured } from "../lib/supabase";
import type { SiteData } from "../lib/types";

type ContentContextValue = {
  data: SiteData;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
};

const ContentContext = createContext<ContentContextValue | null>(null);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<SiteData>(defaultSiteData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!isSupabaseConfigured) {
      setData(defaultSiteData);
      setLoading(false);
      return;
    }

    try {
      const next = await fetchSiteData();
      setData(next);
      setError(null);
    } catch (err) {
      // Keep showing the last good data (or defaults) if the network fails.
      console.error("[SYL] Failed to load site data:", err);
      setError(
        err instanceof Error ? err.message : "Failed to load site content.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return (
    <ContentContext.Provider value={{ data, loading, error, refresh }}>
      {children}
    </ContentContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useContent(): ContentContextValue {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error("useContent must be used inside a ContentProvider");
  }
  return context;
}
