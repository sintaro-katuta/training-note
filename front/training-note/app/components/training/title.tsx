type Props = {
   title: string;
   url: string;
}

export default function Title(props: Props) {
   return(
      <>
         <a href={`https://www.youtube.com/watch?v=${props.url}`} className="pc:text-2xl mobile:text-sm text-blue-600 hover:underline">
            {props.title}
         </a>
      </>
   )
}