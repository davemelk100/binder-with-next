"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ScheduleEvent, ScheduleState } from "@/lib/types/schedule";

interface ScheduleStore extends ScheduleState {
  updateEvent: (event: ScheduleEvent) => void;
  deleteEvent: (eventId: string) => void;
  getEventByDayAndTime: (day: string, timeSlot: string) => ScheduleEvent | undefined;
}

export const useScheduleStore = create<ScheduleStore>()(
  persist(
    (set, get) => ({
      events: {},
      updateEvent: (event) => {
        set((state) => ({
          events: {
            ...state.events,
            [`${event.day}-${event.timeSlot}`]: event,
          },
        }));
      },
      deleteEvent: (eventId) => {
        set((state) => {
          const newEvents = { ...state.events };
          delete newEvents[eventId];
          return { events: newEvents };
        });
      },
      getEventByDayAndTime: (day, timeSlot) => {
        return get().events[`${day}-${timeSlot}`];
      },
    }),
    {
      name: "schedule-storage",
    }
  )
);