import { Authenticator } from "remix-auth";
import { sessionStorage } from "./session.server";
import { FormStrategy } from "remix-auth-form";
import { login } from "./login.server";

export const authenticator = new Authenticator<string>(sessionStorage);

authenticator.use(
   new FormStrategy(async ({ form }) => {
      const email = form.get("email");
      const emailPattern = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/;
      if (email === null) {
         const error = new Error("メールアドレスが入力されていません");
         throw error;
      }
      if (!emailPattern.test(String(email))) {
         throw new Error("メールアドレスの形式が正しくありません")
      }
      const userId = await login(String(email));
      return userId;
   }),
   "user-login"
);
