import { Routes, Route, HashRouter } from "react-router-dom";
import { AuthLayout } from "../layouts/AuthLayout";
import { AuthView } from "../views/AuthView";
import { VerificationViews } from "../views/VerificationViews";
import { VerificationMethodsViews } from "../views/VerificationMethodsViews";
import { VerificationFileView } from "../views/VerificationFileView";
export const MainRouter = () => {
  return (
    <HashRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<AuthView />} />
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
        </Route>
      </Routes>
    </HashRouter>
  );
};
