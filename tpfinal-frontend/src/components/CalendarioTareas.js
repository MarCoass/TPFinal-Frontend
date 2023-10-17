import { Calendar } from '@/components/ui/calendar'
import { useState } from 'react'


export default function CalendarioTareas() {
    /* const [date, setDate] = (useState < Date) | (undefined > new Date()) */

    return (
        <Calendar
            mode="single"
           
            className="rounded-md border"
        />
    )
}
