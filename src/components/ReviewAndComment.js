import {Dropdown, Popover, Tooltip} from "antd";
import ReactStars from "react-stars";
import ReviewAndCommentForm from "./ReviewAndCommentForm";
import {useContext, useState} from "react";
import {colorByStatus} from "../utils/contants";
import {AppContext} from "../contexts/AppContext";

const ReviewAndComment = ({ data, onSuccess }) => {
    const { user, isAdmin } = useContext(AppContext);
    const { review, comment } = data;
    const [open, setOpen] = useState(false);

    const onToggleTooltip = () => {
        setOpen(prev => !prev);
    };

    if (!user || isAdmin || user.uid !== data.uid) {
        return (
            <div className="min-w-[120px]">
                {!!review ? <>
                    <ReactStars
                        count={5}
                        value={review ?? 0}
                        size={20}
                        edit={false}
                        color1={"#ccc"}
                        color2={"#42A5F5"}
                    />
                    <div>{comment}</div>

                </> : <span className="italic text-gray-400 text-xs">This order has not been rated yet</span>}
            </div>
        )
    }
    return (

        <Popover
            content={
                <div className="min-w-[300px]">
                    {open && <ReviewAndCommentForm data={data} onSuccess={() => {
                        if (typeof onSuccess === 'function') {
                            onSuccess()
                        }
                        onToggleTooltip()
                    }}/>}
                </div>
            }
            trigger="click"
            open={open}
            onOpenChange={onToggleTooltip}
        >
            <Tooltip title={!!review ? 'Edit review & comment': 'Add review & comment'}>
                <div className="min-w-[120px] cursor-pointer">
                    {!!review ? <>
                        <ReactStars
                            count={5}
                            value={review ?? 0}
                            size={20}
                            edit={false}
                            color1={"#ccc"}
                            color2={"#42A5F5"}
                        />
                        <div>{comment}</div>

                    </> : <span className="italic text-gray-400 text-xs">This order has not been rated yet</span>}
                </div>
            </Tooltip>
        </Popover>
    );
};

export default ReviewAndComment;
