"use client";

import Image from "next/image";
import { useState } from "react";

import SideBar from "./sidebar";
import Schedule from "./Schedule";
import CalendarTypeBar from "@/components/calendarTypeBar";
import startTypeContext from "../../store/startType";

export default function Home() {
  const [openSide, setSider] = useState(true);
  const [startType, setStartType] = useState(1);

  return (
    <startTypeContext.Provider value={{startType, setStartType}}>
      <main className="flex">
        <SideBar
          close={!openSide}
        />

        <div className={`flex-1`}>
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
                      openSide
                        ? "/svg/sidebar-collapse.svg"
                        : "/svg/sidebar-expand.svg"
                    }
                    alt={openSide ? "sidebar-collapse" : "sidebar-expand"}
                  />
                </span>
              </div>
            </div>
            <div>
              <CalendarTypeBar />
            </div>
          </nav>
          <div
            style={{
              height: "calc(100vh - 3rem)",
            }}
          >
            <Schedule />
          </div>
        </div>
      </main>
    </startTypeContext.Provider>
  );
}
