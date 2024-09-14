import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './comps/Footer';
import Main from './comps/Main';
import LogIn from './comps/pc_comps/main_comps/LogIn/LogIn';
import ChooseBranch from './comps/pc_comps/main_comps/ChooseBranch/ChooseBranch';
import BranchOrders from "./comps/pc_comps/main_comps/BranchOrders/BranchOrders";
import ManagmentOrders from "./comps/pc_comps/main_comps/MngmntOrders/MngmntOrders";
import CreateOrder from './comps/pc_comps/main_comps/CreateOrder/CreateOrder';
import MyProfile from './comps/pc_comps/main_comps/MyProfile/MyProfile';
import ManageUsers from './comps/pc_comps/main_comps/ManageUsers/ManageUsers';
import ManageCats from './comps/pc_comps/main_comps/MangeEqupment/ManageCats/ManageCats';
import ManageEqupment from './comps/pc_comps/main_comps/MangeEqupment/ManageEqupment';
import ManageSuppliers from './comps/pc_comps/main_comps/ManageSuppliers/ManageSuppliers';
import ManageBranches from './comps/pc_comps/main_comps/ManageBranches/ManageBranches';
import RequresAttention from './comps/pc_comps/main_comps/MngmntOrders/RequresAttention/RequresAttention';
import ShipOrders from './comps/pc_comps/main_comps/MngmntOrders/ShipOrders/ShipOrders';
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

              <Main className='main' />

              <Routes>
                <Route exact path="/" element={<LogIn />} />
                <Route path="/my_profile" element={<MyProfile />} />

                <Route path="/choose_branch" element={<ChooseBranch />} />
                <Route path="/branch_orders" element={<BranchOrders />} />
                <Route path="/create_order" element={<CreateOrder />} />

                <Route path="/managment_orders" element={<ManagmentOrders />} />
                <Route path="/requres_attention" element={<RequresAttention />} />
                <Route path="/ship_orders" element={<ShipOrders />} />
                <Route path="/manage_users" element={<ManageUsers />} />
                <Route path="/manage_equpment_categories" element={<ManageCats />} />
                <Route path="/manage_equpment_items" element={<ManageEqupment />} />
                <Route path="/manage_suppliers" element={<ManageSuppliers />} />
                <Route path="/manage_branches" element={<ManageBranches />} />
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
