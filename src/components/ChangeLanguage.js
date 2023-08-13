import {useState} from "react";
import Cookies from "js-cookie";
import {LANGUAGE_EN, LANGUAGE_VI, LOCAL_LANGUAGE} from "../utils/contants";
import {DEFAULT_LANGUAGE} from "../providers/translations/i18n";
import EnIcon from "./../assets/en.png";
import ViIcon from "./../assets/vi.png"
import i18n from "./../providers/translations/i18n"
import moment from "moment";
const ChangeLanguage = (props) => {
    const [lang, setLang] = useState(Cookies.get(LOCAL_LANGUAGE) ? Cookies.get(LOCAL_LANGUAGE) : DEFAULT_LANGUAGE)

    const onChangeLanguage = (langCode) => {
        i18n.changeLanguage(langCode)
        Cookies.set(LOCAL_LANGUAGE,langCode, { expires: 30, path: "/" });
        moment.locale(langCode);
        setLang(langCode)
    }
    return (
        <div className="flex items-center rounded-2xl border border-blue-200 mx-2">
            <div onClick={() => onChangeLanguage(LANGUAGE_EN)} className={`px-2 cursor-pointer rounded-2xl hover:bg-blue-200 ${lang === LANGUAGE_EN ? "bg-blue-200" : ""}`}>
                <img className="w-[24px]" src={EnIcon} />
            </div>
            <div onClick={() => onChangeLanguage(LANGUAGE_VI)} className={`px-2 cursor-pointer rounded-2xl hover:bg-blue-200 ${lang === LANGUAGE_VI ? "bg-blue-200" : ""}`}>
                <img className="w-[24px]" src={ViIcon} />
            </div>
        </div>
    )
}

export default ChangeLanguage;
