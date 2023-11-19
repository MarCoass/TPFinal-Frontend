import React, { useState, useEffect } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import axios from '@/lib/axios';
import SelectCiudad from '../Formularios/selectCiudad';
import SelectMedioPago from '../Formularios/SelectMedioPago';
import { NeoButton } from '../Button';

export function ModalCompra({ infoCarrito, precioTotal, handleBuy }) {
  const [precio, setPrecio] = useState();
  const [ciudadEntrega, setCiudadEntrega] = useState('');
  const [medioPago, setMedioPago] = useState('');
  const [errors, setErrors] = useState({ errorMedioPago: '', errorCiudadEntrega: '' });
  const [buyInProgress, setBuyInProgress] = useState(false);
  const [modalOpen, setModalOpen] = useState(true);
  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    setPrecio(precioTotal);
    setErrors({ errorMedioPago: '', errorCiudadEntrega: '' });
  }, [precioTotal]);

  const validarFormulario = async () => {
    try {
      if (medioPago !== '' && ciudadEntrega !== '') {
        console.log('entra al true');
        setErrors({ errorMedioPago: '', errorCiudadEntrega: '' });

        // Indica que la compra está en progreso
        setBuyInProgress(true);

        // Ejecuta la compra
        await handleBuy();

        // Cierra el modal después de que handleBuy se complete
        closeModal();
      } else {
        if (medioPago === '') {
          setErrors((prevErrors) => ({ ...prevErrors, errorMedioPago: 'Debe seleccionar un medio de pago' }));
        } else {
          setErrors((prevErrors) => ({ ...prevErrors, errorCiudadEntrega: 'Debe seleccionar una ciudad de entrega' }));
        }
      }
    } catch (error) {
      console.error('Error al validar el formulario:', error);
      closeModal();
      // Manejo de errores
    } finally {
      // Indica que la compra ya no está en progreso
      setBuyInProgress(false);
    }
  };

  return (
    <>
      {/* {modalOpen && ( */}
        <AlertDialog className="flex flex-col">
          <AlertDialogTrigger onClick={() => setModalOpen(true)} className="flex cursor-pointer rounded-md items-center rounded-md border-2 border-black bg-rosado-500 px-10 py-3 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none disabled:bg-rosado-200 disabled:shadow-none disabled:translate-y-[3px] disabled:translate-x-[3px] ">
            Comprar
          </AlertDialogTrigger>
          {modalOpen && (
          <AlertDialogContent className="bg-rosado-50">
            <form className="flex flex-col justify-start gap-4">
              <AlertDialogHeader className="flex">
                <AlertDialogTitle>Comprar productos</AlertDialogTitle>
              </AlertDialogHeader>
              <div className="flex  justify-between">Total: ${precio}</div>
              <div className="flex flex-col justify-between">
                <label htmlFor="ciudadEntrega">Ciudad de entrega</label>
                <SelectCiudad id={'ciudadEntrega'} value={ciudadEntrega} onChange={(newCiudad) => setCiudadEntrega(newCiudad)} />
                <p className="text-red-600">{errors.errorCiudadEntrega}</p>
              </div>
              <div className="flex flex-col justify-between">
                <label htmlFor="medioPago">Medio de Pago</label>
                <SelectMedioPago id={'medioPago'} value={medioPago} onChange={(newmedioPago) => setMedioPago(newmedioPago)} />
                <p className="text-red-600">{errors.errorMedioPago}</p>
              </div>
              <AlertDialogFooter className="flex justify-between">
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <NeoButton onClick={() => validarFormulario()} disabled={buyInProgress}>
                  Realizar compra
                </NeoButton>
              </AlertDialogFooter>
            </form>
          </AlertDialogContent>
          )}
        </AlertDialog>
    </>
  );
}
