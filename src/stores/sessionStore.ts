import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

export type UserType = {
  documentType: string;
  documentNumber: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  email: string;
  phoneCode: string;
  phoneNumber: string;
  whatsappCode: string;
  whatsappNumber: string;
  password: string;
  confirmPassword: string;
  acceptData: boolean;
  acceptTerms: boolean;
};

type SessionStates = {
  isAuthenticated: boolean;
  user: UserType[];
  code: number;
  document: string;
  locationVerification: string;
};
type SessionActions = {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setUser: (user: UserType) => void;
  setDocument: (document: string) => void;
  setLocationVerification: (message: string) => void;
};

export const SessionStore = create(
  devtools(
    persist<SessionStates & SessionActions>(
      (set) => ({
        isAuthenticated: false,
        user: [] as UserType[],
        code: 123456,
        document: "",
        locationVerification: "",
        setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
        setUser: (user) =>
          set((state) => {
            const currentUsers = Array.isArray(state.user)
              ? state.user.filter(
                  (completUsers) => completUsers.documentNumber !== user.documentNumber
                )
              : [];
            return {
              user: [...currentUsers, user],
              document: user.documentNumber.toString(),
            };
          }),
        setDocument: (document) => set({ document }),
        setLocationVerification: (message) =>
          set({ locationVerification: message }),
      }),
      {
        name: "sessionStore",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
