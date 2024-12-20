import Level from "./level";
import Title from "./title";

type Props = {
   title: string;
   level: string;
   url: string;
   add?: boolean;
   thumbnail: string;
}

export default function Training(props: Props) {
   
   return (
      <div className="w-full pc:h-1/3 mobile:h-1/4 flex items-center justify-center border border-black cursor-pointer">
         <img src={props.thumbnail} alt="サムネイル" className="pc:w-1/4 mobile:w-1/3 mobile:p-3 pc:p-5" />
         <div className="w-2/3 h-full flex flex-col items-start justify-start gap-3 pc:gap-10 pc:pt-8 mobile:pt-2 pc:px-5 mobile:px-3">
            <div className="w-full flex items-center justify-between">
               <Level level={props.level} />
            </div>
            <Title title={props.title} url={props.url} />
         </div>
      </div>
   );
}