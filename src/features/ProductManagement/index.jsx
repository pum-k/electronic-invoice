import React, { useState } from "react";
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
const ProductManagement = () => {
  const [products, setProducts] = useState([
    {
        productID: 'mi_hao_hao',
        productName: 'Mì hảo hảo',
        unit: 'Gói',
        unitPrice: '3700',
    }
  ]);

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  return (
    <Container className="ctn-customer-management" fluid={true}>
      <Row>
        <Col>
          <h1 style={{textAlign: 'center', marginBottom: 50}}>Quản lý sản phẩm</h1>
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
                    <td>{product.productID}</td>
                    <td>{product.productName}</td>
                    <td>{product.unit}</td>
                    <td>{product.unitPrice}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row>
          <Col>
              <Button color="primary" block onClick={toggle}>Thêm sản phẩm</Button>
          </Col>
      </Row>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Thêm sản phẩm</ModalHeader>
        <ModalBody>
          <InputGroup row className="margin-bottom-15">
              <Label sm={4}>Tên sản phẩm: </Label>
              <Col sm={8}>
              <Input type="text"/>
              </Col>
          </InputGroup>
          <InputGroup row className="margin-bottom-15">
              <Label sm={4}>Đơn vị tính: </Label>
              <Col sm={8}>
              <Input type="text"/>
              </Col>
          </InputGroup>
          <InputGroup row>
              <Label sm={4}>Đơn giá: </Label>
              <Col sm={8}>
              <Input type="number"/>
              </Col>
          </InputGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>Xác nhận</Button>{' '}
          <Button color="danger" onClick={toggle}>Hủy bỏ</Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default ProductManagement;
