import "/globals.css";
import PageViewTracker from "./components/PageViewTracker";

export const metadata = {
  metadataBase: new URL("https://www.taborpainting.com"),
  title: "Tabor Painting | Interior & Exterior Painter in Berlin MA",
  description:
    "Tabor Painting provides interior painting, exterior painting, and wood staining services for homeowners in Berlin, Massachusetts and nearby Central MA towns.",
  keywords: [
    "Tabor Painting",
    "painter Berlin MA",
    "painting company Berlin MA",
    "interior painting Berlin MA",
    "exterior painting Berlin MA",
    "wood staining Berlin MA",
    "house painter Berlin Massachusetts",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Tabor Painting | Painter in Berlin MA",
    description:
      "Interior painting, exterior painting, and wood staining services in Berlin, Massachusetts and nearby areas.",
    url: "https://www.taborpainting.com/",
    siteName: "Tabor Painting",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <PageViewTracker />
        {children}
      </body>
    </html>
  );
}
