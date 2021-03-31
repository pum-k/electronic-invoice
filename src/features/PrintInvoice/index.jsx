import React from "react";
import { Container, Row, Col, Table } from "reactstrap";
import "./index.scss";
import "bootstrap/dist/css/bootstrap.min.css";

const PrintInvoices = (params) => {
  const customer = params.customer;
  const invoice = params.invoice;
  const store = params.store;
  const detailBill = params.detailBill;
  console.log(detailBill);
  const invoiceId = new Date();
  return (
    <>
      <Container className="print-invoice">
        <Row className="title">
          <Col className="store">
            <div className="store__logo"></div>
            <h2>{store.nameStore}</h2>
          </Col>
          <Col className="right">
            <h2>INVOICE</h2>
          </Col>
        </Row>
        <Row>
          <Col className="info-store">
            <p>{store.addressStore}</p>
            <p>{store.phoneNumberStore}</p>
            <p>{store.emailStore}</p>
          </Col>
          <Col className="info-invoice right">
            <p>#{invoiceId.getTime()}</p>
            <p>{invoice.paymentOfMethod}</p>
            <p>{invoice.invoiceDate}</p>
          </Col>
        </Row>
        <Row>
          <Col className="info-customer">
            <h2>Thông tin khách hàng</h2>
            <p>{customer.fullName}</p>
            <p>{customer.dateOfBirth}</p>
            <p>{customer.address}</p>
            <p>{customer.email}</p>
            <p>{customer.phoneNumber}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table striped className="print-invoice-table">
              <thead>
                <tr>
                  <th>Sản phẩm</th>
                  <th>Số lượng</th>
                  <th>Đơn giá</th>
                  <th>Tổng tiền</th>
                </tr>
              </thead>
              <tbody className="table-body">
                {detailBill.map((item) => {
                  return (
                    <tr>
                      <td class="col-md-6">{item.productName}</td>
                      <td>{item.quanlity}</td>
                      <td>{item.unitPrice}</td>
                      <td className="right">{item.quanlity * item.unitPrice}</td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="3">Tổng tộng: </td>
                  <td className="right">2.000.000</td>
                </tr>
              </tfoot>
            </Table>
          </Col>
        </Row>
        <div className="invoice-footer">
          <p>Nếu có bất kỳ thắc mắc gì về hóa đơn, hãy liên hệ với chúng tôi</p>
          <p>[Duong Dang Khoa, 0833495422, email@address.com]</p>
        </div>
      </Container>
    </>
  );
};

export default PrintInvoices;
