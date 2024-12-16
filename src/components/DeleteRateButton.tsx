import { Box } from "@mui/material";
import { BASE_URL } from "../Constants";
import { useTelegram } from "./UseTelegram";

interface DeleteRateButtonProps {
  rateId: string;
  onDeleteSuccess: () => void;
}

const DeleteRateButton = ({
  rateId,
  onDeleteSuccess,
}: DeleteRateButtonProps) => {
  const { webApp, executeMethod } = useTelegram();

  const handleDelete = () => {
    fetch(`${BASE_URL}/rate/${rateId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "Application/JSON",
      },
    })
      .then((response) => {
        if (response.status === 200) {
          executeMethod(
            "HapticFeedback.notificationOccurred",
            webApp.HapticFeedback.notificationOccurred("error"),
            true
          );
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
    <Box className="flex justify-center">
      <button
        onClick={handleDelete}
        style={{
          color: "red",
        }}
        className="telegram-text"
      >
        Удалить оценку
      </button>
    </Box>
  );
};

export default DeleteRateButton;
