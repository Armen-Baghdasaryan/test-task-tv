import OrderBoard from 'components/OrderBoard/OrderBoard';
import './order-page.scss';

const OrderPage = () => {
  return (
    <div className="order__page">
      <div className="order__board-wrapper">
        <OrderBoard />
      </div>
    </div>
  );
};

export default OrderPage;
