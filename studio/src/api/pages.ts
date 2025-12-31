import { api } from "./client";
import type { Layout } from "../types/layout";

export type PageVersionDTO = {
  id: number | null;
  page: number;
  page_slug: string;
  version_number: number;
  layout_json: Layout;
  is_published: boolean;
  created_at: string | null;
};

export async function fetchDraft(slug: string) {
  const res = await api.get<PageVersionDTO>(`builder/pages/${slug}/draft/`);
  return res.data;
}

export async function saveDraft(slug: string, layout: Layout) {
  const res = await api.post<PageVersionDTO>(`builder/pages/${slug}/save/`, {
    layout_json: layout,
  });
  return res.data;
}

export async function publishVersion(slug: string, versionId: number) {
  const res = await api.post<PageVersionDTO>(`builder/pages/${slug}/publish/`, {
    version_id: versionId,
  });
  return res.data;
}
