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

function toDateString(date: Date): string {
   const year = date.getFullYear().toString();
   const month = (date.getMonth() + 1).toString().padStart(2, '0');
   const day = date.getDate().toString().padStart(2, '0');
   return `${year}-${month}-${day}`;
} 

export async function loader({ request }: LoaderFunctionArgs) {
   const user = await authenticator.isAuthenticated(request, {
      failureRedirect: "/login",
   });
   const calendarData = await userCalendar(user)
   const events = calendarData.flatMap((record) => {
      console.log(record)
      const eventList = [];
      if (record.weight) {
         eventList.push({
            id: record.id,
            title: record.weight + "kg",
            start: toDateString(new Date(record.createdAt)),
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
            start: toDateString(new Date(record.createdAt)),
            description: record.training.title,
            backgroundColor: getLevel(record.training.level),
            borderColor: "#333333",
            editable: false,
         });
      }
      return eventList;
   });
   return events;
}

export default function Calendar() {
   const events = useLoaderData<typeof loader>();
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