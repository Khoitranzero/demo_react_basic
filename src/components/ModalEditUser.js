import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { putupdateUser } from "../service/UserService";
import { toast } from 'react-toastify';
//import { toast } from 'react-toastify';
//import { ToastContainer, toast } from 'react-toastify';
const ModalEditUser = (props)=> {
    const {show, handleClose, dataUserEdit, handleEditUserFromUser} = props; 
    const [name, setname] = useState("");
    const [job, setjob] = useState("");
   
    
    const handleEditUser = async() => {
      let res = await putupdateUser(name, job);
      console.log(res)
      if (res && res.updatedAt) {
        handleEditUserFromUser({
            first_name: name,
            id: dataUserEdit.id

        })
        handleClose();
        toast.success("Update user succeed");
      }
    }
    //console.log("check",dataUserEdit)
    useEffect(()=> {
        if (show) {
            setname(dataUserEdit.first_name)
        }
    }, [dataUserEdit])
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
          <Modal.Title>Modal edit a user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='body-add-new'>

          <form>
  <div className="mb-3">
    <label className="form-label">Name</label>
    <input type="text" className="form-control" value={name}
    onChange={(event)=> setname(event.target.value)}
    />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1">Job</label>
    <input type="text" className="form-control" value={job}
         onChange={(event)=> setjob(event.target.value)}
    />
  </div>
</form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleEditUser()}
          >Confirm</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalEditUser;


    