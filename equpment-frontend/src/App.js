import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './comps/Footer';
import Main from './comps/main/Main';
import LogIn from './comps/main/LogIn/LogIn';
import ChooseBranch from './comps/main/ChooseBranch/ChooseBranch';
import BranchOrders from "./comps/main/BranchOrders/BranchOrders";
import ManagmentOrders from "./comps/main/MngmntOrders/MngmntOrders";
import CreateOrder from './comps/main/CreateOrder/CreateOrder';
import { URLProvider } from './comps/context/URL';
import { TokenProvider } from './comps/context/Token';
import { BranchProvider } from './comps/context/BranchData';
import { CartProvider } from './comps/context/Cart';
import './App.css'

function App() {
  return (
    <div className='app'>
      <URLProvider>
        <TokenProvider>
          <BranchProvider>
            <CartProvider>

              <Main />

              <Routes>
                <Route exact path="/" element={<LogIn />} />
                <Route path="/choose_branch" element={<ChooseBranch />} />
                <Route path="/branch_orders" element={<BranchOrders />} />
                <Route path="/create_order" element={<CreateOrder />} />
                <Route path="/managment_orders" element={<ManagmentOrders />} />
              </Routes>

              <Footer />

            </CartProvider>
          </BranchProvider>
        </TokenProvider>
      </URLProvider>
    </div >
  );
}

export default App;
