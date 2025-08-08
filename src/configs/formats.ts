export const toDate = (horaStr: string): Date => {
  const [hours, minutes] = horaStr.split(":");
  const now = new Date();
  now.setHours(Number(hours), Number(minutes), 0, 0);
  return now;
};

// Función helper para formatear la fecha de citas correctamente
export const formatAppointmentDate = (dateString: string): string => {
  if (!dateString) return "";
  
  console.log("Fecha original recibida:", dateString);
  
  try {
    // Caso 1: Si la fecha ya viene en formato legible (como "2025-08-11 03:30 PM")
    if (dateString.includes(" ") && dateString.includes("-")) {
      const datePart = dateString.split(" ")[0]; // Tomar solo "2025-08-11"
      console.log("Parte de fecha extraída:", datePart);
      
      // Parsear la fecha en formato YYYY-MM-DD
      const [year, month, day] = datePart.split("-");
      if (year && month && day) {
        const formattedDate = `${day}/${month}/${year}`;
        console.log("Fecha formateada (caso 1):", formattedDate);
        return formattedDate;
      }
    }
    
    // Caso 2: Si la fecha viene en formato ISO (como "2025-08-11T15:30:00.000Z")
    if (dateString.includes("T")) {
      const datePart = dateString.split("T")[0]; // Tomar solo "2025-08-11"
      console.log("Parte de fecha ISO extraída:", datePart);
      
      const [year, month, day] = datePart.split("-");
      if (year && month && day) {
        const formattedDate = `${day}/${month}/${year}`;
        console.log("Fecha formateada (caso 2):", formattedDate);
        return formattedDate;
      }
    }
    
    // Caso 3: Si la fecha viene en formato DD/MM/YYYY o similar
    if (dateString.includes("/")) {
      console.log("Fecha ya en formato DD/MM/YYYY:", dateString);
      return dateString;
    }
    
    // Caso 4: Si la fecha viene en formato YYYY-MM-DD (como "2025-08-11")
    if (dateString.includes("-") && dateString.split("-").length === 3) {
      const [year, month, day] = dateString.split("-");
      if (year && month && day) {
        const formattedDate = `${day}/${month}/${year}`;
        console.log("Fecha formateada (caso 4 - YYYY-MM-DD):", formattedDate);
        return formattedDate;
      }
    }
    
    // Caso 5: Intentar con new Date() como último fallback
    const date = new Date(dateString);
    console.log("Fecha parseada con new Date():", date);
    
    // Verificar si la fecha es válida
    if (isNaN(date.getTime())) {
      console.error("Fecha inválida:", dateString);
      return dateString; // Retornar la fecha original si no se puede parsear
    }
    
    // Obtener los componentes de fecha en la zona horaria local
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    const formattedDate = `${day}/${month}/${year}`;
    console.log("Fecha formateada final (caso 5 - fallback):", formattedDate);
    return formattedDate;
  } catch (error) {
    console.error("Error al formatear fecha:", error, "Fecha original:", dateString);
    return dateString;
  }
};
