import React, { useContext, useEffect, useState } from "react";
import {
    collection,
    getFirestore,
    onSnapshot,
    orderBy,
    query,
    where,
} from "firebase/firestore";
import { FaPlus, FaRoute } from "react-icons/fa";
import { app } from "../../../firebase.config";
import { Modal, Popover, Select } from "antd";
import {
    OrderStatusEnum,
    POST_OFFICE,
    POST_OFFICE_LIST,
} from "../../../utils/contants";
import ModalAddRoute from "./ModalAddRoute";
import moment from "moment";
import { MdLocationOn } from "react-icons/md";
import { AppContext } from "../../../contexts/AppContext";
import { useTranslation } from "react-i18next";
import { CgArrowLongUp } from "react-icons/cg";
const db = getFirestore(app);
const TrackingTimeline = (props) => {
    const { orderNumber, order } = props;
    const { t } = useTranslation();
    const { isAdmin } = useContext(AppContext);
    const [routes, setRoutes] = useState([]);
    const [isOpenAdd, setIsOpenAdd] = useState(false);
    useEffect(() => {
        const q = query(
            collection(db, "routes"),
            where("orderNumber", "==", orderNumber),
            orderBy("timestamp")
        );
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setRoutes(snapshot.docs.map((doc) => doc.data()));
        });
        return unsubscribe;
    }, []);

    return (
        <div className="flex flex-col items-center p-2">
            {isAdmin && order?.status === OrderStatusEnum.SHIPPED && (
                <div
                    onClick={() => {
                        setIsOpenAdd(true);
                    }}
                    className="flex items-center justify-center cursor-pointer p-2 rounded-md text-white bg-amber-600"
                >
                    <FaPlus />
                    <div className="mx-1">{t("label.addRoute")}</div>
                    <FaRoute />
                </div>
            )}
            <div>
                {order?.deliveryDate && (
                    <div className="flex items-center p-2 border-b border-b-gray-300 mb-2 relative">
                        <div className="flex flex-col">
                            <div className="text-sm italic">
                                {moment(order?.deliveryDate).calendar()}
                            </div>
                            <div className="font-bold">
                                {t("label.deliveryDate")}
                            </div>
                        </div>
                        <CgArrowLongUp className="absolute left-[-40px] text-4xl text-blue-600" />
                    </div>
                )}
                {[...routes].reverse().map((item) => {
                    return (
                        <div className="flex items-center p-2 border-b border-b-gray-300 mb-2 relative">
                            <div className="flex-1">
                                <div className="text-sm italic">
                                    {item.timestamp?.seconds
                                        ? moment
                                              .unix(item.timestamp.seconds)
                                              .calendar()
                                        : ""}
                                </div>
                                <div className="font-bold">
                                    {POST_OFFICE[item.postoffice].locationName}
                                </div>
                                <div className="text-sm">
                                    {POST_OFFICE[item.postoffice].address}
                                </div>
                            </div>
                            <Popover
                                content={
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: POST_OFFICE[item.postoffice]
                                                .iframeMap,
                                        }}
                                    ></div>
                                }
                            >
                                <div className="bg-orange-400 text-white p-2 rounded-full cursor-pointer">
                                    <MdLocationOn />
                                </div>
                            </Popover>
                            <CgArrowLongUp className="absolute left-[-40px] text-4xl text-blue-600" />
                        </div>
                    );
                })}
                {order?.shippingDate && (
                    <div className="flex items-center p-2 border-b border-b-gray-300 mb-2 relative">
                        <div className="flex flex-col">
                            <div className="text-sm italic">
                                {moment(order?.shippingDate).calendar()}
                            </div>
                            <div className="font-bold">
                                {t("label.shippingDate")}
                            </div>
                        </div>
                        <CgArrowLongUp className="absolute left-[-40px] text-4xl text-blue-600" />
                    </div>
                )}
            </div>
            {isOpenAdd && (
                <ModalAddRoute
                    open={isOpenAdd}
                    onClose={() => {
                        setIsOpenAdd(false);
                    }}
                    orderNumber={orderNumber}
                />
            )}
        </div>
    );
};

export default TrackingTimeline;
