"use client"

import * as React from "react"
import { useState, useEffect } from "react"
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
import Badge from "./Badge"

export function DropdownMenuCheckboxes({ nombreMenu, filtro, onCheckboxChange }) {
  const [showStatusBar, setShowStatusBar] = useState(true)
  const [showActivityBar, setShowActivityBar] = useState(false)
  const [showPanel, setShowPanel] = useState(false)
  const [isFilterSelected, setIsFilterSelected] = useState(false);

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

  useEffect(() => {
    const anyFilterSelected = filtro.some(f => f.seleccionado);
    setIsFilterSelected(anyFilterSelected);
  }, [filtro]);


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="static">
          <Button variant="outline" className="static border border-green rounded z-0">
            {nombreMenu}
            {isFilterSelected && (
              <Badge className="absolute top-2 right-2 z-10" />
            )}
          </Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-white">
        <DropdownMenuLabel>{nombreMenu}</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {filtro.map((item) => (
          <div className="flex items-center" key={item.nombre}>
            <Checkbox role='menuitemcheckbox'
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