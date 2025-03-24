import { useContext, useEffect, useRef, useState } from "react";
import { SectionWrapper } from "../hoc";
import { ShopContext } from "../context/ShopContext";
import { Title } from "../components";
import { toast } from "react-toastify";
import axios from "axios";

const Order = () => {
  const { backendurl, token, currency } = useContext(ShopContext);
  const [orderData, setorderData] = useState([]);
  const loadOrderData = async () => {
    try {
      if (!token) {
        return null;
      }
      const response = await axios.post(
        `${backendurl}/api/order/userorders`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.data.success) {
        let allOrderData = [];
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item["status"] = order.status;
            item["payment"] = order.payment;
            item["paymentMethod"] = order.paymentMethod;
            item["date"] = order.date;
            allOrderData.push(item);
          });
        });
        setorderData(allOrderData.reverse());
        console.log(allOrderData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadOrderData();
  }, [token]);

  const printInvoice = (item) => {
    const invoiceWindow = window.open("", "_blank");

    const invoiceHTML = `
      <html>
      <head>
        <title>Invoice</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          @media print {
            body {
              -webkit-print-color-adjust: exact;
              padding: 20px;
            }
            .invoice-container {
              width: 300px;
              height: 300px;
              margin: auto;
              border: 1px solid #ddd;
              padding: 20px;
              background-color: white;
            }
          }
        </style>
      </head>
      <body class="bg-gray-100 p-6">
        <div class="invoice-container bg-white p-6 shadow-md rounded-lg border border-gray-300">
          <h2 class="text-2xl font-semibold text-center mb-4">Order Invoice</h2>

          <!-- Order Details -->
          <div class="border-b pb-4 mb-4">
            <p class="text-gray-700"><strong>Order Date:</strong> ${new Date(
              item.date
            ).toDateString()}</p>
            <p class="text-gray-700"><strong>Payment Method:</strong> ${
              item.paymentMethod
            }</p>
            <p class="text-gray-700"><strong>Payment Method:</strong> ${
              item.paymentMethodId
            }</p>
          </div>

          <!-- Product Details -->
          <div class="mb-4">
            <p class="text-gray-700"><strong>Product:</strong> ${item.name}</p>
            <p class="text-gray-700"><strong>Price:</strong> ${currency}${
      item.price
    }</p>
            <p class="text-gray-700"><strong>Quantity:</strong> ${
              item.quantity
            }</p>
            <p class="text-gray-700"><strong>Size:</strong> ${item.size}</p>
            <p class="text-gray-700"><strong>Status:</strong> ${item.status}</p>
          </div>

          <!-- Footer -->
          <div class="border-t pt-4 text-center text-gray-700 font-semibold">
            <p>Thank you for your purchase!</p>
          </div>
        </div>
      </body>
      </html>
    `;

    invoiceWindow.document.write(invoiceHTML);
    invoiceWindow.document.close();
    invoiceWindow.print();
  };

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1={`MY`} text2={`ORDERS`} />
      </div>
      <div>
        {orderData.map((item, index) => (
          <div
            key={index}
            className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div className="flex items-center gap-6 text-sm">
              <img src={item.images[0]} className="w-16 sm:w-20" alt="" />
              <div>
                <p className="sm:text-base font-medium">{item.name}</p>
                <div className="flex items-center gap-3 mt-1 text-base text-gray-700">
                  <p>
                    {currency}
                    {item.price}
                  </p>
                  <p>Quantity : {item.quantity}</p>
                  <p>Size: {item.size}</p>
                </div>
                <p className="mt-1">
                  Date:{" "}
                  <span className="text-gray-400">
                    {new Date(item.date).toDateString()}
                  </span>
                </p>
                <p className="mt-1">
                  Payment:{" "}
                  <span className="text-gray-400">{item.paymentMethod}</span>
                </p>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-between">
              <div className="flex items-center gap-2">
                <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                <p className="text-sm md:text-base">{item.status}</p>
              </div>
              <div>
                <button
                  onClick={() => printInvoice(item)}
                  className="border px-4 py-2 text-sm font-medium rounded-sm bg-blue-700 text-white mr-2"
                >
                  Print Invoice
                </button>
                <button
                  onClick={() => loadOrderData}
                  className="border px-4 py-2 text-sm font-medium rounded-sm "
                >
                  Track Order
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Order, "order");
