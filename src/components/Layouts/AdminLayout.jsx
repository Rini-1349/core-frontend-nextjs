"use client";

import React, { useState } from "react";
import Sidebar from "@/components/Sidebar/index.jsx";
import Header from "@/components/Header/index.jsx";
import { PopupProvider } from "@/context/PopupContext";
import { LoadingProvider } from "@/context/LoadingContext";
import LayoutContent from "../Loader/LayoutContent";
import { useSearchParams } from "next/navigation";
import { SessionProvider } from "@/context/SessionContext";
import { AlertProvider } from "@/context/AlertContext";
import PageAlert from "../PageAlert";

/**
 * AdminLayout component
 *
 * @export
 * @param {{ children: JSX.Element; }} param0
 * @param {JSX.Element} param0.children
 * @returns {JSX.Element}
 */
export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const searchParams = useSearchParams();
  const isModal = searchParams.get("modal") ? true : false;

  return (
    <SessionProvider>
      <div className="page-container">
        {!isModal && <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />}
        <div className="main-content">
          {!isModal && <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />}
          <div className="content-wrapper">
            <AlertProvider>
              <PageAlert />
              <PopupProvider>
                <LoadingProvider>
                  <LayoutContent>{children}</LayoutContent>
                </LoadingProvider>
              </PopupProvider>
            </AlertProvider>
          </div>
        </div>
      </div>
    </SessionProvider>
  );
}
