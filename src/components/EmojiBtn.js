import { MdEmojiEmotions } from "react-icons/md";
import { useState } from "react";
import { Popover } from "antd";
import EmojiPicker from "emoji-picker-react";

const EmojiBtn = (props) => {
    const { onAddEmoji } = props;
    const [open, setOpen] = useState(false);

    return (
        <Popover
            content={
                <div>
                    <EmojiPicker
                        onEmojiClick={(value) => {
                            onAddEmoji(value.emoji);
                        }}
                    />
                </div>
            }
            trigger="click"
            open={open}
            onOpenChange={(value) => setOpen(value)}
        >
            <MdEmojiEmotions />
        </Popover>
    );
};
export default EmojiBtn;
