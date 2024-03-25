import { Form } from "@remix-run/react"
import type { ActionFunctionArgs } from "@remix-run/node"
import { authenticator } from "../services/auth.server"

export default function Login() {
   return(
      <>
         <Form method="post" className="w-full h-body flex flex-col gap-5 p-5 items-center justify-center">
            <label htmlFor="email" className="text-xl">メール</label>
            <input type="email" name="email" required className="border rounded text-2xl" />
            <label htmlFor="password" className="text-xl">パスワード</label>
            <input type="password" name="password" autoComplete="current-password" required className="border rounded text-2xl" />
            <button className="bg-primary w-fit text-xl rounded-full p-3 mt-10">ログイン</button>
         </Form>
      </>
   )
}

export async function action({request}: ActionFunctionArgs) {
   return await authenticator.authenticate("user-login", request,{
      successRedirect: "/",
      failureRedirect: "/login",
   })
}