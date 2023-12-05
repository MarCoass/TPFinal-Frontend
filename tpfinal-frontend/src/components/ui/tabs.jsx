"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      " cursor-pointer border-2 border-black font-bold transition-colors rounded-t-[5px] bg-lila-400 ",
      className
    )}
    {...props} />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      " w-full sm:w-min justify-between inline-flex items-center  whitespace-nowrap px-3  text-sm font-bold transition-all focus-visible:outline-none  disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-rosado-500  data-[state=active]:text-foreground md:data-[state=active]:border-t-2 md:data-[state=active]:border-x-2 data-[state=active]:border-2  border-black rounded-t-[5px]",
      className
    )}
    {...props} />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      " bg-lila-200 px-1.5 border-x-2 border-b-2 border-black rounded-b-[5px] ",
      className
    )}
    {...props} />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
