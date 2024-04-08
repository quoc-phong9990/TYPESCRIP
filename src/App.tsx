
import Listproduct from './components/PRODUCT/productList';

import { Route, Routes } from 'react-router-dom';
import ProductAdd from './components/PRODUCT/ProductAdd';
import ProductEdit from './components/PRODUCT/ProductEdit';
// USER
import UserAdd from './components/USER/userAdd';

import ListUser from './components/USER/listUser';
import Useredit from './components/USER/editUser';
import Count from './components/coun';
import Home from './PAGE/Home';
import "./App.css"
import LayoutAdmin from './PAGE/Layoutadmin';
import Listbook from './components/BOOKS/Listbook';
import Addbooks from './components/BOOKS/Addbooks';
import Editbook from './components/BOOKS/Editbook';
import ProductDetail from './PAGE/ProductDetail';
import Signin from './PAGE/Signin';
import Signup from './PAGE/Signup';



function App(): JSX.Element {

  return (
    <>
      {/* <div><ShowPeople/></div>
      <Demo2/>
      <DemouseState/> */}
      {/* <Listproduct  listData={list} onDelete={deleteHandle} /> */}
      <Routes>
   
      <Route path="signup" element={<Signup />} />
      <Route path="signin" element={<Signin />} />
        <Route path='admin' element={<LayoutAdmin/>}>
    
     

            <Route path="user">
              <Route path="" element={<ListUser />} />
              <Route path="add" element={<UserAdd />} />
              <Route path="edit/:id" element={<Useredit />} />
              <Route path="count" element={<Count />} />
            </Route>

            <Route path="books">
              <Route path="" element={<Listbook />} />
              <Route path="edit/:id" element={<Editbook />} />
              <Route path="add" element={<Addbooks />} />
    
            </Route>
            
            <Route path="products">
              <Route path="" element={<Listproduct />} />
              <Route path="edit/:id" element={<ProductEdit />} />
              <Route path="add" element={<ProductAdd />} />
            
            </Route>
        </Route>
        
        



        
          <Route path="/home" element={<Home />} />
          <Route path="detail/:id" element={<ProductDetail />} />
          <Route path="signin" element={<Signin />} />
          <Route path="signup" element={<Signup />} />
      
        
      </Routes>



    </>
  );
}

export default App;
