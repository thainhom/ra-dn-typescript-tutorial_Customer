import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Row, Col } from "react-bootstrap";
import ProductDetail from "./ProductDetail";
import productApi from "../../apis/product.api";
import CustomerPaginationComponent, {
  NUMBER_RECORDS_PER_PAGE,
} from "../../components/table/Pagination";
import { Product } from "../../apis/product.api";

// Sửa lại kiểu của props
export interface ProductListProps {
  isShowSort?: boolean;
  isShowCategory?: boolean;
}
interface SearchProductsResponse {
  records: Product[];
  total: number;
}

const getRows = (products: Product[]) => {
  let rows = [];
  let row = [];

  for (const product of products) {
    row.push(product);

    if (row.length === 3) {
      rows.push(row);
      row = [];
    }
  }

  if (row.length !== 0) {
    rows.push(row);
  }

  return rows;
};

function ProductList(props: ProductListProps) {
  const navigate = useNavigate();

  const [searchInputValue, setSearchInputValue] = useState("");
  const [total, setTotal] = useState(0);
  const [keyword, setKeyword] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [orderPrice, setOrderPrice] = useState("ASC");
  const [products, setProducts] = useState<Product[]>([]); // Sửa lại kiểu dữ liệu
  const [categories, setCategories] = useState<string[]>([]);
  const rows = getRows(products);

  const fetchProducts = () => {
    productApi
      .searchProducts({
        name: keyword,
        page: page,
        orderPrice: orderPrice,
        limit: NUMBER_RECORDS_PER_PAGE,
        categories: categories,
      })
      .then((data) => {
        if ("records" in data && "total" in data) {
          const userDataResponse = data as SearchProductsResponse;
          setProducts(userDataResponse.records);
          setTotal(userDataResponse.total);
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          alert(error.response.statusText);
          navigate("/login");
        } else {
          alert(error.response.statusText);
        }
      });
  };

  useEffect(() => {
    fetchProducts();
  }, [keyword, page, orderPrice, categories]);

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    setKeyword(searchInputValue);
  };

  const handleChangeCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setCategories([...categories, event.target.value]);
    } else {
      const categoryValue = categories.filter(
        (category) => category !== event.target.value
      );
      setCategories(categoryValue);
    }
  };

  return (
    <>
      <Form onSubmit={handleSearch}>
        <div className="d-flex mb-3">
          <Form.Control
            type="text"
            value={searchInputValue}
            onChange={(event) => setSearchInputValue(event.target.value)}
            placeholder="Nhập từ khóa"
          />
          <div className="col-4">
            <Button type="submit" variant="info mx-1">
              Tìm kiếm
            </Button>
          </div>
          {props.isShowSort && (
            <Form.Select
              className="w-50"
              aria-label="Default select example"
              value={orderPrice}
              onChange={(e) => setOrderPrice(e.target.value)}
            >
              <option value="ASC">Giá tăng dần</option>
              <option value="DESC">Giá giảm dần</option>
            </Form.Select>
          )}
        </div>
        {props.isShowCategory &&
          ["Burberry", "dior", "CHANEL"].map((category) => (
            <Form.Check
              key={category}
              value={category}
              name="category"
              className="text-white"
              type="checkbox"
              id={category}
              label={category}
              inline={true}
              onChange={handleChangeCategory}
            />
          ))}
      </Form>
      <br />
      {rows.map((row, index) => {
        return (
          <Row key={index}>
            {row.map((product, index) => {
              return (
                <Col key={index}>
                  <ProductDetail product={product} />
                </Col>
              );
            })}
          </Row>
        );
      })}
      <br />
      <CustomerPaginationComponent total={total} setPage={setPage} />
    </>
  );
}

export default ProductList;
