/* eslint-disable @next/next/no-img-element */
import React from "react";

const Rectangle = ({ className }) => {
  return (
    <div
    className={`w-[373px] h-[47px] bg-[#0c0909] rounded-lg shadow-[1px_4px_4px_#00000040] ${className}`}
  >
    <div className="relative h-[47px] bg-[#f3eded]">
      <img
        src="/search.svg"
        className="absolute w-[41px] h-[39px] top-1 left-[13px]"
        alt="Search"
      />
      <div className="absolute w-[191px] top-3 left-[63px] [font-family:'Inter-Italic',Helvetica] font-normal italic text-[#b7bac1] text-xl tracking-[0] leading-[normal] whitespace-nowrap">
        Search for theses...
      </div>
    </div>
  </div>
  
  );
};

export { Rectangle }