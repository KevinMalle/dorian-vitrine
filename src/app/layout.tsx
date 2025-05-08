import "../styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vitrine 3D",
  description: "Site personnel 3D",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
