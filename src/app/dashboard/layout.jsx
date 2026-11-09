import { LayoutContent } from "@/components/LayoutContent";

const GlobalLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      {/* global layout content - scrollable sidebar on desktop */}
      <div className="hidden lg:block h-screen sticky top-0">
        <LayoutContent mode="desktop"></LayoutContent>
      </div>

      {/* main content - scrollable with margin on desktop */}
      <main className="flex-1 lg:ml-0 overflow-y-auto p-4">
        {/* mobile menu button */}
        <div className="lg:hidden mb-4">
          <LayoutContent mode="mobile"></LayoutContent>
        </div>
        <div className="max-w-7xl mx-auto ml-0">
          {children}
        </div>
      </main>
    </div>
  );
};

export default GlobalLayout;
