import {
  Facebook,
  Instagram,
  Phone,
  MailOpen,
  Clock,
  MapPin,
  Pinterest,
  Twitter,
  Send,
} from "lucide-react";
import Image from "next/image";

const DemoFooter = () => {
  return (
    <footer className="bg-[#880808] text-white">
      <div className="max-w-[1299px] mx-auto px-4 py-20 flex flex-wrap justify-between gap-8">
        {/* Newsletter */}
        <div>
          <h2 className="text-xl font-bold mb-4">RESTAURANT</h2>
          <p className="mb-4 text-base-200">
            Subscribe our newsletter and get discount 25% off
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Enter Your Email"
              className="p-2 rounded-l bg-white text-black w-full"
            />
            <button className="bg-[#A52A2A] px-4 rounded-r text-white">
              <Send size={20} />
            </button>
          </div>
          <div className="flex space-x-3 mt-4 text-xl">
            <Image src='/p.png' alt="logo" width={40} height={40}/>
            <Image src='/twiter.png' alt="logo" width={40} height={40}/>
            <Image src='/fb.png' alt="logo" width={50} height={50}/>
            <Image src='/ins.png' alt="logo" width={40} height={40}/>
            <Image src='/you.png' alt="logo" width={40} height={40}/>
          </div>
        </div>

        {/* Contact Us */}
        <div>
          <h2 className="text-lg font-bold mb-4">Contact us</h2>
          <p className="flex items-center gap-2 mb-2 text-base-200">
            <MapPin className="text-2xl" /> 3517 W. Gray St. Utica, Pennsylvania
            57867
          </p>
          <p className="flex items-center gap-2 mb-2 text-base-200">
            <Phone /> (480) 555-0103
          </p>
          <p className="flex items-center gap-2 mb-2 text-base-200">
            <MailOpen /> MAlyaqout@4house.Co
          </p>
          <p className="flex items-center gap-2 text-base-200">
            <Clock /> Sun - Sat / 10:00 AM – 8:00 PM
          </p>
        </div>

        {/* Links */}
        <div>
          <h2 className="text-lg font-bold mb-4">Links</h2>
          <ul className="space-y-2 text-base-200">
            <li>
              <a href="#" className="hover:underline">
                About us
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Our Menu
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Team
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                FAQ
              </a>
            </li>
          </ul>
        </div>

        {/* Instagram Gallery */}
        <div className="lg:w-[300px]">
          <h2 className="text-lg font-bold mb-4">Instagram Gallery</h2>
          <div className="grid grid-cols-3 gap-2">
            {[...Array(6)].map((_, i) => (
              <Image
                key={i}
                src="https://cdn.pixabay.com/photo/2020/10/05/19/55/hamburger-5630646_640.jpg"
                alt={`Gallery ${i}`}
                width={100}
                height={100}
                className="w-full h-20 object-cover rounded"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-[#A52A2A]  text-sm py-4 text-center f">
        <div className="max-w-[1299px] mx-auto flex flex-col md:flex-row justify-between items-center px-4 text-base-200 ">
          <p>Copyright © 2025. All rights reserved</p>
          <div className="space-x-4 mt-2 md:mt-0">
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
            <a href="#" className="hover:underline">
              Term of Use
            </a>
            <a href="#" className="hover:underline">
              Partner
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default DemoFooter;
