import { Fredoka, Outfit } from "next/font/google";
import "./globals.css";

const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-fredoka",
  weight: ["400", "600", "700"],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Smart Thermo Arcade",
  description: "High-energy thermodynamics quiz game for college students",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fredoka.variable} ${outfit.variable}`}>
      <body className="font-outfit min-h-screen bg-[#FFF5E1] text-[#2D1810] antialiased">
        {children}
      </body>
    </html>
  );
}