import { documentTypes, countryCodes } from "../data/registryMockData";

export async function getDocumentTypes(): Promise<string[]> {
  return new Promise((resolve) =>
    setTimeout(() => resolve(documentTypes), 30)
  );
}

export async function getCountryCodes(): Promise<{ country: string; code: string }[]> {
  return new Promise((resolve) =>
    setTimeout(() => resolve(countryCodes), 30)
  );
}
