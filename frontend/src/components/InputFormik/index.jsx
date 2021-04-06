import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, FormGroup, Input, Label } from "reactstrap";

const InputFormik = ({ label, type, form, field, placeholder, disabled }) => {
  const { name, onChange, onBlur, value } = field;
  return (
    <>
      <FormGroup row>
        <Label for={name} sm={3}>
          {label}
        </Label>
        <Col sm={9}>
          <Input
            type={type}
            name={name}
            id={name}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            disabled={disabled}
            placeholder={placeholder}
          />
        </Col>
      </FormGroup>
    </>
  );
};

export default InputFormik;
