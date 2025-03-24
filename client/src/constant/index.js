import { assets } from "../assets";
import { Instagram, Facebook } from "lucide-react";
/*--------------------------------------------------------------------------------Navigation---------------------------------------------------------------------------------*/
export const navMenu = [
  {
    id: 1,
    link: "HOME",
    path: "/",
  },
  {
    id: 2,
    link: "COLLECTION",
    path: "/collection",
  },
  {
    id: 3,
    link: "ABOUT",
    path: "/about",
  },
  {
    id: 4,
    link: "CONTACT",
    path: "/contact",
  },
];

export const profileMenuText = [
  {
    id: 1,
    title: "Orders",
    path: "/orders",
  },
  // {
  //   id: 3,
  //   title: "Logout",
  //   path: "",
  // },
];

/*====================================================================================PAGES==================================================================================*/
/*--------------------------------------------------------------------------------Collection Page----------------------------------------------------------------------------*/
export const filters = [
  {
    title: "CATEGORIES",
    options: ["Shirt", "T-Shirt", "Pants", "Hoodies", "Inner", "Accessories"],
  },
  {
    title: "BRANDS",
    options: [
      "ZARA",
      "RARERABBIT",
      "LOGOFF",
      "TOMMYHILFIGER",
      "ARMANIEXCHANGE",
    ],
  },
];

export const collectionContent = {
  filterTitle: "FILTERS",
  title: {
    text1: "ALL",
    text2: "COLLECTION",
  },
  sortingOptions: [
    { value: "relevant", label: "Sort by : Relevant" },
    { value: "low-high", label: "Sort by : Low to High" },
    { value: "high-low", label: "Sort by : High to Low" },
  ],
};

/*-------------------------------------------------------------------------------- About Page--------------------------------------------------------------------------------*/
export const content = {
  aboutContent: {
    title1: "ABOUT US",
    missionTitle: "Our Mission",
    missionText:
      "At ZARAA Men’s Wear, our mission is to make high-quality, stylish, and affordable fashion accessible to every man. We are committed to offering a diverse collection of trendy and classic menswear that blends comfort, elegance, and affordability.Our goal is to provide an exceptional shopping experience with premium fabrics, modern designs, and unbeatable prices. We strive to ensure that every customer walks out with confidence, knowing they’ve made the best style choice.ZARAA Men’s Wear – Where quality meets affordability!",
    section1Text:
      "We Established the ZARAA Men's Wear at Trichy in 2017, now we successfully run 4 shops in TamilNadu. With a commitment to quality and affordability, we ensure that every piece is crafted to perfection, starting from just ₹700. Whether you’re looking for the perfect outfit for work, a special event, or everyday wear, ZARAA Men’s Wear is your go-to destination.",
    section2Text:
      "Visit us today and experience fashion that’s stylish, comfortable, and budget-friendly!",
    qualityAssurance: {
      title: "Quality Assurance",
      description:
        "At [Your Brand Name], quality is our top priority. Every piece is crafted with premium materials and undergoes strict quality checks to ensure durability, comfort, and style. We are committed to providing you with fashion that not only looks great but also stands the test of time. Shop with confidence, knowing you're getting the best!",
    },
    convenience: {
      title: "Convenience",
      description:
        "Shopping with [Your Brand Name] is designed for your convenience. Enjoy a seamless experience with easy navigation, secure payments, fast shipping, and hassle-free returns. Whether you're at home or on the go, we make it simple to find and shop your favorite styles effortlessly!",
    },
    customerService: {
      title: "Exceptional Customer Service",
      description:
        "Our customer service team is here to assist you every step of the way. Whether you have questions about sizing, orders, or policies, we're just a message away. Experience friendly, prompt, and reliable support – because your satisfaction is our priority!",
    },
  },
};

/*-------------------------------------------------------------------------------- Login Page--------------------------------------------------------------------------------*/
export const loginContent = {
  title: "Login", // Initial state
  buttonText: {
    login: "Login",
    signUp: "Sign Up",
  },
  placeholders: {
    email: "Email",
    password: "Password",
    name: "Name", // Will be conditionally shown
  },
  forgotPassword: "Forgot your password?",
  createAccount: "Create Account",
  login: "Login",
};

