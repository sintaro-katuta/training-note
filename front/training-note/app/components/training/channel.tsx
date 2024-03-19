type Props = {
   name: string;
   icon: string;
}

export default function Channel(props: Props) {
   return(
      <div className="flex gap-3 items-center justify-center"> 
         <img src={props.icon} alt="" className="mobile:hidden pc:block w-14 rounded-full" />
         <p className="mobile:text-xs">{props.name}</p>
      </div>
   )
}