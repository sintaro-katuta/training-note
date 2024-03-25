import { Link } from "@remix-run/react";

export default function Header() {
   return (
      <div className="w-full pc:block mobile:hidden bg-primary">
         <header className="flex items-center justify-between p-4 text-white">
            <Link to={"/"} className="text-2xl font-bold">トレノート</Link>
            <div className="flex justify-center gap-10">
               <Link to={"/calendar"}>カレンダー</Link>
               <Link to={"/training"}>トレーニング</Link>               
               <Link to={"/measure"}>はかる</Link>
            </div>
            <div className="flex gap-2">
               <Link to={"/login"} className="bg-secondary text-black rounded-full p-2">ログイン</Link>
               <Link to={"/logout"} className="bg-tertiary text-black rounded-full p-2">ログアウト</Link>
            </div>
         </header>
      </div>
   );
}