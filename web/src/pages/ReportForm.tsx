import { FunctionComponent } from "react";
import Navbar from "../components/common/Navbar";
import BannerAOC from "../components/common/BannerAOC";
import Component7 from "../components/report/Component7";
import Component3 from "../components/report/Component3";
import Component5 from "../components/report/Component5";
import Component8 from "../components/report/Component8";
import Footer from "../components/common/Footer";

const ReportForm: FunctionComponent = () => {
  return (
    <div className="w-full relative bg-[#faf8f2] flex flex-col items-start leading-[normal] tracking-[normal]">
      <Navbar />
      <section className="self-stretch flex flex-col items-start max-w-full">
        <BannerAOC />
      </section>
      <Component7 />
      <main className="relative w-full overflow-hidden flex items-start justify-center flex-wrap content-start pt-0 px-20 pb-15 box-border gap-8 max-w-full mq750:gap-[1rem] mq750:px-[2.5rem]">
        <Component3 />
        <section className="flex-[1.0803] overflow-hidden flex flex-col items-start gap-5 min-w-77.5 max-w-90 text-left text-[1.313rem] text-white font-['Noto_Sans_Thai'] mq750:max-w-full">
          <Component5 />
          <Component8 />
          <div className="self-stretch rounded-[20px] bg-[#191919] overflow-hidden flex flex-col items-start p-6 gap-3.5">
            <img
              className="cursor-pointer [border:none] p-0 bg-transparent w-7 h-7 relative"
              alt=""
              src="/share/file-check-2.svg"
            />
            <h3 className="m-0 self-stretch relative text-[length:inherit] leading-[145%] font-bold font-[inherit] mq450:text-[1.063rem] mq450:leading-[1.5rem]">
              ต้องการแจ้งความ?
            </h3>
            <div className="w-full relative text-[0.875rem] leading-[170%] text-[#c7c7be] inline-block max-w-78">
              เข้าเว็บไซต์ Thai Police Online ด้วยตนเอง
              ตรวจสอบโดเมนให้ถูกต้องก่อนใช้
            </div>
            <a
              className="self-stretch relative text-[0.938rem] font-bold text-[#ffd43b] [text-decoration:none]"
              href="https://thaipoliceonline.go.th/"
              target="_blank"
            >
              thaipoliceonline.go.th ↗
            </a>
            <div className="self-stretch h-[0.063rem] relative bg-[#45453f]" />
            <div className="w-full relative text-[0.813rem] leading-[170%] inline-block max-w-78">
              หากเพิ่งโอนเงิน ติดต่อธนาคารทันที และโทร AOC 1441
              ก่อนส่งเรื่องที่นี่
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ReportForm;
