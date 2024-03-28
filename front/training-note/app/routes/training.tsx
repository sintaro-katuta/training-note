import type { LoaderFunctionArgs } from "@remix-run/node";
import Training from "../components/training/training";
import { useLoaderData } from "@remix-run/react";
import axios from "axios";
import { authenticator } from "../services/auth.server";

type ytData = {
   title: string;
   level: string;
   url: string;
   play: number;
   thumbnail: string;

}

export async function loader({ request }: LoaderFunctionArgs) {
   await authenticator.isAuthenticated(request, {
      failureRedirect: "/login",
   });

   const url = `https://www.googleapis.com/youtube/v3/search?type=video&part=snippet&q=筋トレ&maxResults=10&key=${process.env.YOUTUBE_API_KEY}`;

   const response = await axios.get(url)
      .then((res) => {
         console.log("then", res.data.items)
         return res.data.items
      })
      .catch((error) => {
         console.log("error")
         return error
      })
   return response
}

export default function TrainingRoute() {
   const ytData = useLoaderData();
   console.log(ytData)
   return (
      <div className="w-full h-body p-5 flex flex-col gap-5 overflow-y-auto">
         {ytData && ytData.map((item: ytData, index: number) => {
            return(
               <Training key={index} title={item.snippet.title} url={item.id.videoId} level="きつい" play={3} thumbnail={item.snippet.thumbnails.high.url} />
            )
         })}
      </div>
   );
}