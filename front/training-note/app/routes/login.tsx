import { Form } from "@remix-run/react"
import type { ActionFunctionArgs } from "@remix-run/node"
import { authenticator } from "../services/auth.server"

export default function Login() {
   return(
      <>
         <Form method="post" className="w-full h-body flex flex-col gap-5 p-5 items-center justify-center">
            <label htmlFor="email" className="text-xl">メール</label>
            <input type="email" name="email" required className="w-full border rounded text-2xl" />
            <button className="bg-primary w-fit text-xl rounded-full p-3 mt-10">ログイン</button>
         </Form>
      </>
   )
}

export async function action({request}: ActionFunctionArgs) {
   await authenticator.authenticate("user-login", request,{
      successRedirect: "/",
      failureRedirect: "/login",
   })
}