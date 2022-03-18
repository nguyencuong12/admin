import Swal, { SweetAlertIcon } from "sweetalert2";

export default interface SweetAlertProps {
  title: string;
  content: string;
  icon: SweetAlertIcon;
}
