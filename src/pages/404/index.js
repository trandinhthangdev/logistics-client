import React, {useContext} from "react";
import {Button, Result} from "antd";
import {AppContext} from "../../contexts/AppContext";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
const Page404 = (props) => {
    const { isAdmin } = useContext(AppContext);
    const navigate = useNavigate();
    const {t} = useTranslation();
    return (
        <div className="">
            <Result
                status="404"
                title="404"
                subTitle={t('label.404_description')}
                extra={<button  onClick={() => {
                    if (isAdmin) {
                        navigate("/admin")
                    } else {
                        navigate("/")
                    }
                }}>{t('label.backHome')}</button>}
            />
        </div>
    )
}

export default Page404;
