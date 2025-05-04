import React from "react";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CabinForm from "./CabinForm";
import CabinTable from "./CabinTable";

const AddCabin = () => {
  return (
    <Modal>
      <Modal.Open opens="cabin-form">
        <Button>Add new cabin</Button>
      </Modal.Open>
      <Modal.Window name="cabin-form">
        <CabinForm />
      </Modal.Window>

      <Modal.Open opens="table">
        <Button>Show table</Button>
      </Modal.Open>
      <Modal.Window name="table">
        <CabinTable />
      </Modal.Window>
    </Modal>
  );
};

export default AddCabin;
