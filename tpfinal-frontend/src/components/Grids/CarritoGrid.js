import React from "react";
import { NeoButtonChico, NeoButtonMini } from "../Button";
import { Plus, Trash2, Minus } from 'lucide-react'

const CarritoGrid = ({ data }) => {
  const urlBase = process.env.NEXT_PUBLIC_BACKEND_URL + '/storage/';
  let i = 0;
  return (
    <>
      <div className="grid grid-cols-5 flex items-center">
          <div> </div>
          <div className="flex justify-center font-bold">
            Nombre
          </div>
          <div className="flex justify-center font-bold">
            Precio
          </div>
          <div className="flex justify-center font-bold">
            Cantidad
          </div>
          <div></div>
      </div>
      <div className="grid grid-cols-1 gap-4 mb-6 mt-6">
        {data.productos.map((producto, i) => (
          <div key={producto.original.id} className="grid-item ">
            <div className="grid grid-cols-5 flex items-center ">
              <div className="flex justify-center">
                <img
                  src={urlBase + producto.original.url_imagen}
                  alt={producto.original.nombre}
                  className="w-40 h-auto"
                />
              </div>

              <div className="flex justify-center pl-4">
                <p>{producto.original.nombre}</p>
              </div>
              <div className="flex justify-center">
                <p>${producto.original.precio}</p>
              </div>
              <div className="flex flex-row gap-2 items-center justify-center">
                <NeoButtonMini><Minus /></NeoButtonMini>
                {data.id_productos[i]?.cantidad}
                <NeoButtonMini><Plus /></NeoButtonMini>
              </div>
              <div className="flex justify-center">
                <NeoButtonMini><Trash2 /></NeoButtonMini>
              </div>
            </div>
          </div>

        ))}
      </div>
    </>


  );
};

export default CarritoGrid;
