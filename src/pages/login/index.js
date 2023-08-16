import LoginForm from "../../components/LoginForm";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";

const Login = (props) => {
    const navigate = useNavigate();
    const {t} = useTranslation();
    const [isRedirect, setIsRedirect] = useState(false);
    useEffect(() => {
        if (isRedirect) {
            navigate("/")
        }
    }, [isRedirect]);
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="text-3xl font-bold mb-4">
                {t('label.login')}
            </div>
            <LoginForm onSuccess={() => {
                setIsRedirect(true);
            }} />
        </div>
    )
}

export default Login;
