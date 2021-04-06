import React, { useState } from "react";
import "./style.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Button,
  Col,
  Container,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import DetailBill from "./components/DetailBill";
import Customer from "./components/Customer";
import Store from "./components/Store";
import Invoice from "./components/Invoice";
import Submit from "./components/Submit";
import { Modal } from "reactstrap";
import PrintInvoices from "../PrintInvoice";

const CreateBill = () => {
  const [customer, setCustomer] = useState();
  const [store, setStore] = useState([]);
  const [invoice, setInvoice] = useState();
  const [detailBill, setDetailBill] = useState();

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const submitForm = () => {
    setModal(true);
  };
  return (
    <>
      <Container fluid={true}>
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
        <ModalHeader toggle={toggle}>Báo lỗi</ModalHeader>
        <ModalBody>
          <PrintInvoices
            customer={customer}
            store={store}
            invoice={invoice}
            detailBill={detailBill}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Đã hiểu
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default CreateBill;
