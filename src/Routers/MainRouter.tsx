import { Routes, Route, HashRouter } from "react-router-dom";
import { AuthLayout } from "../layouts/AuthLayout";
import { AuthView } from "../views/AuthView";
import { VerificationViews } from "../views/VerificationViews";
import { VerificationMethodsViews } from "../views/VerificationMethodsViews";
import { VerificationFileView } from "../views/VerificationFileView";
import { RegistryView } from "../views/RegistryView";
export const MainRouter = () => {
  return (
    <HashRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<AuthView />} />
          <Route path="/auth" element={<AuthView />} />
          <Route
            path="/auth/verification-method"
            element={<VerificationMethodsViews />}
          />
          <Route
            path="/auth/verification-code"
            element={<VerificationViews />}
          />
          <Route
            path="/auth/verification-files"
            element={<VerificationFileView />}
          />
          <Route path="/auth/registry" element={<RegistryView />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};
