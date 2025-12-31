import { api } from "./client";

export type MediaAssetDTO = {
  id: number;
  file: string;
  alt_text: string;
  meta: Record<string, any>;
  uploaded_at: string;
};

export async function listAssets() {
  const res = await api.get<MediaAssetDTO[]>("builder/assets/");
  return res.data;
}
