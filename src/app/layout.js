"use client";

import "@/css/globals.css";
import "@/css/tailadmin.css";
import "@/css/satoshi.css";
import "@fortawesome/fontawesome-svg-core/styles.css";

/**
 * RootLayout
 *
 * @export
 * @param {{ children: JSX.Element; }} param0
 * @param {JSX.Element} param0.children
 * @returns {JSX.Element}
 */
export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body suppressHydrationWarning={true} className={``}>
        {children}
      </body>
    </html>
  );
}
