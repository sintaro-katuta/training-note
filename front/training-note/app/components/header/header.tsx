export default function Header() {
   return (
      <div className="w-full pc:block mobile:hidden bg-primary">
         <header className="flex items-center justify-center p-4 text-white">
            <a href="/" className="w-1/3 text-2xl font-bold">トレーニングノート</a>
            <div className="w-1/3 flex justify-center gap-10">
               <a href="/calendar">カレンダー</a>
               <a href="/training">トレーニング</a>               
               <a href="/measure">はかる</a>
            </div>
            <a href="/login" className="w-1/3 text-right">ログイン</a>
         </header>
      </div>
   );
}