/*-------------------------------------------------------------------------------- Order Page--------------------------------------------------------------------------------*/
export const orderContent = {
  title1: "MY",
  title2: "ORDERS",
  orderDate: "25 Dec 2024",
};

/*-------------------------------------------------------------------------------- Contact Page------------------------------------------------------------------------------*/
export const contactContent = {
  title: {
    part2: "CONTACT US",
  },
  store: {
    title: "Our Store",

    phone: "+91 1234567890",
    email: "support@zaraa.com",
  },
};
/*-------------------------------------------------------------------------------- Product Page------------------------------------------------------------------------------*/
export const productContent = {
  descriptionTitle: "Description",
  reviewTitle: "Review",
  features: [
    "100% Original Product",
    "Cash on delivery available on this product",
    "Easy return and Exchange Policy within 7 days",
  ],
  sizeSelector: "Select Size",
  addToCartButton: "ADD TO CART",
};

/*====================================================================================PAGES END==================================================================================*/

/*===================================================================================COMPONENTS START=========================================================================*/
/*----------------------------------------------------------------------------Newsletter component from Home page------------------------------------------------------------*/
export const newsLetterContent = {
  title: "Subscribe Now & get 20% off",
  subtitle:
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugiat, repudiandae sapiente soluta, quaerat ab cum molestiae quasi provident id esse ex in maxime. Accusamus, quis molestiae excepturi dolorum eligendi quos?",
  form: {
    placeholder: "Enter your email",
    buttonText: "SUBSCRIBE",
  },
};

/*----------------------------------------------------------------------------Hero Component from Home page------------------------------------------------------------------*/
export const heroContent = {
  bestSeller: "BEST SELLER",
  title: "Latest Arrivals",
  shopNow: "SHOP NOW",
  heroImage: assets.hero_img,
};

/*----------------------------------------------------------------------------Best seller component from Home page-----------------------------------------------------------*/
export const bestSellerContent = {
  title: "BEST SELLER",
  subtitle: "Fan Favorites, Timeless Styles – Shop Our Best Sellers Now!.",
};

/*----------------------------------------------------------------------------Latest Collection component from Home Page-----------------------------------------------------*/
export const latestCollectionContent = {
  title: "LATEST COLLECTION",
  subtitle: "Fresh Styles, Bold Statements – Shop the Latest Collection Now!.",
};

/*----------------------------------------------------------------------------Home Page Footer-------------------------------------------------------------------------------*/
export const policies = [
  {
    image: assets.exchange_icon,
    text1: "Exchange Policy",
    text2: "Hassle-Free Exchanges – Get the Perfect Fit with Ease!",
  },
  {
    image: assets.quality_icon,
    text1: "7 days Return Policy",
    text2: "Easy Returns, No Worries – Shop with Confidence!",
  },
  {
    image: assets.support_img,
    text1: "Shipping Policy",
    text2: "Fast & Reliable Shipping – Your Style, Delivered!",
  },
];

/*---------------------------------------------------------------------------Footer content from Home page-------------------------------------------------------------------*/
export const footerContent = {
  logo: assets.logo,
  company: [
    { id: 1, name: "Collection" },
    { id: 2, name: "About US" },
    { id: 3, name: "CONTACT US" },
  ],

  contact: [
    { id: 1, info: "+91 1234567890" },
    { id: 2, info: "support@zaraa.com" },
  ],
  copyright: `Copyright ${new Date().getFullYear()}@ Zaraa. All rights reserved.`,
};

/*===================================================================================COMPONENTS END=========================================================================*/

export const helpContent = [
  {
    id: 1,
    title: "Search",
  },
  {
    id: 2,
    title: "Shipping Policy",
  },
  {
    id: 3,
    title: "Return & Exchange Policy",
  },
  {
    id: 4,
    title: "Privacy Policy",
  },

  {
    id: 5,
    title: "Terms & Conditions",
  },
];
