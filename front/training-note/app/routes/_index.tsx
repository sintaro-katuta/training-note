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
    <div className="w-full h-body">
      <Install />
      <div className="flex">
        <Link to={"/login"} className="bg-secondary text-black rounded-full p-2">ログイン</Link>
      </div>
    </div>
  );
}
