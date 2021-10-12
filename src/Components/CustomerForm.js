import "../Styles/CustomerForm.css";
import { useState } from "react";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

function CustomerForm(props) {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const docRef = doc(db, "Customers", email);
    setDoc(docRef, {
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
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="customer-form-container">
        <form className="form" onSubmit={handleSubmit}>
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
            ADD CUSTOMER
          </button>
        </form>
      </div>
    </>
  );
}

export default CustomerForm;
