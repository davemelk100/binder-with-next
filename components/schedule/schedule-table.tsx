"use client";

import { format } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScheduleCell } from "./schedule-cell";

const timeSlots = Array.from({ length: 14 }, (_, i) => {
  const hour = 8 + i;
  return format(new Date().setHours(hour, 0), "h:mm a");
});

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export function ScheduleTable() {
  return (
    <div className="w-full max-w-[95vw] mx-auto p-4">
      <Tabs defaultValue={days[0]} className="w-full">
        <TabsList className="w-full justify-between mb-4">
          {days.map((day) => (
            <TabsTrigger key={day} value={day} className="flex-1">
              {day}
            </TabsTrigger>
          ))}
        </TabsList>
        {days.map((day) => (
          <TabsContent key={day} value={day}>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    {timeSlots.map((time) => (
                      <th
                        key={time}
                        className="border p-2 bg-muted text-muted-foreground font-medium text-sm"
                      >
                        {time}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {timeSlots.map((time) => (
                      <td
                        key={time}
                        className="border p-2 h-24 align-top hover:bg-muted/50 transition-colors"
                      >
                        <ScheduleCell day={day} timeSlot={time} />
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}