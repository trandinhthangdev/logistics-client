import LoginForm from "../../components/LoginForm";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

const Login = (props) => {
    const navigate = useNavigate();
    const {t} = useTranslation();

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="text-3xl font-bold mb-4">
                {t('label.login')}
            </div>
            <LoginForm onSuccess={() => {
                navigate("/")
            }} />
        </div>
    )
}

export default Login;
