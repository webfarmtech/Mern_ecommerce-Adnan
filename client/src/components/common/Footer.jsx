import { SubTitle, Title } from "../Title";
import { footerContent, helpContent } from "../../constant";
import {
  Calculator,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { NewsLetterBox } from "..";

const icons = [
  {
    id: 1,
    icon: <Instagram />,
    path: "https://www.instagram.com/zaraamenswearcdm/?hl=en",
  },
  {
    id: 2,
    icon: <Facebook />,
    path: "https://www.facebook.com/people/zaraamenswearcdm/100088126741024/#",
  },
];

const Footer = () => {
  return (
    <footer className="w-full bg-black text-white">
      <div className="container mx-auto px-4 py-4 max-w-full">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold font-serif uppercase">
              ZARAA.ENT<sup> &trade;</sup>
            </h2>
            <div className="flex gap-2 text-sm md:text-base">
              <MapPin />
              <span>
                No.1, North Car Street,
                <br />
                Chidambraram - 608001,
                <br />
                Tamil Nadu, India.
                <br />
              </span>
            </div>
            <ul className="flex gap-4">
              {icons.map((item) => (
                <li
                  className="cursor-pointer hover:text-blue-600 transition-colors"
                  onClick={() => window.open(item.path, "_blank")}
                  key={item.id}
                >
                  {item.icon}
                </li>
              ))}
            </ul>
          </div>

          <div className="">
            <Title text1="HELP" className="text-lg md:text-xl font-bold" />
            <ul>
              {helpContent.map((item) => (
                <li
                  key={item.id}
                  className="cursor-pointer hover:text-blue-600 space-y-1 text-lg"
                >
                  {item.title}
                </li>
              ))}
            </ul>
          </div>

          {/* Sites Section */}
          <div className="">
            <Title text1="SITES" className="text-lg md:text-xl font-bold" />
            <ul className="space-y-2 text-sm md:text-base">
              {footerContent.company.map((item) => (
                <li
                  key={item.id}
                  className="text-lg hover:text-blue-600 cursor-pointer"
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <Title
              text1="GET IN TOUCH"
              className="text-lg md:text-xl font-bold"
            />
            <ul className="space-y-2 ">
              <div className="flex gap-2 text-lg  hover:text-blue-600 cursor-pointer">
                <Phone />
                <span>+91 1234567890</span>
              </div>
              <div className="flex gap-2 text-lg hover:text-blue-600 cursor-pointer">
                <Mail />
                <span>support@zaraa.gmail.com</span>
              </div>
            </ul>
          </div>
        </div>
        <NewsLetterBox />
      </div>

      <div className="text-center mt-5 p-4 border-t border-white">
        <p>
          &copy; {new Date().getFullYear()} Zaraa<sup>&trade;</sup>. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
