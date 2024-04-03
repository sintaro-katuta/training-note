import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import Level from "../components/training/level";
import { useLoaderData, Link, useFetcher, redirect } from "@remix-run/react";
import { findAll } from "../services/training.server";
import { addOrUpdateCalendarEntry } from "../services/calendar.server";
import { authenticator } from "../services/auth.server";

type item = {
   thumbnail: string;
   title: string;
   level: string;
   id: string;
}

export async function loader({ request }: LoaderFunctionArgs) {
   await authenticator.isAuthenticated(request, {
      failureRedirect: "/login",
   });
   return await findAll();
}

export async function action({ request }: ActionFunctionArgs) {
   const user = await authenticator.isAuthenticated(request);
   const date = new Date(new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" }));
   const formData = await request.formData();
   const traingId = formData.get("traingId");
   if (user && traingId ){
      addOrUpdateCalendarEntry(user, date, undefined, traingId as string);
   }
   return redirect(`https://www.youtube.com/watch?v=${traingId}`)
}

export default function TrainingRoute() {
   const ytData = useLoaderData<typeof loader>();
   const fetcher = useFetcher();

   const insertTraining = async (traingId: string) => {
      const formData = new FormData();
      formData.append("traingId", traingId);
      fetcher.submit(formData, {
         method: "post",
      });
   }
   return (
      <div className="w-full h-body p-5 flex flex-col gap-5 overflow-y-auto">
         {ytData && ytData.map((item: item, index: number) => {
            return(
               <>
                  <div className="w-full pc:h-1/3 mobile:h-1/4 flex items-center justify-center border border-black cursor-pointer" key={index}>
                     <img src={item.thumbnail} alt="サムネイル" className=" object-contain h-full pc:w-1/4 mobile:w-1/3 mobile:p-3 pc:p-5" />
                     <div className="w-2/3 h-full flex flex-col items-start justify-start gap-10 pc:pt-8 mobile:pt-2 pc:px-5 mobile:px-3">
                        <div className="w-full flex items-center justify-between">
                           <Level level={item.level} />
                        </div>
                        <button className="pc:text-2xl mobile:text-sm text-blue-600 hover:underline" onClick={() => insertTraining(item.id)}>{item.title}</button>
                     </div>
                  </div>
               </>
            )
         })}
         <Link to={"add"}>
            <img src="/add.svg" alt="" className="absolute bottom-10 pc:right-10 mobile:right-5 mobile:bottom-28 pc:w-20 mobile:w-14" />
         </Link>
      </div>
   );
}
