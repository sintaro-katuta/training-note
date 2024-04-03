import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import jaLocale from '@fullcalendar/core/locales/ja'; // 追加
import type { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { authenticator } from "../services/auth.server";
import { userCalendar } from "../services/calendar.server";

function getLevel(level: string) {
   switch (level) {
      case "きつい":
         return "#01A275";
      case "ハード":
         return "#FEF95D";
      case "不可能":
         return "#FE5D8A";
   }
}

export async function loader({ request }: LoaderFunctionArgs) {
   const user = await authenticator.isAuthenticated(request, {
      failureRedirect: "/login",
   });
   return userCalendar(user)
}

export default function Calendar() {
   const calendarData = useLoaderData<typeof loader>();
   const events = calendarData.flatMap((record) => {
      const eventList = [];
      if (record.weight) {
         eventList.push({
            id: record.id,
            title: record.weight + "kg",
            start: record.createdAt.split('T')[0],
            description: "体重",
            backgroundColor: "#0f83fd",
            borderColor: "#333333",
            editable: false,
         });
      }
      console.log(record.training)
      if (record.training) {
         eventList.push({
            id: record.training.id,
            title: record.training.level,
            start: record.createdAt.split('T')[0],
            description: record.training.title,
            backgroundColor: getLevel(record.training.level),
            borderColor: "#333333",
            editable: false,
         });
      }
      return eventList;
   });

   return (
      <>
         <div className="w-full h-body p-5">
            <FullCalendar
               plugins={[dayGridPlugin]}
               initialView="dayGridMonth"
               locales={[jaLocale]}
               locale="ja"
               height="100%"
               events={events}
               dayCellContent={
                  function(arg){
                     return arg.date.getDate();
                  }
               }
               headerToolbar={{
                  start: 'prev',
                  center: 'title',
                  end: 'next'
               }}
               views={{
                  dayGridMonth: {
                     titleFormat: { month: 'long' },
                  }
               }}
               buttonText={{
                  month: '月',
               }}
               buttonHints={{
                  prev: '前の$0',
                  next: '次の$0',
               }}
            />
         </div>
      </>
   );
}