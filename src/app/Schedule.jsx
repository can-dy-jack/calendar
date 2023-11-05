"use client";

import {useState, useMemo, useContext, useEffect} from "react";
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
  const [first_date, setFirstDate] = useState(new Date());
  const [date, _] = useState(new Date());

  useEffect(() => {
    let cur_year = date.getFullYear();
    let cur_month = date.getMonth();
    setFirstDate(new Date(cur_year, cur_month, 1));
  }, [date]);

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
    let day = first_date.getDay() === 0 ? 7 : first_date.getDay();
    let currentDay = startType === 1 ? 1 : 7;
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
                className={`unit unit-day text-gray-400 text-lg ${'day' + currentDay}`}
                key={cur_month - 1 + "-" + start}
              >
                {start}
              </div>
            );
            start++;
          } else {
            isBefore = false;
            currentDay === 1 ? currentDay = 7 : currentDay--;
            i--;
          }
        } else if (cnt > month_max_days[1]) {
          temp.push(
            <div
              data-month={cur_month + 1}
              className={`unit unit-day text-gray-400 text-lg ${'day' + currentDay}`}
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
                  ? `unit unit-day ${'day' + currentDay} text-blue-900 text-lg today`
                  : `unit unit-day text-lg ${'day' + currentDay} `
              }
              key={cur_month + "-" + cnt}
            >
              {cnt}
            </div>
          );
          cnt++;
        }

        if (currentDay >= 7) {
          currentDay = 1;
        } else {
          currentDay++;
        }
      }
      ans.push(temp);
    }
    return ans;
  }, [date, startType, first_date]);

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
