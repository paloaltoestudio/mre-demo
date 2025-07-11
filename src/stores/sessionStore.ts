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
  official: boolean;
  externalId: string | null;
  userId: number | null; // ✅ Nuevo campo
};

type SessionActions = {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setUser: (user: UserType) => void;
  setDocument: (document: string) => void;
  setLocationVerification: (message: string) => void;
  setOfficial: (official: boolean) => void;
  setExternalId: (externalId: string) => void;
  setUserId: (userId: number) => void; // ✅ Nueva acción
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
        official: false,
        externalId: null,
        userId: null, // ✅ Inicialización

        setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
        setUser: (user) =>
          set((state) => {
            const currentUsers = Array.isArray(state.user)
              ? state.user.filter(
                  (completUsers) =>
                    completUsers.documentNumber !== user.documentNumber
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
        setOfficial: (official) => set({ official }),
        setExternalId: (externalId) => set({ externalId }),
        setUserId: (userId) => set({ userId }), // ✅ Implementación
      }),
      {
        name: "sessionStore",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
