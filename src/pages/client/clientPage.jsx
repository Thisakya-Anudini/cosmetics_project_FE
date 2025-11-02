import Header from "../../components/header";
import { Route, Routes } from "react-router-dom";
import ProductPage from "./productPage";
import ProductOverviewPage from "./productOverview";
import CartPage from "./cart";
import CheckoutPage from "./checkoutPage";
import AboutUsPage from "./aboutUsPage";
import ContactUsPage from "./contactUsPage";
import HomePage from "../homePage";
import ReviewsPage from "./reviewPage";




export default function ClientWebPage() {
    return (
        <div className="w-full h-screen max-h-screen">
            <Header/>
            <div className="w-full h-[calc(100%-100px)] ">
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/home" element={<HomePage/>}/>
                    <Route path="/products" element={<ProductPage/>}/>
                    <Route path="/overview/:productId" element={<ProductOverviewPage/>}/>
                    <Route path="/reviews" element={<ReviewsPage/>}/>
                    <Route path="/about-us" element={<AboutUsPage/>}/>
                    <Route path="/contact-us" element={<ContactUsPage/>}/>
                    <Route path="/cart" element={<CartPage/>}></Route>
                    <Route path="/*" element={<h1 className="text-2xl text-center"> 404 Not Found</h1>}/>
                    <Route path="/checkout" element={<CheckoutPage/>}/>
                </Routes>
            </div>
        
        </div>
    );
}