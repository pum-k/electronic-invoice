import React, { useRef, useState } from "react";
import { Table, Button, FormGroup, Label, Col } from "reactstrap";
import "./index.scss";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import axios from "axios";
const DetailBill = (params) => {
  const [valueSearched, setValueSearched] = useState([
    { idProduct: "", Name: "", Unit: "", UnitPrice: "" },
  ]);
  const [inputFields, setInputFields] = useState([
    {
      idProduct: "",
      Name: "",
      Unit: "",
      Quanlity: "",
      UnitPrice: "",
      TotalPayment: "",
    },
  ]);

  const handleAddProduct = () => {
    setInputFields([
      ...inputFields,
      {
        idProduct: "",
        Name: "",
        Unit: "",
        Quanlity: "",
        UnitPrice: "",
        TotalPayment: "",
      },
    ]);
    setValueSearched([
      ...valueSearched,
      { idProduct: "", Name: "", Unit: "", UnitPrice: "" },
    ]);
  };

  const handleRemoveProduct = (index) => {
    const copiedInputField = [...inputFields];
    copiedInputField.splice(index, 1);
    setInputFields(copiedInputField);
  };

  const handleOnChange = (event, index) => {
    const values = [...inputFields];
    values[index][event.target.id] = event.target.value;
    if (event.target.id === "idProduct" && event.target.value === "") {
      setRemovePromt(false);
      for (let item in valueSearched[index]) {
        valueSearched[index][item] = "";
      }
      for (let item in inputFields[index]) {
        inputFields[index][item] = "";
      }

      // setInputFields(getValue2);
    }
    setRemovePromt(false);
    if (event.target.id === "Quanlity") {
      if (values[index]["UnitPrice"]) {
        values[index]["TotalPayment"] =
          values[index][event.target.id] * values[index]["UnitPrice"];
      }
    }
    if (event.target.id === "UnitPrice") {
      if (values[index]["Quanlity"]) {
        values[index]["TotalPayment"] =
          values[index][event.target.id] * values[index]["Quanlity"];
      }
    }
    setInputFields(values);
    // console.log(inputFields);
    params.setDetailBill(inputFields);
  };
  const [removePromt, setRemovePromt] = useState(false);
  const timeOutSearch = useRef(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const handleSearchByIdProduct = (e, index) => {
    setIsDisabled(false);
    let idProduct = e.value;
    if (timeOutSearch.current) {
      clearTimeout(timeOutSearch.current);
    }
    timeOutSearch.current = setTimeout(async () => {
      await axios
        .post("http://localhost:3001/search-product-exactly", {
          keySearch: idProduct,
        })
        .then((response) => {
          let { data } = response;
          if (data[0].length > 0) {
            setIsDisabled(true);
            let getValue = [...valueSearched];
            getValue[index].Unit = data[0][0].Unit;
            getValue[index].UnitPrice = data[0][0].UnitPrice;
            getValue[index].idProduct = data[0][0].idProduct;
            getValue[index].Name = data[0][0].Name;

            let getValue2 = [...inputFields];
            getValue2[index].Unit = data[0][0].Unit;
            getValue2[index].UnitPrice = data[0][0].UnitPrice;
            getValue2[index].idProduct = data[0][0].idProduct;
            getValue2[index].Name = data[0][0].Name;
            getValue2[index].Quanlity = "";
            getValue2[index].TotalPayment = "";

            setInputFields(getValue2);
            setValueSearched([
              ...getValue,
              { idProduct: "", Name: "", Unit: "", UnitPrice: "" },
            ]);
          }
        });
    }, 300);
  };

  return (
    <>
      <div className="content-bottom shadow-lg p-3 mb-5 bg-white rounded">
        <h4 className="content__title">Chi tiết hóa đơn</h4>
        <Table bordered className="detail-invoice-table">
          <thead>
            <tr>
              <th>Stt</th>
              <th>Mã sản phẩm</th>
              <th>Tên sản phẩm</th>
              <th>Đơn vị tính</th>
              <th>Số lượng</th>
              <th>Đơn giá</th>
              <th>Thành tiền</th>
              <th>Xóa</th>
            </tr>
          </thead>
          <tbody>
            {inputFields.map((inputField, index) => {
              return (
                <tr>
                  <td>
                    <input
                      disabled
                      value={index + 1}
                      type="number"
                      id="index"
                    />
                  </td>
                  <td>
                    <input
                      autocomplete="off"
                      type="text"
                      id="idProduct"
                      onChange={(event) => {
                        handleOnChange(event, index);
                        handleSearchByIdProduct(event.target, index);
                      }}
                      defaultValue={valueSearched[index].idProduct}
                      onBlur={(e) => {
                        if (e.target.value) {
                          handleAddProduct();
                        }
                      }}
                    />
                  </td>
                  <td>
                    <input
                      disabled={isDisabled}
                      type="text"
                      id="Name"
                      onChange={(event) => handleOnChange(event, index)}
                      defaultValue={valueSearched[index].Name}
                    />
                  </td>
                  <td>
                    <input
                      disabled={isDisabled}
                      type="text"
                      id="Unit"
                      onChange={(event) => handleOnChange(event, index)}
                      defaultValue={valueSearched[index].Unit}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      id="Quanlity"
                      onChange={(event) => handleOnChange(event, index)}
                      defaultValue={inputFields[index].Quanlity}
                    />
                  </td>
                  <td>
                    <input
                      disabled={isDisabled}
                      type="number"
                      id="UnitPrice"
                      onChange={(event) => handleOnChange(event, index)}
                      defaultValue={valueSearched[index].UnitPrice}
                    />
                  </td>
                  <td>
                    <input
                      disabled
                      type="number"
                      id="TotalPayment"
                      onChange={(event) => handleOnChange(event, index)}
                      defaultValue={inputFields[index].TotalPayment}
                    />
                  </td>
                  <td>
                    {index !== 0 ? (
                      <Button
                        color="danger"
                        onClick={() => {
                          handleRemoveProduct(index);
                        }}
                      >
                        <IoMdRemoveCircleOutline />
                      </Button>
                    ) : null}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        {/* <Button color="primary" size="sm" block onClick={handleAddProduct}>
          Thêm sản phẩm
        </Button> */}
      </div>
    </>
  );
};

export default DetailBill;
