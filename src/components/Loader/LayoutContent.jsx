"use client";

import React from "react";
import Loader from "@/components/Loader/Loader";
import { useIsLoading } from "@/context/LoadingContext";

export default function LayoutContent({ children }) {
  const { isLoading } = useIsLoading();

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      {isLoading && <Loader />}
      {children}
    </div>
  );
}
