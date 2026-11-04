import { LayoutContent } from "@/components/LayoutContent";

const GlobalLayout = ({ children }) => {
  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden mt-16">
      {/* global layout content - fixed sidebar on desktop */}
      <div className="fixed left-0 top-16 h-[calc(100vh-64px)] z-10 hidden lg:block overflow-hidden">
        <LayoutContent mode="desktop"></LayoutContent>
      </div>

      {/* main content - scrollable with margin on desktop */}
      <main className="flex-1 lg:ml-64 overflow-y-auto p-4">
        {/* mobile menu button */}
        <div className="lg:hidden mb-4">
          <LayoutContent mode="mobile"></LayoutContent>
        </div>
        {children}
      </main>
    </div>
  );
};

export default GlobalLayout;
