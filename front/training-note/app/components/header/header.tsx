export default function Header() {
   return (
      <div className="iphone:hidden pc:block bg-main">
         <header className="flex items-center justify-between p-4 text-white">
            <a href="/" className="text-2xl font-bold">トレーニングノート</a>
            <nav>
               <ul className="flex space-x-4">
                  <li>
                     <a href="/regster">新規登録</a>
                  </li>
                  <li>
                     <a href="/login">ログイン</a>
                  </li>
               </ul>
            </nav>
         </header>
      </div>
   );
}