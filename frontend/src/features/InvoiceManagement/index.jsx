import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Col,
  Container,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  Row,
  Table,
} from "reactstrap";
import "./index.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Notification from "../../components/Notification";
import NotificationContainer from "react-notifications/lib/NotificationContainer";
import "react-notifications/lib/notifications.css";
import { AiFillEye } from "react-icons/ai";
import PrintInvoices from "../PrintInvoice";
const InvoiceManagement = () => {
  const [invoices, setInvoices] = useState([]);
  const timeOutSearch = useRef(null);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [customer, setCustomer] = useState();
  const [store, setStore] = useState([]);
  const [invoice, setInvoice] = useState({
    idInvoice: "123",
  });
  const [order, setOrder] = useState();

  const [totalShouldBePaied, setTotalShouldBePaied] = useState();
  const [detailBill, setDetailBill] = useState([]);

  useEffect(() => {
    async function getData() {
      const axiosData = await axios.get("http://localhost:3001/invoices");
      const { data } = axiosData;
      setInvoices(data);
    }
    getData();
  }, []);
  // console.log(invoices);
  const controlInputSearch = (e) => {
    const valueSearching = e.value;
    if (timeOutSearch.current) {
      clearTimeout(timeOutSearch.current);
    }

    timeOutSearch.current = setTimeout(() => {
      handleSearch(valueSearching);
    }, 300);
  };

  const handleSearch = (valueSearching) => {
    axios
      .post("http://localhost:3001/search-invoice", {
        keySearch: valueSearching,
      })
      .then((response) => {
        if (response.data[0].length > 0) setInvoices(response.data[0]);
      })
      .catch((error) => {
        Notification("error", "Không tìm thấy hóa đơn");
      });
  };

  const openInvoice = (invoice, index) => {
    axios
      .post("http://localhost:3001/getInvoice", {
        idInvoice: invoice.idInvoice,
      })
      .then((response) => {
        const { data } = response;
        setInvoice(data[0]);
      });
    axios
      .post("http://localhost:3001/getCustomer", {
        idCustomer: invoice.idCustomer,
      })
      .then((response) => {
        const { data } = response;
        setCustomer(data);
      });
    axios
      .post("http://localhost:3001/getDetailBill", {
        idInvoice: invoice.idInvoice,
      })
      .then((response) => {
        const { data } = response;
        setOrder(data);
      });
    let axiosData = axios.get("http://localhost:3001/store");
    let { data } = axiosData;
    setStore(data[0]);
    // toggle();
    // console.log(detailBill);
    order.forEach((item) => {
      console.log(item.idProduct);
      axios
        .post("http://localhost:3001/getProduct", {
          idProduct: item.idProduct,
        })
        .then((response) => {
          const { data } = response;
          const currentDetailBill = [...detailBill];
          // console.log(currentDetailBill);
        });
    });
  };

  return (
    <Container className="ctn-customer-management" fluid={true}>
      <NotificationContainer />
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
              placeholder="tìm theo mã hóa đơn, vd: 123456..."
              onChange={(e) => controlInputSearch(e.target)}
            />
          </Container>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table striped className="ctn-customer-management__table">
            <thead>
              <tr>
                <th>Mã hóa đơn</th>
                <th>Ngày lập hóa đơn</th>
                <th>Giá trị hóa đơn</th>
                <th>Xem</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice, index) => {
                return (
                  <tr>
                    <td>{invoice.idInvoice}</td>
                    <td>{invoice.CreatedAt.slice(0, 10)}</td>
                    <td>{invoice.TotalPayment}</td>
                    <td>
                      <Button
                        color="warning"
                        onClick={() => openInvoice(invoice, index)}
                      >
                        <AiFillEye style={{ fontSize: 18 }} />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Modal isOpen={modal} toggle={toggle} className="modal-print-invoice">
        <ModalBody>
          <PrintInvoices
            customer={customer}
            store={store}
            invoice={invoice}
            detailBill={detailBill}
            invoiceId={invoice.idInvoice}
            setTotalShouldBePaied={setTotalShouldBePaied}
          />
        </ModalBody>
        <ModalFooter>
          <Button onClick={toggle}>Đóng</Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default InvoiceManagement;
