import React, { useEffect, useRef, useState } from "react";
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
import { AiTwotoneEdit } from "react-icons/ai";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import axios from "axios";
import Notification from "../../components/Notification";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";

const CustomerManagement = () => {
  //DECLARE VARIABLE --------------------------------------------------------------------------------
  const [render, setRender] = useState(true);
  const [customers, setCustomers] = useState([]);
  const [inputSearch, setInputSearch] = useState();
  const timeOutSearch = useRef(null);
  const [modalAdd, setModalAdd] = useState(false);
  const toggleAdd = () => setModalAdd(!modalAdd);
  const [customerToAdd, setCustomerToAdd] = useState({
    idCustomer: "",
    FullName: "",
    Phone: "",
    Email: "",
    DateOfBirth: "",
    Address: "",
    CP: "",
  });
  const [modalUpdate, setModalUpdate] = useState(false);
  const toggleUpdate = () => setModalUpdate(!modalUpdate);
  const [customerToUpdate, setCustomerToUpdate] = useState({
    idCustomer: "",
    FullName: "",
    Phone: "",
    Email: "",
    DateOfBirth: "",
    Address: "",
    CP: "",
  });
  const [allowSaveUpdate, setAllowSaveUpdate] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const toggleDelete = () => setModalDelete(!modalDelete);
  const [customerToDelete, setCustomerToDelete] = useState();
  //GET DATA ----------------------------------------------------------------------------------------
  useEffect(() => {
    async function getCustomers() {
      try {
        const axiosData = await axios.get("http://localhost:3001/customers");
        const { data } = axiosData;
        setCustomers(data);
      } catch (error) {
        console.log(error);
      }
    }
    getCustomers();
  }, [render]);

  // SEARCH ------------------------------------------------------------------------------------------
  const controlInputSearch = (e) => {
    const valueSearching = e.value;
    if (timeOutSearch.current) {
      clearTimeout(timeOutSearch.current);
    }

    timeOutSearch.current = setTimeout(() => {
      handleSearch(valueSearching);
    }, 300);
  };

  const handleSearch = async (valueSearching) => {
    await axios
      .post("http://localhost:3001/search-customer", {
        keySearch: valueSearching,
      })
      .then((response) => {
        if (response.data[0].length > 0) setCustomers(response.data[0]);
      })
      .catch((error) => {
        Notification("error", "Kh??ng t??m th???y kh??ch h??ng");
      });
  };

  // ADD -----------------------------------------------------------------------------------
  const controlAddCustomer = (e) => {
    let getInputFieldValue = e.value;
    let getInputFieldId = e.id;
    const customerNeedAdd = { ...customerToAdd };
    customerNeedAdd[getInputFieldId] = getInputFieldValue;
    if (getInputFieldId === "Phone")
      customerNeedAdd["idCustomer"] = getInputFieldValue;
    setCustomerToAdd(customerNeedAdd);
  };

  const checkIsInvalidCustomerToAdd = (item) => {
    for (let key in item) {
      if (item[key] === "") return false;
    }
    return true;
  };

  const handleAddCustomer = () => {
    if (checkIsInvalidCustomerToAdd) {
      axios
        .post("http://localhost:3001/add-customer", {
          idCustomer: customerToAdd.Phone,
          FullName: customerToAdd.FullName,
          Phone: customerToAdd.Phone,
          Email: customerToAdd.Email,
          DateOfBirth: customerToAdd.DateOfBirth,
          Address: customerToAdd.Address,
          CP: customerToAdd.CP,
        })
        .then((response) => {
          if (response.data["code"] === "ER_DUP_ENTRY") {
            Notification(
              "error",
              "M?? s??? kh??ch h??ng ho???c s??? ??i???n tho???i kh??ch h??ng ???? t???n t???i"
            );
          } else if (
            response.data["code"] === "ER_TRUNCATED_WRONG_VALUE_FOR_FIELD"
          ) {
            Notification(
              "error",
              "Kh??ng th??? th??m kh??ch h??ng. B???n ???? nh???p thi???u th??ng tin kh??ch h??ng"
            );
          } else {
            Notification("success", "Th??m kh??ch h??ng th??nh c??ng");
            setCustomers([...customers, customerToAdd]);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      Notification(
        "error",
        "Kh??ng th??? th??m kh??ch h??ng. B???n ???? nh???p thi???u th??ng tin kh??ch h??ng"
      );
    }
    setCustomerToAdd({
      idCustomer: "",
      FullName: "",
      Phone: "",
      Email: "",
      DateOfBirth: "",
      Address: "",
      CP: "",
    });
  };

  // UPDATE ----------------------------------------------------------------------------
  const controlCustomerUpdate = (e) => {
    setAllowSaveUpdate(true);
    let getInputFieldValue = e.value;
    let getInputFieldId = e.id;
    const customerNeedUpdate = { ...customerToUpdate };
    customerNeedUpdate[getInputFieldId] = getInputFieldValue;
    setCustomerToUpdate(customerNeedUpdate);
  };
  const convertIsoDate = (isoDate) => {
    let date = new Date(isoDate);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let dt = date.getDate();

    if (dt < 10) {
      dt = "0" + dt;
    }
    if (month < 10) {
      month = "0" + month;
    }

    return year + "-" + month + "-" + dt;
  };
  
  const handleUpdate = async () => {
    await axios
      .post("http://localhost:3001/update-customer", {
        idCustomer: customerToUpdate.idCustomer,
        FullName: customerToUpdate.FullName,
        Phone: customerToUpdate.Phone,
        Email: customerToUpdate.Email,
        DateOfBirth: convertIsoDate(customerToUpdate.DateOfBirth),
        Address: customerToUpdate.Address,
        CP: customerToUpdate.CP,
      })
      .then((response) => {
        Notification("success", "C???p nh???t th??ng tin kh??ch h??ng th??nh c??ng");
        setRender(!render);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // DELETE ------------------------------------------------------------
  const handleDelete = async (isConfirm) => {
    if (isConfirm) {
      await axios.post("http://localhost:3001/delete-customer", {
        idCustomer: customerToDelete.idCustomer,
      })
        .then((response) => {
          if (response.status) {
            Notification("success", "X??a kh??ch h??ng th??nh c??ng");
            setRender(!render);
          }
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  return (
    <Container className="ctn-customer-management" fluid={true}>
      <NotificationContainer />
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
              placeholder="t??m theo m?? kh??ch h??ng, vd: 833495422"
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
                <th>M?? kh??ch h??ng</th>
                <th>T??n kh??ch h??ng</th>
                <th>S??? ??i???n tho???i</th>
                <th>Email</th>
                <th>Ng??y sinh</th>
                <th>?????a ch???</th>
                <th>??i???m t??ch l??y</th>
                <th>C???p nh???t/X??a</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer, index) => {
                return (
                  <tr>
                    <td>{customer.idCustomer}</td>
                    <td>{customer.FullName}</td>
                    <td>{customer.Phone}</td>
                    <td>{customer.Email}</td>
                    <td>{customer.DateOfBirth.slice(0, 10)}</td>
                    <td>{customer.Address}</td>
                    <td>{customer.CP}</td>
                    <td>
                      <Button
                        color="warning"
                        onClick={() => {
                          toggleUpdate();
                          setCustomerToUpdate(customer);
                        }}
                      >
                        <AiTwotoneEdit />
                      </Button>{" "}
                      <Button color="danger"
                      onClick={() => {
                        toggleDelete();
                        setCustomerToDelete(customer);
                      }}>
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
      {/* ADD CUSTOMER */}
      <Row>
        <Col>
          <Button color="primary" block onClick={toggleAdd}>
            Th??m s???n ph???m
          </Button>
        </Col>
      </Row>
      <Modal isOpen={modalUpdate} toggle={toggleUpdate}>
        <ModalHeader toggle={toggleUpdate}>Ch???nh s???a kh??ch h??ng</ModalHeader>
        <ModalBody>
          <InputGroup row className="margin-bottom-15">
            <Label sm={4}>T??n kh??ch h??ng: </Label>
            <Col sm={8}>
              <Input
                defaultValue={customerToUpdate.FullName}
                id="FullName"
                onChange={(e) => {
                  controlCustomerUpdate(e.target);
                }}
              />
            </Col>
          </InputGroup>
          <InputGroup row className="margin-bottom-15">
            <Label sm={4}>S??? ??i???n tho???i: </Label>
            <Col sm={8}>
              <Input
                defaultValue={customerToUpdate.Phone}
                id="Phone"
                onChange={(e) => {
                  controlCustomerUpdate(e.target);
                }}
              />
            </Col>
          </InputGroup>
          <InputGroup row className="margin-bottom-15">
            <Label sm={4}>Email</Label>
            <Col sm={8}>
              <Input
                defaultValue={customerToUpdate.Email}
                id="Email"
                onChange={(e) => {
                  controlCustomerUpdate(e.target);
                }}
              />
            </Col>
          </InputGroup>
          <InputGroup row className="margin-bottom-15">
            <Label sm={4}>Ng??y sinh: </Label>
            <Col sm={8}>
              <Input
                type="date"
                defaultValue={customerToUpdate.DateOfBirth.slice(0, 10)}
                id="DateOfBirth"
                onChange={(e) => {
                  controlCustomerUpdate(e.target);
                }}
              />
            </Col>
          </InputGroup>
          <InputGroup row className="margin-bottom-15">
            <Label sm={4}>?????a ch???: </Label>
            <Col sm={8}>
              <Input
                defaultValue={customerToUpdate.Address}
                id="Address"
                onChange={(e) => {
                  controlCustomerUpdate(e.target);
                }}
              />
            </Col>
          </InputGroup>
          <InputGroup row className="margin-bottom-15">
            <Label sm={4}>??i???m t??ch l??y: </Label>
            <Col sm={8}>
              <Input
                defaultValue={customerToUpdate.CP}
                id="CP"
                onChange={(e) => {
                  controlCustomerUpdate(e.target);
                }}
              />
            </Col>
          </InputGroup>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            disabled={!allowSaveUpdate}
            onClick={() => {
              handleUpdate();
              toggleUpdate();
            }}
          >
            L??u l???i
          </Button>
          <Button color="secondary" onClick={toggleUpdate}>
            H???y b???
          </Button>{" "}
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalDelete} toggle={toggleDelete}>
        <ModalHeader toggle={toggleDelete}>X??a s???n ph???m</ModalHeader>
        <ModalBody>B???n c?? ch???c mu???n x??a s???n ph???m</ModalBody>
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
      <Modal isOpen={modalAdd} toggle={toggleAdd} backdrop="satic">
        <ModalHeader toggle={toggleAdd}>Th??m kh??ch h??ng</ModalHeader>
        <ModalBody>
          <InputGroup row className="margin-bottom-15">
            <Label sm={4}>S??? ??i???n tho???i: </Label>
            <Col sm={8}>
              <Input
                type="text"
                id="Phone"
                onChange={(e) => controlAddCustomer(e.target)}
              />
            </Col>
          </InputGroup>
          <InputGroup row className="margin-bottom-15">
            <Label sm={4}>H??? v?? t??n: </Label>
            <Col sm={8}>
              <Input
                type="text"
                id="FullName"
                onChange={(e) => controlAddCustomer(e.target)}
              />
            </Col>
          </InputGroup>
          <InputGroup row className="margin-bottom-15">
            <Label sm={4}>Email: </Label>
            <Col sm={8}>
              <Input
                type="email"
                id="Email"
                onChange={(e) => controlAddCustomer(e.target)}
              />
            </Col>
          </InputGroup>
          <InputGroup row className="margin-bottom-15">
            <Label sm={4}>Ng??y sinh: </Label>
            <Col sm={8}>
              <Input
                type="date"
                placeholder="yyyy-mm-dd"
                id="DateOfBirth"
                onChange={(e) => controlAddCustomer(e.target)}
              />
            </Col>
          </InputGroup>
          <InputGroup row className="margin-bottom-15">
            <Label sm={4}>?????a ch???: </Label>
            <Col sm={8}>
              <Input
                type="text"
                id="Address"
                onChange={(e) => controlAddCustomer(e.target)}
              />
            </Col>
          </InputGroup>
          <InputGroup row className="margin-bottom-15">
            <Label sm={4}>??i???m t??ch l??y: </Label>
            <Col sm={8}>
              <Input
                type="number"
                id="CP"
                onChange={(e) => controlAddCustomer(e.target)}
              />
            </Col>
          </InputGroup>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              handleAddCustomer();
              toggleAdd();
            }}
          >
            X??c nh???n
          </Button>
          <Button color="danger" onClick={toggleAdd}>
            H???y b???
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default CustomerManagement;
