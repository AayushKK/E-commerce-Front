import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  IconButton,
} from "@material-tailwind/react";

import React, { useState } from 'react'
import { useRemoveProductMutation } from "../product/productApi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const RemoveDialog = ({ id }) => {

  const [removeProduct, { isLoading }] = useRemoveProductMutation();
  const { user } = useSelector((state) => state.userSlice);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const handleRemove = async () => {
    try {
      await removeProduct({
        id,
        token: user.token
      }).unwrap();
      toast.success('Product Removed Successfully');
      handleOpen();
    } catch (err) {
      handleOpen();
      toast.error(err.data?.message);
    }
  }

  return (
    <>
      <IconButton onClick={handleOpen} size='sm' color='pink'>
        <i className="fas fa-trash" />
      </IconButton>


      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Its a simple dialog.</DialogHeader>
        <DialogBody>
          The key to more success is to have a lot of pillows. Put it this way,
          it took me twenty five years to get these plants, twenty five years of
          blood sweat and tears, and I&apos;m never giving up, I&apos;m just
          getting started. I&apos;m up to something. Fan luv.
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button loading={isLoading} variant="gradient" color="green" onClick={handleRemove}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default RemoveDialog