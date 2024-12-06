import { Box } from "@mui/material";
import { BASE_URL } from "../Constants";

interface DeleteRateButtonProps {
  rateId: string;
  onDeleteSuccess: () => void;
}

const DeleteRateButton = ({
  rateId,
  onDeleteSuccess,
}: DeleteRateButtonProps) => {
  const handleDelete = () => {
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
