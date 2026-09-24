"use client";

import React from "react";
import Link from "next/link";
import { Button, Card, Chip } from "@heroui/react";
import { Lock, House, Persons } from "@gravity-ui/icons";

const UnauthorizedPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF8F5] p-4 text-slate-800">
      <Card className="max-w-md w-full shadow-lg border border-amber-900/10 bg-white p-4 rounded-2xl">
        {/* Header Section */}
        <Card.Header className="flex flex-col items-center text-center pb-2">
          {/* Lock Icon Badge */}
          <div className="w-14 h-14 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center mb-4 border border-amber-200/60">
            <Lock className="w-7 h-7" />
          </div>

          {/* Status Chip */}
          <Chip
            size="sm"
            variant="flat"
            color="warning"
            className="mb-3 font-semibold uppercase tracking-wider text-[10px] bg-amber-100/70 text-amber-900"
          >
            Access Restricted
          </Chip>

          {/* Main Title */}
          <Card.Title className="text-2xl font-bold text-slate-900 font-serif">
            This Chapter is Locked
          </Card.Title>

          <Card.Description className="text-slate-600 text-sm mt-2 max-w-xs leading-relaxed">
            You do not have permission to view or manage this section of Fable.
          </Card.Description>
        </Card.Header>

        {/* Content Section */}
        <Card.Content className="text-center px-4 py-2 text-slate-500 text-xs">
          Please sign in with an authorized account or head back to the main
          library to continue reading.
        </Card.Content>

        {/* Footer Section */}
        <Card.Footer className="pt-4 pb-2 flex flex-col sm:flex-row gap-2.5 justify-center w-full">
          <Link href="/browse" className="w-full sm:w-1/2">
            <Button
              variant="flat"
              color="default"
              startContent={<House className="w-4 h-4" />}
              className="w-full font-medium bg-slate-100 hover:bg-slate-200 text-slate-700"
            >
              Browse Library
            </Button>
          </Link>

          <Link href="/signIn" className="w-full sm:w-1/2">
            <Button
              color="warning"
              startContent={<Persons className="w-4 h-4" />}
              className="w-full font-medium text-amber-950 bg-amber-400 hover:bg-amber-500 shadow-sm"
            >
              Sign In
            </Button>
          </Link>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default UnauthorizedPage;
