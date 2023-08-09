import { Spin } from 'antd';

const LoadingBg = (props) => {
    return (
        <div className="fixed top-0 left-0 bottom-0 right-0 bg-[#ffffff80] z-[999] flex items-center justify-center">
            <Spin />
        </div>
    )
}

export default LoadingBg;
