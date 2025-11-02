import { useState } from "react";
import { BiCart, BiSolidLogOutCircle} from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import { HiHome } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { MdReviews,MdContactPhone } from "react-icons/md";
import { PiFlowerLotusFill } from "react-icons/pi";

import { FaShoppingCart ,FaShopify} from "react-icons/fa";

export default function Header() {
	const navigate = useNavigate();
	const [isOpen, setIsOpen] = useState(false);
	const token = localStorage.getItem("token");
	return (
		<header className="h-[100px] bg-accent flex justify-center items-center relative">
			{isOpen && (
				<div className="fixed z-[100] top-0 right-0 w-[100vw] h-[100vh] bg-[#00000050]">
					<div className="h-full w-[350px] bg-white flex flex-col">
						<div className="w-full bg-accent h-[100px] flex pl-[45px] flex-row items-center gap-[20px]">
							<GiHamburgerMenu className="text-white text-4xl  md:hidden " onClick={()=>{
                                setIsOpen(close);
                            }}/>
							<img
								className="w-[150px] h-[80px] object-cover cursor-pointer"

								src="/logo.png"
								alt="Logo"
							/>
						</div>
						<div className="w-full h-full flex flex-col p-[45px] items-start gap-8">
							<button
								className="text-accent text-2xl flex flex-row items-center"
								onClick={() => {
									setIsOpen(false);
									navigate("/home");
								}}
							>
								<HiHome className="text-accent text-2xl mr-2" />
								Home
							</button>
                            {/* products */}
                            <button
								className="text-accent text-2xl flex flex-row items-center"
								onClick={() => {
									setIsOpen(false);
									navigate("/products");
								}}
							>
								<FaShopify className="text-accent text-2xl mr-2" />
								Products
							</button>
                            {/* cart */}
                            <button
								className="text-accent text-2xl flex flex-row items-center"
								onClick={() => {
									setIsOpen(false);
									navigate("/cart");
								}}
							>
								<FaShoppingCart className="text-accent text-2xl mr-2" />
								Cart
							</button>
							{/* reviews */}
							<button
								className="text-accent text-2xl flex flex-row items-center"
								onClick={() => {
									setIsOpen(false);
									navigate("/reviews");
								}}
							>
								<MdReviews className="text-accent text-2xl mr-2" />
								Reviews
							</button>
							{/* about us */}
							<button
								className="text-accent text-2xl flex flex-row items-center"
								onClick={() => {
									setIsOpen(false);	
									navigate("/about-us");	
								}}
							>	
								<PiFlowerLotusFill className="text-accent text-2xl mr-2" />
								About Us
							</button>
							{/* contact us */}
							<button
								className="text-accent text-2xl flex flex-row items-center"
								onClick={() => {
									setIsOpen(false);
									navigate("/contact-us");
								}}
							>
								<MdContactPhone className="text-accent text-2xl mr-2" />
								Contact Us
							</button>
							{token && (
								<button
									className="text-accent text-2xl flex flex-row items-center"
									onClick={() => {
										localStorage.removeItem("token");
										setIsOpen(false);
										navigate("/login");
									}}
								>
									<BiSolidLogOutCircle className="text-accent text-3xl mr-1" />
									Logout
								</button>
							)}

						</div>

					</div>
				</div>
			)}
			<img
				className="w-[150px] h-[80px] object-cover absolute md:left-[40px] cursor-pointer"

				src="/logo.png"
				alt="Logo"
			/>
			<GiHamburgerMenu className="text-white text-4xl absolute md:hidden left-[40px]" onClick={
                ()=>{
                    setIsOpen(true);
                }
            }/>
			<div className="hidden w-full md:flex justify-center items-center ">
				<Link to="/home" className="text-white text-xl ">
					Home
				</Link>
				<Link to="/products" className="ml-4 text-white text-xl">
					Products
				</Link>
				<Link to="/reviews" className="ml-4 text-white text-xl">
					Reviews
				</Link>
				<Link to="/about-us" className="ml-4 text-white text-xl">
					About Us
				</Link>
				<Link to="/contact-us" className="ml-4 text-white text-xl">
					Contact Us
				</Link>
				<Link to="/cart" className="absolute right-[250px] ">
					<BiCart className="text-white text-3xl ml-4" />
				</Link>
				{
					token!=null&&<button className="absolute right-[80px] text-white text-xl ml-4" onClick={
						()=>{
							localStorage.removeItem("token");
							navigate("/login");
						}
					}>
						Logout
					</button>
				}
			</div>
		</header>
	);
}