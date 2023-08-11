import LoginForm from "../../components/LoginForm";

const Login = (props) => {
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="text-3xl font-bold mb-4">
                Login
            </div>
            <LoginForm />
        </div>
    )
}

export default Login;
