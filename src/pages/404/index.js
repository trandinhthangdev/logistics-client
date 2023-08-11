import React, {useContext} from "react";
import {Button, Result} from "antd";
import {AppContext} from "../../contexts/AppContext";
import {useNavigate} from "react-router-dom";
const Page404 = (props) => {
    const { isAdmin } = useContext(AppContext);
    const navigate = useNavigate();
    return (
        <div className="">
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={<button  onClick={() => {
                    if (isAdmin) {
                        navigate("/admin")
                    } else {
                        navigate("/")
                    }
                }}>Back Home</button>}
            />
        </div>
    )
}

export default Page404;
