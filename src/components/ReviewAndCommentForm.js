import { Form, Input, Button, message } from "antd";
import axios from "axios";
import ReactStars from "react-stars";
import {useContext} from "react";
import {AppContext} from "../contexts/AppContext";
import {toast} from "react-hot-toast";
import {useTranslation} from "react-i18next";

const ReviewAndCommentForm = ({ data, onSuccess }) => {
    const {t} = useTranslation();
    const { setLoading } =
        useContext(AppContext);
    const onFinish = (values) => {
        setLoading(true)
        axios
            .post(`/api/orders/review/${data.orderNumber}`, {
                review: values.review,
                comment: values.comment,
            })
            .then((res) => {
                toast.success(t('toast.review_success'));
                onSuccess();
                setLoading(false)
            })
            .catch(err => {
                toast.error(err.response?.data?.message ?? t('toast.error'));
                setLoading(false)
            })
    };
    return (
        <Form layout="vertical" onFinish={onFinish} initialValues={{
            review: data.review ?? '',
            comment: data.comment ?? ''
        }}>
            <Form.Item
                label="Review"
                name="review"
                rules={[
                    {
                        required: true,
                        message: "Please provide a review rating",
                    },
                ]}
            >
                <ReactStars
                    count={5}
                    size={24}
                    half={false}
                    color1={"#ccc"}
                    color2={"#42A5F5"}
                    value={0} 
                />
            </Form.Item>

            <Form.Item
                label="Comment"
                name="comment"
                rules={[
                    { required: true, message: "Please provide a comment" },
                ]}
            >
                <Input.TextArea rows={4} />
            </Form.Item>

            <Form.Item>
                <button
                    type="primary"
                    className="bg-orange-400 text-white rounded-md py-2 px-4 font-bold w-full"
                >
                    Submit
                </button>
            </Form.Item>
        </Form>
    );
};

export default ReviewAndCommentForm;
