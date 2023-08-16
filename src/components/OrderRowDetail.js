import OrderInfoBlock from "./OrderInfoBlock";

const OrderRowDetail = (props) => {
    const {data, onSuccess} = props;
    return (
        <div>
            <OrderInfoBlock data={data} onSuccess={onSuccess}/>
        </div>
    )
}

export default OrderRowDetail;
