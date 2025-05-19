import React, { useState, useEffect } from "react";
import { getDocumentTypes, getCountryCodes } from "../../../services/RegistryService";
import { useNavigate } from "react-router-dom";

export const RegistryForm: React.FC = () => {
  const navigate = useNavigate();
  const [documentTypes, setDocumentTypes] = useState<string[]>([]);
  const [countryCodes, setCountryCodes] = useState<{ country: string; code: string }[]>([]);
  const [passwordRequirements, setPasswordRequirements] = useState({
    minLength: false,
    hasLowercase: false,
    hasUppercase: false,
    hasNumber: false,
    hasSpecialChar: false,
    passwordsMatch: false
  });

  const [form, setForm] = useState({
    documentType: "",
    documentNumber: "",
    firstName: "",
    lastName: "",
    birthDate: "",
    email: "",
    phoneCode: "+57",
    phoneNumber: "",
    whatsappCode: "+57",
    whatsappNumber: "",
    password: "",
    confirmPassword: "",
    acceptData: false,
    acceptTerms: false,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const docs = await getDocumentTypes();
        setDocumentTypes(docs);
        const codes = await getCountryCodes();
        setCountryCodes(codes);

      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    }
    fetchData();
  }, []);
  
  useEffect(() => {
    const { password, confirmPassword } = form;
    setPasswordRequirements({
      minLength: password.length >= 10,
      hasLowercase: /[a-z]/.test(password),
      hasUppercase: /[A-Z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[!"#$%&/()=?¡*+~\-_]/.test(password),
      passwordsMatch: password === confirmPassword && password !== ''
    });
  }, [form.password, form.confirmPassword]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, type, value } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setForm((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  
  const isPasswordValid = () => {
    return Object.values(passwordRequirements).every(requirement => requirement);
  };

  const validateContactInfo = () => {
    const { email, phoneCode, phoneNumber, whatsappCode, whatsappNumber } = form;
    
    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(email);
    
    // Validación de teléfono (código + al menos 7 dígitos)
    const isPhoneValid = phoneCode.trim() !== '' && 
                        phoneNumber.trim() !== '' && 
                        phoneNumber.replace(/\D/g, '').length >= 7;
    
    // Validación de WhatsApp (mismo criterio que teléfono)
    const isWhatsappValid = whatsappCode.trim() !== '' && 
                           whatsappNumber.trim() !== '' && 
                           whatsappNumber.replace(/\D/g, '').length >= 7;
    
    return isEmailValid || isPhoneValid || isWhatsappValid;
  };

  const PasswordRequirementItem = ({ 
    isValid, 
    text 
  }: { 
    isValid: boolean; 
    text: string 
  }) => (
    <li className={`flex items-center ${isValid ? 'text-green-500' : 'text-gray-400'}`}>
      {isValid ? (
        <svg className="w-3 h-3 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <div className="w-2 h-2 mr-2 rounded-full bg-gray-400"></div>
      )}
      <span className="text-xs">{text}</span>
    </li>
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar cada condición por separado
    const contactValid = validateContactInfo();
    const termsValid = form.acceptData && form.acceptTerms;
    const passwordValid = isPasswordValid();
  
    if (!termsValid) {
      alert("Debes aceptar los términos y condiciones y el tratamiento de datos");
      return;
    }
  
    if (!contactValid) {
      alert("Por favor completa al menos un método de contacto válido (email, teléfono o WhatsApp)");
      return;
    }
  
    if (!passwordValid) {
      const missingRequirements = Object.entries(passwordRequirements)
        .filter(([_, valid]) => !valid)
        .map(([key]) => {
          switch(key) {
            case 'minLength': return '✓ Mínimo 10 caracteres';
            case 'hasLowercase': return '✓ Una letra minúscula';
            case 'hasUppercase': return '✓ Una letra mayúscula';
            case 'hasNumber': return '✓ Un número';
            case 'hasSpecialChar': return '✓ Un carácter especial';
            case 'passwordsMatch': return '✓ Las contraseñas deben coincidir';
            default: return '';
          }
        })
        .filter(Boolean);
      
      alert(`Por favor corrige los siguientes requisitos de contraseña:\n\n${missingRequirements.join('\n')}`);
      return;
    }
    
    // Si todo está válido, proceder con el envío
    console.log("Formulario válido, enviando...", form);
    // Aquí tu lógica de envío
  };

  
  return (
    <div className="flex justify-center" >
          <div className="p-8">
            <h2 className="text-center text-xl font-bold text-gray-800 mb-6">
              Registro
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Tipo de documento */}
              <select
                name="documentType"
                value={form.documentType}
                onChange={handleChange}
                required
                className={`w-full border border-gray-300 rounded-md p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none ${
                    form.documentType === '' ? 'text-gray-400' : 'text-gray-900'
                  }`}
                style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg fill='none' stroke='%23666' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M6 9l6 6 6-6'%3e%3c/path%3e%3c/svg%3e")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 0.8rem center',
                backgroundSize: '1em',
                }}>
                <option value="" hidden>Tipo de documento</option>
                {documentTypes.map((type) => (
                <option key={type} value={type} className="text-black">
                    {type}
                </option>
                ))}
              </select>



              {/* Número de documento */}
              <input
                type="text"
                name="documentNumber"
                placeholder="Número de documento"
                value={form.documentNumber}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              {/* Campos adicionales para cédula de extranjería */}
              {form.documentType === "Cédula de extranjería" && (
                  <div className="mt-4 space-y-5">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="Nombres"
                      value={form.firstName}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Apellidos"
                      value={form.lastName}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    <input
                      type="date"
                      name="birthDate"
                      placeholder="Fecha de nacimiento"
                      value={form.birthDate}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                )}
                
              {/* Texto explicativo */}
              <div className="text-center text-sm font-semibold text-gray-600" style={{ marginTop: 40 }}>
                Para completar tu registro debes diligenciar al menos uno de los siguientes campos.
                <p className="font-normal mt-1 text-xs text-gray-500">
                  Deberás validar cada una de las opciones que hayas diligenciado
                </p>
              </div>

              {/* Correo electrónico */}
              <input
                type="email"
                name="email"
                placeholder="Correo electrónico"
                value={form.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

                {/* Línea divisoria */}
                <div className="flex items-center select-none text-gray-400" style={{ marginTop: 4 }}>
                <div className="flex-grow border-t border-gray-300 border-solid"></div>
                <span className="mx-2">o</span>
                <div className="flex-grow border-t border-gray-300 border-solid"></div>
                </div>

              {/* Teléfono */}
              <div className="flex flex-1 relative gap-4" style={{ marginTop: 4 }}>
                 <label
                    htmlFor="phoneCode"
                    className="absolute -top-2 left-4 bg-white px-1 text-xs text-gray-600 select-none"
                >
                    Código
                </label>
                <select
                  id="phoneCode"
                  name="phoneCode"
                  value={form.phoneCode}
                  onChange={handleChange}
                  className="w-20 border border-gray-300 rounded-md p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg fill='none' stroke='%23666' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M6 9l6 6 6-6'%3e%3c/path%3e%3c/svg%3e")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 0.8rem center",
                    backgroundSize: "1em",
                  }}
                >
                    {countryCodes.map(({ code }) => (
                      <option key={code} value={code}>
                        {code}
                      </option>
                    ))}
                </select>
                <input
                type="tel"
                name="phoneNumber"
                placeholder="Número celular"
                value={form.phoneNumber}
                onChange={handleChange}
                className="flex-1 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

                {/* Línea divisoria */}
                <div className="flex items-center select-none text-gray-400" style={{ marginTop: 4 }}>
                <div className="flex-grow border-t border-gray-300 border-solid"></div>
                <span className="mx-2">o</span>
                <div className="flex-grow border-t border-gray-300 border-solid"></div>
                </div>

              {/* WhatsApp */}
              <div className="flex flex-1 relative gap-4" style={{ marginTop: 4 }}> 
              <label
                    htmlFor="whatsappCode"
                    className="absolute -top-2 left-4 bg-white px-1 text-xs text-gray-600 select-none"
                >
                    Código
                </label>
                <select
                  id="whatsappCode"
                  name="whatsappCode"
                  value={form.whatsappCode}
                  onChange={handleChange}
                  className="w-20 border border-gray-300 rounded-md p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg fill='none' stroke='%23666' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M6 9l6 6 6-6'%3e%3c/path%3e%3c/svg%3e")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 0.8rem center",
                    backgroundSize: "1em",
                  }}
                >
                    {countryCodes.map(({ code }) => (
                      <option key={code} value={code}>
                        {code}
                      </option>
                    ))}
                </select>
                <input
                type="tel"
                name="whatsappNumber"
                placeholder="Número de whatsapp"
                value={form.whatsappNumber}
                onChange={handleChange}
                className="flex-1 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
    

              {/* Sección de contraseña */}
              <div className="mt-6">
              <p className="font-semibold mb-2 text-gray-700 text-center text-md">Crear contraseña</p>
              <input
                type="password"
                name="password"
                placeholder="Contraseña"
                value={form.password}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirmar contraseña"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              
              {/* Requisitos mínimos */}
              <div className="text-xs text-gray-600 mt-3 space-y-1">
                <p className="font-semibold">Requerimientos mínimos</p>
                <ul className="space-y-1">
                  <PasswordRequirementItem 
                    isValid={passwordRequirements.minLength} 
                    text="Mínimo 10 caracteres" 
                  />
                  <PasswordRequirementItem 
                    isValid={passwordRequirements.hasLowercase} 
                    text="Una letra minúscula" 
                  />
                  <PasswordRequirementItem 
                    isValid={passwordRequirements.hasUppercase} 
                    text="Una letra mayúscula" 
                  />
                  <PasswordRequirementItem 
                    isValid={passwordRequirements.hasNumber} 
                    text="Un número" 
                  />
                  <PasswordRequirementItem 
                    isValid={passwordRequirements.hasSpecialChar} 
                    text='Un carácter especial como !"#$%&/()=?¡*+~-_' 
                  />
                  <PasswordRequirementItem 
                    isValid={passwordRequirements.passwordsMatch} 
                    text="Las contraseñas coinciden" 
                  />
                </ul>
              </div>
            </div>

            {/* Checkboxes */}
            <div className="space-y-2 text-md" style={{ marginTop: 40 }}>
              <label className="flex items-center gap-2">
                <input
                type="checkbox"
                name="acceptData"
                checked={form.acceptData}
                onChange={handleChange}
                required
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                Aceptación de{" "}
                <a href="#" className="underline text-black font-bold hover:text-gray-800">
                Tratamiento de datos personales
                </a>
              </label>

              <label className="flex items-center gap-2">
                <input
                type="checkbox"
                name="acceptTerms"
                checked={form.acceptTerms}
                onChange={handleChange}
                required
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                Aceptación de{" "}
                <a href="#" className="underline text-black font-bold hover:text-gray-800">
                Términos y condiciones
                </a>
              </label>
            </div>


             {/* Botones */}
             <button
              type="submit"
              className={`w-full rounded-full py-3 font-semibold shadow-lg transition ${
                form.acceptData && form.acceptTerms && validateContactInfo() && isPasswordValid()
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-gray-300 text-gray-500 hover:bg-gray-400 cursor-pointer"
              }`}
              style={{ marginTop: 40 }}
            >
              Continuar
            </button>


              <button
                type="button"
                onClick={() => {navigate("/auth")}}
                className="text-center w-full text-gray-600 underline mt-2 hover:text-gray-800 font-bold"
                style={{ marginTop: 14 }}
              >
                Regresar
              </button>
            </form>
          </div>
        </div>

  );
};