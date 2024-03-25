import Training from "../components/training/training";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { authenticator } from "../services/auth.server";

export async function loader({ request }: LoaderFunctionArgs) {
   return await authenticator.isAuthenticated(request, {
      failureRedirect: "/login",
   });
}

export default function TrainingRoute() {
   const data = {
      title: "【15分】バキバキの腹筋を作る鬼の15種目最強腹筋トレーニング！【超上級】",
      level: "きつい",
      play: 3,
      thumbnail: "/サムネイル.png"
   }
   return (
      <div className="w-full h-body p-5 flex flex-col gap-3">
         <Training title={data.title} level={data.level} play={data.play} thumbnail={data.thumbnail} />
         <Training title={data.title} level="ハード" play={data.play} thumbnail={data.thumbnail} />
         <Training title={data.title} level="不可能" play={data.play} thumbnail={data.thumbnail} />
      </div>
   );
}