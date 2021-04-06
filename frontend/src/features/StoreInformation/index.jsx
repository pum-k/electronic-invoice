import React, { useState } from "react";
import {
  Button,
  Col,
  Container,
  Input,
  InputGroup,
  Label,
  Row,
} from "reactstrap";
import "./index.scss";
const StoreInformation = () => {
  const [store, setStore] = useState({
    nameStore: "Hokiti",
    addressStore: "",
    emailStore: "",
    phoneNumberStore: "",
  });
  const [disable, setDisable] = useState(true);
  const toggleDisable = () => setDisable(false);
  const handleOnChange = (event) => {
    const newValue = {...store};
    newValue[event.id] = event.value;
    setStore(newValue); 
  }
  const saveStore = () => {
    alert(store);
    setDisable(true);
  }
  return (
    <Container className="ctn-store">
      <h1>Thông tin cửa hàng</h1>
      <InputGroup row>
        <Label sm={3}>Tên cửa hàng: </Label>
        <Col sm={9}>
          <Input type="text" defaultValue={store.nameStore}  disabled={disable} onChange={(e) => handleOnChange(e.target)} id="nameStore"/>
        </Col>
      </InputGroup>
      <InputGroup row>
        <Label sm={3}>Địa chỉ: </Label>
        <Col sm={9}>
          {disable ? (
            <Input type="text" defaultValue={store.addressStore} disabled />
          ) : (
            <Input type="text" defaultValue={store.addressStore} onChange={(e) => handleOnChange(e.target)} id="addressStore"/>
          )}
        </Col>
      </InputGroup>
      <InputGroup row>
        <Label sm={3}>Email: </Label>
        <Col sm={9}>
          {disable ? (
            <Input type="text" defaultValue={store.emailStore} disabled />
          ) : (
            <Input type="text" defaultValue={store.emailStore} onChange={(e) => handleOnChange(e.target)} id="emailStore" />
          )}
        </Col>
      </InputGroup>
      <InputGroup row>
        <Label sm={3}>Số điện thoại: </Label>
        <Col sm={9}>
          {disable ? (
            <Input type="text" defaultValue={store.phoneNumberStore} disabled />
          ) : (
            <Input type="text" defaultValue={store.phoneNumberStore} onChange={(e) => handleOnChange(e.target)} id="phoneNumberStore" />
          )}
        </Col>
      </InputGroup>
      <div className="ctn-store__action">
        <Button color="warning" onClick={toggleDisable}>Chỉnh sửa</Button>
        {!disable ? (
          <Button color="success" onClick={saveStore}>Lưu</Button>
        ) : (
          <Button disabled color="success">
            Lưu
          </Button>
        )}
      </div>
    </Container>
  );
};

export default StoreInformation;
