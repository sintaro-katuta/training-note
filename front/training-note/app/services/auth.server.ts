import { Authenticator } from "remix-auth";
import { sessionStorage } from "./session.server";
import { FormStrategy } from "remix-auth-form";
import { login } from "./login.server";

export const authenticator = new Authenticator<string>(sessionStorage);

authenticator.use(
   new FormStrategy(async ({ form }) => {
      const email = form.get("email");
      const userId = await login(String(email));
      return userId;
   }),
   "user-login"
);
