import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../Styles/EditForm.css";
import { db, storage } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useHistory } from "react-router-dom";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

function EditForm(props) {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const { id } = useParams();
  const history = useHistory();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

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

  const handleFilechange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setLoading(true);
    const docRef = doc(db, "Customers", id);

    if (image) {
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
            updateDoc(docRef, {
              fullname: fullname,
              email: email,
              mobile: mobile,
              address: address,
              profileUrl: downloadURL,
            })
              .then(() => {
                alert("Details updated Successfully!");
                props.setRefresh((prev) => !prev);
                setFullname("");
                setEmail("");
                setAddress("");
                setMobile("");
                setLoading(false);
                history.push("/");
              })
              .catch((error) => {
                console.log(error);
              });
          });
        }
      );
    } else {
      updateDoc(docRef, {
        fullname: fullname,
        email: email,
        mobile: mobile,
        address: address,
      })
        .then(() => {
          alert("Details updated Successfully!");
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
    }
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
          <div className="form-field">
            <label className="input-label">Profile Photo</label>
            <span className="info">* IF YOU DONT WANT TO UPDATE SKIP</span>
            <input
              type="file"
              name="profile"
              onChange={handleFilechange}
            ></input>
          </div>

          <button type="submit" className="add-btn">
            {loading ? "Submitting Data wait..." : "Update Details"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditForm;
