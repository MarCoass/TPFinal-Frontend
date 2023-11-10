import React, { useEffect, useState } from 'react'
import { NeoButtonChico, NeoButtonMini } from "../Button";
import { Plus, Trash2, Minus } from 'lucide-react'
import axios from '@/lib/axios'

const eliminarProducto = () => {
  return axios
    .get(
      `eliminar-producto`, // Usa axios.get en lugar de fetch
    )
    .then(res => res.data)
}

const CarritoGrid = ({ data }) => {
  const urlBase = process.env.NEXT_PUBLIC_BACKEND_URL + '/storage/';
  const [cantidades, setCantidades] = useState(data.id_productos.map((producto) => ({ id_producto: producto.id_producto, cantidad: producto.cantidad })));
  let i = 0;


  const handleIncrement = (index) => {
    const newCantidades = [...cantidades];
    newCantidades[index].cantidad += 1;
    setCantidades(newCantidades);
    handleChanges()
    // Aquí puedes hacer una llamada a la API para guardar la nueva cantidad en la base de datos.
    // Puedes utilizar axios u otra biblioteca para realizar la llamada POST.
  };

  const handleDecrement = (index) => {
    if (cantidades[index] > 1) {
      const newCantidades = [...cantidades];
      newCantidades[index].cantidad -= 1;
      setCantidades(newCantidades);
      handleChanges()
      // Llamada a la API para guardar la nueva cantidad en la base de datos.
    }
  };

  const handleChanges = async e => {
    try {
      const productosActualizados = data.productos.map((producto, i) => {
        return {
          id_producto: cantidades[i].id_producto,
          cantidad: cantidades[i].cantidad
        };
      });
  
      const carritoData = productosActualizados.map(producto => ({
        id_producto: producto.id_producto,
        cantidad: producto.cantidad
      }));
  
      // Llamada a la API para actualizar el carrito
      const response = await axios.post('/actualizar-carrito', { id_productos: carritoData });
      console.log('Carrito actualizado:', response.data);
      // Manejo de la respuesta si es necesario
    } catch (error) {
      console.error('Error al actualizar el carrito:', error);
      // Manejo de errores
    }
  }

  const calculateTotalPrice = () => {
    let total = 0;

    for (let i = 0; i < data.productos.length; i++) {
      const producto = data.productos[i].original;
      const cantidad = cantidades[i].cantidad;
      const precio = parseFloat(producto.precio);

      total += cantidad * precio;
    }

    return total.toFixed(2); // Redondear a 2 decimales si es necesario
  };

  return (
    <>
      <div className='border-b-2 mb-6 '>
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
                  <NeoButtonMini onClick={() => handleDecrement(i)}><Minus /></NeoButtonMini>
                  {cantidades[i].cantidad}
                  <NeoButtonMini onClick={() => handleIncrement(i)}><Plus /></NeoButtonMini>
                </div>
                <div className="flex justify-center">
                  <NeoButtonMini><Trash2 /></NeoButtonMini>
                </div>
              </div>
            </div>

          ))}
        </div>
      </div>
      <div>
        <p>Total: ${calculateTotalPrice()} </p>
      </div>
    </>

  );
};

export default CarritoGrid;
