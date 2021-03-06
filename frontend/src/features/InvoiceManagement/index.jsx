import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Col,
  Container,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
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
import { IoMdRemoveCircleOutline } from "react-icons/io";
import PrintInvoices from "../PrintInvoice";
const InvoiceManagement = () => {
  const [invoices, setInvoices] = useState([]);
  const timeOutSearch = useRef(null);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [customer, setCustomer] = useState();
  const [store, setStore] = useState();
  const [invoiceForBill, setInvoiceForBill] = useState();
  const [invoice, setInvoice] = useState({
    idInvoice: "",
    idCustomer: "",
    CreatedAt: "",
    TotalPayment: "",
  });
  const [order, setOrder] = useState();
  const [detailBill, setDetailBill] = useState([]);
  const [totalShouldBePaied, setTotalShouldBePaied] = useState();
  const [invoiceToDelete, setInvoiceToDelete] = useState();
  const [modalDelete, setModalDelete] = useState(false);
  const toggleDelete = () => setModalDelete(!modalDelete);
  const [render, setRender] = useState(false);
  useEffect(() => {
    async function getData() {
      const axiosData = await axios.get("http://localhost:3001/invoices");
      const { data } = axiosData;
      setInvoices(data);
    }
    getData();
    getStore();
  }, [render]);

  const getStore = async () => {
    let axiosData = await axios.get("http://localhost:3001/store");
    let { data } = axiosData;
    setStore(data[0]);
  };

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
        Notification("error", "Kh??ng t??m th???y h??a ????n");
      });
  };

  const getInvoice = (invoice) => {
    axios
      .post("http://localhost:3001/getInvoice", {
        idInvoice: invoice.idInvoice,
      })
      .then((response) => {
        const { data } = response;
        setInvoice(data[0]);
        let obj = {
          typeMoney: "",
          invoiceDate: data[0].CreatedAt.slice(0, 10),
          paymentOfMethod: "",
        };
        setInvoiceForBill(obj);
      });
  };

  const getCustomer = (invoice) => {
    axios
      .post("http://localhost:3001/getCustomer", {
        idCustomer: invoice.idCustomer,
      })
      .then((response) => {
        const { data } = response;
        for (let res in data[0]) {
          if (res === "DateOfBirth") {
            data[0][res] = data[0][res].slice(0, 10);
          }
        }
        setCustomer(data[0]);
      });
  };

  const getDetailBill = (invoice) => {
    axios
      .post("http://localhost:3001/getDetailBill", {
        idInvoice: invoice.idInvoice,
      })
      .then((response) => {
        const { data } = response;
        setOrder(data);

        getProductFromDetailBill(data);
      });
  };

  const getProductFromDetailBill = (dataOrder) => {
    let res = [];
    dataOrder.forEach((element) => {
      axios
        .post("http://localhost:3001/getProduct", {
          idProduct: element.idProduct,
        })
        .then((response) => {
          const { data } = response;
          let obj = {
            ...data[0],
            Quantity: element.Quantity,
            TotalPayment: element.Quantity * data[0].UnitPrice,
          };
          res.push(obj);
        });
    });
    setDetailBill(res);
  };

  const openInvoice = () => {
    // console.log(invoice);
    // console.log(store);
    // console.log(customer);
    // console.log(detailBill);
    // console.log(invoiceForBill);
    toggle();
  };
  const handleDelete = (isConfirm) => {
    if (isConfirm) {
      axios
        .post("http://localhost:3001/delete-invoice", {
          idInvoice: invoiceToDelete.idInvoice,
        })
        .then((response) => {
          if (response.status) {
            Notification("success", "X??a h??a ????n th??nh c??ng");
            setRender(!render);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <Container className="ctn-customer-management" fluid={true}>
      <NotificationContainer />
      <Modal isOpen={modalDelete} toggle={toggleDelete}>
        <ModalHeader toggle={toggleDelete}>X??a h??a ????n</ModalHeader>
        <ModalBody>B???n c?? ch???c mu???n x??a h??a ????n n??y</ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              let isConfirm = true;
              handleDelete(isConfirm);
              toggleDelete();
            }}
          >
            X??c nh???n
          </Button>{" "}
          <Button color="secondary" onClick={toggleDelete}>
            H???y b???
          </Button>
        </ModalFooter>
      </Modal>
      <Row>
        <Col>
          <h1 style={{ textAlign: "center", marginBottom: 50 }}>
            Qu???n l?? kh??ch h??ng
          </h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Container className="actions">
            <Input
              type="search"
              placeholder="t??m theo m?? h??a ????n, vd: 123456..."
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
                <th>M?? h??a ????n</th>
                <th>Ng??y l???p h??a ????n</th>
                <th>Gi?? tr??? h??a ????n</th>
                <th>Xem/X??a</th>
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
                        onFocus={() => {
                          getInvoice(invoice);
                          getCustomer(invoice);
                          getDetailBill(invoice);
                        }}
                        onClick={openInvoice}
                      >
                        <AiFillEye style={{ fontSize: 18 }} />
                      </Button>{" "}
                      <Button
                        color="danger"
                        onClick={() => {
                          toggleDelete();
                          setInvoiceToDelete(invoice);
                        }}
                      >
                        <IoMdRemoveCircleOutline />
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
            invoice={invoiceForBill}
            detailBill={detailBill}
            invoiceId={invoice.idInvoice}
            setTotalShouldBePaied={setTotalShouldBePaied}
          />
        </ModalBody>
        <ModalFooter>
          <Button onClick={toggle}>????ng</Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default InvoiceManagement;
