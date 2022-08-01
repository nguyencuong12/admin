import Swal from "sweetalert2";
import { ProductAPI } from "../api";
  
const SweetAlert2 = {
  loginSuccess: () => {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Đăng Nhập Thành Công",
      showConfirmButton: false,
      timer: 1000,
    }).then((result) => {
      window.location.href = "/";
    });
  },
  logout: () => {
    Swal.fire({
      title: "Bạn Muốn Đăng Xuất ?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "OK",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        localStorage.clear();
        window.location.href = "/login";
        // Swal.fire("Saved!", "", "success");
      } else if (result.dismiss) {
        // Swal.fire("Changes are not saved", "", "info");
      }
    });
  },
  accessDenide() {
    Swal.fire({
      icon: "error",
      title: "Truy Cập Thất Bại !",
      //   text: "Something went wrong!",
      //   footer: '<a href="">Why do I have this issue?</a>',
    });
  },
  updateSuccess: (
    callback:Function
  ) => {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Chỉnh Sửa Thành Công !",
      showConfirmButton: false,
      timer: 1000,
    }).then((result) => {
      // window.location.href = "/";
      callback();

    });
  },
  createSuccess: () => {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Tạo Sản Phẩm Thành Công !",
      showConfirmButton: false,
      timer: 1000,
    }).then((result) => {
      window.location.href = "/";
    });
  },
  deleteConfirm: (id: string) => {
    Swal.fire({
      title: "Bạn có muốn xóa sản phẩm này ?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "OK",
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        let response = await ProductAPI.deleteProduct(id);
        if (response) {
          Swal.fire("Đã xóa sản phẩm !", "", "success");
          window.location.href = "/";
        }

        // localStorage.clear();
        // window.location.href = "/login";
        // Swal.fire("Saved!", "", "success");
      } else if (result.dismiss) {
        // Swal.fire("Changes are not saved", "", "info");
      }
    });
  },
};

export default SweetAlert2;
