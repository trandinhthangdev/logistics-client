import LoginForm from "../../components/LoginForm";
import {useNavigate} from "react-router-dom";

const Login = (props) => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="text-3xl font-bold mb-4">
                Login
            </div>
            <LoginForm onSuccess={() => {
                navigate("/")
            }} />
        </div>
    )
}

export default Login;
