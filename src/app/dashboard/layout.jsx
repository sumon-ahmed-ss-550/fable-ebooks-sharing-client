import { LayoutContent } from "@/components/LayoutContent";

const GlobalLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      {/* global layout content */}
      <LayoutContent></LayoutContent>

      {/* main content */}
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
};

export default GlobalLayout;
