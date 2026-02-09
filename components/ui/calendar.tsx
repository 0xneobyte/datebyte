"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-6 bg-gradient-to-b from-white/50 to-pink-50/30 rounded-2xl backdrop-blur-sm", className)}
      classNames={{
        months: "flex flex-col sm:flex-row justify-center gap-8",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center mb-6",
        caption_label: "text-lg font-playfair font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-rose-500",
        nav: "space-x-2 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-8 w-8 bg-white/80 p-0 text-pink-600 hover:bg-pink-50 border-pink-200 hover:border-pink-300 transition-all duration-200"
        ),
        nav_button_previous: "absolute left-0",
        nav_button_next: "absolute right-0",
        table: "w-full border-collapse space-y-2",
        head_row: "flex gap-2",
        head_cell: "text-pink-600 font-playfair rounded-md w-9 font-semibold text-xs tracking-wide",
        row: "flex w-full gap-2",
        cell: cn(
          "relative p-0 text-center text-sm [&:has([aria-selected])]:rounded-xl"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-medium text-pink-700 hover:bg-pink-100 hover:text-pink-800 transition-all duration-150"
        ),
        day_range_start: "day-range-start",
        day_range_end: "day-range-end",
        day_selected: "bg-gradient-to-br from-pink-500 to-rose-500 text-white font-semibold shadow-lg shadow-pink-300/40 hover:from-pink-600 hover:to-rose-600",
        day_today: "text-pink-700 font-normal",
        day_outside: "text-pink-300/60",
        day_disabled: "text-pink-300/40 opacity-40",
        day_range_middle: "bg-pink-100/50 text-pink-700",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: () => <ChevronLeft className="h-5 w-5 text-pink-600" />,
        IconRight: () => <ChevronRight className="h-5 w-5 text-pink-600" />,
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
