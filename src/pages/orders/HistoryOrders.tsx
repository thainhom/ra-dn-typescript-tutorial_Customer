import React from "react";
import { Table } from "react-bootstrap";
import moment from "moment";

// Định nghĩa kiểu cho một đơn hàng
interface Order {
  serial_number: string;
  order_at: Date;
  total_price: number;
  status: string;
}

function HistoryOrders() {
  const storedOrders = window.localStorage.getItem("orders");
  const orders: Order[] =
    typeof storedOrders === "string" ? JSON.parse(storedOrders) : [];

  return (
    <>
      <h1 className="text-center text-white m-3">Lịch sử đơn hàng</h1>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>No.</th>
            <th>Mã đơn hàng</th>
            <th>Thời gian đặt</th>
            <th>Tổng giá</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((item: Order, index: number) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.serial_number} </td>
              <td>{moment(item.order_at).format("YYYY-MM-DD HH:mm")}</td>
              <td>${item.total_price} </td>
              <td>{item.status} </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default HistoryOrders;
