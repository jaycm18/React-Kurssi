import React, { useState, useEffect } from 'react';
import './App.css';
import Laskuri from './Laskuri';
import Posts from './Posts';
import CustomerList from './CustomerList';
import UserList from './UserList';
import ProductList from './ProductList';
import Message from './Message';
import Login from './Login';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
  // App componentin statet
  // Statet messagen näyttämistä varten
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');
  const [isPositive, setIsPositive] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState('');
  const [accessLevelId, setAccessLevelId] = useState(null);

  useEffect(() => {
    let storedUser = localStorage.getItem('username');
    let storedAccessLevelId = localStorage.getItem('accesslevelId');
    if (storedUser !== null) {
      setLoggedInUser(storedUser);
      setAccessLevelId(storedAccessLevelId);
    }
  }, []);

  // Logout napin tapahtumankäsittelijä
  const logout = () => {
    localStorage.clear();
    setLoggedInUser('');
    setAccessLevelId(null);
  };

  return (
    <div className="App">
      {!loggedInUser && (
        <Login
          setMessage={setMessage}
          setIsPositive={setIsPositive}
          setShowMessage={setShowMessage}
          setLoggedInUser={setLoggedInUser}
        />
      )}

      {loggedInUser && (
        <Router>
          <Navbar bg="dark" variant="dark" fixed="top">
            <Nav className="mr-auto">
              <Nav.Link href="/customers">Customers</Nav.Link>
              <Nav.Link href="/products">Products</Nav.Link>
              <Nav.Link href="/posts">Some highlights</Nav.Link>
              {accessLevelId === '1' && <Nav.Link href="/users">Users</Nav.Link>}
              <Nav.Link href="/laskuri">Laskuri</Nav.Link>
              <button onClick={() => logout()}>Logout</button>
            </Nav>
          </Navbar>

          <h1>Northwind Corp.</h1>

          {showMessage && <Message message={message} isPositive={isPositive} />}

          <Routes>
            <Route
              path="/customers"
              element={
                <CustomerList
                  setMessage={setMessage}
                  setIsPositive={setIsPositive}
                  setShowMessage={setShowMessage}
                />
              }
            ></Route>

            <Route
              path="/products"
              element={
                <ProductList
                  setMessage={setMessage}
                  setIsPositive={setIsPositive}
                  setShowMessage={setShowMessage}
                />
              }
            ></Route>

            {accessLevelId === '1' && (
              <Route
                path="/users"
                element={
                  <UserList
                    setMessage={setMessage}
                    setIsPositive={setIsPositive}
                    setShowMessage={setShowMessage}
                  />
                }
              ></Route>
            )}

            <Route path="/posts" element={<Posts />}></Route>

            <Route path="/laskuri" element={<Laskuri />}></Route>
          </Routes>
        </Router>
      )}
    </div>
  );
};

export default App;