import React, { useContext, useEffect } from "react";
import IUser from "../../interface/IUser";
import { Link } from "react-router-dom";
import { DELETE_DATAUS, UserContext, SET_DATAUS } from "../../context/UserProvider";

function ListUser() {
  const { listUser, dispatchUser } = useContext(UserContext);

  useEffect(() => {
    fetch('http://localhost:3000/user')
      .then(data => {
        return data.json();
      })
      .then(data => {
        dispatchUser({ type: SET_DATAUS, payload: data });
      });
  }, [dispatchUser]);

  // DELETE
  function deleteHandle(id: string) {
    fetch(`http://localhost:3000/user/${id}`, {
      method: "DELETE",
    })
      .then((data) => {
        return data.json();
      })
      .then(data => {
        dispatchUser({ type: DELETE_DATAUS, payload: id});
      })
      .catch(() => {
        console.log("xóa lỗi");
      });
  }

  return (
    <>
      <Link to="/user/add">
        <button className="btn btn-success">Add User</button>
      </Link>
      <div className="container ol-xl-22 ">
        <div className="row justify-content-center">
          <div className="">
            <div className="text-center">
              <div className="table-responsive">
                <table className="table table-striped table-dark mx-auto d-block">
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">First Name</th>
                      <th scope="col">Last Name</th>
                      <th scope="col">Age</th>
                      <th scope="col">Email</th>
                      <th scope="col">Gender</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listUser.data.map((item: IUser) => (
                      <tr key={item.id}>
                        <td scope="row">{item.id}</td>
                        <td scope="row">{item.firtName}</td>
                        <td scope="row">{item.lastName}</td>
                        <td scope="row">{item.age}</td>
                        <td scope="row">{item.email}</td>
                        <td scope="row">{item.gender}</td>
                        <td>
                          <Link className="btn btn-primary mx-3" to={`/user/edit/${item.id}`}>Edit</Link>
                          <button className="btn btn-danger" onClick={() => { deleteHandle(item.id!) }}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>


    </>
  );
}

export default ListUser;
