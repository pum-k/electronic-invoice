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

const InvoiceManagement = () => {
  const [invoices, setInvoices] = useState([
    {
      billID: "",
      customerID: "",
      invoiceDate: "",
      TotalPayment: "",
    },
  ]);

  return (
    <Container className="ctn-customer-management" fluid={true}>
      <Row>
        <Col>
          <h1 style={{ textAlign: "center", marginBottom: 50 }}>
            Quản lý khách hàng
          </h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Container className="actions">
            <Input
              type="search"
              placeholder="tìm theo mã hóa đơn, vd: khoa012364"
            />
            <Button color="success">Tìm kiếm</Button>
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
                <th>Mã hóa đơn</th>
                <th>Mã khách hàng</th>
                <th>Ngày lập hóa đơn</th>
                <th>Giá trị hóa đơn</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice, index) => {
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{invoices.billID}</td>
                    <td>{invoices.customerID}</td>
                    <td>{invoices.invoiceDate}</td>
                    <td>{invoices.totalPayment}</td>
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

export default InvoiceManagement;
