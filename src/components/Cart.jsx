import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../service/CartContext";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import BuySuccess from "./BuySuccess";
import ReactDOMServer from "react-dom/server";
import ReactDOM from "react-dom";

const Cart = () => {
  const { cartItems, removeFromCart } = useCart();
  const [quantities, setQuantities] = useState({});
  const [cashAmount, setCashAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Uang Tunai");
  const [shippingMethod, setShippingMethod] = useState("Take away");

  useEffect(() => {
    // Set quantities based on cartItems when cartItems change
    const newQuantities = {};
    cartItems.forEach((item) => {
      newQuantities[item.id] = item.quantity || 0;
    });
    setQuantities(newQuantities);
  }, [cartItems]);

  const calculateTotalQuantity = () => {
    // Hitung total quantity dari item-item di keranjang
    let totalQuantity = 0;
    for (const itemId in quantities) {
      totalQuantity += quantities[itemId];
    }
    return totalQuantity;
  };

  const calculateTotalPrice = () => {
    // Lakukan perhitungan total harga dari item-item di keranjang
    const totalPrice = cartItems.reduce((total, item) => {
      return total + item.price * (quantities[item.id] || 0); // Hitung total harga berdasarkan kuantitas item
    }, 0);

    return totalPrice.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
    });
  };

  const increaseQuantity = (itemId) => {
    const updatedQuantities = { ...quantities };
    updatedQuantities[itemId] = (updatedQuantities[itemId] || 0) + 1;
    setQuantities(updatedQuantities);
  };

  const decreaseQuantity = (itemId) => {
    if (quantities[itemId] > 0) {
      const updatedQuantities = { ...quantities };
      updatedQuantities[itemId] = updatedQuantities[itemId] - 1;
      setQuantities(updatedQuantities);
    }
  };

  const removeFromCartHandler = (itemId) => {
    removeFromCart(itemId);
  };

  const calculateChange = () => {
    const totalPrice = cartItems.reduce((total, item) => {
      return total + item.price * (quantities[item.id] || 0);
    }, 0);
    return cashAmount - totalPrice;
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
    if (e.target.value !== "Uang Tunai") {
      setCashAmount(""); // Mengosongkan nilai cashAmount jika opsi pembayaran bukan Uang Tunai
    }
  };

  const handleShippingMethodChange = (e) => {
    setShippingMethod(e.target.value);
  };

  const handleBuyNowClick = () => {
    const updatedCartItems = cartItems.map((item) => ({
      ...item,
      quantity: quantities[item.id] || 0,
    }));

    const change = calculateChange(); // Hitung kembalian

    const buySuccess = ReactDOMServer.renderToString(
      <BuySuccess
        cashAmount={cashAmount}
        items={updatedCartItems}
        change={change}
        paymentMethod={paymentMethod}
        shippingMethod={shippingMethod}
      />
    );
    // Menampilkan pop-up menggunakan Swal.fire saat tombol Buy Now diklik
    Swal.fire({
      title: "Terimakasih sudah belanja di Kantin Kita",
      width: 600,
      padding: "3em",
      color: "#607274",
      background: "#fff url(/images/trees.png)",
      backdrop: `
        rgba(108, 108, 113, 0.4)
        left top
        no-repeat
      `,
      html: `${buySuccess}`,
      didOpen: () => {
        ReactDOM.render(
          <BuySuccess
            cashAmount={cashAmount}
            items={updatedCartItems}
            change={change}
          />,
          Swal.getPopup().querySelector(".swal2-content")
        );
      },
    });
  };

  return (
    <>
      <section className="min-h-screen lg:min-h-0 lg:h-auto lg:flex-grow flex items-center justify-center">
        <div className="container py-28 mx-auto">
          <div className="w-full">
            <div className="bg-white shadow-lg rounded-lg">
              <div className="p-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="p-5">
                    <div className="flex justify-between items-center mb-5">
                      <h1 className="font-bold mb-0 text-black text-2xl">
                        Pesanan kamu saati ini
                      </h1>
                      <h6 className="mb-0 text-gray-500">
                        {/* {cartItems.length} Menu */}
                        {cartItems.length} Menu
                      </h6>
                    </div>
                    <hr className="my-4" />

                    {/* <!-- Cart items go here (similar structure to the provided items) --> */}
                    <div>
                      {cartItems.map((item) => (
                        <div key={item.id}>
                          <div className="flex items-center justify-between border-b-2 border-gray-200 py-4">
                            <div className="flex items-center space-x-4">
                              <img
                                // src={item.image}
                                src={item.imageSrc}
                                className="w-24 h-24 rounded-2xl"
                                alt={item.title}
                              />
                              <div>
                                <h4 className="text-lg text-gray-500">
                                  {item.title}
                                </h4>
                                <p className="overflow-hidden overflow-ellipsis whitespace-nowrap w-32">
                                  {item.category}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center ">
                              <button
                                onClick={() => decreaseQuantity(item.id)}
                                className="text-sm px-2 py-1 bg-gray-200 rounded-md mr-2"
                              >
                                <FaMinus />
                              </button>
                              <span className="text-lg font-bold">
                                {quantities[item.id] > 0
                                  ? quantities[item.id]
                                  : 0}
                              </span>
                              <button
                                onClick={() => increaseQuantity(item.id)}
                                className="text-sm px-2 py-1 bg-gray-200 rounded-md ml-2"
                              >
                                <FaPlus />
                              </button>
                            </div>

                            <div className="text-lg">
                              {item.price
                                ? item.price.toLocaleString("id-ID", {
                                    style: "currency",
                                    currency: "IDR",
                                  })
                                : ""}
                            </div>
                            <button
                              onClick={() => removeFromCartHandler(item.id)}
                            >
                              <FaTrash className="cursor-pointer text-lg hover:text-red-600" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="pt-5">
                      <h6 className="mb-0">
                        <Link
                          to="/product"
                          className="text-blue-500 flex items-center gap-2"
                        >
                          <FaLongArrowAltLeft /> Back To Shop
                        </Link>
                      </h6>
                    </div>
                  </div>

                  <div className="bg-gray-300 p-5">
                    <h3 className="font-bold mb-5 mt-2 pt-1 text-lg">
                      Pembayaran
                    </h3>
                    <hr className="my-4" />

                    <div className="flex justify-between mb-4">
                      <h5 className="uppercase">
                        {calculateTotalQuantity()} qty
                      </h5>
                    </div>

                    <h5 className="uppercase mb-3">Pembayaran Menggunakan</h5>

                    <div className="mb-4 pb-2">
                      <select
                        onChange={handlePaymentMethodChange}
                        value={paymentMethod}
                        className="block w-full bg-white border border-gray-300 rounded p-2"
                      >
                        <option value="Uang Tunai">Uang tunai</option>
                        <option value="Bank Lain">Bank lain</option>
                        <option value="QRIS">QRIS</option>
                      </select>
                    </div>

                    <h5 className="uppercase mb-3">Shipping</h5>

                    <div className="mb-4 pb-2">
                      <select
                        onChange={handleShippingMethodChange}
                        value={shippingMethod}
                        className="block w-full bg-white border border-gray-300 rounded p-2"
                      >
                        <option value="Take away">Take away</option>
                        <option value="Eat here">Eat here</option>
                        <option value="Take by ojol">Take by ojol</option>
                      </select>
                    </div>

                    <h5 className="uppercase mb-3">Uang Tunai</h5>

                    <div className="mb-5">
                      <div className="form-outline">
                        <input
                          type="text"
                          id="form3Examplea2"
                          className="w-full p-2 border border-gray-300 rounded-lg"
                          placeholder="Masukkan Nominal Uang Tunai"
                          value={cashAmount.toLocaleString("id-ID")}
                          onChange={(e) =>
                            setCashAmount(
                              Number(e.target.value.replace(/\D/g, ""))
                            )
                          }
                        />
                      </div>
                    </div>

                    <hr className="my-4" />

                    <div className="flex justify-between mb-5">
                      <h5 className="uppercase text-lg">Total Harga</h5>
                      <h5 className="text-lg font-bold">
                        {calculateTotalPrice()}
                      </h5>
                    </div>

                    <button
                      type="button"
                      className="bg-gray-800  text-white w-full py-3 rounded-lg hover:bg-gray-900"
                      onClick={handleBuyNowClick}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
