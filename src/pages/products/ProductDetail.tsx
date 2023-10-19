import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./../../store/actions/customerCartListAction";
import { getStaticResourceUrl } from "../../utilities/getStaticResource";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Badge from "react-bootstrap/Badge";
import Stack from "react-bootstrap/Stack";

export interface ProductDetailProps {
  product: {
    image: string | File | null; // Cập nhật kiểu dữ liệu ở đây
    name: string;
    unit_price: number;
    description: string;
  };
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLogin = useSelector(
    (state: any) => state.customerAuthReducer.isAuthenticate
  ); // Sửa lại dựa trên kiểu của bạn
  const [quantity, setQuantity] = useState<number>(1);

  const handleChangeQuantity = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);

    if (value > 0) {
      setQuantity(value);
    }
  };

  const handleAdd = () => {
    if (isLogin) {
      if (product) {
        dispatch(
          addToCart({
            ...product,
            quantity: quantity,
          })
        );
      } else {
        alert("Product is missing or undefined");
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <Card>
      <Card.Img
        variant="top"
        src={
          typeof product.image === "string"
            ? getStaticResourceUrl(product.image)
            : undefined
        }
      />

      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Badge bg="secondary">${product.unit_price}</Badge>
        <Card.Text>{product.description}</Card.Text>
        <Stack direction="horizontal" gap={3}>
          <Form.Control
            type="number"
            value={quantity}
            onChange={handleChangeQuantity}
            min={1}
          />
          <Button variant="primary" onClick={handleAdd}>
            Thêm
          </Button>
        </Stack>
      </Card.Body>
    </Card>
  );
};

export default ProductDetail;
