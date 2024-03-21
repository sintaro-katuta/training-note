import { useState } from "react";


export default function Measure() {
   const [weight, setWeight] = useState(60.0);
   const today = new Date();
   const month = today.getMonth() + 1;
   const date = today.getDate();
   const day = today.getDay();
   const weekDay = ["日", "月", "火", "水", "木", "金", "土"];
   return (
      <div className="w-full h-full flex flex-col gap-3 p-5">
         <p className="w-full h-1/6 text-4xl text-center">{month}月 {date}日 ({weekDay[day]})</p>
         <p className="w-full h-1/6 text-6xl text-center">{weight.toFixed(1)} kg</p>
         <div className="w-full h-1/5 border border-black rounded-full">
            <button className="w-1/4 h-full" onClick={() => setWeight(weight - 1)}>-1</button>
            <button className="w-1/4 h-full" onClick={() => setWeight(weight - 0.1)}>-0.1</button>
            <button className="w-1/4 h-full" onClick={() => setWeight(weight + 0.1)}>+0.1</button>
            <button className="w-1/4 h-full" onClick={() => setWeight(weight + 1)}>+1</button>
         </div>
         <div className="w-full flex items-center justify-center">
            <button className="w-32 h-32 bg-gradient-to-b from-primary to-[#37cba1] rounded-full text-white text-2xl font-bold">決定</button>
         </div>
      </div>
   );
}