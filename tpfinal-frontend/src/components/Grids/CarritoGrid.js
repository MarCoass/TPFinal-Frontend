import React from "react";

const CarritoGrid = ({ data }) => {
  return (
    <div className="grid grid-cols-5 grid-rows-5 gap-4">
      {data.productos.map((producto) => (
        <div key={producto.original.id} className="grid-item">
          <img
            src={producto.original.url_imagen}
            alt={producto.original.nombre}
            className="w-full h-auto"
          />
          <p>{producto.original.nombre}</p>
          <p>Precio: ${producto.original.precio}</p>
        </div>
      ))}
    </div>
  );
};

export default CarritoGrid;