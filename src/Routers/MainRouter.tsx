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
        <Route path="/auth" element={<AuthLayout />}>
          <Route index element={<AuthView />} />
          <Route
            path="verification-method"
            element={<VerificationMethodsViews />}
          />
          <Route
            path="verification-code"
            element={<VerificationViews />}
          />
          <Route
            path="verification-files"
            element={<VerificationFileView />}
          />
          <Route path="registry" element={<RegistryView />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};
