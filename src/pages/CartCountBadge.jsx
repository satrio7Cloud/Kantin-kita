import PropTypes from "prop-types";
import { useCart } from "../service/CartContext";

const CartCountBadge = ({ size }) => {
  const { cartCount } = useCart();

  // Mengambil jumlah produk dari localStorage saat komponen dimuat
  const storedCount = localStorage.getItem("cartCount");
  const countToShow = storedCount ? parseInt(storedCount, 10) : cartCount;

  return (
    <div
      className={`absolute bg-red-600 text-white text-[14px] ${size} -right-3 -top-1 rounded-full grid place-items-center`}
    >
      {countToShow}
    </div>
  );
};

CartCountBadge.propTypes = {
  size: PropTypes.string.isRequired,
};

export default CartCountBadge;
