import axios from "axios";
import React from "react";
import { Container, Row, Col, Table, Button } from "reactstrap";
import "./index.scss";

const PrintInvoices = (params) => {
  const customer = params.customer;
  const invoice = params.invoice;
  const store = params.store;
  const detailBill = params.detailBill;
  
  const total = detailBill.map((value) => {
    return value.TotalPayment;
  });

  const sumPayment = total.reduce((value, prevValue) => {
    return value + prevValue;
  });
  const discount = (sumPayment * customer.CP) / 100;
  const totalShouldBePaied = () => {
    return parseInt(sumPayment) + parseInt(discount);
  };
  params.setTotalShouldBePaied(totalShouldBePaied);

  return (
    <>
      <Container className="a4">
        <Row className="a4__title">
          <Col>
            <h1>HÓA ĐƠN</h1>
          </Col>
          <Col className="right">
            <p>Mã hóa đơn: #{params.invoiceId}</p>
          </Col>
        </Row>

        <Row>
          <Col className="left">
            <div className="a4__store__title">Thông tin cửa hàng</div>
          </Col>
          <Col>
            <p className="a4__customer__title">Thông tin khách hàng</p>
          </Col>
        </Row>
        <Row className="a4__infor">
          {store ? (
            <Col className="left">
              <p>{store.Name}</p>
              <p>{store.Address}</p>
              <p>{store.Phone}</p>
              <p>{store.Email}</p>
            </Col>
          ) : (
            <Col className="left">
              <p>null</p>
              <p>null</p>
              <p>null</p>
              <p>null</p>
            </Col>
          )}

          {customer ? (
            <Col className="right">
              <p>{customer.Name}</p>
              <p>{customer.Phone}</p>
              <p>{customer.DateOfBirth}</p>
              <p>{customer.Address}</p>
              <p>{customer.Email}</p>
            </Col>
          ) : null}
        </Row>
        <h3 style={{ textAlign: "center", marginBottom: 20 }}>
          Thông tin sản phẩm
        </h3>
        <Row>
          <Col>
            <Table striped bordered>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Mã sản phẩm</th>
                  <th>Số lượng</th>
                  <th>Đơn giá</th>
                  <th>Tổng tiền</th>
                </tr>
              </thead>
              <tbody>
                {detailBill ? detailBill.map((product, index) => {
                  return (
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td>{product.idProduct}</td>
                      <td>{product.Quanlity}</td>
                      <td>{product.UnitPrice}</td>
                      <td>{product.TotalPayment}</td>
                    </tr>
                  );
                }) : null}
              </tbody>
              <tfoot className="right a4__tb__footer">
                <tr>
                  <td colspan="4">Tổng tiền sản phẩm: </td>
                  <td>{sumPayment}</td>
                </tr>
                <tr>
                  <td colspan="4">Điểm tích lũy(1 điểm = 1%): </td>
                  <td>{customer.CP}%</td>
                </tr>
                <tr>
                  <td colspan="4">Tổng tiền giảm: </td>
                  <td>{parseInt(discount)}</td>
                </tr>
                <tr>
                  <td colspan="4">Tổng tiền phải thanh toán: </td>
                  <td>{parseInt(totalShouldBePaied())}</td>
                </tr>
              </tfoot>
            </Table>
          </Col>
        </Row>
        <Row className="a4__footer">
          <Col>
            <p>Ngày xuất hóa đơn: {invoice.invoiceDate}</p>
          </Col>
          <Col className="right">
            <p>Copyright (c) 2020-CTU</p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PrintInvoices;
