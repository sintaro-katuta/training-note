type Props = {
   value: number;
}

export default function Play(props: Props) {
   return(
      <div className="flex items-center justify-center gap-2">
         <img src="/loop.svg" alt="" className="pc:w-5 mobile:w-3" />
         <p className="pc:text-xl mobile:text-sm">{props.value}</p>
      </div>
   )
}