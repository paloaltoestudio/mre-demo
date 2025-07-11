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
import type { CountriesInfoType } from "../types/dashboard/countryInfo";
import { CountriesInfoSchema } from "../schemas/appointments/countryInfo.schema";
import { usePublicQuery } from "../hooks/usePublicQuery";
import { OfficialDataView } from "../views/OfficialDataView";
import { AuthOfficialLayout } from "../layouts/AuthOfficialLayout";
import { HomeView } from "../views/HomeView";


export const MainRouter = () => {
  const { data: countries } = usePublicQuery<CountriesInfoType>({
    key: ["countriesInfo"],
    url: "/Countries",
    schema: CountriesInfoSchema,
  });

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<AuthView />} />
          <Route path="/home" element={<HomeView />} />
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
        <Route path="/auth/official" element={<AuthOfficialLayout />}>
          <Route index element={<OfficialDataView />} />
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
