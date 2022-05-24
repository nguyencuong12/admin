import Swal from "sweetalert2";

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
  updateSuccess: () => {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Chỉnh Sửa Thành Công !",
      showConfirmButton: false,
      timer: 1000,
    }).then((result) => {
      window.location.href = "/";
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
};

export default SweetAlert2;
