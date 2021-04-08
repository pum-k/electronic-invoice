import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Input,
  InputGroup,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Table,
} from "reactstrap";
import "./index.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Axios from "axios";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [productToAdd, setproductToAdd] = useState({
    idProduct: "",
    Name: "ez",
    Unit: "",
    UnitPrice: "",
  });
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  useEffect(() => {
    async function getProducts() {
      try {
        const axiosData = await Axios.get("http://localhost:3001/products");
        const { data } = axiosData;
        setProducts(data);
      } catch (error) {
        console.log("Error fetching: " + error.message);
      }
    }
    getProducts();
  }, []);

  // Add product
  const handleOnChangeAddProduct = (e) => {
    const getInputFieldValue = e.value;
    const getInputFieldId = e.id;
    const productNeedAdd = { ...productToAdd };
    productNeedAdd[getInputFieldId] = getInputFieldValue;
    setproductToAdd(productNeedAdd);
  };

  const automaticIdProduct = () => {
    let { Name } = productToAdd;
    let newIdProduct = Name.normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D")
      .replace(/ /g, "_");
    return newIdProduct;
  };

  const checkIsInvalidProductToAdd = () => {
    for (let key in productToAdd) {
      if (
        productToAdd[key] !== null &&
        productToAdd[key] != "" &&
        Object.keys(productToAdd).length === 4
      )
        return true;
    }
    return false;
  };

  const handleOnClickAddProduct = () => {
    const productNeedAddFinish = { ...productToAdd };
    productNeedAddFinish["idProduct"] = automaticIdProduct().toLowerCase();
    setproductToAdd(productNeedAddFinish);
    checkIsInvalidProductToAdd ? console.log(productToAdd) : alert('FAILED');
    setproductToAdd([]);
  };

  return (
    <Container className="ctn-customer-management" fluid={true}>
      <Row>
        <Col>
          <h1 style={{ textAlign: "center", marginBottom: 50 }}>
            Quản lý sản phẩm
          </h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Container className="actions">
            <Input
              type="search"
              placeholder="theo mã sản phẩm, vd: mi_hao_hao"
            />
            <Button color="success">Tìm kiếm</Button>
            <Button color="warning">Cập nhật</Button>
            <Button color="danger">Xóa</Button>
          </Container>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table striped className="ctn-customer-management__table">
            <thead>
              <tr>
                <th>Số thứ tự</th>
                <th>Mã sản phẩm</th>
                <th>Tên sản phẩm</th>
                <th>Đơn vị tính</th>
                <th>Đơn giá</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => {
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{product.idProduct}</td>
                    <td>{product.Name}</td>
                    <td>{product.Unit}</td>
                    <td>{product.UnitPrice}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button color="primary" block onClick={toggle}>
            Thêm sản phẩm
          </Button>
        </Col>
      </Row>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Thêm sản phẩm</ModalHeader>
        <ModalBody>
          <InputGroup row className="margin-bottom-15">
            <Label sm={4}>Tên sản phẩm: </Label>
            <Col sm={8}>
              <Input
                type="text"
                id="Name"
                onChange={(e) => handleOnChangeAddProduct(e.target)}
              />
            </Col>
          </InputGroup>
          <InputGroup row className="margin-bottom-15">
            <Label sm={4}>Đơn vị tính: </Label>
            <Col sm={8}>
              <Input
                type="text"
                id="Unit"
                onChange={(e) => handleOnChangeAddProduct(e.target)}
              />
            </Col>
          </InputGroup>
          <InputGroup row>
            <Label sm={4}>Đơn giá: </Label>
            <Col sm={8}>
              <Input
                type="number"
                id="UnitPrice"
                onChange={(e) => handleOnChangeAddProduct(e.target)}
              />
            </Col>
          </InputGroup>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              toggle();
              handleOnClickAddProduct();
            }}
          >
            Xác nhận
          </Button>
          <Button color="danger" onClick={toggle}>
            Hủy bỏ
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default ProductManagement;
