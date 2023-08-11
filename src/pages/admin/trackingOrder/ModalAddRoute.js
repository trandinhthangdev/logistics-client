import {Form, Input, Modal, Select} from "antd";
import {POST_OFFICE_LIST} from "../../../utils/contants";
import React, {useContext} from "react";
import {AppContext} from "../../../contexts/AppContext";
import {addDoc, collection, getFirestore, serverTimestamp} from "firebase/firestore";
import {app} from "../../../firebase.config";
const db = getFirestore(app);

const ModalAddRoute = (props) => {
    const {
        open,
        onClose,
        orderNumber
    } = props;
    const { userInfo, setUserInfo, user, setLoading } = useContext(AppContext);
    const onFinish = async (values) => {
        setLoading(true)
        await addDoc(collection(db, 'routes'), {
            orderNumber: orderNumber,
            postoffice: values.postoffice,
            note: values.note,
            timestamp: serverTimestamp()
        })
        setLoading(false)
        onClose()
    }
    return (
        <Modal className="[&_.ant-modal-body]:min-h-[240px]" title="Add route" open={open} footer={false} onCancel={() => onClose()}>
            <Form
                name="Profile"
                layout="vertical"
                onFinish={onFinish}
                initialValues={{
                    location: '',
                    note: ''
                }}
            >
                <Form.Item
                    name="postoffice"
                    label="Post office"
                    rules={[
                        {
                            required: true,
                            message: "Please select postoffice!",
                        },
                    ]}
                >
                    <Select
                        showSearch
                        style={{ width: '100%' }}
                        placeholder="Search to Select"
                        optionFilterProp="children"
                        filterOption={(input, option) => (option?.label ?? '').includes(input)}
                        filterSort={(optionA, optionB) =>
                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        options={POST_OFFICE_LIST.map(item => ({
                            value: item.locationCode,
                            label: item.locationName
                        }))}

                    />
                </Form.Item>
                <Form.Item name="note" label="Note">
                    <Input.TextArea />
                </Form.Item>
                <Form.Item className="text-right">
                    <button
                        type="submit"
                        className="bg-orange-400 text-white rounded-md py-2 px-4 font-bold"
                    >
                        Submit
                    </button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default ModalAddRoute
