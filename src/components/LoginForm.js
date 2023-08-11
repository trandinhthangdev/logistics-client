import {BsFillShieldLockFill, BsTelephoneFill} from "react-icons/bs";
import OtpInput from "otp-input-react";
import PhoneInput from "react-phone-input-2";
import {useContext, useState} from "react";
import {RecaptchaVerifier, signInWithPhoneNumber} from "firebase/auth";
import {auth} from "../firebase.config";
import {toast} from "react-hot-toast";
import {AppContext} from "../contexts/AppContext";
import 'react-phone-input-2/lib/style.css'

const LoginForm = (props) => {
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
                toast.success("OTP sended successfully!");
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
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }

    return (
        <div className="flex flex-col items-center">
            {showOTP ? (
                <>
                    <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                        <BsFillShieldLockFill size={30} />
                    </div>
                    <label
                        htmlFor="otp"
                        className="font-bold text-xl text-white text-center"
                    >
                        Enter your OTP
                    </label>
                    <OtpInput
                        value={otp}
                        onChange={setOtp}
                        OTPLength={6}
                        otpType="number"
                        disabled={false}
                        autoFocus
                        className="opt-container "
                    ></OtpInput>
                    <button
                        onClick={onOTPVerify}
                        className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                    >
                        <span>Verify OTP</span>
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
                        Verify your phone number
                    </label>
                    <PhoneInput
                        country={"vn"}
                        value={phone}
                        dialCode={84}
                        onChange={setPhone}
                        placeholder={"+84337724134"}
                        className={`w-full flex items-center my-2 [&_input]:text-gray-700 [&_input]:flex-1`}
                    />
                    <button
                        onClick={onSignup}
                        className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                    >
                        <span>Send code via SMS</span>
                    </button>
                </>
            )}
        </div>
    )
}

export default LoginForm;
