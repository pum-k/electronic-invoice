import React, { useState } from "react";
import {
  Button,
  Col,
  Container,
  Input,
  InputGroup,
  InputGroupAddon,
  Row,
  Table,
} from "reactstrap";
import "./index.scss";
import "bootstrap/dist/css/bootstrap.min.css";
const CustomerManagement = () => {
  const [customers, setCustomers] = useState([
    {
      customerId: "khoa01236",
      customerName: "dangkhoa",
      customerPhoneNumber: "0833495421",
      customerEmail: "khoafunny1@gmail.com",
      customersDateOfBirth: "12/06/2000",
      customerAddress: "soc trang",
      customerCP: "0.1",
    },
    {
      customerId: "khoa012361",
      customerName: "dangkhoa2",
      customerPhoneNumber: "0833495422",
      customerEmail: "khoafunny12@gmail.com",
      customersDateOfBirth: "12/06/2000",
      customerAddress: "soc trang",
      customerCP: "0.2",
    },
    {
      customerId: "khoa012363",
      customerName: "dangkhoa3",
      customerPhoneNumber: "08334954223",
      customerEmail: "khoafunny13@gmail.com",
      customersDateOfBirth: "12/06/2000",
      customerAddress: "soc trang",
      customerCP: "0.3",
    },
    {
      customerId: "khoa012364",
      customerName: "dangkhoa4",
      customerPhoneNumber: "08334954224",
      customerEmail: "khoafunny14@gmail.com",
      customersDateOfBirth: "12/06/2000",
      customerAddress: "soc trang",
      customerCP: "0.4",
    },
  ]);

  customers.sort((a, b) => {
    return b.customerCP - a.customerCP;
  });
  return (
    <Container className="ctn-customer-management" fluid={true}>
      <Row>
        <Col>
          <h1 style={{textAlign: 'center', marginBottom: 50}}>Quản lý khách hàng</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Container className="actions">
            <Input
              type="search"
              placeholder="tìm theo mã khách hàng, vd: khoa012364"
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
                <th>Tên khách hàng</th>
                <th>Số điện thoại</th>
                <th>Email</th>
                <th>Ngày sinh</th>
                <th>Địa chỉ</th>
                <th>Điểm tích lũy</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer, index) => {
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{customer.customerName}</td>
                    <td>{customer.customerPhoneNumber}</td>
                    <td>{customer.customerEmail}</td>
                    <td>{customer.customersDateOfBirth}</td>
                    <td>{customer.customerAddress}</td>
                    <td>{customer.customerCP}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default CustomerManagement;
