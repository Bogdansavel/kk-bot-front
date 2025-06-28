import { Box } from "@mui/material";
import { BASE_URL } from "../Constants";
import { useTelegram } from "./UseTelegram";
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from "react";

interface DeleteRateButtonProps {
  rateId: string;
  onDeleteSuccess: () => void;
}

const DeleteRateButton = ({
  rateId,
  onDeleteSuccess,
}: DeleteRateButtonProps) => {
  const { webApp, executeMethod } = useTelegram();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '20px',
    boxShadow: 24,
    p: 4,
  };

  const handleDelete = async () => {
    executeMethod(
      "HapticFeedback.notificationOccurred",
      () => webApp.HapticFeedback.notificationOccurred("error"),
      true
    );

    fetch(`${BASE_URL}/rate/${rateId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "Application/JSON",
      },
    })
      .then((response) => {
        if (response.status === 200) {
          onDeleteSuccess();
        } else {
          console.error(
            "something wrong: response status is " + response.status
          );
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <Box className="cursor-pointer">
      <DeleteIcon
        onClick={handleOpen}
        style={{
          color: "#d32f2f",
        }}
      >
      </DeleteIcon>

      <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className='secondary-bg w-[90%]'>
          <Typography className="telegram-text" id="modal-modal-title" variant="h6" component="h2">
            Вы уверены что хотите удалить оценку?
          </Typography>
          <div className="justify-center">
            <Button className="w-full" color="error" onClick={handleDelete}>Да</Button>
            <Button className="w-full" onClick={handleClose}>Нет</Button>
          </div>
        </Box>
      </Modal>
    </div>
    </Box>
  );
};

export default DeleteRateButton;
