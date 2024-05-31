import { Link } from "react-router-dom" 
export default function Menu(){
   const menu: string[] = [
      'calendar', 'training', 'measure',
   ]
   return(
      <div className='w-full pc:hidden'>
         <div className="flex justify-between items-center dark:bg-main-white rounded">
            {menu.map((item, i) => (
               <Link key={i} to={`/${item.toLowerCase()}`} className='flex flex-col justify-center items-center bg-base-2 text-white font-bold py-2 px-4 rounded'>
                  <img src={`/${item}.svg`} alt="" width={45} height={45} />
                  <p className="text-xs text-black">{item}</p>
               </Link>
            ))}
         </div>
      </div>
   )
}