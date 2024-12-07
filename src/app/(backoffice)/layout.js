"use client";

import AdminLayout from "@/components/Layouts/AdminLayout";
import { TitleProvider } from "@/context/TitleContext";

/**
 * BackOfficeLayout
 *
 * @export
 * @param {{ children: JSX.Element; }} param0
 * @param {JSX.Element} param0.children
 * @returns {JSX.Element}
 */
export default function BackOfficeLayout({ children }) {
  return (
    <>
      <TitleProvider>
        <AdminLayout>{children}</AdminLayout>
      </TitleProvider>
    </>
  );
}
