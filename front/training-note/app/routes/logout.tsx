import type { LoaderFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { authenticator } from "../services/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
   return await authenticator.logout(request, {
      redirectTo: "/",
   });
}

export default function Logout() {
   return(
      <>
         <Outlet />
      </>
   )
}