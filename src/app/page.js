"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import SideBar from "./sidebar";
import Schedule from "./Schedule";

export default function Home() {
  const [openSide, setSider] = useState(true);

  return (
    <main className="flex">
      <SideBar close={!openSide} />

      <div className={`flex-auto`}>
        <nav className="h-12 px-2 py-1 flex items-center justify-between border-b border-gray-300">
          <div className="flex items-center">
            <div
              className="hover:bg-slate-100 cursor-pointer p-1 rounded"
              onClick={() => setSider((d) => !d)}
            >
              <span>
                <Image
                  width={24}
                  height={24}
                  src={
                    openSide ? "/svg/sidebar-collapse.svg" : "/svg/sidebar-expand.svg"
                  }
                  alt={
                    openSide ? "sidebar-collapse" : "sidebar-expand"
                  }
                />
              </span>
            </div>
          </div>
          <div></div>
        </nav>
        <div>
          <Schedule />
        </div>
      </div>
    </main>
  );
}
