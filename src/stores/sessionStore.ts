import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import type { ResponseTokenType } from "../types/auth/hashSchemas";

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
  userId: number | null;
  activeUser: ResponseTokenType | null;
  tokenExpiration: Date | null;
  globalToken: string;
  otp: string | null;
};

type SessionActions = {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setUser: (user: UserType) => void;
  setCode: (code: number) => void;
  setDocument: (document: string) => void;
  setLocationVerification: (message: string) => void;
  setOfficial: (official: boolean) => void;
  setExternalId: (externalId: string) => void;
  setUserId: (userId: number) => void;
  setActiveUser: (activeUser: ResponseTokenType) => void;
  clearActiveUser: () => void;
  setTokenExpiration: (expiration: Date) => void;
  clearTokenExpiration: () => void;
  setGlobalToken: (token: string) => void;
  setOtp: (otp: string | null) => void;
};

export const SessionStore = create(
  devtools(
    persist<SessionStates & SessionActions>(
      (set) => ({
        isAuthenticated: false,
        user: [] as UserType[],
        code: 0,
        document: "",
        locationVerification: "",
        official: false,
        externalId: null,
        userId: null,
        activeUser: null,
        tokenExpiration: null,
        globalToken: "",
        otp: null,
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
        setCode: (code) => set({ code }),
        setDocument: (document) => set({ document }),
        setLocationVerification: (message) =>
          set({ locationVerification: message }),
        setOfficial: (official) => set({ official }),
        setExternalId: (externalId) => set({ externalId }),
        setUserId: (userId) => set({ userId }),
        setActiveUser: (activeUser) => set({ activeUser }),
        clearActiveUser: () => set({ activeUser: null }),
        setTokenExpiration: (expiration) =>
          set({ tokenExpiration: expiration }),
        clearTokenExpiration: () => set({ tokenExpiration: null }),
        setGlobalToken: (token) => set({ globalToken: token }),
        setOtp: (otp) => set({ otp }),
      }),
      {
        name: "sessionStore",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
