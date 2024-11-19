import localFont from "next/font/local";
import "../globals.css";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Authentification",
  description: "Tout le processus d'authentification et de création de compte",
};

export default function AuthLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 sm:p-8">{children}</div>
        </div>
      </body>
    </html>
  );
}
