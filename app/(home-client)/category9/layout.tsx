import {
  translateBathroomMaterials,
  translateXuanTruongBuildingMaterials,
} from "@/translate/translate-client";
import { currentUser } from "@/lib/auth";
import type { Metadata } from "next";

let cachedMetadata: Metadata | null = null;

export async function generateMetadata(): Promise<Metadata> {
  if (cachedMetadata) return cachedMetadata;
  const user = await currentUser();
  let storedLanguage: string | null = null;

  // Lấy storedLanguage từ localStorage (cần đảm bảo client-side)
  if (typeof window !== "undefined") {
    storedLanguage = localStorage.getItem("language");
  }

  const languageToUse =
    user?.id && user?.role !== "GUEST"
      ? user?.language
      : storedLanguage || "vi";

  const bathroomMaterialMessage = translateBathroomMaterials(languageToUse);
  const descriptionMessage =
    translateXuanTruongBuildingMaterials(languageToUse);
  cachedMetadata = {
    title: bathroomMaterialMessage,
    description: descriptionMessage,
  };

  return cachedMetadata;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
