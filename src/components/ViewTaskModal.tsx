import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TaskInterface } from "./Task.type";
import { format } from "date-fns";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

type Props = {
  modalState: boolean;
  setModalState: () => void;
  modalData: TaskInterface;
};

export default function ViewTaskModal(props: Props) {
  const { modalState, setModalState, modalData } = props;
  return (
    <div>
      <Modal
        open={modalState}
        onClose={setModalState}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Title: {modalData.title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Description: {modalData.description}
          </Typography>
          <Typography id="modal-modal-assignee" sx={{ mt: 2 }}>
            Assignee: {modalData.assignee.displayName}
          </Typography>
          <Typography id="modal-modal-duedate" sx={{ mt: 2 }}>
            Due Date: {format(modalData.dueDate, "yyyy-MM-dd HH:mm:ss")}
          </Typography>
          <Typography id="modal-modal-status" sx={{ mt: 2 }}>
            Status: {modalData.status}
          </Typography>
          <Typography id="modal-modal-prio" sx={{ mt: 2 }}>
            Priority Level: {modalData.priorityLevel}
          </Typography>
          <Typography id="modal-modal-notes" sx={{ mt: 2 }}>
            Notes: {modalData.notes}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
