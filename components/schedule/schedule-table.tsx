"use client";

import { useState } from "react";
import { format, addDays, startOfWeek } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScheduleCell } from "./schedule-cell";

// Define initial time slots
const initialTimeSlots = Array.from({ length: 14 }, (_, i) => {
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

// Define the type for rows
type RowsType = {
  [key: string]: number[];
};

export function ScheduleTable() {
  // State to manage rows for each day
  const [rows, setRows] = useState<RowsType>(
    daysWithDates.reduce((acc, { day }) => {
      acc[day] = [1]; // Initialize with one row per day
      return acc;
    }, {} as RowsType)
  );

  // State to manage time slots
  const [timeSlots, setTimeSlots] = useState(initialTimeSlots);

  // Function to add a row for a specific day
  const addRow = (day: string) => {
    setRows((prev) => ({
      ...prev,
      [day]: [...prev[day], prev[day].length + 1], // Add a new row
    }));
  };

  // Function to delete a row for a specific day
  const deleteRow = (day: string, rowId: number) => {
    setRows((prev) => ({
      ...prev,
      [day]: prev[day].filter((id) => id !== rowId), // Remove the specified row
    }));
  };

  // Function to edit a time slot
  const editTimeSlot = (index: number, newTime: string) => {
    setTimeSlots((prev) => {
      const updatedSlots = [...prev];
      updatedSlots[index] = newTime;
      return updatedSlots;
    });
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
                    {timeSlots.map((time, index) => (
                      <th
                        key={index}
                        className="border p-2 bg-muted text-muted-foreground font-medium text-sm"
                      >
                        <input
                          type="text"
                          value={time}
                          onChange={(e) => editTimeSlot(index, e.target.value)}
                          className="w-full p-1 bg-transparent border-b focus:outline-none focus:border-blue-500"
                        />
                      </th>
                    ))}
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
                      {/* Delete Row Button */}
                      <td className="border p-2">
                        <button
                          onClick={() => deleteRow(day, rowId)}
                          className="p-1 bg-red-500 text-white rounded"
                        >
                          Delete
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
