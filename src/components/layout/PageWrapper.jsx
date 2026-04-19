import { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./SideBar";

export default function PageWrapper({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-shell">
      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-surface border-b border-border px-4 h-12 flex items-center justify-between">
        <Link to="/" className="font-display font-bold text-text-primary text-sm">
          Truthful<span className="text-gradient">Wasp</span>
        </Link>
        <button
          onClick={() => setSidebarOpen(true)}
          className="text-text-muted hover:text-text-primary"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/70"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="relative w-64 bg-surface border-r border-border z-10">
            <div className="absolute top-3 right-3">
              <button
                onClick={() => setSidebarOpen(false)}
                className="text-text-muted hover:text-text-primary p-1"
              >
                ✕
              </button>
            </div>
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 lg:pl-0 pt-12 lg:pt-0 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 py-6">
          {children}
        </div>
      </main>
    </div>
  );
}