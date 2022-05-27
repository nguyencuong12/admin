import React, { useEffect } from "react";
import TableAdmin from "../../components/tableAdmin";
import Admin_API from "../../api/admin";
const Ordered = () => {
  useEffect(() => {
    const getAdFromResponse = async () => {
      let response = await Admin_API.getAD();
      console.log("RES", response);
    };
    getAdFromResponse();
  }, []);
  return (
    <div>
      <h2 style={{ textAlign: "center", padding: "10px" }}>Các đơn đã đặt hàng</h2>
      <TableAdmin></TableAdmin>
    </div>
  );
};

export default Ordered;
