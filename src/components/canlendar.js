"use client";

import { useMemo, useState, useContext } from "react";
import { month_size } from "@/utils/calendar";
import CalendarTypeBar from "./calendarTypeBar";
import startTypeContext from "../../store/startType";

export default function Canlendar({
  unitClass,
  unit,
  showHead = true
}) {
  const [date, _] = useState(new Date());
  const {
    startType
  } = useContext(startTypeContext);

  // useEffect(() => {
  //   setDate(new Date());
  // }, []);

  const caculateDays = useMemo(() => {
    return [];
  }, []);

  return (
    <div className="text-sm p-3">
      {showHead && (
        <div className="mb-2">
          <div className="flex justify-between items-center">
            <div className="font-medium flex items-center gap-1">
              {date.getFullYear() + "年" + (date.getMonth() + 1) + "月"}
            </div>
            <div className="flex gap-1">
              <span className="canlendar-unit btn">{"<"}</span>
              <span className="canlendar-unit btn">{">"}</span>
            </div>
          </div>

          <div>
            <CalendarTypeBar />
          </div>
        </div>
      )}
      <div>
        {caculateDays &&
          caculateDays.map((item, index) => (
            <div key={index} className="flex justify-between mb-1">
              {item}
            </div>
          ))}
      </div>
    </div>
  );
}
