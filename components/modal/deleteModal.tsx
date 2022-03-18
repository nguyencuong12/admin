import { useState } from "react";
import { Modal, Button, Group } from "@mantine/core";

interface deleteModalProps {
  id?: string;
  deleteFunc: Function;
  show: boolean;
}
function DeleteModal(props: deleteModalProps) {
  const [opened, setOpened] = useState(true);
  const { show, deleteFunc } = props;

  const onDelete = () => {
    deleteFunc();
  };
  return (
    <>
      <Modal
        opened={show}
        onClose={() => {
          deleteFunc(false);
        }}
        title="Delete Modal!"
      >
        {/* Modal content */}
        <h4>Do you want to delete ?</h4>
        <Group position="right">
          <Button
            variant="outline"
            color="gray"
            radius="xs"
            size="xs"
            onClick={() => {
              deleteFunc(false);
            }}
          >
            Close
          </Button>
          {/* <Button onClick={() => setOpened(false)}>Close</Button> */}
          <Button
            variant="outline"
            color="red"
            radius="xs"
            size="xs"
            onClick={() => {
              deleteFunc(true);
            }}
          >
            Delete
          </Button>
        </Group>
      </Modal>
    </>
  );
}
export default DeleteModal;
