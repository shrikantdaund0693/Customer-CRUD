import { Fragment, useState, useEffect } from "react";
import CustomerForm from "./Components/CustomerForm";
import "./Styles/App.css";
import Customer from "./Components/Customer";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import EditForm from "./Components/EditForm";

function App() {
  const [customers, setCustomers] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const docRef = collection(db, "Customers");
    getDocs(docRef)
      .then((snapshot) => {
        setCustomers(
          snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, [refresh]);
  return (
    <Fragment>
      <div className="App">
        <Router>
          <Switch>
            <Route path="/" exact>
              <CustomerForm setRefresh={setRefresh} />
              <div className="container">
                <Customer setRefresh={setRefresh} customers={customers} />
              </div>
            </Route>
            <Route path="/edit/:id">
              <EditForm setRefresh={setRefresh} />
            </Route>
          </Switch>
        </Router>
      </div>
    </Fragment>
  );
}

export default App;
