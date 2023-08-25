import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { fetAllUser } from '../service/UserService';
import ReactPaginate from 'react-paginate';
import ModalAddNew from './ModalAddNew';
import ModalEditUser from './ModalEditUser';
import ModalConfirm from './ModalConfirm';
import _, { debounce } from "lodash";
import { CSVLink, CSVDownload } from "react-csv";
import './tableUser.scss';
import Papa from "papaparse";
import { Toast } from 'bootstrap';
import { toast } from 'react-toastify';
const TableUsers =(props)=>{
    const [listUser, setListUser]= useState([]);
    const [totalUser, settotalUser]=useState(0);
    const [totalPage, settotalPage]=useState(0);

    const [isshowmodaluser, setisshowmodaluser]= useState(false);
    const [isShowModalEdit, setisShowModalEdit]= useState(false);
    const [dataUserEdit, setdataUserEdit] = useState({});

    const [isShowModalDelete, setisShowModalDelete]= useState(false);
    const [dataUserDelete, setdataUserDelete] = useState({});

    const [sortBy, setsortBy]= useState("asc");
    const [sortField, setsortField]=useState("id");
    const [KeyWord, setKeyWord]= useState("");
    const [dataExport, setdataExport] = useState([]);
    const handleImportCSV = (event) => {
      if(event.target && event.target.files && event.target.files[0]) {
        let file = event.target.files[0];
        if(file.type !== "text.csv") {
          Toast.console.error("only eccep csv file");
          return;
        }
      
      // Parse local CSV file
Papa.parse(file, {
  header : true, 
	complete: function(results) {
    let rawCSV = results.data;
    if(rawCSV.length > 0){
      if(rawCSV[0] && rawCSV[0].length === 3) {
if(rawCSV[0][0] !== "email"
|| rawCSV[0][0] !== "first_name"
|| rawCSV[0][0] !== "last_name"
){
toast.error("wrong format csv file")
} else {
  let result = [];

  rawCSV.map((item, index)=> {
    if(index > 0 && item.length === 3) {
      let obj = {};
      obj.email =item[0];
      obj.first_name = item[1];
      obj.last_name = item[2]
      result.push(obj);
    }
  })
  setListUser(result)
}
      }
    }
    else{
      toast.error("wrong format csv file")
    }
		console.log("Finished:", results.data);
	}

});
    }}
    const getUsersExport = (event, done) => {
let result = [];
if(listUser && listUser.length > 0) {
  result.push(["ID", "Email", "First name", "Last name"]);
  listUser.map((item, index)=> {
    let arr = [];
    arr[0] = item.id;
    arr[1] = item.email;
    arr[2] = item.first_name;
    arr[3] = item.last_name;
    result.push(arr);
  })
  setdataExport(result);
  done();
}
    }
    const handleSearch = debounce((event)=> {
              console.log(event.target.value)
              let term = event.target.value;
              if(term){
                let cloneListUser = _.cloneDeep(listUser);
                cloneListUser = cloneListUser.filter(item => item.email.includes(term))
                setListUser(cloneListUser);
              }else {
                getUsers(1);
              }
    }, 2000)
    const handleSort =(sortBy, sortField)=> {
      setsortBy(sortBy) ; 
      setsortField(sortField);

      let cloneListUser = _.cloneDeep(listUser);
      cloneListUser = _.orderBy(cloneListUser, [sortField], [sortBy]);
      setListUser(cloneListUser);
      //cloneListUser=cloneListUser.sort((a,b) => b[sortField] - a[sortField]);
    }
    const handleEditUser = (user) => {
          //console.log(user);
          setdataUserEdit(user);
          setisShowModalEdit(true);

    }
    const handleDeleteUser = (user) => {
      setisShowModalDelete(true);
      setdataUserDelete(user);
      console.log(user)
    }
    const handleClose = () => {
      setisshowmodaluser(false);
      setisShowModalEdit(false);
      setisShowModalDelete(false);
    }

const handleUpdateTable = (user) => {
  setListUser([user, ...listUser]);
}
const handleEditUserFromUser = (user) => {
      let cloneListUser = _.cloneDeep(listUser);
      let index = listUser.findIndex(item => item.id === user.id);
      cloneListUser[index].first_name = user.first_name;
      setListUser(cloneListUser);
      //console.log(listUser, cloneListUser)
      //console.log("index ", index)
}
const handleDeleteUserFromModal = (user) => {
  let cloneListUser = _.cloneDeep(listUser);
  cloneListUser = cloneListUser.filter(item => item.id !== user.id);
  setListUser(cloneListUser);

}
    useEffect(()=>{
            getUsers(1);
    },[])

    const getUsers = async (page) =>{
        let res = await fetAllUser(page);
        if (res && res.data ) {
          console.log(res)
          settotalUser(res.total)
            setListUser(res.data)
            settotalPage(res.total_pages)
        }
        
    }
    const handlePageClick = (event) =>{
      getUsers(+event.selected +1);
    }
    const csvData = [
      ["firstname", "lastname", "email"],
      ["Ahmed", "Tomi", "ah@smthing.co.com"],
      ["Raed", "Labes", "rl@smthing.co.com"],
      ["Yezzi", "Min l3b", "ymin@cocococo.com"]
    ];

    return(<>
    <div className='my-3 add-new d-sm-flex'>
<span><b>List User</b></span>

<div className='group-btns'>
  <label htmlFor='test' className='btn btn-warning'> <i className="fa-solid fa-file-import"></i> Import</label>
  <input id="test"  type="file" hidden
  onChange={(event)=> handleImportCSV(event)}
  />
  
<CSVLink 

  filename={"my-file.csv"}
  className="btn btn-primary"
  target="_blank"
  asyncOnClick={true}
  onClick={getUsersExport}
  data={dataExport}> <i className="fa-solid fa-file-arrow-down"></i> Export</CSVLink>
  <button className='btn btn-success mt-sm-0 mt-2'
onClick={() => setisshowmodaluser(true)}>
<i className="fa-solid fa-circle-plus"></i>&nbsp;ADD USER</button>
</div>

  </div>
  <div className='col-12 col-sm-4 my-3'>
  <input className='form-control' 
  placeholder='Search user by email '
//value={KeyWord}
onChange={(event)=> handleSearch(event)}
  />
   </div>
   <div className='customize-table'>
      <Table striped bordered hover>
      <thead>
        <tr>
          <th >
            <div className='sort-header'>
            <span>ID</span>
          <span>
          <i className="fa-solid fa-arrow-down"
          onClick={()=> handleSort("desc", "id")}
          ></i>
          <i className="fa-solid fa-arrow-up"
            onClick={()=> handleSort("asc", "id")}
          ></i>
          </span>
            </div>
            
       
            </th>
          <th >Gmail</th>
          <th className='sort-header'><span>First Name</span>
          <span>
          <i className="fa-solid fa-arrow-down"
          onClick={()=> handleSort("desc", "first_name")}
          ></i>
          <i className="fa-solid fa-arrow-up"
            onClick={()=> handleSort("asc", "first_name")}
          ></i>
          </span>
          </th>
          <th >Last Name</th>
          <th >Action</th>
        </tr>
      </thead>
      <tbody>
        {listUser && listUser.length > 0 && 
        listUser.map((item, index) => {
            return (
        <tr key={`users-${index}`}>
          <td>{item.id}</td>
          <td>{item.email}</td>
          <td>{item.first_name}</td>
          <td>{item.last_name}</td>
          <td>
            <button className='btn btn-warning mx-3'
            onClick={() => handleEditUser(item)}
            //onClick={()=> setisShowModalEdit(true)}
            
            >edit</button>
            <button className='btn btn-danger'
            onClick={() => handleDeleteUser(item)}
            
            >delete</button>
          </td>
        </tr>
            )
        })}
        
      </tbody>
    </Table>
    </div>
    <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPage}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
      />
      <ModalAddNew
show={isshowmodaluser}
handleClose={handleClose}
handleUpdateTable={handleUpdateTable}
/>
<ModalEditUser
  show={isShowModalEdit}
  dataUserEdit={dataUserEdit}
  handleClose={handleClose}
  handleEditUserFromUser={handleEditUserFromUser}
/>
<ModalConfirm

show={isShowModalDelete}
handleClose={handleClose}
dataUserDelete={dataUserDelete}
handleDeleteUserFromModal={handleDeleteUserFromModal}
/>
    </>)
}
export default TableUsers;