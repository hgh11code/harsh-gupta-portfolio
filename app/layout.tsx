import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Harsh Gupta — Data Scientist, Engineer & Analyst",
  description: "Portfolio of Harsh Gupta, working across data science, data engineering, and analytics with a focus on machine learning, computer vision, and NLP.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return <html lang="en"><body>{children}</body></html>;
}
