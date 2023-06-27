import { useAuth0 } from '@auth0/auth0-react';
import {AddressListContainer} from './containers';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import AddressDetails from './containers/addresses/AddressDetails.container';

const App = () => {
  const {
    isAuthenticated,
    loginWithRedirect,
    logout
  } = useAuth0();

  if (!isAuthenticated) {
    return (<button onClick={() => loginWithRedirect()}>Login</button>);
  }

  return (<BrowserRouter>
    <Routes>
      <Route path='/' index element={<AddressListContainer />} />
      <Route path='/:addressId' element={<AddressDetails />} />
    </Routes>
  </BrowserRouter>)
};

export default App;