export const toDate = (horaStr: string): Date => {
  const [hours, minutes] = horaStr.split(":");
  const now = new Date();
  now.setHours(Number(hours), Number(minutes), 0, 0);
  return now;
};
