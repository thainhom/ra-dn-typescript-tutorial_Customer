import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/index";
import {
  deleteFromCart,
  changeQuantity,
} from "../../store/actions/customerCartListAction";

function CartList() {
  const dispatch = useDispatch();

  const cart = useSelector(
    (state: RootState) => state.customerCartListReducer.cart
  );
  const total = useSelector(
    (state: RootState) => state.customerCartListReducer.total
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    product_id?: number
  ) => {
    const quantity = Number(e.target.value);

    if (quantity > 0) {
      dispatch(changeQuantity({ product_id, quantity }));
    }
    console.log(quantity);
    console.log(product_id);
  };

  const handleDelete = (product_id: any) => {
    dispatch(deleteFromCart(product_id));
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Tên sản phẩm</th>
          <th>Đơn giá</th>
          <th>Số lượng</th>
          <th>Thành tiền</th>
          <th>Trạng thái</th>
        </tr>
      </thead>
      <tbody>
        {cart.map((item, index) => {
          console.log("cartList", cart);
          return (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>${item.unit_price}</td>
              <td>
                <Form.Control
                  type="number"
                  value={item.quantity}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange(e, item.product_id)
                  }
                />
              </td>
              <td>${item.subTotal}</td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(item.product_id)}
                >
                  Xóa
                </Button>
              </td>
            </tr>
          );
        })}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={4}>Tổng giá đơn hàng</td>
          <td>${total}</td>
          <td></td>
        </tr>
      </tfoot>
    </Table>
  );
}

export default CartList;
