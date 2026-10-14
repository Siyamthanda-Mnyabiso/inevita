import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({ variable: "--font-jakarta", subsets: ["latin"] });

export const metadata = {
  title: "Inevita",
  description: "Inevita is an agency for brands that want to feel inevitable.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${jakarta.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
