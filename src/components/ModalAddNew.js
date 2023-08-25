import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {postCreateUser} from "../service/UserService";
import { toast } from 'react-toastify';
//import { ToastContainer, toast } from 'react-toastify';

const ModalAddNew = (props)=> {
  //const [show, setShow] = useState(false);

  //const handleClose = () => setShow(false);
  //const handleShow = () => setShow(true);

    const {show, handleClose, handleUpdateTable} = props; 
    const [name, setname] = useState("");
    const [job, setjob] = useState("");
    const [totalUser, settotalUser]=useState(0);
    
    const handelSaveUser = async () => {
        let res = await postCreateUser(name, job);
        //console.log("check ",res)
        if(res && res.id) {
        handleClose();
        toast.success("a user create success")
        setname('');
        setjob('');
        handleUpdateTable({first_name: name, id: res.id});
       
        } else {
          //error
          toast.error("a user create error !!!!")
        }
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
          <Modal.Title>Modal add new user</Modal.Title>
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
          <Button variant="primary" onClick={() => handelSaveUser()}
          >Save Changer</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalAddNew;


    