"use client";

import { useState, useMemo, useContext } from "react";
import { month_size } from "@/utils/calendar";
import startTypeContext from "../../store/startType";
import "./Schedule.css";

export default function Schedule(props) {
  const [view, setView] = useState("month");

  return (
    <article className="h-full">
      {view === "month" ? (
        <MonthCalendar />
      ) : (
        <DayCalendar />
      )}
    </article>
  );
}

export function MonthCalendar() {
  const {
    startType
  } = useContext(startTypeContext);
  const [date, setDate] = useState(new Date());

  const caculateDays = useMemo(() => {
    const head =
      startType === 1
        ? ["一", "二", "三", "四", "五", "六", "日"]
        : ["日", "一", "二", "三", "四", "五", "六"];
    const ans = [];
    ans.push(
      head.map((item) => (
        <span className="unit" key={item}>
          {"周" + item}
        </span>
      ))
    );

    let cur_month = date.getMonth();
    let cnt = 1,
      nextCnt = 1;
    let month_max_days = month_size.slice(cur_month - 1, cur_month + 1);
    let day = date.getDay() === 0 ? 7 : date.getDay();
    let isBefore = startType === 1 ? day > 1 : day < 7;
    let start =
      startType === 1
        ? month_max_days[0] - day + 2
        : day === 7
        ? 0
        : month_max_days[0] - day + 1;
    while (cnt <= month_max_days[1]) {
      let temp = [];
      for (let i = 0; i < 7; i++) {
        if (isBefore) {
          if (start <= month_max_days[0]) {
            temp.push(
              <div
                data-month={cur_month - 1}
                className={`unit unit-day text-gray-300`}
                key={cur_month - 1 + "-" + start}
              >
                {start}
              </div>
            );
            start++;
          } else {
            isBefore = false;
            i--;
          }
        } else if (cnt > month_max_days[1]) {
          temp.push(
            <div
              data-month={cur_month + 1}
              className={`unit unit-day text-gray-300`}
              key={cur_month + 1 + "-" + nextCnt}
            >
              {nextCnt}
            </div>
          );
          nextCnt++;
        } else {
          temp.push(
            <div
              data-month={cur_month}
              className={
                date.getDate() === cnt
                  ? `unit unit-day bg-blue-500 text-white hover:bg-blue-400`
                  : `unit unit-day`
              }
              key={cur_month + "-" + cnt}
            >
              {cnt}
            </div>
          );
          cnt++;
        }
      }
      ans.push(temp);
    }
    return ans;
  }, [date, startType]);

  return (
    <section className="h-full month-calendar flex flex-col">
      {caculateDays &&
        caculateDays.map((item, index) => (
          <div
            key={index}
            className="flex justify-between"
            style={{
              flex: index > 0 ? "1" : "0 0 30px",
              borderBottom: index === 0 ? "1px solid #e2e8f0" : "none",
              boxShadow: index === 0 ? "0 2px 5px 0 rgba(0,0,0,0.05)" : "none",
            }}
          >
            {item}
          </div>
        ))}
    </section>
  );
}

export function DayCalendar() {
  return <section className="day-calendar">{/*  */}</section>;
}
