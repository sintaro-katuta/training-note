type Props = {
   title: string;
}

export default function Title(props: Props) {
   return(
      <>
         <a href="/" className="pc:text-2xl mobile:text-sm text-blue-600 hover:underline">
            {props.title}
         </a>
      </>
   )
}