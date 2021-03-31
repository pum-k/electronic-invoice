import React, { useState } from "react";
import { Table, Button, FormGroup, Label, Col } from "reactstrap";
import "./index.scss";
import { IoMdRemoveCircleOutline } from "react-icons/io";
const DetailBill = (params) => {
  const [inputFields, setInputFields] = useState([
    {
      productId: "",
      productName: "",
      unit: "",
      quanlity: "",
      unitPrice: "",
      totalPayment: "",
    },
  ]);

  const handleAddProduct = () => {
    setInputFields([
      ...inputFields,
      {
        productId: "",
        productName: "",
        unit: "",
        quanlity: "",
        unitPrice: "",
        totalPayment: "",
      },
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
    setInputFields(values);
    params.setDetailBill(inputFields);
  }

  return (
    <>
      <div className="content-bottom shadow-lg p-3 mb-5 bg-white rounded">
        <h4 className="content__title">Chi tiết hóa đơn</h4>
        <Table bordered className="detail-invoice-table">
          <thead>
            <tr>
              <th>Stt</th>
              <th class="col-md-2">Mã sản phẩm</th>
              <th class="col-md-3">Tên sản phẩm</th>
              <th class="col-md-1">Đơn vị tính</th>
              <th class="col-md-1">Số lượng</th>
              <th class="col-md-2">Đơn giá</th>
              <th class="col-md-2">Thành tiền</th>
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
                    <input type="text" id="productId" onChange={(event) => handleOnChange(event, index)}/>
                  </td>
                  <td>
                    <input type="text" id="productName" onChange={(event) => handleOnChange(event, index)}/>
                  </td>
                  <td>
                    <input type="text" id="unit" onChange={(event) => handleOnChange(event, index)}/>
                  </td>
                  <td>
                    <input type="text" id="quanlity" onChange={(event) => handleOnChange(event, index)}/>
                  </td>
                  <td>
                    <input type="number" id="unitPrice" onChange={(event) => handleOnChange(event, index)}/>
                  </td>
                  <td>
                    <input disabled type="number" id="totalPayment" onChange={(event) => handleOnChange(event, index)}/>
                  </td>
                  <td>
                    <Button
                      color="danger"
                      onClick={() => handleRemoveProduct(index)}
                    >
                      <IoMdRemoveCircleOutline />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <Button color="primary" size="sm" block onClick={handleAddProduct}>
          Thêm sản phẩm
        </Button>
      </div>
    </>
  );
};

export default DetailBill;
