"use client";

import { Bars } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import { DashboardNavLinks } from "./DashboardNavLinks";

export function LayoutContentClient({ navItems, mode = "desktop" }) {
  const layoutNavLinks = <DashboardNavLinks navItems={navItems} />;

  return (
    <Drawer>
      {/* desktop - scrollable sidebar */}
      {mode === "desktop" && (
        <aside className="w-80 border-r border-slate-200 p-4 hidden lg:block overflow-y-auto shadow-sm h-screen">
          {layoutNavLinks}
        </aside>
      )}

      {/* mobile menu button */}
      {mode === "mobile" && (
        <Button variant="secondary" className="lg:hidden">
          <Bars />
          Menu
        </Button>
      )}

      <Drawer.Backdrop>
        <Drawer.Content placement="left">
          <Drawer.Dialog>
            <Drawer.CloseTrigger />
            <Drawer.Header>
              <Drawer.Heading>Navigation</Drawer.Heading>
            </Drawer.Header>
            <Drawer.Body>{layoutNavLinks}</Drawer.Body>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  );
}
