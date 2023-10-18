import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
} from "@material-tailwind/react";
import { useState } from "react";

export const UpdateAccountDialog = ({
  title = "",
  open,
  handleOpen,
  handleConfirm,
}: {
  title?: string;
  open: boolean;
  handleOpen: () => void;
  handleConfirm: (title: string) => void;
}) => {
  const [value, setValue] = useState(title);

  const handleQuit = () => {
    setValue("");
    handleOpen();
  };

  return (
    <Dialog open={open} handler={handleOpen}>
      <div className="flex items-center justify-between">
        <DialogHeader>Create your account</DialogHeader>
      </div>

      <DialogBody divider>
        <div className="grid gap-6">
          <Input
            label="New account name"
            name="title"
            onChange={(e) => setValue(e.target.value)}
            value={value}
            crossOrigin=""
          />
        </div>
      </DialogBody>

      <DialogFooter className="space-x-2">
        <Button variant="outlined" color="red" onClick={handleQuit}>
          close
        </Button>

        <Button
          variant="gradient"
          color="green"
          onClick={() => handleConfirm(value)}
        >
          Submit
        </Button>
      </DialogFooter>
    </Dialog>
  );
};
