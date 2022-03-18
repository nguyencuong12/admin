import Swal from "sweetalert2";
import { sweetAlertInf } from "../../interface";
import { useSetState } from "@mantine/hooks";
function alertMessage(props: sweetAlertInf) {
  let result = Swal.fire(props.title, props.content, props.icon).then((result) => {
    if (result.isConfirmed) {
      return true;
    }
  });
  return result;
}
export default alertMessage;
