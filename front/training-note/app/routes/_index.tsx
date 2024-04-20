import type { MetaFunction, LoaderFunctionArgs} from "@remix-run/node";
import { authenticator } from "../services/auth.server";
import Install from "../components/index/install";
import Footer from "../components/footer/footer";
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
          <p className="pc:text-3xl mobile:text-lg text-black">実のところ私はなかなか続けることができません</p>
          <p className="pc:text-3xl mobile:text-lg text-black">そんな私が作ったトレーニングノートを使ってみませんか？</p>
        </div>
        <img src="/12618_color.svg" alt="" className="pc:w-1/5 mobile:w-1/3" />
      </div>
      <p className="pc:text-5xl mobile:text-3xl text-center text-black">トレノートの特徴</p>
      <div className="w-full flex gap-5 items-center justify-center my-20">
        <div className="flex flex-col gap-3">
          <p className="pc:text-3xl mobile:text-xl text-black">・YouTubeの動画を検索してトレーニングを追加</p>
          <p className="pc:text-3xl mobile:text-xl text-black">・カレンダーにトレーニングを追加して管理</p>
          <p className="pc:text-3xl mobile:text-xl text-black">・体重を記録してグラフで確認</p>
        </div>
      </div>
      <div className="my-20">
        <p className="pc:text-6xl mobile:text-4xl text-center text-black">なんといっても</p>
        <p className="pc:text-7xl mobile:text-5xl text-center text-black">ずっと無料！</p>
      </div>
      <div className="my-20">
        <p className="pc:text-3xl mobile:text-lg text-center mt-10 text-black">誰しもが使いたいと思えるようなサービスを目指して作りましたので</p>
        <p className="pc:text-3xl mobile:text-lg text-center text-black">ぜひ使ってみてください！</p>
      </div>
      <div className="w-full flex items-center justify-center gap-28">
        <Install />
        <Link to={"/login"} className="bg-secondary text-black rounded-full pc:text-xl mobile:text-base p-3">ログイン</Link>
      </div>
      <Footer />
    </div>
  );
}
