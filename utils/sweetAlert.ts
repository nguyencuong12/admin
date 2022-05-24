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
};

export default SweetAlert2;
