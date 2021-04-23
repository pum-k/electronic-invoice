import React, { useState, useRef } from "react";
import { IoMdAdd } from "react-icons/io";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";
import {
  Button,
  Col,
  Input,
  InputGroup,
  Label,
  Popover,
  PopoverHeader,
  PopoverBody,
} from "reactstrap";
import axios from "axios";
import Notification from "../../../../components/Notification";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
const Customer = (params) => {
  const timeOutSearch = useRef(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const [customer, setCustomer] = useState({
    idCustomer: "",
    FullName: "",
    Phone: "",
    Email: "",
    DateOfBirth: "",
    Address: "",
    CP: "",
  });
  const [valueSearched, setValueSearched] = useState({
    idCustomer: "",
    FullName: "",
    Phone: "",
    Email: "",
    DateOfBirth: "",
    Address: "",
    CP: "",
  });
  const [customerToAdd, setCustomerToAdd] = useState({
    idCustomer: "",
    FullName: "",
    Phone: "",
    Email: "",
    DateOfBirth: "",
    Address: "",
    CP: "",
  });
  const [popoverOpen, setPopoverOpen] = useState(false);
  const toggleSearch = () => setPopoverOpen(!popoverOpen);

  const controlCustomer = (e) => {
    const getCustomerToAdd = { ...customerToAdd };
    if (e.id === "DateOfBirth") {
      getCustomerToAdd[e.id] = e.value.slice(0, 10);
    }
    getCustomerToAdd[e.id] = e.value;
    setCustomerToAdd(getCustomerToAdd);
    params.setCustomer(getCustomerToAdd);
  };
  const controlIdCustomer = (e) => {
    setCustomer({
      idCustomer: "",
      FullName: "",
      Phone: "",
      Email: "",
      DateOfBirth: "",
      Address: "",
      CP: "",
    });
    setIsDisabled(false);
    let idCustomerToSearch = e.value;

    if (timeOutSearch.current) {
      clearTimeout(timeOutSearch.current);
    }

    timeOutSearch.current = setTimeout(() => {
      handleSearch(idCustomerToSearch);
    }, 350);
  };
  const handleSearch = async (key) => {
    await axios
      .post("http://localhost:3001/search-customer-exactly", {
        keySearch: key,
      })
      .then((response) => {
        let { data } = response;
        if (data[0].length > 0) {
          const getCustomer = { ...data[0][0] };
          getCustomer.DateOfBirth = getCustomer.DateOfBirth.slice(0, 10);
          setValueSearched(getCustomer);
          toggleSearch();
        }
      });
  };

  const handleSelectCustomer = () => {
    setCustomer(valueSearched);
    params.setCustomer(valueSearched);
    toggleSearch();
    setIsDisabled(true);
    setValueSearched({
      idCustomer: "",
      FullName: "",
      Phone: "",
      Email: "",
      DateOfBirth: "",
      Address: "",
      CP: "",
    });
  };
  const validationAddCustomer = () => {
    if (customerToAdd === undefined) return false;
    for (let customer in customerToAdd) {
      if (customerToAdd[customer] === "") {
        return false;
      }
    }
    return true;
  };
  const handleAddCustomer = async () => {
    if (validationAddCustomer()) {
      await axios
        .post("http://localhost:3001/add-customer", {
          idCustomer: customerToAdd.idCustomer,
          FullName: customerToAdd.FullName,
          Phone: customerToAdd.Phone,
          Email: customerToAdd.Email,
          DateOfBirth: customerToAdd.DateOfBirth.slice(0, 10),
          Address: customerToAdd.Address,
          CP: customerToAdd.CP,
        })
        .then((response) => {
          Notification("success", "Thêm khách hàng mới thành công");
          params.setCustomer(customerToAdd);
        });
    } else {
      Notification(
        "error",
        "Không thể thêm khách hàng, bạn đã nhập sai hoặc thiếu thông tin khách hàng"
      );
    }
  };
  return (
    <div className="content content-left shadow-lg p-3 mb-5 bg-white rounded">
      <h4 className="content__title">Thông tin khách hàng</h4>
      <InputGroup row className="margin-bottom-15">
        <Label sm={4}>Mã khách hàng: </Label>
        <Col>
          <Input
            type="number"
            id="idCustomer"
            onChange={(e) => {
              controlIdCustomer(e.target);
              controlCustomer(e.target);
            }}
            defaultValue={customer.idCustomer}
          />
        </Col>
      </InputGroup>
      <InputGroup row className="margin-bottom-15">
        <Label sm={4}>Họ và tên: </Label>
        <Col>
          <Input
            type="text"
            disabled={isDisabled}
            onChange={(e) => controlCustomer(e.target)}
            id="FullName"
            defaultValue={customer.FullName}
          />
        </Col>
      </InputGroup>
      <InputGroup row className="margin-bottom-15">
        <Label sm={4}>Số điện thoại: </Label>
        <Col>
          <Input
            disabled={isDisabled}
            onChange={(e) => controlCustomer(e.target)}
            id="Phone"
            defaultValue={customer.Phone}
          />
        </Col>
      </InputGroup>
      <InputGroup row className="margin-bottom-15">
        <Label sm={4}>Email: </Label>
        <Col>
          <Input
            disabled={isDisabled}
            onChange={(e) => controlCustomer(e.target)}
            id="Email"
            defaultValue={customer.Email}
          />
        </Col>
      </InputGroup>
      <InputGroup row className="margin-bottom-15">
        <Label sm={4}>Ngày sinh: </Label>
        <Col>
          <Input
            disabled={isDisabled}
            type="date"
            onChange={(e) => controlCustomer(e.target)}
            id="DateOfBirth"
            defaultValue={customer.DateOfBirth.slice(0, 10)}
          />
        </Col>
      </InputGroup>
      <InputGroup row className="margin-bottom-15">
        <Label sm={4}>Địa chỉ: </Label>
        <Col>
          <Input
            disabled={isDisabled}
            onChange={(e) => controlCustomer(e.target)}
            id="Address"
            defaultValue={customer.Address}
          />
        </Col>
      </InputGroup>
      <InputGroup row className="margin-bottom-15">
        <Label sm={4}>Điểm tích lũy: </Label>
        <Col>
          <Input
            disabled={isDisabled}
            type="number"
            onChange={(e) => controlCustomer(e.target)}
            id="CP"
            defaultValue={customer.CP}
          />
        </Col>
      </InputGroup>

      <Button
        color="primary"
        className="btn-add-customer"
        onClick={handleAddCustomer}
      >
        <IoMdAdd className="icon-add-customer" />
        Thêm mới khách hàng
      </Button>

      <Popover placement="bottom" isOpen={popoverOpen} target="idCustomer">
        <PopoverHeader>Khách hàng tồn tại</PopoverHeader>
        <PopoverBody>
          Họ và tên: {valueSearched.FullName} <br />
          SĐT: {valueSearched.Phone} <br />
          Email: {valueSearched.Email} <br />
          Ngày sinh: {valueSearched.DateOfBirth.slice(0, 10)} <br />
          Địa chỉ: {valueSearched.Address} <br />
          Điểm tích lũy: {valueSearched.CP}
          <Col>
            <Button
              color="primary"
              block
              size="sm"
              style={{ marginTop: 10 }}
              onClick={handleSelectCustomer}
            >
              Chọn
            </Button>
          </Col>
        </PopoverBody>
      </Popover>
      <NotificationContainer />
    </div>
  );
};

export default Customer;
