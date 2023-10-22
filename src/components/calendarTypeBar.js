"use client";

export default function CalendarTypeBar({ type, ontypechange }) {
  return (
    <div
      className={`border border-gray-200 h-[24px] w-[64px] p-1 rounded text-sm relative`}
      title="切换每周开始时间"
    >
      <span
        className={`h-[20px] w-[30px] bg-blue-500 block rounded absolute transition-all
                top-[1px] ${type === 1 ? "left-[1px]" : "left-[31px]"}
                `}
      ></span>
      <span
        className={`h-[20px] w-[30px] leading-[20px] absolute
                top-[1px] left-[1px] ${
                  type === 1 ? "text-white " : "cursor-pointer "
                }
              text-center transition`}
        onClick={() => ontypechange(1)}
      >
        一
      </span>
      <span
        className={`h-[20px] w-[30px] leading-[20px] absolute
                top-[1px] left-[31px] ${
                  type === 0 ? "text-white " : "cursor-pointer "
                }
              text-center transition`}
        onClick={() => ontypechange(0)}
      >
        日
      </span>
    </div>
  );
}
