import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { es } from "date-fns/locale";
import { Box } from "@mui/material";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import type { DateSchemaType } from "../types/dashboard/dateTypes";
import { format } from "date-fns";
import { toDate } from "../configs/formats";
import { SchedulingsStore } from "../stores/schedulingsStore";
import { useEffect } from "react";

type DatePickerComponentProps = {
  dateInfo: DateSchemaType[];
};

export const DatePickerComponent = ({ dateInfo }: DatePickerComponentProps) => {
  const { control } = useFormContext();

  const selectedDate: Date = useWatch({ control, name: "date" });

  const formatDate = (date: Date | string | undefined | null) => {
    if (!date) return "";
    const parsed =
      typeof date === "string" ? new Date(date + "T00:00:00") : new Date(date);
    return isNaN(parsed.getTime()) ? "" : format(parsed, "yyyy-MM-dd");
  };
  
  const availableTimes = selectedDate
    ? Array.from(
        new Map(
          dateInfo
            .filter(
              (item) => formatDate(item.date) === formatDate(selectedDate)
            )
            .map((item) => [item.id, item])
        ).values()
      )
    : [];

  const { setValue } = useFormContext();

  useEffect(() => {
    setValue("hora", null);
  }, [selectedDate]);

  const { setToSavedDate } = SchedulingsStore();

  return (
    <div className="flex flex-col md:flex-row gap-10">
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
        <Controller
          name="date"
          control={control}
          defaultValue={null}
          render={({ field }) => (
            <StaticDatePicker
              displayStaticWrapperAs="desktop"
              value={field.value?.date || null}
              onChange={(newDate) => {
                return field.onChange(newDate);
              }}
              slots={{ actionBar: () => null }}
              shouldDisableDate={(date) => {
                const formatted = formatDate(date as Date);
                return !dateInfo.some((d) => formatDate(d.date) === formatted);
              }}
            />
          )}
        />
      </LocalizationProvider>

      <div className="flex flex-col text-center items-center md:text-start md:items-start">
        <h3 className="mb-5 font-medium text-gl">Horarios disponibles</h3>
        <Box display="flex" flexWrap="wrap" gap={2} width={400}>
          <Controller
            name="hora"
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <div className="flex gap-2 flex-wrap">
                {availableTimes.length > 0 ? (
                  availableTimes.map((hora) => (
                    <button
                      key={hora.id}
                      type="button"
                      onClick={() => {
                        setToSavedDate(hora.id);
                        return field.onChange(hora);
                      }}
                      className={`py-2 px-7 rounded-full border-[#ccc] cursor-pointer hover:bg-gray-200 border-2 ${
                        field.value?.id === hora.id
                          ? "border-blue-500 bg-gray-300"
                          : ""
                      }`}
                    >
                      {format(toDate(hora.time), "hh:mm a")}
                    </button>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">
                    No hay horarios disponibles para esta fecha
                  </p>
                )}
              </div>
            )}
          />
        </Box>
      </div>
    </div>
  );
};
