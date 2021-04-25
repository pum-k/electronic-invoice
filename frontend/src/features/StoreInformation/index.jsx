import React, { useEffect, useState } from "react";
import { Button, Col, Container, Input, InputGroup, Label } from "reactstrap";
import Axios from "axios";
import "./index.scss";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
import Notification from "../../components/Notification";
const StoreInformation = () => {
  const [store, setStore] = useState({
    Name: "",
    Address: "",
    Email: "",
    Phone: "",
  });
  const [valueToUpdate, setValueToUpdate] = useState();
  useEffect(() => {
    async function getStore() {
      try {
        const axiosData = await Axios.get("http://localhost:3001/store");
        const { data } = axiosData;
        console.log(axiosData);
        setStore(data[0]);
      } catch (error) {
        console.log("Error fetching: " + error.message);
      }
    }
    getStore();
  }, []);

  const [disable, setDisable] = useState(true);
  const toggleDisable = () => setDisable(!disable);
  const handleOnChange = (event) => {
    const newValue = { ...store };
    newValue[event.id] = event.value;
    setValueToUpdate(newValue);
  };

  const saveStore = async () => {
    if (valueToUpdate) {
      await Axios.post("http://localhost:3001/update-store", {
        Name: valueToUpdate.Name,
        Address: valueToUpdate.Address,
        Email: valueToUpdate.Email,
        Phone: valueToUpdate.Phone,
      })
        .then((response) => {
          if(response.status){
          Notification("success", "Cập nhật cửa hàng thành công");

          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      Notification("error", "Không có gì mới để cập nhật");
    }
  };
  return (
    <Container className="ctn-store">
      <h1>Thông tin cửa hàng</h1>
      <InputGroup row>
        <Label sm={3}>Tên cửa hàng: </Label>
        <Col sm={9}>
          <Input
            type="text"
            defaultValue={store.Name}
            disabled={disable}
            onChange={(e) => handleOnChange(e.target)}
            id="Name"
          />
        </Col>
      </InputGroup>
      <InputGroup row>
        <Label sm={3}>Địa chỉ: </Label>
        <Col sm={9}>
          <Input
            type="text"
            defaultValue={store.Address}
            onChange={(e) => handleOnChange(e.target)}
            id="Address"
            disabled={disable}
          />
        </Col>
      </InputGroup>
      <InputGroup row>
        <Label sm={3}>Email: </Label>
        <Col sm={9}>
          <Input
            type="text"
            defaultValue={store.Email}
            onChange={(e) => handleOnChange(e.target)}
            id="Email"
            disabled={disable}
          />
        </Col>
      </InputGroup>
      <InputGroup row>
        <Label sm={3}>Số điện thoại: </Label>
        <Col sm={9}>
          <Input
            type="text"
            defaultValue={store.Phone}
            onChange={(e) => handleOnChange(e.target)}
            id="Phone"
            disabled={disable}
          />
        </Col>
      </InputGroup>
      <div className="ctn-store__action">
        {disable ? (
          <Button color="warning" onClick={toggleDisable}>
            Chỉnh sửa
          </Button>
        ) : (
          <Button color="secondary" onClick={toggleDisable}>
            Hủy Bỏ
          </Button>
        )}

        {!disable ? (
          <Button
            color="success"
            onClick={() => {
              saveStore();
              toggleDisable();
            }}
          >
            Lưu
          </Button>
        ) : (
          <Button disabled color="success">
            Lưu
          </Button>
        )}
      </div>
      <NotificationContainer />
    </Container>
  );
};

export default StoreInformation;
