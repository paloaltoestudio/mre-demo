import { useForm, Controller } from 'react-hook-form';
import { useVisaStore } from '../../stores/visaStore';

type LaborInformationFormProps = {
  onNext: (data: Record<string, unknown>) => void;
  onBack: () => void;
};

type LaborFormValues = {
  sector?: string;
  subsector?: string;
  activityInColombia?: string;
  position?: string;
  nit?: string;
  specifyActivity?: string;
  mediaName?: string;
  visitReason?: string;
  institution?: string;
  entityNameColombia?: string;
  participationEvent?: string;
  agreement?: string;
  businessCategory?: string;
  company?: string;
  businessNit?: string;
  businessPosition?: string;
  businessSector?: string;
  hadColombianVisa?: string;
  previousVisaDenied?: string;
  previousVisaCancelledOrInadmitted?: string;
  previousVisaType?: string;
  previousVisaNumber?: string;
  previousVisaIssueDate?: string;
  previousVisaExpiryDate?: string;
  previousVisaIssuePlace?: string;
  deniedVisaClass?: string;
  deniedVisaDate?: string;
  cancelledOrInadmittedVisaDate?: string;
  cancelledOrInadmittedVisaType?: string;
};

const LaborInformationForm = ({ onNext, onBack }: LaborInformationFormProps) => {
  const { control, handleSubmit, watch } = useForm<LaborFormValues>({
    defaultValues: {
      sector: useVisaStore((state) => state.sector),
      subsector: useVisaStore((state) => state.subsector),
      activityInColombia: useVisaStore((state) => state.activityInColombia),
      position: useVisaStore((state) => state.position),
      nit: useVisaStore((state) => state.nit),
      specifyActivity: useVisaStore((state) => state.specifyActivity),
      mediaName: useVisaStore((state) => state.mediaName),
      visitReason: useVisaStore((state) => state.visitReason),
      institution: useVisaStore((state) => state.institution),
      entityNameColombia: useVisaStore((state) => state.entityNameColombia),
      participationEvent: useVisaStore((state) => state.participationEvent),
      agreement: useVisaStore((state) => state.agreement),
      businessCategory: useVisaStore((state) => state.businessCategory),
      company: useVisaStore((state) => state.company),
      businessNit: useVisaStore((state) => state.businessNit),
      businessPosition: useVisaStore((state) => state.businessPosition),
      businessSector: useVisaStore((state) => state.businessSector),
      hadColombianVisa: useVisaStore((state) => state.hadColombianVisa),
      previousVisaDenied: useVisaStore((state) => state.previousVisaDenied),
      previousVisaCancelledOrInadmitted: useVisaStore((state) => state.previousVisaCancelledOrInadmitted),
      previousVisaType: useVisaStore((state) => state.previousVisaType),
      previousVisaNumber: useVisaStore((state) => state.previousVisaNumber),
      previousVisaIssueDate: useVisaStore((state) => state.previousVisaIssueDate),
      previousVisaExpiryDate: useVisaStore((state) => state.previousVisaExpiryDate),
      previousVisaIssuePlace: useVisaStore((state) => state.previousVisaIssuePlace),
      deniedVisaClass: useVisaStore((state) => state.deniedVisaClass),
      deniedVisaDate: useVisaStore((state) => state.deniedVisaDate),
      cancelledOrInadmittedVisaDate: useVisaStore((state) => state.cancelledOrInadmittedVisaDate),
      cancelledOrInadmittedVisaType: useVisaStore((state) => state.cancelledOrInadmittedVisaType),
    }
  });

  const categoriaVisa = useVisaStore((state) => state.categoriaVisa);
  const setSector = useVisaStore((state) => state.setSector);
  const setSubsector = useVisaStore((state) => state.setSubsector);
  const setActivityInColombia = useVisaStore((state) => state.setActivityInColombia);
  const setPosition = useVisaStore((state) => state.setPosition);
  const setNit = useVisaStore((state) => state.setNit);
  const setSpecifyActivity = useVisaStore((state) => state.setSpecifyActivity);
  const setMediaName = useVisaStore((state) => state.setMediaName);
  const setVisitReason = useVisaStore((state) => state.setVisitReason);
  const setInstitution = useVisaStore((state) => state.setInstitution);
  const setEntityNameColombia = useVisaStore((state) => state.setEntityNameColombia);
  const setParticipationEvent = useVisaStore((state) => state.setParticipationEvent);
  const setAgreement = useVisaStore((state) => state.setAgreement);
  const setBusinessCategory = useVisaStore((state) => state.setBusinessCategory);
  const setCompany = useVisaStore((state) => state.setCompany);
  const setBusinessNit = useVisaStore((state) => state.setBusinessNit);
  const setBusinessPosition = useVisaStore((state) => state.setBusinessPosition);
  const setBusinessSector = useVisaStore((state) => state.setBusinessSector);
  const hadColombianVisa = useVisaStore((state) => state.hadColombianVisa);
  const watchHadColombianVisa = watch('hadColombianVisa');
  const previousVisaDenied = useVisaStore((state) => state.previousVisaDenied);
  const previousVisaCancelledOrInadmitted = useVisaStore((state) => state.previousVisaCancelledOrInadmitted);
  const setHadColombianVisa = useVisaStore((state) => state.setHadColombianVisa);
  const setPreviousVisaDenied = useVisaStore((state) => state.setPreviousVisaDenied);
  const setPreviousVisaCancelledOrInadmitted = useVisaStore((state) => state.setPreviousVisaCancelledOrInadmitted);
  const previousVisaType = useVisaStore((state) => state.previousVisaType);
  const previousVisaNumber = useVisaStore((state) => state.previousVisaNumber);
  const previousVisaIssueDate = useVisaStore((state) => state.previousVisaIssueDate);
  const previousVisaExpiryDate = useVisaStore((state) => state.previousVisaExpiryDate);
  const previousVisaIssuePlace = useVisaStore((state) => state.previousVisaIssuePlace);
  const setPreviousVisaType = useVisaStore((state) => state.setPreviousVisaType);
  const setPreviousVisaNumber = useVisaStore((state) => state.setPreviousVisaNumber);
  const setPreviousVisaIssueDate = useVisaStore((state) => state.setPreviousVisaIssueDate);
  const setPreviousVisaExpiryDate = useVisaStore((state) => state.setPreviousVisaExpiryDate);
  const setPreviousVisaIssuePlace = useVisaStore((state) => state.setPreviousVisaIssuePlace);
  const watchPreviousVisaDenied = watch('previousVisaDenied');
  const deniedVisaClass = useVisaStore((state) => state.deniedVisaClass);
  const deniedVisaDate = useVisaStore((state) => state.deniedVisaDate);
  const setDeniedVisaClass = useVisaStore((state) => state.setDeniedVisaClass);
  const setDeniedVisaDate = useVisaStore((state) => state.setDeniedVisaDate);
  const watchPreviousVisaCancelledOrInadmitted = watch('previousVisaCancelledOrInadmitted');
  const cancelledOrInadmittedVisaDate = useVisaStore((state) => state.cancelledOrInadmittedVisaDate);
  const setCancelledOrInadmittedVisaDate = useVisaStore((state) => state.setCancelledOrInadmittedVisaDate);
  const cancelledOrInadmittedVisaType = useVisaStore((state) => state.cancelledOrInadmittedVisaType);
  const setCancelledOrInadmittedVisaType = useVisaStore((state) => state.setCancelledOrInadmittedVisaType);

  const onSubmit = (data: LaborFormValues) => {
    if (data.sector !== undefined) setSector(data.sector);
    if (data.subsector !== undefined) setSubsector(data.subsector);
    if (data.activityInColombia !== undefined) setActivityInColombia(data.activityInColombia);
    if (data.position !== undefined) setPosition(data.position);
    if (data.nit !== undefined) setNit(data.nit);
    if (data.specifyActivity !== undefined) setSpecifyActivity(data.specifyActivity);
    if (data.mediaName !== undefined) setMediaName(data.mediaName);
    if (data.visitReason !== undefined) setVisitReason(data.visitReason);
    if (data.institution !== undefined) setInstitution(data.institution);
    if (data.entityNameColombia !== undefined) setEntityNameColombia(data.entityNameColombia);
    if (data.participationEvent !== undefined) setParticipationEvent(data.participationEvent);
    if (data.agreement !== undefined) setAgreement(data.agreement);
    if (data.businessCategory !== undefined) setBusinessCategory(data.businessCategory);
    if (data.company !== undefined) setCompany(data.company);
    if (data.businessNit !== undefined) setBusinessNit(data.businessNit);
    if (data.businessPosition !== undefined) setBusinessPosition(data.businessPosition);
    if (data.businessSector !== undefined) setBusinessSector(data.businessSector);
    // Save independent section values
    if (data.hadColombianVisa !== undefined) setHadColombianVisa(data.hadColombianVisa);
    if (data.previousVisaDenied !== undefined) setPreviousVisaDenied(data.previousVisaDenied);
    if (data.previousVisaCancelledOrInadmitted !== undefined) setPreviousVisaCancelledOrInadmitted(data.previousVisaCancelledOrInadmitted);
    if (data.previousVisaType !== undefined) setPreviousVisaType(data.previousVisaType);
    if (data.previousVisaNumber !== undefined) setPreviousVisaNumber(data.previousVisaNumber);
    if (data.previousVisaIssueDate !== undefined) setPreviousVisaIssueDate(data.previousVisaIssueDate);
    if (data.previousVisaExpiryDate !== undefined) setPreviousVisaExpiryDate(data.previousVisaExpiryDate);
    if (data.previousVisaIssuePlace !== undefined) setPreviousVisaIssuePlace(data.previousVisaIssuePlace);
    if (data.deniedVisaClass !== undefined) setDeniedVisaClass(data.deniedVisaClass);
    if (data.deniedVisaDate !== undefined) setDeniedVisaDate(data.deniedVisaDate);
    if (data.cancelledOrInadmittedVisaDate !== undefined) setCancelledOrInadmittedVisaDate(data.cancelledOrInadmittedVisaDate);
    if (data.cancelledOrInadmittedVisaType !== undefined) setCancelledOrInadmittedVisaType(data.cancelledOrInadmittedVisaType);
    console.log(data);
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <h3 className="mb-4 text-md font-bold">Información Laboral</h3>
      {categoriaVisa === 'Asistencia tecnica' ? (
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
      ) : categoriaVisa === 'Caso no previstos' ? (
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
      ) : categoriaVisa === 'Corresponsal permanente' ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Nombre del medio */}
          <div>
            <label className="block text-sm font-medium mb-1">Nombre del medio <span className="text-red-500">*</span></label>
            <Controller
              name="mediaName"
              control={control}
              render={({ field }) => (
                <input {...field} type="text" className="input w-full" />
              )}
            />
          </div>

          {/* NIT */}
          <div>
            <label className="block text-sm font-medium mb-1">NIT <span className="text-red-500">*</span></label>
            <Controller
              name="nit"
              control={control}
              render={({ field }) => (
                <input {...field} type="text" className="input w-full" />
              )}
            />
          </div>

          {/* Especifique Cargo */}
          <div>
            <label className="block text-sm font-medium mb-1">Especifique Cargo</label>
            <Controller
              name="position"
              control={control}
              render={({ field }) => (
                <input {...field} type="text" className="input w-full" />
              )}
            />
          </div>
        </div>
      ) : categoriaVisa === 'Cortesia' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Especifique Motivo de Visita */}
          <div>
            <label className="block text-sm font-medium mb-1">Especifique Motivo de Visita <span className="text-red-500">*</span></label>
            <Controller
              name="visitReason"
              control={control}
              render={({ field }) => (
                <input {...field} type="text" className="input w-full" />
              )}
            />
          </div>

          {/* Institución */}
          <div>
            <label className="block text-sm font-medium mb-1">Institución <span className="text-red-500">*</span></label>
            <Controller
              name="institution"
              control={control}
              render={({ field }) => (
                <input {...field} type="text" className="input w-full" />
              )}
            />
          </div>
        </div>
      ) : categoriaVisa === 'Cubrimiento periodistico' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Nombre de la entidad en Colombia */}
          <div>
            <label className="block text-sm font-medium mb-1">Nombre de la entidad en Colombia <span className="text-red-500">*</span></label>
            <Controller
              name="entityNameColombia"
              control={control}
              render={({ field }) => (
                <input {...field} type="text" className="input w-full" />
              )}
            />
          </div>

          {/* Participación/Evento */}
          <div>
            <label className="block text-sm font-medium mb-1">Participación/Evento <span className="text-red-500">*</span></label>
            <Controller
              name="participationEvent"
              control={control}
              render={({ field }) => (
                <input {...field} type="text" className="input w-full" />
              )}
            />
          </div>
        </div>
      ) : categoriaVisa === "Emperesarios TLC" ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Acuerdo */}
          <div>
            <label className="block text-sm font-medium mb-1">Acuerdo <span className="text-red-500">*</span></label>
            <Controller
              name="agreement"
              control={control}
              render={({ field }) => (
                <select {...field} className="input w-full">
                  <option value="">Seleccione...</option>
                  <option value="Alianza pacifico">Alianza pacifico</option>
                  <option value="TLC-Canadá">TLC-Canadá</option>
                  <option value="TLC-Chile">TLC-Chile</option>
                  <option value="TLC-Corea">TLC-Corea</option>
                  <option value="TLC-México">TLC-México</option>
                  <option value="TLC- Triángulo del norte">TLC- Triángulo del norte</option>
                  <option value="TLC-Unión Europa y Perú">TLC-Unión Europa y Perú</option>
                </select>
              )}
            />
          </div>

          {/* Categoría */}
          <div>
            <label className="block text-sm font-medium mb-1">Categoría <span className="text-red-500">*</span></label>
            <Controller
              name="businessCategory"
              control={control}
              render={({ field }) => (
                <input {...field} type="text" className="input w-full" />
              )}
            />
          </div>

          {/* Empresa */}
          <div>
            <label className="block text-sm font-medium mb-1">Empresa <span className="text-red-500">*</span></label>
            <Controller
              name="company"
              control={control}
              render={({ field }) => (
                <input {...field} type="text" className="input w-full" />
              )}
            />
          </div>

          {/* NIT */}
          <div>
            <label className="block text-sm font-medium mb-1">NIT <span className="text-red-500">*</span></label>
            <Controller
              name="businessNit"
              control={control}
              render={({ field }) => (
                <input {...field} type="text" className="input w-full" />
              )}
            />
          </div>

          {/* Especifique Cargo */}
          <div>
            <label className="block text-sm font-medium mb-1">Especifique Cargo <span className="text-red-500">*</span></label>
            <Controller
              name="businessPosition"
              control={control}
              render={({ field }) => (
                <input {...field} type="text" className="input w-full" />
              )}
            />
          </div>

          {/* Sector */}
          <div>
            <label className="block text-sm font-medium mb-1">Sector <span className="text-red-500">*</span></label>
            <Controller
              name="businessSector"
              control={control}
              render={({ field }) => (
                <select {...field} className="input w-full">
                  <option value="">Seleccione...</option>
                  <option value="Embajadas,consulados, organismos internacionales, otros">Embajadas, consulados, organismos internacionales, otros</option>
                  <option value="Entidades estatales">Entidades estatales</option>
                  <option value="Privado">Privado</option>
                  </select>
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

      {/* Solicitudes Anteriores */}
      <div className="mt-10">
        <h3 className="mb-4 text-md font-bold">Solicitudes Anteriores</h3>

        {/* ¿Ha tenido visa colombiana? */}
        <div className="mb-3">
          <label className="block text-sm font-medium mb-2">¿Ha tenido visa colombiana? <span className="text-red-500">*</span></label>
          <div className="flex gap-6 text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <Controller
                name="hadColombianVisa"
                control={control}
                defaultValue={hadColombianVisa || 'No'}
                render={({ field }) => (
                  <input {...field} type="radio" value="Si" className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" checked={field.value === 'Si'} onChange={(e) => field.onChange(e.target.value)} />
                )}
              />
              <span>Si</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Controller
                name="hadColombianVisa"
                control={control}
                defaultValue={hadColombianVisa || 'No'}
                render={({ field }) => (
                  <input {...field} type="radio" value="No" className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" checked={field.value === 'No'} onChange={(e) => field.onChange(e.target.value)} />
                )}
              />
              <span>No</span>
            </label>
          </div>
        </div>

        {/* Datos de Visa Anterior: visible solo si respondió Si */}
        { (watchHadColombianVisa || hadColombianVisa) === 'Si' && (
          <div className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {/* Visa Anterior */}
              <div>
                <label className="block text-sm font-medium mb-1">Visa Anterior</label>
                <Controller
                  name="previousVisaType"
                  control={control}
                  defaultValue={previousVisaType || ''}
                  render={({ field }) => (
                    <select {...field} className="input w-full">
                      <option value="">Seleccione Visa Anterior</option>
                      <option value="Migrante">Migrante</option>
                      <option value="Negocios">Negocios</option>
                      <option value="Residente">Residente</option>
                      <option value="Residente (R)">Residente (R)</option>
                      <option value="Residente especial de paz">Residente especial de paz</option>
                      <option value="Temporal y visitante">Temporal y visitante</option>
                    </select>
                  )}
                />
              </div>

              {/* Numero */}
              <div>
                <label className="block text-sm font-medium mb-1">Número</label>
                <Controller
                  name="previousVisaNumber"
                  control={control}
                  defaultValue={previousVisaNumber || ''}
                  render={({ field }) => (
                    <input {...field} type="text" className="input w-full" />
                  )}
                />
              </div>

              {/* Fecha de Expedición */}
              <div>
                <label className="block text-sm font-medium mb-1">Fecha de Expedición</label>
                <Controller
                  name="previousVisaIssueDate"
                  control={control}
                  defaultValue={previousVisaIssueDate || ''}
                  render={({ field }) => (
                    <input {...field} type="date" className="input w-full" placeholder="Día Mes Año" />
                  )}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Fecha de Expiración */}
              <div>
                <label className="block text-sm font-medium mb-1">Fecha de Expiración</label>
                <Controller
                  name="previousVisaExpiryDate"
                  control={control}
                  defaultValue={previousVisaExpiryDate || ''}
                  render={({ field }) => (
                    <input {...field} type="date" className="input w-full" placeholder="Día Mes Año" />
                  )}
                />
              </div>

              {/* Lugar de Expedición */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Lugar de Expedición</label>
                <Controller
                  name="previousVisaIssuePlace"
                  control={control}
                  defaultValue={previousVisaIssuePlace || ''}
                  render={({ field }) => (
                    <input {...field} type="text" className="input w-full" />
                  )}
                />
              </div>
            </div>
          </div>
        )}

        {/* ¿Le ha sido negada alguna solicitud de visa anteriormente? */}
        <div className="mb-2">
          <label className="block text-sm font-medium mb-2">¿Le ha sido negada alguna solicitud de visa anteriormente? <span className="text-red-500">*</span></label>
          <div className="flex gap-6 text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <Controller
                name="previousVisaDenied"
                control={control}
                defaultValue={previousVisaDenied || 'No'}
                render={({ field }) => (
                  <input {...field} type="radio" value="Si" className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" checked={field.value === 'Si'} onChange={(e) => field.onChange(e.target.value)} />
                )}
              />
              <span>Si</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Controller
                name="previousVisaDenied"
                control={control}
                defaultValue={previousVisaDenied || 'No'}
                render={({ field }) => (
                  <input {...field} type="radio" value="No" className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" checked={field.value === 'No'} onChange={(e) => field.onChange(e.target.value)} />
                )}
              />
              <span>No</span>
            </label>
          </div>
        </div>

        {/* Detalle de Negación: visible solo si respondió Si */}
        { (watchPreviousVisaDenied || previousVisaDenied) === 'Si' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Clase de Visa Negada */}
            <div>
              <label className="block text-sm font-medium mb-1">Clase de Visa Negada <span className="text-red-500">*</span></label>
              <Controller
                name="deniedVisaClass"
                control={control}
                defaultValue={deniedVisaClass || ''}
                render={({ field }) => (
                  <select {...field} className="input w-full">
                    <option value="">Seleccione Clase de Visa Negada</option>
                    <option value="Migrante">Migrante</option>
                    <option value="Negocios">Negocios</option>
                    <option value="Residente">Residente</option>
                    <option value="Residente (R)">Residente (R)</option>
                    <option value="Residente especial de paz">Residente especial de paz</option>
                    <option value="Temporal y visitante">Temporal y visitante</option>
                  </select>
                )}
              />
            </div>

            {/* Fecha de Negación */}
            <div>
              <label className="block text-sm font-medium mb-1">Fecha de Negación <span className="text-red-500">*</span></label>
              <Controller
                name="deniedVisaDate"
                control={control}
                defaultValue={deniedVisaDate || ''}
                render={({ field }) => (
                  <input {...field} type="date" className="input w-full" placeholder="Día Mes Año" />
                )}
              />
            </div>
          </div>
        )}

        

        {/* ¿Le ha sido cancelada/inadmitida alguna visa? */}
        <div className="mb-2">
          <label className="block text-sm font-medium mb-2">¿Le ha sido cancelada/inadmitida alguna visa? <span className="text-red-500">*</span></label>
          <div className="flex gap-6 text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <Controller
                name="previousVisaCancelledOrInadmitted"
                control={control}
                defaultValue={previousVisaCancelledOrInadmitted || 'No'}
                render={({ field }) => (
                  <input {...field} type="radio" value="Si" className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" checked={field.value === 'Si'} onChange={(e) => field.onChange(e.target.value)} />
                )}
              />
              <span>Si</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Controller
                name="previousVisaCancelledOrInadmitted"
                control={control}
                defaultValue={previousVisaCancelledOrInadmitted || 'No'}
                render={({ field }) => (
                  <input {...field} type="radio" value="No" className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" checked={field.value === 'No'} onChange={(e) => field.onChange(e.target.value)} />
                )}
              />
              <span>No</span>
            </label>
          </div>
        </div>

        {/* Detalle de Cancelación/Inadmitida: visible solo si respondió Si */}
        { (watchPreviousVisaCancelledOrInadmitted || previousVisaCancelledOrInadmitted) === 'Si' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Clase de Visa Cancelada/Inadmitida */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Clase de Visa Cancelada/Inadmitida <span className="text-red-500">*</span>
              </label>
              <Controller
                name="cancelledOrInadmittedVisaType"
                control={control}
                defaultValue={cancelledOrInadmittedVisaType || ''}
                render={({ field }) => (
                  <select
                    {...field}
                    className="input w-full"
                  >
                    <option value="">Seleccione Clase de Visa Cancelada/Inadmitida</option>
                    <option value="Turista">Turista</option>
                    <option value="Trabajo">Trabajo</option>
                    <option value="Estudiante">Estudiante</option>
                    <option value="Tránsito">Tránsito</option>
                    <option value="Residencia">Residencia</option>
                    <option value="Otra">Otra</option>
                  </select>
                )}
              />
            </div>
            {/* Fecha de Cancelación/Inadmisión */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Fecha de Cancelación/Inadmisión <span className="text-red-500">*</span>
              </label>
              <Controller
                name="cancelledOrInadmittedVisaDate"
                control={control}
                defaultValue={cancelledOrInadmittedVisaDate || ''}
                render={({ field }) => (
                  <input
                    {...field}
                    type="date"
                    className="input w-full"
                    placeholder="Día Mes Año"
                  />
                )}
              />
            </div>
          </div>
        )}

      </div>

      <div className="flex gap-5 justify-end mt-8">
        <button
          type="button"
          onClick={onBack}
          className="text-[#3466cc] border-2 border-[#3466cc] hover:text-white hover:border-[#e9e9e9] font-medium py-2 px-4 rounded-full hover:cursor-pointer hover:bg-[#d1d1d1] duration-150"
        >
          Regresar
        </button>
        <button
          type="submit"
          className="bg-blue-600 text-white rounded-full px-6 py-2 hover:bg-blue-700"
        >
          Siguiente
        </button>
      </div>
    </form>
  );
};

export default LaborInformationForm;
