import React from "react";
import "../Styles/Customer.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";

function Customer(props) {
  const handleDelete = (e) => {
    deleteDoc(doc(db, "Customers", e.target.value))
      .then(() => {
        alert("Customer Deleted Successfully");
        props.setRefresh((prev) => !prev);
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  return (
    <>
      {props.customers.length > 0 ? (
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Profile Photo</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Mobile Number</th>
              <th>Address</th>
              <th colSpan="2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {props.customers.map((customer) => {
              return (
                <tr key={customer.id}>
                  <td>
                    <img
                      className="img profile-img"
                      src={customer.data.profileUrl}
                      alt="Profile"
                    ></img>
                  </td>
                  <td>{customer.data.fullname}</td>
                  <td>{customer.data.email}</td>
                  <td>{customer.data.mobile}</td>
                  <td>{customer.data.address}</td>
                  <td>
                    <Link to={"/edit/" + customer.id} className="edit-btn">
                      Edit
                    </Link>
                  </td>
                  <td>
                    <button
                      value={customer.id}
                      className="delete-btn"
                      onClick={handleDelete}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <h4 className="nocust">NO CUSTOMER YET</h4>
      )}
    </>
  );
}

export default Customer;
