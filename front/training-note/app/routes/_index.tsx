import type { MetaFunction } from "@remix-run/node";


export const meta: MetaFunction = () => {
  return [
    { title: "トレーニングノート" },
    { name: "training-note", content: "トレーニングをまとめよう！" },
  ];
};

export default function Index() {
  return (
    <div>
    </div>
  );
}
