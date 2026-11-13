"use client";

import React, { useState } from "react";
import { Modal, Button, useOverlayState } from "@heroui/react";
import { BookOpen, Xmark } from "@gravity-ui/icons";

export default function EbookReaderModal({ ebook }) {
  const modalState = useOverlayState();
  const [fontSize, setFontSize] = useState("text-base");
  const [theme, setTheme] = useState("dark"); // "dark", "sepia", "light"

  const themeClasses = {
    dark: "bg-slate-950 text-slate-100 border-slate-800",
    sepia: "bg-[#fbf0d9] text-[#5f4b32] border-[#e4d4b8]",
    light: "bg-white text-slate-900 border-slate-200",
  };

  const bodyBgClasses = {
    dark: "bg-slate-900/80 text-slate-200",
    sepia: "bg-[#f5e7c8] text-[#4a3b27]",
    light: "bg-slate-50 text-slate-800",
  };

  return (
    <Modal state={modalState}>
      <Button
        size="sm"
        color="primary"
        variant="solid"
        startContent={<BookOpen className="w-4 h-4" />}
        className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold shadow-md cursor-pointer"
      >
        Read Online
      </Button>

      <Modal.Backdrop>
        <Modal.Container placement="center">
          <Modal.Dialog className={`max-w-4xl w-full h-[88vh] flex flex-col p-0 overflow-hidden rounded-3xl border shadow-2xl transition-colors duration-200 ${themeClasses[theme]}`}>
            {/* Reader Header / Controls */}
            <div className={`px-6 py-4 border-b flex items-center justify-between gap-4 shrink-0 ${themeClasses[theme]}`}>
              <div className="flex items-center gap-3 min-w-0">
                {ebook.coverImage && (
                  <div className="relative w-8 h-11 shrink-0 rounded overflow-hidden shadow">
                    <img
                      src={ebook.coverImage}
                      alt={ebook.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="truncate">
                  <h3 className="font-bold text-base sm:text-lg truncate font-serif">
                    {ebook.title}
                  </h3>
                  <p className="text-xs opacity-75 truncate">
                    Genre: {ebook.genre || "General"}
                  </p>
                </div>
              </div>

              {/* Reader Preferences Bar */}
              <div className="flex items-center gap-3 shrink-0">
                {/* Font Size controls */}
                <div className="flex items-center rounded-lg border border-current/20 p-0.5 text-xs font-semibold">
                  <button
                    onClick={() => setFontSize("text-sm")}
                    className={`px-2 py-1 rounded transition-colors ${fontSize === "text-sm" ? "bg-current/15" : "hover:bg-current/10"}`}
                    title="Small font"
                  >
                    A-
                  </button>
                  <button
                    onClick={() => setFontSize("text-base")}
                    className={`px-2 py-1 rounded transition-colors ${fontSize === "text-base" ? "bg-current/15" : "hover:bg-current/10"}`}
                    title="Regular font"
                  >
                    A
                  </button>
                  <button
                    onClick={() => setFontSize("text-xl")}
                    className={`px-2 py-1 rounded transition-colors ${fontSize === "text-xl" ? "bg-current/15" : "hover:bg-current/10"}`}
                    title="Large font"
                  >
                    A+
                  </button>
                </div>

                {/* Theme Mode Toggle */}
                <div className="flex items-center rounded-lg border border-current/20 p-0.5 text-xs">
                  <button
                    onClick={() => setTheme("dark")}
                    className={`px-2 py-1 rounded transition-colors ${theme === "dark" ? "bg-slate-800 text-white" : "hover:bg-current/10"}`}
                  >
                    Dark
                  </button>
                  <button
                    onClick={() => setTheme("sepia")}
                    className={`px-2 py-1 rounded transition-colors ${theme === "sepia" ? "bg-[#e2cca4] text-[#4a3b27]" : "hover:bg-current/10"}`}
                  >
                    Sepia
                  </button>
                  <button
                    onClick={() => setTheme("light")}
                    className={`px-2 py-1 rounded transition-colors ${theme === "light" ? "bg-slate-200 text-slate-900" : "hover:bg-current/10"}`}
                  >
                    Light
                  </button>
                </div>

                {/* Close Button */}
                <button
                  onClick={modalState.close}
                  className="p-1.5 rounded-lg hover:bg-current/15 transition-colors cursor-pointer"
                  aria-label="Close Reader"
                >
                  <Xmark className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Reading Content Area */}
            <div className={`flex-1 overflow-y-auto px-6 sm:px-14 py-8 font-serif leading-relaxed select-text ${bodyBgClasses[theme]}`}>
              <div className="max-w-2xl mx-auto space-y-6">
                <div className="text-center pb-6 border-b border-current/10">
                  <span className="text-xs font-sans uppercase tracking-widest opacity-60">
                    Fable Digital Edition
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-extrabold mt-2 tracking-tight">
                    {ebook.title}
                  </h1>
                  <p className="text-xs sm:text-sm font-sans mt-2 opacity-75">
                    Category: {ebook.genre}
                  </p>
                </div>

                <div className={`${fontSize} whitespace-pre-line leading-8 sm:leading-9`}>
                  {ebook.description || "Content is being prepared by the author."}
                </div>

                {/* End of preview / reader notice */}
                <div className="mt-12 pt-8 border-t border-current/15 text-center text-xs font-sans opacity-70">
                  <p>📖 You have reached the end of the available volume.</p>
                  <p className="mt-1">Thank you for supporting indie authors on Fable!</p>
                </div>
              </div>
            </div>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}

