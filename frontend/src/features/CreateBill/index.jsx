import React, { useEffect, useState } from "react";
import "./style.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Button,
  Col,
  Container,
  ModalBody,
  ModalFooter,
  Row,
} from "reactstrap";
import DetailBill from "./components/DetailBill";
import Customer from "./components/Customer";
import Store from "./components/Store";
import Invoice from "./components/Invoice";
import Submit from "./components/Submit";
import { Modal } from "reactstrap";
import PrintInvoices from "../PrintInvoice";
import axios from "axios";
import Notification from "../../components/Notification";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";

const CreateBill = () => {
  const invoiceId = Date.now().toString().slice(7);
  const [customer, setCustomer] = useState();
  const [store, setStore] = useState([]);
  const [invoice, setInvoice] = useState();
  const [detailBill, setDetailBill] = useState();
  const [totalShouldBePaied, setTotalShouldBePaied] = useState();
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const checkValidity = (obj) => {
    if (obj === undefined) {
      return false;
    }
    for (let element in obj) {
      if (obj[element] === "") return false;
    }
    return true;
  };
  const checkValidityArr = (arr) => {
    if (arr === undefined) {
      return false;
    }
    for (let i = 0; i < arr.length - 1; i++) {
      if (!checkValidity(arr[i])) {
        return false;
      }
    }
    return true;
  };
  const submitForm = () => {
    let flag = true;

    if (!checkValidity(customer)) {
      Notification("error", "Kiểm tra lại thông tin khách hàng");
      flag = false;
    }
    if (!checkValidity(store)) {
      Notification("error", "Kiểm tra lại thông tin cửa hàng");
      flag = false;
    }
    if (!checkValidity(invoice)) {
      Notification("error", "Kiểm tra lại thông tin hóa đơn");
      flag = false;
    }
    if (!checkValidityArr(detailBill)) {
      Notification("error", "Kiểm tra lại Chi tiết hóa đơn");
      flag = false;
    }

    if (flag) {
      toggle();
    }
  };

  const handleSaveInvoice = async () => {
    await axios
      .post("http://localhost:3001/save-invoice", {
        idInvoice: invoiceId,
        idCustomer: customer.idCustomer,
        CreatedAt: invoice.invoiceDate,
        TotalPayment: totalShouldBePaied,
      })
      .then((response) => {
        const { data } = response;
        if (data.sqlMessage) {
          Notification("error", data.sqlMessage);
        }
        console.log(response);
      });
    detailBill.map((product, index) => {
      if (product.idProduct !== "") {
        axios.post("http://localhost:3001/order", {
          idInvoice: invoiceId,
          idProduct: product.idProduct,
          Quantity: product.Quanlity,
        });
      }
    });
    if (parseInt(totalShouldBePaied / 10000000) >= 1 && parseInt(customer.CP + totalShouldBePaied / 10000000) <= 10) {
      axios
        .post("http://localhost:3001/update-CP", {
          idCustomer: customer.idCustomer,
          CP: parseInt(totalShouldBePaied / 10000000),
        })
        .then((response) => {
          if (response.status) {
            console.log(response);
          }
        });
    }
    toggle();
    Notification("success", "In hóa đơn thành công");
    setInterval(() => {
      window.location.reload();
    }, 1000);
  };
  return (
    <>
      <Container fluid={true}>
        <NotificationContainer />
        <Row>
          <Col>
            <Customer setCustomer={setCustomer} />
          </Col>
          <Col>
            <Store setStore={setStore} />
          </Col>
          <Col>
            <Invoice setInvoice={setInvoice} />
          </Col>
        </Row>
        <Row>
          <Col>
            <DetailBill setDetailBill={setDetailBill} />
            <Submit onClick={submitForm} />
          </Col>
        </Row>
      </Container>
      <Modal isOpen={modal} toggle={toggle} className="modal-print-invoice">
        <ModalBody>
          <PrintInvoices
            customer={customer}
            store={store}
            invoice={invoice}
            detailBill={detailBill}
            invoiceId={invoiceId}
            setTotalShouldBePaied={setTotalShouldBePaied}
          />
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleSaveInvoice} color="primary">
            In hoá đơn
          </Button>
          <Button onClick={toggle}>Hủy bỏ</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default CreateBill;
