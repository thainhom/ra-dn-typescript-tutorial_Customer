import React from "react";
import ProductList from "./ProducList";

function ProductsAll() {
  return (
    <>
      <h1 className="text-white text-center mt-3">Danh sách sản phẩm </h1>
      <ProductList isShowCategory={true} isShowSort={true} />
    </>
  );
}

export default ProductsAll;
