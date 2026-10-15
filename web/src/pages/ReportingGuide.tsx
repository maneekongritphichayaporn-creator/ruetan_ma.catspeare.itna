import { FunctionComponent } from "react";
import Navbar from "../components/common/Navbar";
import BannerAOC from "../components/common/BannerAOC";
import Component6 from "../components/guide/Component6";
import Component9 from "../components/guide/Component9";
import Component11 from "../components/guide/Component11";
import Component12 from "../components/guide/Component12";
import Component13 from "../components/guide/Component13";
import Component14 from "../components/guide/Component14";
import Component15 from "../components/guide/Component15";
import Component16 from "../components/guide/Component16";
import Footer from "../components/common/Footer";

const ReportingGuide: FunctionComponent = () => {
  return (
    <div className="w-full relative bg-[#faf8f2] flex flex-col items-start leading-[normal] tracking-[normal]">
      <Navbar />
      <section className="self-stretch flex flex-col items-start">
        <BannerAOC />
      </section>
      <section className="self-stretch overflow-hidden flex flex-col items-start pt-7 px-20 pb-10 box-border gap-7 max-w-full text-left text-[0.813rem] text-[#65645e] font-['Noto_Sans_Thai'] mq750:pt-[1.25rem] mq750:px-[2.5rem] mq750:pb-[1.625rem] mq750:box-border">
        <section className="self-stretch overflow-hidden flex items-center gap-14 max-w-full lg:flex-wrap mq750:gap-[1.75rem]">
          <Component6 />
          <Component9 />
        </section>
        <Component11 />
      </section>
      <Component12 />
      <Component13 />
      <Component14 />
      <Component15 />
      <Component16 />
      <Footer />
    </div>
  );
};

export default ReportingGuide;
