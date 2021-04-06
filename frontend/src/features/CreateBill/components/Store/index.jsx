import React, {useState} from "react";
import { Col, FormGroup, Input, Label,FormFeedback} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Store = (params) => {
  
  const [store, setStore] = useState({
    nameStore: '',
    addressStore: '',
    emailStore: '',
    phoneNumberStore: '',
  });

  const handleOnChange = (input) => {
    switch (input.id) {
      case "nameStore": {
        const nameStore = {
          ...store,
          nameStore: input.value,
        };
        setStore(nameStore);
        break;
      }
      case "addressStore": {
        const addressStore = {
          ...store,
          addressStore: input.value,
        };
        setStore(addressStore);
        break;
      }
      case "emailStore": {
        const emailStore = {
          ...store,
          emailStore: input.value,
        };
        setStore(emailStore);
        break;
      }
      case "phoneNumberStore" :{
        const phoneNumberStore = {
          ...store,
          phoneNumberStore: input.value,
        }
        setStore(phoneNumberStore);
        break;
      }
      default: {
        break;
      }
    }
  };
  params.setStore(store);

  return (
    <div className="content content-mid shadow-lg p-3 mb-5 bg-white rounded">
      <h4 className="content__title">Thông tin cửa hàng</h4>
      <FormGroup row>
        <Label for="nameStore" sm={3}>
          Tên cửa hàng:
        </Label>
        <Col sm={9}>
          <Input type="text" name="nameStore" id="nameStore" onChange={(e) => handleOnChange(e.target) }/>
          <FormFeedback>Oh shit you so idiot</FormFeedback>
        </Col>
      </FormGroup>

      <FormGroup row>
        <Label for="addressStore" sm={3}>
          Địa chỉ:
        </Label>
        <Col sm={9}>
          <Input type="text" name="addressStore" id="addressStore" onChange={(e) => handleOnChange(e.target)} />
        </Col>
      </FormGroup>

      <FormGroup row>
        <Label for="email" sm={3}>
          Email:
        </Label>
        <Col sm={9}>
          <Input type="email" name="emailStore" id="emailStore" onChange={(e) => handleOnChange(e.target)} />
        </Col>
      </FormGroup>

      <FormGroup row>
        <Label for="phoneNumberStore" sm={3}>
          Số điện thoại:
        </Label>
        <Col sm={9}>
          <Input type="text" name="phoneNumberStore" id="phoneNumberStore" onChange={(e) => handleOnChange(e.target)} />
        </Col>
      </FormGroup>
    </div>
  );
};

export default Store;
