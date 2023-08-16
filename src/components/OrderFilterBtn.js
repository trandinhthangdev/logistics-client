import {AiOutlineStar} from "react-icons/ai"
import {BiFilterAlt} from "react-icons/bi"
import {Checkbox, Popover} from "antd";
import {useState} from "react";
import {STATUSES} from "../utils/contants";
import {useTranslation} from "react-i18next";
const OrderFilterBtn = (props) => {
    const {filters, onChangeFilter} = props;
    const status = filters?.status;
    const review = filters?.review;
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);

    const onTogglePopover = () => {
        setOpen(prev => !prev);
    };
    const reviewOptions = [
        {
            value: 0,
            label: "not evaluated",
        },
        {
            value: 1,
            label: '★'
        },
        {
            value: 2,
            label: '★★'
        },
        {
            value: 3,
            label: '★★★'
        },
        {
            value: 4,
            label: '★★★★'
        },
        {
            value: 5,
            label: '★★★★★'
        }
    ]
    const statusOptions = [
        // {
        //     value: "",
        //     label: t("label.all"),
        // },
        ...STATUSES,
    ];

    return (
        <Popover
            content={
                <div>
                    <div className="font-bold text-lg text-center mb-2">
                        Filter
                    </div>
                    <div className="flex">
                        <div className="px-4 border-r border-dashed border-r-gray-400">
                            <div className="text-md">
                                Review
                            </div>
                            {reviewOptions.map((option, index) => {
                                const isChecked = Array.isArray(review) ? review.includes(option.value) : false;
                                return (
                                    <div className={`text-md text-[#42A5F5] [&_span]:text-md ${index > 0 ? '[&_span]:text-[#42A5F5]' : ''}`}>
                                        <Checkbox checked={isChecked} onChange={() => {
                                            const reviewNext = Array.isArray(review) ? review.includes(option.value) ? review.filter(item => item !== option.value) : [
                                                ...review,
                                                option.value
                                            ] : [
                                                option.value
                                            ]
                                            onChangeFilter({
                                                ...filters,
                                                review: reviewNext
                                            })
                                        }}><span className={`${index > 0 ? 'text-[18px]' : ''}`}>{option.label}</span></Checkbox>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="px-4">
                            <div className="text-md">
                                Status
                            </div>
                            {statusOptions.map((option, index) => {
                                const isChecked = Array.isArray(status) ? status.includes(option.value) : false;
                                console.log('isChecked',isChecked)
                                return (
                                    <div className="">
                                        <Checkbox checked={isChecked} onChange={() => {
                                            const statusNext = Array.isArray(status) ? status.includes(option.value) ? status.filter(item => item !== option.value) : [
                                                ...status,
                                                option.value
                                            ] : [
                                                option.value
                                            ]
                                            onChangeFilter({
                                                ...filters,
                                                status: statusNext
                                            })
                                        }}><span>{option.label}</span></Checkbox>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            }
            trigger="click"
            open={open}
            onOpenChange={onTogglePopover}
        >
            <div className="cursor-pointer flex items-center border border-gray-400 rounded-md py-2 px-4">
                <div className="mr-1">Filter</div>
                <BiFilterAlt />
            </div>
        </Popover>
    )
}

export default OrderFilterBtn;
