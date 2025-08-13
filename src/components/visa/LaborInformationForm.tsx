import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useVisaStore } from '../../stores/visaStore';

const LaborInformationForm = ({ onNext, onBack }) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      sector: useVisaStore((state) => state.sector),
      subsector: useVisaStore((state) => state.subsector),
      activityInColombia: useVisaStore((state) => state.activityInColombia),
      position: useVisaStore((state) => state.position),
      nit: useVisaStore((state) => state.nit),
      specifyActivity: useVisaStore((state) => state.specifyActivity)
    }
  });

  const selectedCategory = useVisaStore((state) => state.selectedCategory);
  const setSector = useVisaStore((state) => state.setSector);
  const setSubsector = useVisaStore((state) => state.setSubsector);
  const setActivityInColombia = useVisaStore((state) => state.setActivityInColombia);
  const setPosition = useVisaStore((state) => state.setPosition);
  const setNit = useVisaStore((state) => state.setNit);
  const setSpecifyActivity = useVisaStore((state) => state.setSpecifyActivity);

  const onSubmit = (data) => {
    setSector(data.sector);
    setSubsector(data.subsector);
    setActivityInColombia(data.activityInColombia);
    setPosition(data.position);
    setNit(data.nit);
    setSpecifyActivity(data.specifyActivity);
    console.log(data);
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <h3 className="mb-4 text-md font-normal">Información Laboral</h3>
      {selectedCategory === 'Asistencia tecnica' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Sector de Actividad */}
          <div>
            <label className="block text-sm font-medium mb-1">Sector de Actividad <span className="text-red-500">*</span></label>
            <Controller
              name="sector"
              control={control}
              render={({ field }) => (
                <select {...field} className="input w-full">
                  <option value="">Seleccione...</option>
                  <option value="Actividades Artísticas y entretenimiento">Actividades Artísticas y entretenimiento</option>
                  <option value="Agropecuario">Agropecuario</option>
                  <option value="Comunicaciones">Comunicaciones</option>
                  <option value="Construcción">Construcción</option>
                  <option value="Financiero">Financiero</option>
                  <option value="Industrial">Industrial</option>
                  <option value="Servicio">Servicio</option>
                  <option value="Solidario">Solidario</option>
                </select>
              )}
            />
          </div>

          {/* Subsector */}
          <div>
            <label className="block text-sm font-medium mb-1">Subsector <span className="text-red-500">*</span></label>
            <Controller
              name="subsector"
              control={control}
              render={({ field }) => (
                <input {...field} type="text" className="input w-full" />
              )}
            />
          </div>

          {/* Actividad en Colombia */}
          <div>
            <label className="block text-sm font-medium mb-1">Actividad en Colombia <span className="text-red-500">*</span></label>
            <Controller
              name="activityInColombia"
              control={control}
              render={({ field }) => (
                <select {...field} className="input w-full">
                  <option value="">Seleccione...</option>
                  <option value="Asistencia técnica">Asistencia técnica</option>
                  <option value="Científicos">Científicos</option>
                  <option value="Contacto empresarial">Contacto empresarial</option>
                  <option value="Oficios o actividades independientes">Oficios o actividades independientes</option>
                  <option value="Trabajo">Trabajo</option>
                </select>
              )}
            />
          </div>

          {/* Cargo/Ocupación */}
          <div>
            <label className="block text-sm font-medium mb-1">Cargo/Ocupación <span className="text-red-500">*</span></label>
            <Controller
              name="position"
              control={control}
              render={({ field }) => (
                <input {...field} type="text" className="input w-full" />
              )}
            />
          </div>

          {/* NIT */}
          <div>
            <label className="block text-sm font-medium mb-1">NIT</label>
            <Controller
              name="nit"
              control={control}
              render={({ field }) => (
                <input {...field} type="text" className="input w-full" />
              )}
            />
          </div>
        </div>
      ) : selectedCategory === 'Caso no previstos' ? (
        <div className="mb-6">
          {/* Especifique Actividad */}
          <div>
            <label className="block text-sm font-medium mb-1">Especifique Actividad <span className="text-red-500">*</span></label>
            <Controller
              name="specifyActivity"
              control={control}
              render={({ field }) => (
                <input {...field} type="text" className="input w-full" />
              )}
            />
          </div>
        </div>
      ) : (
        <div>
          {/* Other form content for different categories */}
          <p>Other form content based on category</p>
        </div>
      )}

      <div className="flex gap-5 justify-end mt-8">
        <button
          type="button"
          onClick={onBack}
          className="text-[#3466cc] border-2 border-[#3466cc] hover:text-white hover:border-[#e9e9e9] font-medium py-2 px-4 rounded-full hover:cursor-pointer hover:bg-[#d1d1d1] duration-150"
        >
          Back
        </button>
        <button
          type="submit"
          className="bg-blue-600 text-white rounded-full px-6 py-2 hover:bg-blue-700"
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default LaborInformationForm;
