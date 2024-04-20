import type { ActionFunctionArgs } from "@remix-run/node";
import { authenticator } from "../services/auth.server";
import { create } from "../services/training.server";
import { useFetcher, useActionData, Form, redirect } from "@remix-run/react";
import Level from "../components/training/level";
import Title from "../components/training/title";
import React, { useState } from "react";
import axios from "axios";

type item = {
   thumbnail: string;
   contentDetails: {
      duration: string;
   };
   snippet: {
      title: string;
      thumbnails: {
         high: {
            url: string;
         }
      }
   }
}

export async function action({ request }: ActionFunctionArgs) {
   await authenticator.isAuthenticated(request, {
      failureRedirect: "/login",
   });

   const formData = await request.formData();
   const trigger = formData.get("trigger");
   if(trigger === "api"){
      const videoId = formData.get("videoId");
   
      const url = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet,statistics,contentDetails&key=${process.env.YOUTUBE_API_KEY}`;
   
      const response = await axios.get(url)
         .then((res) => {
            return res.data.items
         })
         .catch((error) => {
            console.log("error")
            return error
         })
      return response
   }else{

      const id = formData.get("id");
      const title = formData.get("title");
      const level = formData.get("level");
      const thumbnail = formData.get("thumbnail");
      const play = formData.get("play");

      await create(String(id), String(title), String(level), String(thumbnail), Number(play));

      return redirect("/training");
   }
}

export default function TrainingAdd() {
   const ytData = useActionData<typeof action>();
   const fetcher = useFetcher();

   const [videoId, setVideoId] = useState("");
   const [trigger, setTrigger] = useState("api");

   function extractVideoId(url: string): string | undefined {
      const regExp = /^.*(youtu.be\/|youtube.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^#&?]*).*/;
      const match = url.match(regExp);
      return match && match[2].length === 11 ? match[2] : undefined;
   }

   const getVideoId = (e: React.FormEvent<HTMLInputElement>) => {
      const id = extractVideoId(e.currentTarget.value)
      if(id){
         console.log(id)
         setVideoId(id);
      }
   }

   function parseTime(timeString: string) {
      const timeParts = timeString.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
      const hours = timeParts && timeParts[1] ? parseInt(timeParts[1], 10) : 0;
      const minutes = timeParts && timeParts[2] ? parseInt(timeParts[2], 10) : 0;
      const seconds = timeParts && timeParts[3] ? parseInt(timeParts[3], 10) : 0;
      return { hours, minutes, seconds };
   }

   const getLevel = (time: string) => {
      const { hours, minutes, seconds } = parseTime(time);
      console.log("time", hours, minutes, seconds)
      if(minutes < 5) {
         return "きつい"
      } else if(minutes < 10) {
         return "ハード"
      } else {
         return "不可能"
      }
   }

   const insertTraining = () => {
      console.log("insert")
      setTrigger("insert");

      const id = videoId;
      const title = ytData[0].snippet.title;
      const level = getLevel(ytData[0].contentDetails.duration);
      const thumbnail = ytData[0].snippet.thumbnails.high.url;
      const play = 0;

      const formData = new FormData();

      formData.append("id", id);
      formData.append("title", title);
      formData.append("level", level);
      formData.append("thumbnail", thumbnail);
      formData.append("play", String(play));

      fetcher.submit(formData, {
         method: "post",
      });
   }
   return(
      <div className="w-full h-body p-5">
         <Form method="post" className="flex items-center justify-center gap-2 shadow-lg rounded-xl">
         <input type="text" className="w-5/6 mobile:h-20 mobile:text-xl rounded-xl focus:outline-none" name="URL" placeholder="URL" onChange={(e) =>  getVideoId(e)} />
            <input type="hidden" name="videoId" value={videoId} />
            <input type="hidden" name="trigger" value={trigger} />
            <button className="w-fit text-xl">検索</button>
         </Form>
         <div className="w-full h-full flex items-center justify-center">
         {ytData && ytData.map((item: item, index: number) => {
            return(
               <>
                  <div className="w-full pc:h-1/2 mobile:h-1/4 flex items-center justify-center border border-black" key={index}>
                  <img src={item.snippet.thumbnails.high.url} alt="サムネイル" className=" object-contain h-full pc:w-1/4 mobile:w-1/3 mobile:p-3 pc:p-5" />
                     <div className="w-2/3 h-full flex flex-col items-start justify-start gap-3 pc:gap-10 pc:pt-8 mobile:pt-2 pc:px-5 mobile:px-3">
                        <div className="w-full flex items-center justify-between">
                           <Level level={getLevel(item.contentDetails.duration)} />
                           <button onClick={() => insertTraining()}>
                              <img src="/add.svg" alt="" className="cursor-pointer" width={40} height={40} />
                           </button>
                        </div>
                        <Title title={item.snippet.title} url={videoId} />
                     </div>
                  </div>
               </>
            )
         })}
         </div>
      </div>
   )
}
