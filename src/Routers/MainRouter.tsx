import { Routes, Route, BrowserRouter } from "react-router-dom";
import { AuthLayout } from "../layouts/AuthLayout";
import { AuthView } from "../views/AuthView";
import { VerificationViews } from "../views/VerificationViews";
import { VerificationMethodsViews } from "../views/VerificationMethodsViews";
import { VerificationFileView } from "../views/VerificationFileView";
import { RegistryView } from "../views/RegistryView";
import { AppointmentsView } from "../views/AppointmentsView";
import { VerificationIDView } from "../views/VerificationIDView";
import { AccessLayout } from "../layouts/AccessLayout";
import { SelectAppointmentsView } from "../views/SelectAppointmentsView";
import { ToastContainer } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import type { CountriesInfoType } from "../types/dashboard/countryInfo";
import { getPublicRequest } from "../services/fetchingService";
import { CountriesInfoSchema } from "../schemas/appointments/countryInfo.schema";
import { useEffect } from "react";

export const MainRouter = () => {
  const { data: countries } = useQuery<CountriesInfoType>({
    queryKey: ["countriesInfo"],
    queryFn: async () => {
      return await getPublicRequest({
        url: "/Countries",
        schema: CountriesInfoSchema,
      });
    },
    refetchOnWindowFocus: false,
    staleTime: 0,
    gcTime: 0,
    retry: 3,
    structuralSharing: false,
  });

  useEffect(() => {
    console.log("countries", countries);
  }, [countries]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<AuthView />} />
          <Route path="/auth" element={<AuthView />} />
          <Route path="/auth/:registry" element={<AuthView />} />
          <Route
            path="/auth/verification-method"
            element={<VerificationMethodsViews />}
          />
          <Route
            path="/auth/verification-code/:methodSelected"
            element={<VerificationViews />}
          />
          <Route
            path="/auth/verification-files"
            element={<VerificationFileView />}
          />

          <Route path="/auth/registry" element={<RegistryView />} />

          <Route
            path="/dashboard/appointments"
            element={<AppointmentsView />}
          />
        </Route>
        <Route path="/access" element={<AccessLayout />}>
          <Route path="verification-id" element={<VerificationIDView />} />
        </Route>
        <Route path="/schedulings" element={<AuthLayout />}>
          <Route
            index
            element={
              <SelectAppointmentsView
                countries={countries ? countries.data : []}
              />
            }
          />
          <Route
            path="select-appointments"
            element={
              <SelectAppointmentsView
                countries={countries ? countries.data : []}
              />
            }
          />
        </Route>
      </Routes>
      <ToastContainer
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        className={"mt-5 md:mt-20"}
      />
    </BrowserRouter>
  );
};
