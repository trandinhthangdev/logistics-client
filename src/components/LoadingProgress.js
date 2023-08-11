import {Progress} from "antd";
import {useEffect, useState} from "react";

const LoadingProgress = (props) => {
    const [percent, setPercent] = useState(0);
    useEffect(() => {
        let interval = setInterval(() => {
            setPercent(prev => {
                if (prev === 100) {
                    return 0;
                } else {
                    return prev + 20;
                }
            })
        }, 500)
        return () => {
            clearInterval(interval)
        }
    }, [])
    return (
        <Progress className="[&_.ant-progress-text]:hidden" strokeLinecap="butt" percent={percent} />
    )
}


export default LoadingProgress
