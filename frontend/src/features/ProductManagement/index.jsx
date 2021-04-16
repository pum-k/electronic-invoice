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
  }, []);

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
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D")
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
              "Không thể thêm sản phẩm. Sản phẩm cần thêm đã tồn tại"
            );
          } else if (response.status) {
            setProducts([...products, productNeedAddFinish]);
            Notification("success", "Bạn vừa thêm một sản phẩm mới thành công");
          } else
            Notification(
              "error",
              "Có lỗi xảy ra, đề nghị kiểm tra lại thông tin"
            );
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      Notification(
        "error",
        "Không thể thêm sản phẩm. Bạn đã nhập thiếu thông tin sản phẩm"
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
        Notification("error", "Không tìm thấy sản phẩm");
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
      let getProducts = [...products];
      getProducts.forEach((item) => {
        if (item.idProduct === valueToUpdate.idProduct) {
          item.Unit = valueToUpdate.Unit;
          item.UnitPrice = valueToUpdate.UnitPrice;
        }
      });
      let newProductsAfterUpdate = getProducts.filter(
        (product) => product.idProduct === valueToUpdate.idProduct
      );
      await Axios.post("http://localhost:3001/update-product", {
        idProduct: newProductsAfterUpdate[0].idProduct,
        Unit: newProductsAfterUpdate[0].Unit,
        UnitPrice: newProductsAfterUpdate[0].UnitPrice,
      })
        .then((response) => {
          if (response.status) {
            Notification("success", "Sản phẩm đã được chỉnh sửa thành công");
          }
        })
        .catch((err) => {
          Notification(
            "error",
            "Có lỗi xảy ra, đề nghị kiểm tra lại thông tin"
          );
        });
    }
  };

  // Delete pro
  const handleDelete = async (isConfirm) => {
    if (isConfirm) {
      const productToDelete = [...products];
      await Axios.post("http://localhost:3001/delete-product", {
        idProduct: valueToDelete.idProduct,
      })
        .then((response) => {
          if (response.status) {
            Notification("success", "Xóa sản phẩm thành công");
          }
        })
        .catch((err) => {});
      var newProducts = productToDelete.filter((product) => {
        return product.idProduct !== valueToDelete.idProduct;
      });
      setProducts(newProducts);
    }
  };
  return (
    <Container className="ctn-customer-management" fluid={true}>
      <Row>
        <Col>
          <h1 style={{ textAlign: "center", marginBottom: 50 }}>
            Quản lý sản phẩm
          </h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Container className="actions">
            <Input
              type="search"
              placeholder="theo mã sản phẩm, vd: mi_hao_hao"
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
                <th>Số thứ tự</th>
                <th>Mã sản phẩm</th>
                <th>Tên sản phẩm</th>
                <th>Đơn vị tính</th>
                <th>Đơn giá</th>
                <th>Cập nhật/Xóa</th>
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
                        <Modal isOpen={modalUpdate} toggle={toggleUpdate}>
                          <ModalHeader toggle={toggleUpdate}>
                            Chỉnh sửa sản phẩm
                          </ModalHeader>
                          <ModalBody>
                            <InputGroup row className="margin-bottom-15">
                              <Label sm={4}>Mã sản phẩm: </Label>
                              <Col sm={8}>
                                <Input
                                  disabled
                                  defaultValue={valueToUpdate.idProduct}
                                />
                              </Col>
                            </InputGroup>
                            <InputGroup row className="margin-bottom-15">
                              <Label sm={4}>Tên sản phẩm: </Label>
                              <Col sm={8}>
                                <Input
                                  disabled
                                  defaultValue={valueToUpdate.Name}
                                />
                              </Col>
                            </InputGroup>
                            <InputGroup row className="margin-bottom-15">
                              <Label sm={4}>Đơn vị tính: </Label>
                              <Col sm={8}>
                                <Input
                                  defaultValue={valueToUpdate.Unit}
                                  onChange={(e) => onChangeUpdate(e.target)}
                                  id="Unit"
                                />
                              </Col>
                            </InputGroup>
                            <InputGroup row className="margin-bottom-15">
                              <Label sm={4}>Đơn giá: </Label>
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
                              Lưu lại
                            </Button>{" "}
                            <Button color="secondary" onClick={toggleUpdate}>
                              Hủy bỏ
                            </Button>
                          </ModalFooter>
                        </Modal>
                        <Modal isOpen={modalDelete} toggle={toggleDelete}>
                          <ModalHeader toggle={toggleDelete}>
                            Xóa sản phẩm
                          </ModalHeader>
                          <ModalBody>Bạn có chắc muốn xóa sản phẩm</ModalBody>
                          <ModalFooter>
                            <Button
                              color="primary"
                              onClick={() => {
                                let isConfirm = true;
                                handleDelete(isConfirm);
                                toggleDelete();
                              }}
                            >
                              Xác nhận
                            </Button>{" "}
                            <Button color="secondary" onClick={toggleDelete}>
                              Hủy bỏ
                            </Button>
                          </ModalFooter>
                        </Modal>
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
            Thêm sản phẩm
          </Button>
        </Col>
      </Row>

      <Modal isOpen={modalAdd} toggle={toggleAdd}>
        <ModalHeader toggle={toggleAdd}>Thêm sản phẩm</ModalHeader>
        <ModalBody>
          <InputGroup row className="margin-bottom-15">
            <Label sm={4}>Tên sản phẩm: </Label>
            <Col sm={8}>
              <Input
                type="text"
                id="Name"
                onChange={(e) => handleOnChangeAddProduct(e.target)}
              />
            </Col>
          </InputGroup>
          <InputGroup row className="margin-bottom-15">
            <Label sm={4}>Đơn vị tính: </Label>
            <Col sm={8}>
              <Input
                type="text"
                id="Unit"
                onChange={(e) => handleOnChangeAddProduct(e.target)}
              />
            </Col>
          </InputGroup>
          <InputGroup row>
            <Label sm={4}>Đơn giá: </Label>
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
            Xác nhận
          </Button>
          <Button color="danger" onClick={toggleAdd}>
            Hủy bỏ
          </Button>
        </ModalFooter>
      </Modal>
      <NotificationContainer />
    </Container>
  );
};

export default ProductManagement;
