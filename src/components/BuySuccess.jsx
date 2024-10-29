import React from "react";

const BuySuccess = ({
  items,
  change,
  cashAmount,
  paymentMethod,
  shippingMethod,
}) => {
  const totalPrice = items.reduce((total, item) => {
    return total + item.price * item.quantity; // Hitung total harga berdasarkan kuantitas item
  }, 0);

  const totalQuantity = items.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  // Periksa apakah properti 'change' adalah number dan bukan undefined/null
  const kembalian =
    typeof change === "number"
      ? change.toLocaleString("id-ID")
      : "Tidak ada informasi kembalian";

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Item yang sudah dipesan</h3>
      <br />
      <ul>
        {items.map((item) => (
          <li key={item.id} className="flex justify-between border-b py-2">
            <div className="w-1/3">
              <p className="text-gray-800">{item.category}</p>
            </div>
            <div className="w-1/3 text-center">
              <p className="text-gray-500 text-sm">{item.quantity}</p>
            </div>
            <div className="w-1/3 text-right">
              <p className="text-gray-500 text-sm">
                {item.price.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })}
              </p>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex justify-between mt-4 font-semibold text-sm text-left">
        <div>
          Total qty {totalQuantity} <br />
          Total{" "}
          {totalPrice.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
          })}
          <br />
          Uang Tunai{" "}
          {cashAmount && (
            <span>Rp {Number(cashAmount).toLocaleString("id-ID")}</span>
          )}{" "}
          <br />
          Kembali Rp {kembalian} <br />
          Pembayaran{" "}
          {paymentMethod === "Uang Tunai" ? "Uang Tunai" : paymentMethod} <br />
          Shipping {shippingMethod}
        </div>
      </div>
    </div>
  );
};

export default BuySuccess;
