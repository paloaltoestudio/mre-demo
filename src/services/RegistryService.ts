import { countryCodes } from "../mocks/authMocks/RegistryMock";
import { documentTypes } from "../mocks/authMocks/LoginMock";

export async function getDocumentTypes(): Promise<{ value: string; label: string }[]> {
  return new Promise((resolve) =>
    setTimeout(() => resolve(documentTypes), 30)
  );
}

export async function getCountryCodes(): Promise<{ country: string; code: string }[]> {
  return new Promise((resolve) =>
    setTimeout(() => resolve(countryCodes), 30)
  );
}
