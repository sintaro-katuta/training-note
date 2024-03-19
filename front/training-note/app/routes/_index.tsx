import type { MetaFunction } from "@remix-run/node";
import Install from "../components/index/install";


export const meta: MetaFunction = () => {
  return [
    { title: "トレーニングノート" },
    { name: "training-note", content: "トレーニングをまとめよう！" },
  ];
};

export default function Index() {
  return (
    <div>
      <Install />
    </div>
  );
}
