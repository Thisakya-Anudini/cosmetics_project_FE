// AboutUsPage.jsx
import { React,useEffect } from "react";
import { FaLeaf, FaRegHeart, FaRecycle } from 'react-icons/fa';



const AboutUsPage = () => {

  useEffect(() => {
  window.scrollTo(0, 0); // Scroll to the top of the page
}, []);

  return (
    <div className="min-h-screen bg-white py-8 px-6 flex flex-col items-center">
      
      {/* About Us Title */}
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6 animate__animated animate__fadeIn">
        About Us
      </h1>

      {/* Company Overview Section with Image Above Content */}
      <div className="w-full md:w-[900px] flex flex-col items-center justify-center">
        <div className="bg-pink-100 flex justify-center items-center rounded-lg shadow-lg">
          <img 
            src="/logo.png"  // Replace with your actual image
            alt="Anu Cosmetics"
            className="w-[900px] h-[350px] object-contain mt-[-60px] " 
          />
        </div>
        <div className=" max-w-5xl bg-pink-100 p-8 mt-[-80px] rounded-lg shadow-lg space-y-6">
          {/* Company Overview */}
          <div className="text-lg text-black">
            <p className=" leading-relaxed">
              <strong>Anu Cosmetics</strong> is a trusted cosmetics shop that offers a wide range of skincare and beauty products. We focus on providing the best beauty solutions to our customers by offering high-quality cosmetics that are gentle on the skin and effective in enhancing natural beauty. Our products are carefully selected to promote healthy, glowing skin without harmful chemicals. At Anu Cosmetics, we believe in the power of self-care and helping our customers feel confident in their own skin.
            </p>
          </div>
        </div>
      </div>


      {/* Mission Section with Full Background Image Above Content */}
      <div className="w-full md:w-[900px] relative mt-10">
        <div className="bg-pink-100 shadow-xl rounded-lg space-y-1 p-8">
          <h2 className="text-2xl font-bold text-center text-black mb-2">Our Mission</h2>
          <p className="text-lg text-black leading-relaxed mb-4">
            Our mission is to provide high-quality, affordable cosmetics that help our customers enhance their natural beauty. We carefully select products that nourish, protect, and improve the appearance of the skin, making it easy for everyone to achieve glowing skin and feel confident in their own beauty. We are committed to ensuring that our customers find beauty products that work best for their skin type and needs.
          </p>
          <div className="flex justify-center items-center space-x-6">
            <FaLeaf className="text-4xl text-green-600 transition-transform duration-300 hover:scale-110" />
            <FaRegHeart className="text-4xl text-pink-500 transition-transform duration-300 hover:scale-110" />
            <FaRecycle className="text-4xl text-blue-600 transition-transform duration-300 hover:scale-110" />
          </div>
          <div className="bg-cover bg-center h-[50vh] relative mt-10" style={{ backgroundImage: "url('/miss.jpg')" }}></div>
        </div>
      </div>

      {/* Vision Section with Full Background Image Above Content */}
      <div className="w-full md:w-[900px] relative mt-10">
        <div className="absolute inset-0 bg-black opacity-1"></div>
        <div className="relative z-10 max-w-5xl bg-pink-100 shadow-xl rounded-lg space-y-8 p-8">
          <h2 className="text-2xl font-bold text-center text-black mb-4">Our Vision</h2>
          <p className="text-lg text-black leading-relaxed">
            Our vision is to be the go-to destination for high-quality, effective cosmetics that cater to all skin types. We aim to provide a wide variety of beauty products that enhance the skin's natural glow while prioritizing safety and sustainability. We aspire to build a community of customers who trust us for their beauty needs and feel empowered to make confident, informed decisions about their skincare choices.
          </p>
          <div className="bg-cover bg-center h-[50vh] relative overflow-hidden" style={{ backgroundImage: "url('/vi.jpg')" }}></div>
        </div>
      </div>

      {/* Footer or Contact Section */}
      <div className="w-full bg-pink-600 py-10 mt-10">
        <div className="text-center text-lg text-white">
          <p>If you have any questions or would like to know more about our products, feel free to contact us!</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
