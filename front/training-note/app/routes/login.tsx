import { Form, useActionData } from "@remix-run/react"
import type { ActionFunctionArgs, } from "@remix-run/node"
import { authenticator } from "../services/auth.server"

export async function action({ request }: ActionFunctionArgs) {
   return await authenticator.authenticate("user-login", request, {
      successRedirect: "/",
      failureRedirect: "/login",
   })
}

export default function Login() {
   const error = useActionData<typeof action>();
   return(
      <>
         <Form method="post" className="w-full h-body flex flex-col gap-5 p-5 items-center justify-center">
            <p className="text-lg text-tertiary">{ error }</p>
            <label htmlFor="email" className="text-xl">メールアドレス</label>
            <input type="text" name="email" required className="pc:w-1/3 mobile:w-4/5 h-10 border rounded pc:text-2xl mobile:text-xl" />
            <button className="bg-primary w-fit text-xl rounded-full p-3 mt-10">ログイン</button>
         </Form>
      </>
   )
}
