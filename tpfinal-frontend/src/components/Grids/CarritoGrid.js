import React from "react";

const CarritoGrid = ({ data }) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      {data.productos.map((producto) => (
        <div key={producto.original.id} className="grid-item ">
          <div className="grid grid-cols-5">
            <img
              src={producto.original.url_imagen}
              alt={producto.original.nombre}
              className=" h-auto"
            />
            <div className=" pl-4">
              <p>Nombre: {producto.original.nombre}</p>
            </div>
            <div>
              <p>Precio: ${producto.original.precio}</p>
            </div>
            <div>
              cantidad producto
            </div>
            <div>
              eliminar del carrito
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CarritoGrid;
