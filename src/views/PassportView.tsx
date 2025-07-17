import { useEffect, useState } from "react";
import { PassportWizard } from "../components/passport/PassportWizard";

export const PassportView =  () => {
  return (
    <div className="min-h-screen">
      <PassportWizard />
      {/* passport */}
    </div>
  );
};
