import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../Styles/EditForm.css";
import { db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useHistory } from "react-router-dom";

function EditForm(props) {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    getDoc(doc(db, "Customers", id))
      .then((document) => {
        setFullname(document.data().fullname);
        setEmail(document.data().email);
        setMobile(document.data().mobile);
        setAddress(document.data().address);
      })
      .catch((error) => {
        alert(error.message);
      });
  }, [id]);

  const handleNamechange = (e) => {
    setFullname(e.target.value);
  };

  const handleEmailchange = (e) => {
    setEmail(e.target.value);
  };

  const handleMobilechange = (e) => {
    setMobile(e.target.value);
  };

  const handleAddresschange = (e) => {
    setAddress(e.target.value);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const docRef = doc(db, "Customers", id);
    updateDoc(docRef, {
      fullname: fullname,
      email: email,
      mobile: mobile,
      address: address,
    })
      .then(() => {
        alert("Success!");
        props.setRefresh((prev) => !prev);
        setFullname("");
        setEmail("");
        setAddress("");
        setMobile("");
        history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="outercontainer">
      <div className="customer-form-container">
        <form className="form" onSubmit={handleUpdate}>
          <div className="form-field">
            <label className="input-label">Full Name</label>
            <input
              type="text"
              name="fullname"
              value={fullname}
              onChange={handleNamechange}
              required
            ></input>
          </div>
          <div className="form-field">
            <label className="input-label">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleEmailchange}
              required
            ></input>
          </div>
          <div className="form-field">
            <label className="input-label">Mobile Number</label>
            <input
              type="text"
              name="mobile"
              value={mobile}
              onChange={handleMobilechange}
              minLength="10"
              maxLength="13"
              required
            ></input>
          </div>
          <div className="form-field">
            <label className="input-label">Address</label>
            <textarea
              rows="5"
              required
              value={address}
              onChange={handleAddresschange}
            ></textarea>
          </div>

          <button type="submit" className="add-btn">
            Update Details
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditForm;
