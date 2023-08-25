import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {postCreateUser} from "../service/UserService";
import { toast } from 'react-toastify';
import { deleteUser } from '../service/UserService';
//import { ToastContainer, toast } from 'react-toastify';

const ModalConfirm = (props)=> {

    const {show, handleClose, dataUserDelete, handleDeleteUserFromModal} = props; 
    const confirmDelete =  async () => {
        let res = await deleteUser(dataUserDelete.id);
        if(res && +res.statusCode === 204){
          toast.success("delete user succedd")
          handleClose();
          handleDeleteUserFromModal(dataUserDelete);
          
        }
        //console.log("check  ",res)
    }
 
  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
     <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal Delete a user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='body-add-new'>
            mày có chắc chắn xóa không ???????
          <br/>
          <b>email = {dataUserDelete.email}</b>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => confirmDelete()}
          >Confirm</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalConfirm;


    