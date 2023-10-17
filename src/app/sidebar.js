import Image from "next/image";
import Button from "@/components/button";
import Canlendar from "@/components/canlendar";

export default function SideBar(props) {
  return (
    <aside
      className={`bg-white border border-r-slate-300 h-screen transition-all ease-[cubic-bezier(0.95,0.05,0.795,0.035)] ${
        props.close ? "w-0 p-0" : "w-72 p-2"
      } overflow-hidden`}
    >
      <section className="p-3 flex items-center gap-2">
        <Image
          width={28}
          height={28}
          src="/svg/canlendar.svg"
          alt="canlendar"
        />
        <h1 className="text-lg font-bold font-sans">Calendar</h1>
      </section>
      <section className="p-3 flex items-center">
        <Button>+ 添加日程</Button>
      </section>
      <section>
        <Canlendar unitClass={"canlendar-unit"} unit={"btn"} />
      </section>
      <section></section>
    </aside>
  );
}
