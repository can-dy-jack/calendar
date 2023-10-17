"use client";

import { useMemo, useState } from "react";
import { month_size } from "@/utils/calendar";

export default function Canlendar({ unitClass, unit, showHead = true }) {
  const [date, setDate] = useState(new Date("2023-09"));

  // useEffect(() => {
  //   setDate(new Date());
  // }, []);

  const caculateDays = useMemo(() => {
    const head = ["一", "二", "三", "四", "五", "六", "日"];
    const ans = [];
    ans.push(
      head.map((item) => (
        <span className={unitClass} key={item}>
          {item}
        </span>
      ))
    );

    let cur_month = date.getMonth();
    let cnt = 1,
      nextCnt = 1;
    let month_max_days = month_size.slice(cur_month - 1, cur_month + 1);
    let day = date.getDay() === 0 ? 7 : date.getDay();
    let isBefore = day > 1;
    let start = month_max_days[0] - day + 2;
    while (cnt <= month_max_days[1]) {
      let temp = [];
      for (let i = 0; i < 7; i++) {
        if (isBefore) {
          if (start <= month_max_days[0]) {
            temp.push(
              <span
                data-month={cur_month - 1}
                className={`${unitClass} ${unit} text-gray-500`}
                key={cur_month - 1 + "-" + start}
              >
                {start}
              </span>
            );
            start++;
          } else {
            isBefore = false;
            i--;
          }
        } else if (cnt > month_max_days[1]) {
          temp.push(
            <span
              data-month={cur_month + 1}
              className={`${unitClass} ${unit} text-gray-500`}
              key={cur_month + 1 + "-" + nextCnt}
            >
              {nextCnt}
            </span>
          );
          nextCnt++;
        } else {
          temp.push(
            <span
              data-month={cur_month}
              className={
                date.getDate() === cnt
                  ? `${unitClass} ${unit} bg-blue-500 text-white hover:bg-blue-400`
                  : `${unitClass} ${unit}`
              }
              key={cur_month + "-" + cnt}
            >
              {cnt}
            </span>
          );
          cnt++;
        }
      }
      ans.push(temp);
    }
    return ans;
  }, [date, unitClass, unit]);

  return (
    <div className="text-sm p-3">
      {showHead && (
        <div className="flex justify-between mb-2 items-center">
          <div className="font-medium">
            {date.getFullYear() + "年" + (date.getMonth() + 1) + "月"}
          </div>
          <div className="flex gap-1">
            <span className="canlendar-unit btn">{"<"}</span>
            <span className="canlendar-unit btn">{">"}</span>
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
