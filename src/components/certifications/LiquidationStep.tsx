import React from 'react';

const LiquidationStep = ({ onNext, onBack }) => (
  <div className="p-6">
    <h2 className="text-xl font-semibold mb-4">Liquidar trámite</h2>
    <div className="mb-6">
      <h3 className="text-lg font-medium mb-4">Información de solicitud</h3>
      <div className="flex justify-between bg-gray-100 p-4 rounded-sm">
        <p>Num.solicitud: 67535467</p>
        <p>Trámite: Certificaciones/Certificación</p>
        <p>Oficina: C. México</p>
        <p>Estado del trámite: En liquidación</p>
      </div>
    </div>
    <div className="mb-6">
      <h3 className="text-lg font-medium mb-4">Liquidación de pago</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-100 p-4 rounded-sm">
        <div className='flex flex-col gap-3'>
          <p>Nombres y apellidos: Mariano Ramirez López</p>
          <p>Tipo de documento: Cédula de ciudadanía</p>
          <p>Número de documento: 093638293</p>
        </div>
        <div className='flex flex-col gap-3'>
          <p>Nacionalidad: Colombia</p>
          <p>Fecha de liquidación: dd/mm/yyyy hh:mm AM/PM</p>
        </div>
      </div>
      <table className="w-full mt-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 text-left">Concepto de Recaudo</th>
            <th className="py-2 px-4 text-left">Moneda Reporte (USD)</th>
            <th className="py-2 px-4 text-left">Moneda Local (USD)</th>
            <th className="py-2 px-4 text-left">Seleccionar concepto</th>
          </tr>
        </thead>
        <tbody>
          <tr className='border-b border-gray-200'>
            <td className="py-2 px-4">Tipo concepto</td>
            <td className="py-2 px-4">$0</td>
            <td className="py-2 px-4">$0</td>
            <td className="py-2 px-4 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <title>Buscar concepto</title>
                <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" fill="none"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </td>
          </tr>
          <tr>
            <td className="py-2 px-4">Otros conceptos agregados</td>
            <td className="py-2 px-4">$0</td>
            <td className="py-2 px-4">$0</td>
            <td className="py-2 px-4 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <title>Buscar concepto</title>
                <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" fill="none"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </td>
          </tr>
          <tr>
            <td className="py-2 px-4">Total a pagar:</td>
            <td className="py-2 px-4">$0000.00</td>
            <td className="py-2 px-4">$0000.00</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div className="mb-6">
      <h3 className="text-lg font-medium mb-2">Descuento</h3>
      <p>¿Desea aplicar descuento?</p>
      <div className="flex items-center gap-4">
        <label className="flex items-center">
          <input type="radio" name="descuento" value="si" className="mr-2" />
          Sí
        </label>
        <label className="flex items-center">
          <input type="radio" name="descuento" value="no" className="mr-2" />
          No
        </label>
      </div>
      <p className="text-sm text-gray-600">Para aplicar debe tener la documentación requerida según la normativa.</p>
    </div>
    <div className="flex gap-5 justify-end mt-8">
      <button onClick={onBack} className="text-[#3466cc] border-2 border-[#3466cc] hover:text-white hover:border-[#e9e9e9] font-medium py-2 px-4 rounded-full hover:cursor-pointer hover:bg-[#d1d1d1] duration-150">Regresar</button>
      <button onClick={onNext} className="bg-blue-600 text-white rounded-full px-6 py-2 hover:bg-blue-700">Siguiente</button>
    </div>
  </div>
);

export default LiquidationStep;
