import "../Styles/CustomerForm.css";
import { useState } from "react";
import { db, storage } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

function CustomerForm(props) {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

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

  const handleFilechange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const docRef = doc(db, "Customers", email);

    const storageRef = ref(storage, `images/${fullname}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);
      },
      (error) => {
        alert(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setDoc(docRef, {
            fullname: fullname,
            email: email,
            mobile: mobile,
            address: address,
            profileUrl: downloadURL,
          })
            .then(() => {
              alert("Success!");
              setLoading(false);
              props.setRefresh((prev) => !prev);
              setFullname("");
              setEmail("");
              setAddress("");
              setMobile("");
            })
            .catch((error) => {
              console.log(error);
            });
        });
      }
    );
  };

  return (
    <>
      <div className="customer-form-container">
        <form
          className="form"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
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
          <div className="form-field">
            <label className="input-label">Profile Photo</label>
            <input
              type="file"
              name="profile"
              onChange={handleFilechange}
            ></input>
          </div>

          <button type="submit" className="add-btn">
            {loading ? "Submitting Data wait..." : "ADD CUSTOMER"}
          </button>
        </form>
      </div>
    </>
  );
}

export default CustomerForm;
