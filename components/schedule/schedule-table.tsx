"use client";

import { useState } from "react";
import { format, addDays, startOfWeek } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScheduleCell } from "./schedule-cell";

// Define time slots
const timeSlots = Array.from({ length: 14 }, (_, i) => {
  const hour = 8 + i;
  return format(new Date().setHours(hour, 0), "h:mm a");
});

// Define days of the week
const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

// Get the start of the current week (Monday as the start)
const startOfCurrentWeek = startOfWeek(new Date(), { weekStartsOn: 1 });

// Map days to their corresponding dates
const daysWithDates = days.map((day, index) => {
  const date = addDays(startOfCurrentWeek, index);
  const formattedDate = format(date, "MMM dd");
  return { day, formattedDate };
});

export function ScheduleTable() {
  // State to manage rows for each day
  const [rows, setRows] = useState(
    daysWithDates.reduce((acc, { day }) => {
      acc[day] = [1]; // Initialize with one row per day
      return acc;
    }, {})
  );

  // Function to add a row for a specific day
  const addRow = (day) => {
    setRows((prev) => ({
      ...prev,
      [day]: [...prev[day], prev[day].length + 1], // Add a new row
    }));
  };

  // Function to remove a row for a specific day
  const removeRow = (day, rowId) => {
    setRows((prev) => ({
      ...prev,
      [day]: prev[day].filter((id) => id !== rowId), // Remove the row by ID
    }));
  };

  return (
    <div className="w-full max-w-[95vw] mx-auto p-4">
      <Tabs defaultValue={daysWithDates[0].day} className="w-full">
        <TabsList className="w-full justify-between mb-4">
          {daysWithDates.map(({ day, formattedDate }) => (
            <TabsTrigger key={day} value={day} className="flex-1">
              {day} ({formattedDate})
            </TabsTrigger>
          ))}
        </TabsList>
        {daysWithDates.map(({ day }) => (
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
                    <th className="border p-2 bg-muted text-muted-foreground font-medium text-sm">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rows[day].map((rowId) => (
                    <tr key={rowId}>
                      {timeSlots.map((time) => (
                        <td
                          key={time}
                          className="border p-2 h-24 align-top hover:bg-muted/50 transition-colors"
                        >
                          <ScheduleCell day={day} timeSlot={time} />
                        </td>
                      ))}
                      <td className="border p-2 h-24 align-top text-center">
                        <button
                          onClick={() => removeRow(day, rowId)}
                          className="p-1 bg-red-500 text-white rounded"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button
                onClick={() => addRow(day)}
                className="mt-4 p-2 bg-blue-500 text-white rounded"
              >
                Add Row
              </button>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
