"use client";

import LayoutContent from "@/components/Loader/LayoutContent";
import { LoadingProvider } from "@/context/LoadingContext";
import { TitleProvider } from "@/context/TitleContext";

/**
 * AuthLayout
 *
 * @export
 * @param {{ children: JSX.Element; }} param0
 * @param {JSX.Element} param0.children
 * @returns {JSX.Element}
 */
export default function AuthLayout({ children }) {
  return (
    <TitleProvider>
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 sm:p-8">
          <LoadingProvider>
            <LayoutContent>{children}</LayoutContent>
          </LoadingProvider>
        </div>
      </div>
    </TitleProvider>
  );
}
