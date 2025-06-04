import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { es } from "date-fns/locale";
import { Box } from "@mui/material";
import { horarios } from "../mocks/dashboardMocks/DatePickerMocks";
import { Controller, useFormContext } from "react-hook-form";

export const DatePickerComponent = () => {
  const { control } = useFormContext();

  return (
    <div className="flex flex-col md:flex-row gap-10">
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
        <Controller
          name="date"
          control={control}
          defaultValue={new Date()}
          render={({ field }) => (
            <StaticDatePicker
              displayStaticWrapperAs="desktop"
              value={field.value}
              onChange={(newDate) => field.onChange(newDate)}
              slots={{ actionBar: () => null }}
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
            defaultValue=""
            render={({ field }) => (
              <div className="flex gap-2 flex-wrap">
                {horarios?.map((hora) => (
                  <button
                    key={hora}
                    type="button"
                    onClick={() => {
                      field.onChange(hora);
                    }}
                    className={`py-2 px-7 rounded-full border-[#ccc] cursor-pointer hover:bg-gray-200 border-2 ${
                      field.value === hora ? "border-blue-500 bg-gray-300" : ""
                    }`}
                  >
                    {hora}
                  </button>
                ))}
              </div>
            )}
          />
        </Box>
      </div>
    </div>
  );
};
