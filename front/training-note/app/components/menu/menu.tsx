import { Link } from "react-router-dom" 
type Menu = {
   name: string,
   to: string
}

export default function Menu(){
   const menu: Menu[] = [
      { name: 'カレンダー', to: 'calendar' },
      { name: 'トレーニング', to: 'training' },
      { name: 'はかる', to: 'measure'}
   ]
   return(
      <div className='w-full absolute bottom-0 pc:hidden'>
         <div className="flex justify-between items-center dark:bg-main-white rounded">
            {menu.map((item, i) => (
               <Link key={i} to={`/${item.to.toLowerCase()}`} className='flex flex-col justify-center items-center bg-base-2 text-white font-bold py-2 px-4 rounded'>
                  <img src={item.name + ".svg"} alt="" width={45} height={45} />
                  <p className="text-xs">{item.name}</p>
               </Link>
            ))}
         </div>
      </div>
   )
}