import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import 'moment/locale/vi';
import trans_en from "./en.json";
import trans_vi from "./vi.json";
import Cookies from 'js-cookie';
import moment from "moment";
import { initReactI18next } from 'react-i18next'
import {LANGUAGE_VI, LOCAL_LANGUAGE, SUPPORTED_LOCALES} from "../../utils/contants";

export const DEFAULT_LANGUAGE =  process.env.REACT_APP_DEFAULT_LANGUAGE || LANGUAGE_VI;
const arrayLanguages = SUPPORTED_LOCALES
let cookieLanguage = Cookies.get(LOCAL_LANGUAGE) ?Cookies.get(LOCAL_LANGUAGE) : Cookies.get("i18nextLng") &&  arrayLanguages.includes(Cookies.get("i18nextLng")) ? Cookies.get("i18nextLng") :DEFAULT_LANGUAGE;
moment.locale(cookieLanguage);
i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        supportedLngs:arrayLanguages,
        lng:cookieLanguage,
        fallbackLng: DEFAULT_LANGUAGE,
        debug: false,
        ns:["translations"],
        defaultNS: "translations",
        interpolation: {
            escapeValue: false // not needed for react!!
        },
        resources: {
            en: {
                translations: trans_en,
            },
            vi: {
                translations: trans_vi,
            }
        },
        react: {
            wait: false,
            useSuspense: false
        }
    }).then(r =>{
});

export default i18n;
