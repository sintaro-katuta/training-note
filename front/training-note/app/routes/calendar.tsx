import CalendarList from "../components/calendar/calendar";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { authenticator } from "../services/auth.server";

export async function loader({ request }: LoaderFunctionArgs) {
   return await authenticator.isAuthenticated(request, {
      failureRedirect: "/login",
   });
}

export default function Calendar() {
   return (
      <>
         <CalendarList />
      </>
   );
}