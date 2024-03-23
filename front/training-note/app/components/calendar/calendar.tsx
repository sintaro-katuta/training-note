import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import jaLocale from '@fullcalendar/core/locales/ja'; // 追加

export default function Calendar() {
   return (
      <div className="w-full h-body p-5">
         <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            locales={[jaLocale]}
            locale="ja"
            height="100%"
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
   )
}