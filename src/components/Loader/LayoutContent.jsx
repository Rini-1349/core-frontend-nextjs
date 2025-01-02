"use client";

import React from "react";
import Loader from "@/components/Loader/Loader";
import { useIsLoading } from "@/context/LoadingContext";

export default function LayoutContent({ children, fullPage = true }) {
  const { isLoading } = useIsLoading();

  return (
    <>
      {fullPage ? (
        <div>
          {isLoading && (
            <div className="absolute z-40 inset-0 flex items-center justify-center bg-black/25">
              <Loader />
            </div>
          )}
          {children}
        </div>
      ) : (
        <>
          <div className="sticky min-h-full">
            {isLoading && <div className="absolute -mx-4 -mb-8 -translate-y-4 z-40 inset-0 flex items-center justify-center bg-black/25"></div>}
            {children}
          </div>
          {isLoading && <Loader />}
        </>
      )}
    </>
  );
}
