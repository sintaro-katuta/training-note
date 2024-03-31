import type { LoaderFunctionArgs } from "@remix-run/node";
import Title from "../components/training/title";
import Level from "../components/training/level";
import { useLoaderData, Link } from "@remix-run/react";
import { findAll } from "../services/training.server";
import { authenticator } from "../services/auth.server";


export async function loader({ request }: LoaderFunctionArgs) {
   await authenticator.isAuthenticated(request, {
      failureRedirect: "/login",
   });
   return await findAll();
}

export async function action({ request }: ActionFunctionArgs) {
   return "ok"
}

export default function TrainingRoute() {
   const ytData: any = useLoaderData();
   return (
      <div className="w-full h-body p-5 flex flex-col gap-5 overflow-y-auto">
         {ytData && ytData.map((item: ytData, index: number) => {
            return(
               <>
                  <div className="w-full pc:h-1/3 mobile:h-1/4 flex items-center justify-center border border-black cursor-pointer">
                     <img src={item.thumbnail} alt="サムネイル" className=" object-contain h-full pc:w-1/4 mobile:w-1/3 mobile:p-3 pc:p-5" />
                     <div className="w-2/3 h-full flex flex-col items-start justify-start gap-3 pc:gap-10 pc:pt-8 mobile:pt-2 pc:px-5 mobile:px-3">
                        <div className="w-full flex items-center justify-between">
                           <Level level={item.level} />
                        </div>
                        <Title title={item.title} url={item.id} />
                     </div>
                  </div>
               </>
            )
         })}
         <Link to={"add"}>
            <img src="/add.svg" alt="" className="absolute bottom-10 pc:right-10 mobile:right-5 mobile:bottom-20 pc:w-20 mobile:w-14" />
         </Link>
      </div>
   );
}