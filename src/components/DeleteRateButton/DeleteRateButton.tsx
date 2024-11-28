import { Button } from "flowbite-react";
import { Box } from "@mui/material";
import { BASE_URL } from "../../Constants";

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
        console.log("response from delete", response);
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
      <Button
        gradientMonochrome="failure"
        onClick={handleDelete}
        className="px-1 mx-6 my-3"
      >
        Удалить
      </Button>
    </Box>
  );
};

export default DeleteRateButton;
