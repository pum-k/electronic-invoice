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
import Axios from "axios";
import Notification from "../../components/Notification";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import { AiTwotoneEdit } from "react-icons/ai";

const ProductManagement = () => {
  const [render, setRender] = useState(true);
  const [products, setProducts] = useState([]);
  const [productToAdd, setproductToAdd] = useState({
    idProduct: "",
    Name: "",
    Unit: "",
    UnitPrice: "",
  });
  const [modalAdd, setModalAdd] = useState(false);
  const toggleAdd = () => setModalAdd(!modalAdd);

  const [modalDelete, setModalDelete] = useState(false);
  const toggleDelete = () => setModalDelete(!modalDelete);
  const [valueToDelete, setValueToDelete] = useState();

  const [modalUpdate, setModalUpdate] = useState(false);
  const toggleUpdate = () => setModalUpdate(!modalUpdate);
  const [valueToUpdate, setValueToUpdate] = useState({
    idProduct: "",
    Name: "",
    Unit: "",
    UnitPrice: "",
  });

  const timeOutSearch = useRef(null);

  useEffect(() => {
    async function getProducts() {
      try {
        const axiosData = await Axios.get("http://localhost:3001/products");
        const { data } = axiosData;
        setProducts(data);
      } catch (error) {
        console.log("Error fetching: " + error.message);
      }
    }
    getProducts();
  }, [render]);

  // Add product
  const handleOnChangeAddProduct = (e) => {
    let getInputFieldValue = e.value;
    let getInputFieldId = e.id;
    const productNeedAdd = { ...productToAdd };
    productNeedAdd[getInputFieldId] = getInputFieldValue;
    setproductToAdd(productNeedAdd);
  };

  const automaticIdProduct = () => {
    let { Name } = productToAdd;
    let newIdProduct = Name.normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/??/g, "d")
      .replace(/??/g, "D")
      .replace(/ /g, "_");
    return newIdProduct;
  };

  const checkIsInvalidProductToAdd = (item) => {
    for (let key in item) {
      if (item[key] === "") return false;
    }
    return true;
  };

  const handleOnClickAddProduct = () => {
    const productNeedAddFinish = { ...productToAdd };
    productNeedAddFinish["idProduct"] = automaticIdProduct().toLowerCase();
    if (checkIsInvalidProductToAdd(productNeedAddFinish)) {
      setproductToAdd(productNeedAddFinish);
      // action post
      //add product
      Axios.post("http://localhost:3001/add-product", {
        idProduct: productNeedAddFinish["idProduct"],
        Name: productNeedAddFinish["Name"],
        Unit: productNeedAddFinish["Unit"],
        UnitPrice: productNeedAddFinish["UnitPrice"],
      })
        .then(function (response) {
          if (response.data["code"] === "ER_DUP_ENTRY") {
            Notification(
              "error",
              "Kh??ng th??? th??m s???n ph???m. S???n ph???m c???n th??m ???? t???n t???i"
            );
          } else if (response.status) {
            setRender(!render);
            Notification("success", "B???n v???a th??m m???t s???n ph???m m???i th??nh c??ng");
          } else
            Notification(
              "error",
              "C?? l???i x???y ra, ????? ngh??? ki???m tra l???i th??ng tin"
            );
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      Notification(
        "error",
        "Kh??ng th??? th??m s???n ph???m. B???n ???? nh???p thi???u th??ng tin s???n ph???m"
      );
    }
    setproductToAdd({ idProduct: "", Name: "", Unit: "", UnitPrice: "" });
  };

  // Search Product
  const inputController = (e) => {
    // setInputValues(e.value);
    const valueSearching = e.value;
    if (timeOutSearch.current) {
      clearTimeout(timeOutSearch.current);
    }

    timeOutSearch.current = setTimeout(() => {
      handleSearch(valueSearching);
    }, 300);
  };
  const handleSearch = async (valueSearching) => {
    await Axios.post("http://localhost:3001/search-product", {
      keySearch: valueSearching,
    })
      .then((response) => {
        if (response.data[0].length > 0) setProducts(response.data[0]);
      })
      .catch((error) => {
        Notification("error", "Kh??ng t??m th???y s???n ph???m");
      });
  };

  // Update product
  const onChangeUpdate = (e) => {
    let getInputFieldValue = e.value;
    let getInputFieldId = e.id;
    const productNeedUpdate = { ...valueToUpdate };
    productNeedUpdate[getInputFieldId] = getInputFieldValue;
    setValueToUpdate(productNeedUpdate);
  };

  const handleUpdate = async (isConfirm) => {
    if (isConfirm) {
      await Axios.post("http://localhost:3001/update-product", {
        idProduct: valueToUpdate.idProduct,
        Unit: valueToUpdate.Unit,
        UnitPrice: valueToUpdate.UnitPrice,
      })
        .then((response) => {
          if (response.status) {
            Notification("success", "S???n ph???m ???? ???????c ch???nh s???a th??nh c??ng");
            setRender(!render);
          }
        })
        .catch((err) => {
          Notification(
            "error",
            "C?? l???i x???y ra, ????? ngh??? ki???m tra l???i th??ng tin"
          );
        });
    }
  };

  // Delete pro
  const handleDelete = async (isConfirm) => {
    if (isConfirm) {
      await Axios.post("http://localhost:3001/delete-product", {
        idProduct: valueToDelete.idProduct,
      })
        .then((response) => {
          if (response.status) {
            Notification("success", "X??a s???n ph???m th??nh c??ng");
            setRender(!render);
          }
        })
        .catch((err) => {});
    }
  };
  return (
    <Container className="ctn-customer-management" fluid={true}>
      <Row>
        <Col>
          <h1 style={{ textAlign: "center", marginBottom: 50 }}>
            Qu???n l?? s???n ph???m
          </h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Container className="actions">
            <Input
              type="search"
              placeholder="theo m?? s???n ph???m, vd: mi_hao_hao"
              onChange={(e) => {
                inputController(e.target);
              }}
            />
          </Container>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table striped className="ctn-customer-management__table">
            <thead>
              <tr>
                <th>S??? th??? t???</th>
                <th>M?? s???n ph???m</th>
                <th>T??n s???n ph???m</th>
                <th>????n v??? t??nh</th>
                <th>????n gi??</th>
                <th>C???p nh???t/X??a</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => {
                return (
                  <>
                    <tr className="ctn-customer-management__table__value">
                      <td>{index + 1}</td>
                      <td>{product.idProduct}</td>
                      <td>{product.Name}</td>
                      <td>{product.Unit}</td>
                      <td>{product.UnitPrice}</td>
                      <td>
                        <Button
                          color="warning"
                          onClick={() => {
                            toggleUpdate();
                            setValueToUpdate(product);
                          }}
                        >
                          <AiTwotoneEdit />
                        </Button>{" "}
                        <Button
                          color="danger"
                          onClick={() => {
                            toggleDelete();
                            setValueToDelete(product);
                          }}
                        >
                          <IoMdRemoveCircleOutline />
                        </Button>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button color="primary" block onClick={toggleAdd}>
            Th??m s???n ph???m
          </Button>
        </Col>
      </Row>
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
      <Modal isOpen={modalUpdate} toggle={toggleUpdate}>
        <ModalHeader toggle={toggleUpdate}>Ch???nh s???a s???n ph???m</ModalHeader>
        <ModalBody>
          <InputGroup row className="margin-bottom-15">
            <Label sm={4}>M?? s???n ph???m: </Label>
            <Col sm={8}>
              <Input disabled defaultValue={valueToUpdate.idProduct} />
            </Col>
          </InputGroup>
          <InputGroup row className="margin-bottom-15">
            <Label sm={4}>T??n s???n ph???m: </Label>
            <Col sm={8}>
              <Input disabled defaultValue={valueToUpdate.Name} />
            </Col>
          </InputGroup>
          <InputGroup row className="margin-bottom-15">
            <Label sm={4}>????n v??? t??nh: </Label>
            <Col sm={8}>
              <Input
                defaultValue={valueToUpdate.Unit}
                onChange={(e) => onChangeUpdate(e.target)}
                id="Unit"
              />
            </Col>
          </InputGroup>
          <InputGroup row className="margin-bottom-15">
            <Label sm={4}>????n gi??: </Label>
            <Col sm={8}>
              <Input
                type="Number"
                defaultValue={valueToUpdate.UnitPrice}
                onChange={(e) => onChangeUpdate(e.target)}
                id="UnitPrice"
              />
            </Col>
          </InputGroup>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              let isConfirm = true;
              handleUpdate(isConfirm);
              toggleUpdate();
            }}
          >
            L??u l???i
          </Button>{" "}
          <Button color="secondary" onClick={toggleUpdate}>
            H???y b???
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalAdd} toggle={toggleAdd}>
        <ModalHeader toggle={toggleAdd}>Th??m s???n ph???m</ModalHeader>
        <ModalBody>
          <InputGroup row className="margin-bottom-15">
            <Label sm={4}>T??n s???n ph???m: </Label>
            <Col sm={8}>
              <Input
                type="text"
                id="Name"
                onChange={(e) => handleOnChangeAddProduct(e.target)}
              />
            </Col>
          </InputGroup>
          <InputGroup row className="margin-bottom-15">
            <Label sm={4}>????n v??? t??nh: </Label>
            <Col sm={8}>
              <Input
                type="text"
                id="Unit"
                onChange={(e) => handleOnChangeAddProduct(e.target)}
              />
            </Col>
          </InputGroup>
          <InputGroup row>
            <Label sm={4}>????n gi??: </Label>
            <Col sm={8}>
              <Input
                type="number"
                id="UnitPrice"
                onChange={(e) => handleOnChangeAddProduct(e.target)}
              />
            </Col>
          </InputGroup>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              handleOnClickAddProduct();
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
      <NotificationContainer />
    </Container>
  );
};

export default ProductManagement;
