import React from "react";
// import { IoMdAdd } from "react-icons/io";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";
import { Formik, FastField, Form } from "formik";
import InputFormik from "../../../../components/InputFormik";
import { Button } from "reactstrap";
const Customer = (params) => {
  return (
    <div className="content content-left shadow-lg p-3 mb-5 bg-white rounded">
      <h4 className="content__title">Thông tin khách hàng</h4>
      <Formik
        initialValues={{
          search: "",
          phoneNumber: "",
          fullName: "",
          sex: "",
          email: "",
          dateOfBirth: "",
          address: "",
          cPoint: "",
        }}
        onSubmit={(values) => {
          params.setCustomer(values);
          console.log(values);
        }}
      >
        {(formikProps) => {
          const { values, errors, touched } = formikProps;
          return (
            <Form>
              <FastField
                name="search"
                component={InputFormik}
                type="text"
                label="Tìm kiếm: "
              />
              <FastField
                name="phoneNumber"
                component={InputFormik}
                type="text"
                label="Số điện thoại:  "
              />
              <FastField
                name="fullName"
                component={InputFormik}
                type="text"
                label="Họ và tên: "
              />
              <FastField
                name="sex"
                component={InputFormik}
                type="select"
                label="Giới tính: "
              />
              <FastField
                name="email"
                component={InputFormik}
                type="email"
                label="Email: "
              />
              <FastField
                name="dateOfBirth"
                component={InputFormik}
                type="date"
                label="Ngày sinh: "
              />
              <FastField
                name="address"
                component={InputFormik}
                type="text"
                label="Địa chỉ:  "
              />
              <FastField
                name="cPoint"
                component={InputFormik}
                type="number"
                label="Điểm tích lũy:  "
                disabled
              />
              <div class="btn-add-customer">
                <Button type="submit" color="primary" >
                  Xác nhận khách hàng
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Customer;
