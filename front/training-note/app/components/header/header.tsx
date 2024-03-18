export default function Header() {
   return (
      <div className="w-full pc:block mobile:hidden bg-primary">
         <header className="flex items-center justify-between p-4 text-white">
            <a href="/" className="text-2xl font-bold">トレーニングノート</a>
            <div className="flex gap-10">
               <a href="/calendar">カレンダー</a>
               <a href="/training">トレーニング</a>               
               <a href="/measure">はかる</a>
            </div>
            <a href="/login">ログイン</a>
         </header>
      </div>
   );
}