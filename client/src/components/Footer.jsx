import { assets } from "../assets/assets";
import { motion } from "motion/react";

const Footer = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="px-6 md:px-16 lg:px-24 xl:px-32 mt-60 text-60 text-sm text-gray-500">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-wrap justify-between items-start gap-8 pb-6 border-borderColor border-b">
        <div className="">
          <motion.img
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            src={assets.logo}
            alt="logo"
            className="h-8 md:h-9"
          />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="max-w-80 mt-3">
            Premium car rental service with a wide selection of luxury and
            everyday vehicles for all your driving needs.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex items-center gap-3 mt-6">
            <a href="https://www.instagram.com/iamskyy666/" target="_blank">
              <img
                src={assets.instagram_logo}
                className="w-5 h-5"
                alt="instagram_logo"
              />
            </a>
            <a href="https://www.instagram.com/iamskyy666/" target="_blank">
              <img
                src={assets.facebook_logo}
                className="w-5 h-5"
                alt="facebook_logo"
              />
            </a>
            <a href="https://x.com/callmeskyy111" target="_blank">
              <img
                src={assets.twitter_logo}
                className="w-5 h-5"
                alt="twitter-logo"
              />
            </a>
            <a href="https://t.me/iamskyy666" target="_blank">
              <img
                src={assets.gmail_logo}
                className="w-5 h-5"
                alt="gmail-logo"
              />
            </a>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap justify-between w-1/2 gap-8">
          <div>
            <h2 className="text-base font-medium text-gray-800 uppercase">
              Quick Links
            </h2>
            <ul className="mt-3 flex flex-col gap-1.5">
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">Browse Cars</a>
              </li>
              <li>
                <a href="#">List Your Car</a>
              </li>
              <li>
                <a href="#">About Us</a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-base font-medium text-gray-800 uppercase">
              Resources
            </h2>
            <ul className="mt-3 flex flex-col gap-1.5">
              <li>
                <a href="#">Help Center</a>
              </li>
              <li>
                <a href="#">Terms Of Service</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Insurance</a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-base font-medium text-gray-800 uppercase">
              Contact
            </h2>
            <ul className="mt-3 flex flex-col gap-1.5">
              <li>
                <a href="#">221B Baker Street.</a>
              </li>
              <li>
                <a href="#">Kolkata- 700099</a>
              </li>
              <li>
                <a href="#">(033) 244 1139</a>
              </li>
              <li>
                <a href="#">info@example.com</a>
              </li>
            </ul>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y:10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="flex flex-col md:flex-row gap-2 items-center justify-between py-5">
        <p>
          © {new Date().getFullYear()}{" "}
          <a href="https://prebuiltui.com">CarRental</a>. All rights reserved.
        </p>
        <ul className="flex items-center gap-4">
          <li>
            <a href="#">Privacy</a>
          </li>
          <li> | </li>
          <li>
            <a href="#">Terms</a>
          </li>
          <li> | </li>
          <li>
            <a href="#">Cookies</a>
          </li>
        </ul>
      </motion.div>
    </motion.div>
  );
};

export default Footer;
