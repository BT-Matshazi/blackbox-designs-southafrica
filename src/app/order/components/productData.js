import Cms from "../../../../public/images/sites/cms.svg"
import HTML from "../../../../public/images/sites/html.svg"
import Stores from "../../../../public/images/sites/shopping.svg"

const ProductsData = [
  {
    id: 1,
    name: "CMS Business Website",
    price: 100,
    description: "Wordpress based website design. Fully customized to your specifications and requirements. Add, edit and delete pages, posts, images and more with ease. ",
    link: "/order/cms",
    image: Cms,
  },
  {
    id: 2,
    name: "HTML Business Website",
    price: 100,
    description: "Fully customized HTML website design. Built from scratch to your specifications and requirements using HTML, CSS, JavaScript or JavaScript Frameworks and libraries.",
    link: "/order/html",
    image: HTML,
  },
  {
    id: 3,
    name: "E-commerce Website",
    price: 100,
    description:
      "WordPress based WOOCOMMERCE website design. Add to cart, check out and pay. Payment gateway integration. Eg. PayFast, PayPal and more.",
    link: "/order/stores",
    image: Stores,
  },
];

export default ProductsData;
