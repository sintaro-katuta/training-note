type Props = {
   level: string;
}

export default function Level(props: Props) {
   const bgColor = (level: string) => {
      if(level === "きつい") return "bg-primary";
      if(level === "ハード") return "bg-secondary";
      if(level === "不可能") return "bg-tertiary";
   }
   return(
      <div className={`w-fit h-fit pc:text-4xl mobile:text-sm pc:border-2 mobile:border border-black flex items-center justify-center border-black-500 rounded-3xl px-5 ${bgColor(props.level)}`}>
         <p>{props.level}</p>
      </div>
   )
}