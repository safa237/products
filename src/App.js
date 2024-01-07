/*import './App.css';*/
import SignUpForm from "./pages/auth/SignUpForm";
import Sign from "./pages/auth/Sign";
import {Routes, Route , Navigate} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Admin/Dashboard";
import Category from "./pages/Admin/Category";
import Products from "./pages/Admin/Products";
import EditAdmin from "./pages/Admin/Actions/adminAction/EditAdmin";
import AddAdmin from "./pages/Admin/Actions/adminAction/AddAdmin";
import DetailsAdmin from "./pages/Admin/Actions/adminAction/DetailsAdmin";
import AddCategory from "./pages/Admin/Actions/categoryAction/AddCategory";
import EditCategory from "./pages/Admin/Actions/categoryAction/EditCategory";
import AddProduct from "./pages/Admin/Actions/productAction/AddProduct";
import EditProduct from "./pages/Admin/Actions/productAction/EditProduct";
import DetailsProduct from "./pages/Admin/Actions/productAction/DetailsProduct";
import DetailsCategory from "./pages/Admin/Actions/categoryAction/DetailsCategory";
import Home from "./pages/home";
import ForgetPassword from "./pages/auth/forgetPassword";
import ProductDetails from "./pages/products/ProductDetails";
import Store from "./pages/Store";
import About from "./pages/About";
import Brand from "./pages/brand";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Cart from "./pages/products/Cart";
import WishList from "./pages/WishList";

function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/store" element={<Store />} />
      <Route path="/brand" element={<Brand />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/wishlist" element={<WishList />} />
      <Route
          path="/home/product/:productId"
          element={<ProductDetails /> }  />
     
      <Route path="/authentication" element={<Sign />} />
      <Route path="/authentication/forget-password" element={< ForgetPassword/>} />
      <Route path="/forget-password" element={<ForgetPassword />} />
      
        <Route
          path="/dashboard"
          element={
            <Sidebar>
              <Dashboard />
            </Sidebar>
          }
        />
        <Route
          path="/admin/edit/:adminId"
          element={
            <Sidebar>
              <EditAdmin />
            </Sidebar>
          }
        />
        <Route
          path="/admin/add"
          element={
            <Sidebar>
              <AddAdmin />
            </Sidebar>
          }
        />
        <Route
          path="/admin/details/:adminId"
          element={
            <Sidebar>
              <DetailsAdmin />
            </Sidebar>
          }
        />
        <Route
          path="/dashboard"
          element={
            <Sidebar>
              <Dashboard />
            </Sidebar>
          }
        />
        <Route
          path="/categories"
          element={
            <Sidebar>
              <Category />
            </Sidebar>
          }
        />
        <Route
          path="/category/add"
          element={
            <Sidebar>
              <AddCategory />
            </Sidebar>
          }
        />
        <Route
          path="/category/edit/:CategoryId"
          element={
            <Sidebar>
              <EditCategory />
            </Sidebar>
          }
        />
        <Route
          path="/category/details"
          element={
            <Sidebar>
              <DetailsCategory />
            </Sidebar>
          }
        />
        <Route
          path="/product"
          element={
            <Sidebar>
              <Products />
            </Sidebar>
          }
        />
        <Route
          path="/product/add"
          element={
            <Sidebar>
              <AddProduct />
            </Sidebar>
          }
        />
        <Route
          path="/product/edit/:productId"
          element={
            <Sidebar>
              <EditProduct />
            </Sidebar>
          }
        />
        <Route
          path="/product/details/:productId"
          element={
            <Sidebar>
              <DetailsProduct />
            </Sidebar>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
