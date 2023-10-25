import { BrowserRouter, Routes, Route } from 'react-router-dom';
import   Home  from './components/Home';
import   Login  from './components/Login';
import { useSelector } from 'react-redux'
import { getCurrentUser } from './shared/users/userSlice'
import   ProtectedRoute  from './ProtectedRoute';
import SignUp from './components/SignUp';
import { Dimmer, Loader } from 'semantic-ui-react';
import { getLoader } from './shared/appServices/appServiceSlice';
import ReadLater from './components/ReadLater';

function App() {
  const currentUser = useSelector(getCurrentUser);
  const loader = useSelector(getLoader);
  return (
    
    <div className="App">
      <Dimmer active={loader}>
        <Loader>Loading</Loader>
      </Dimmer>
      <BrowserRouter>
        <Routes>
          <Route path='/'  element={<Login></Login>}></Route>
          <Route path='/signup'  element={<SignUp></SignUp>}></Route>
          <Route path='/home' element= {<ProtectedRoute currentUser={currentUser}><Home></Home> </ProtectedRoute>}></Route>
          <Route path='/readLater' element= {<ProtectedRoute currentUser={currentUser}><ReadLater></ReadLater> </ProtectedRoute>}></Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
