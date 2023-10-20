"use client"
 
import * as React from "react"
import { useState } from "react"
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
 
export function DropdownMenuCheckboxes({nombreMenu, filtro, onCheckboxChange}) {
  const [showStatusBar, setShowStatusBar] = useState(true)
  const [showActivityBar, setShowActivityBar] = useState(false)
  const [showPanel, setShowPanel] = useState(false)
 
  const handleClickOption = (nombre) => {
    const updatedFiltro = filtro.map((opcion) => {
      if (opcion.nombre === nombre) {
        return { ...opcion, seleccionado: !opcion.seleccionado };
      } else {
        return opcion;
      }
    });
    onCheckboxChange(nombreMenu, updatedFiltro);
  };

  return (
    <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="outline">{nombreMenu}</Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-56">
      <DropdownMenuLabel>{nombreMenu}</DropdownMenuLabel>
      <DropdownMenuSeparator />

      {filtro.map((item) => (
          <div className="flex items-center" key={item.nombre}>
            <Checkbox
              checked={item.seleccionado}
              onCheckedChange={() => {
                handleClickOption(item.nombre);
              }}
            />
            <span>{item.nombre}</span>
          </div>
        ))}
    </DropdownMenuContent>
  </DropdownMenu>
  )
}