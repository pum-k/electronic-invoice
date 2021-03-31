import React from "react";
import { Button } from "reactstrap";
import { FiPrinter } from "react-icons/fi";
import './index.scss';

const Submit = (params) => {
  return (
    <div className="submit">
      <Button color="primary" onClick={params.onClick}>
        <FiPrinter className="submit__icon" />
        Lập hóa đơn
      </Button>
    </div>
  );
};

export default Submit;
