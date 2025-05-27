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
import { DependentInformationView } from "../views/DependentInformationView";
export const MainRouter = () => {
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
          <Route index element={<SelectAppointmentsView />} />
          <Route
            path="select-appointments"
            element={<SelectAppointmentsView />}
          />
          <Route
            path="dependent-information"
            element={<DependentInformationView />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
