import React, { useEffect, useState } from "react";
import { Col, FormGroup, Input, Label, FormFeedback } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const Store = (params) => {
  const [store, setStore] = useState({
    Name: "",
    Address: "",
    Email: "",
    Phone: "",
  });

  useEffect(() => {
    async function getStore() {
      let axiosData = await axios.get("http://localhost:3001/store");
      let { data } = axiosData;
      setStore(data[0]);
      params.setStore(data[0]);
    }

    getStore();
  }, []);

  return (
    <div className="content content-mid shadow-lg p-3 mb-5 bg-white rounded">
      <h4 className="content__title">Thông tin cửa hàng</h4>
      <FormGroup row>
        <Label sm={3}>Tên cửa hàng:</Label>
        <Col sm={9}>
          <Input
            type="text"
            defaultValue={store.Name}
            disabled
            style={{ backgroundColor: "white" }}
          />
        </Col>
      </FormGroup>

      <FormGroup row>
        <Label sm={3}>Địa chỉ:</Label>
        <Col sm={9}>
          <Input
            className="content-mid__textarea"
            type="textarea"
            defaultValue={store.Address}
            disabled
            style={{ backgroundColor: "white" }}
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label sm={3}>Email:</Label>
        <Col sm={9}>
          <Input
            type="email"
            defaultValue={store.Email}
            disabled
            style={{ backgroundColor: "white" }}
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label sm={3}>Số điện thoại:</Label>
        <Col sm={9}>
          <Input
            type="text"
            defaultValue={store.Phone}
            disabled
            style={{ backgroundColor: "white" }}
          />
        </Col>
      </FormGroup>
    </div>
  );
};

export default Store;
