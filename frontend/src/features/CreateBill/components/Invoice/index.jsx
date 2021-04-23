import React, { useEffect, useState } from "react";
import { Col, FormGroup, Input, Label } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Invoice = (params) => {
  const [invoice, setInvoice] = useState({
    typeMoney: "",
    invoiceDate: "",
    paymentOfMethod: "",
  });

  const handleOnChange = (input) => {
    switch (input.id) {
      case "typeMoney": {
        const typeMoney = {
          ...invoice,
          typeMoney: input.value,
        };
        setInvoice(typeMoney);
        break;
      }
      case "invoiceDate": {
        const invoiceDate = {
          ...invoice,
          invoiceDate: input.value,
        };
        setInvoice(invoiceDate);
        break;
      }
      case "paymentOfMethod": {
        const paymentOfMethod = {
          ...invoice,
          paymentOfMethod: input.value,
        };
        setInvoice(paymentOfMethod);
        break;
      }
      default: {
        break;
      }
    }
  };
  params.setInvoice(invoice);
  return (
    <div className="content shadow-lg p-3 mb-5 bg-white rounded">
      <h4 className="content__title">Thông tin hóa đơn</h4>
      <FormGroup row>
        <Label for="typeMoney" sm={4}>
          Loại tiền
        </Label>
        <Col sm={8}>
          <Input
            type="select"
            name="typeMoney"
            id="typeMoney"
            onChange={(e) => handleOnChange(e.target)}
          >
            <option value="">--Chọn--</option>
            <option value="vnd">VND</option>
            <option value="usa">USA</option>
          </Input>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="invoiceDate" sm={4}>
          Ngày lập hóa đơn
        </Label>
        <Col sm={8}>
          <Input
            type="date"
            name="invoiceDate"
            id="invoiceDate"
            onChange={(e) => handleOnChange(e.target)}
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="paymentOfMethod" sm={4}>
          Hình thức thanh toán
        </Label>
        <Col sm={8}>
          <Input
            type="select"
            name="paymentOfMethod"
            id="paymentOfMethod"
            onChange={(e) => handleOnChange(e.target)}
          >
            <option value="">--Chọn--</option>
            <option value="Tiền mặt">Tiền mặt</option>
            <option value="Chuyển Khoản">Chuyển khoản</option>
          </Input>
        </Col>
      </FormGroup>
    </div>
  );
};

export default Invoice;
