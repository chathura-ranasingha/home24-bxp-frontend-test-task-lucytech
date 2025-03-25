import i18n from "i18next";
import { camelCase } from "lodash";
import { initReactI18next } from "react-i18next";

import { DEFAULT_LANGUAGE } from "../constant/constant.ts";

import locales from "./locales.ts";

i18n.use(initReactI18next).init({
  resources: locales,
  lng: camelCase(localStorage.getItem("language") || "enUs"),

  interpolation: {
    escapeValue: false,
  },
});

i18n.services.formatter?.add("numberFormat", (val, lng: string | undefined) => {
  const languages = Object.keys(locales);
  const index = languages.indexOf(lng?.toString() || DEFAULT_LANGUAGE);

  if (index === -1) {
    return val;
  }
  return val.toLocaleString(
    locales[languages[index] as keyof typeof locales]["type"]
  );
});

export default i18n;
