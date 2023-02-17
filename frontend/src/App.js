import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import LeadDetails from './Pages/LeadDetails';
import Customers from './Pages/Customers';
import Leads from './Pages/Leads';
import { AuthContext } from './Contect/AuthContect';


function App() {
  const { loading, userToken } = useContext(AuthContext);

  if (loading) {
    return <>Loading</>
  }
  return (
    <div className="App">
      <Routes>
        {
          userToken ?
            <>
              <Route exact path='/' element={<Dashboard />} />
              {/* <Route path='/Dashboard' element={<Dashboard />} /> */}
              <Route exact path='/lead-details' element={<LeadDetails />} />
              <Route exact path='/customer' element={<Customers />} />
              <Route exact path='/leads' element={<Leads />} />
            </>
            :
            <Route path='/' element={<Login />} />
        }


      </Routes>
    </div>
  );
}

export default App;
