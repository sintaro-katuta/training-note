import type { MetaFunction, LoaderFunctionArgs} from "@remix-run/node";
import { authenticator } from "../services/auth.server";
import Install from "../components/index/install";
import { Link } from "@remix-run/react";


export const meta: MetaFunction = () => {
  return [
    { title: "トレーニングノート" },
    { name: "training-note", content: "トレーニングをまとめよう！" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  return await authenticator.isAuthenticated(request, {
    successRedirect: "/training",
  });
}

export default function Index() {
  return (
    <div className="w-full h-body p-5 overflow-y-auto">
      <p className="pc:text-7xl mobile:text-xl text-center my-10">ダイエット続いたことありますか？</p>
      <div className="w-full flex gap-5 items-center justify-center my-20">
        <div className="flex flex-col gap-3">
          <p className="pc:text-3xl mobile:text-lg">実のところ私はなかなか続けることができません</p>
          <p className="pc:text-3xl mobile:text-lg">そんな私が作ったトレーニングノートを使ってみませんか？</p>
        </div>
        <img src="/12618_color.svg" alt="" className="pc:w-1/5 mobile:w-1/3" />
      </div>
      <p className="pc:text-5xl mobile:text-3xl text-center">トレノートの特徴</p>
      <div className="w-full flex gap-5 items-center justify-center my-20">
        <div className="flex flex-col gap-3">
          <p className="pc:text-3xl mobile:text-xl">・YouTubeの動画を検索してトレーニングを追加</p>
          <p className="pc:text-3xl mobile:text-xl">・カレンダーにトレーニングを追加して管理</p>
          <p className="pc:text-3xl mobile:text-xl">・体重を記録してグラフで確認</p>
        </div>
      </div>
      <div className="my-20">
        <p className="text-6xl text-center">なんといっても</p>
        <p className="text-7xl text-center">ずっと無料！</p>
      </div>
      <div className="my-20">
        <p className="pc:text-3xl mobile:text-lg text-center mt-10">誰しもが使いたいと思えるようなサービスを目指して作りましたので</p>
        <p className="pc:text-3xl mobile:text-lg text-center">ぜひ使ってみてください！</p>
      </div>
      <div className="w-full flex items-center justify-center gap-28">
        <Install />
        <Link to={"/login"} className="bg-secondary text-black rounded-full p-2">ログイン</Link>
      </div>
    </div>
  );
}
