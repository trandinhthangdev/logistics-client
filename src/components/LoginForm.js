import {BsFillShieldLockFill, BsTelephoneFill} from "react-icons/bs";
import OtpInput from "otp-input-react";
import PhoneInput from "react-phone-input-2";
import {useContext, useState} from "react";
import {RecaptchaVerifier, signInWithPhoneNumber} from "firebase/auth";
import {auth} from "../firebase.config";
import {toast} from "react-hot-toast";
import {AppContext} from "../contexts/AppContext";
import 'react-phone-input-2/lib/style.css'
import {useTranslation} from "react-i18next";

const LoginForm = (props) => {
    const {
        onSuccess
    } = props;
    const {t} = useTranslation();
    const [otp, setOtp] = useState("");
    const [phone, setPhone] = useState("");
    const { user, setIsAuthModal, setLoading } = useContext(AppContext);
    const [showOTP, setShowOTP] = useState(false);
    function onCaptchVerify() {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(
                "recaptcha-container",
                {
                    size: "invisible",
                    callback: (response) => {
                        onSignup();
                    },
                    "expired-callback": () => {},
                },
                auth
            );
        }
    }

    function onSignup() {
        setLoading(true);
        onCaptchVerify();
        const appVerifier = window.recaptchaVerifier;
        const formatPh = "+" + phone;
        signInWithPhoneNumber(auth, formatPh, appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                setLoading(false);
                setShowOTP(true);
                toast.success(t('toast.sendOtp_success'));
            })
            .catch((error) => {
                setLoading(false);
            });
    }

    function onOTPVerify() {
        setLoading(true);
        window.confirmationResult
            .confirm(otp)
            .then(async (res) => {
                setLoading(false);
                if (typeof onSuccess === 'function') {
                    onSuccess()
                }
            })
            .catch((err) => {
                setLoading(false);
            });
    }

    return (
        <div className="flex flex-col items-center">
            <div id="recaptcha-container"></div>
            {showOTP ? (
                <>
                    <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                        <BsFillShieldLockFill size={30} />
                    </div>
                    <label
                        htmlFor="otp"
                        className="font-bold text-xl text-white text-center"
                    >
                        {t('label.enterOtp')}
                    </label>
                    <OtpInput
                        value={otp}
                        onChange={setOtp}
                        OTPLength={6}
                        otpType="number"
                        disabled={false}
                        autoFocus
                        className="opt-container [&_input]:border [&_input]:border-gray-200 mb-2 [&_input]:outline-0"
                    ></OtpInput>
                    <button
                        onClick={onOTPVerify}
                        className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                    >
                        <span>
                            {t('label.verifyOrp')}
                        </span>
                    </button>
                </>
            ) : (
                <>
                    <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                        <BsTelephoneFill size={30} />
                    </div>
                    <label
                        htmlFor=""
                        className="font-bold text-xl text-center"
                    >
                        {t('label.verifyPhone')}
                    </label>
                    <PhoneInput
                        country={"vn"}
                        value={phone}
                        dialCode={84}
                        onChange={setPhone}
                        placeholder={"+84..."}
                        className={`w-full flex items-center my-2 [&_input]:text-gray-700 [&_input]:flex-1`}
                    />
                    <button
                        onClick={onSignup}
                        className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                    >
                        <span>{t('label.sendCodeViaSMS')}</span>
                    </button>
                </>
            )}
        </div>
    )
}

export default LoginForm;
