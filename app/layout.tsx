import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Harsh Gupta — Data Science & AI",
  description: "Portfolio of Harsh Gupta, a data science and AI student exploring machine learning, computer vision, NLP, and data engineering.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return <html lang="en"><body>{children}</body></html>;
}
