/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

function Footer() {
  const socialLinks = [
    { icon: <FaFacebookF size={20} />, href: "/", hoverColor: "hover:text-blue-400" },
    { icon: <FaTwitter size={20} />, href: "/", hoverColor: "hover:text-blue-300" },
    { icon: <FaInstagram size={20} />, href: "/", hoverColor: "hover:text-pink-500" },
    { icon: <FaLinkedinIn size={20} />, href: "https://www.linkedin.com/in/md-ehteshamur-rahman-45a493263/", hoverColor: "hover:text-blue-500" },
  ];

  const sections = [
    {
      title: "Company",
      links: [
        { name: "Features", to: "/" },
        { name: "Pricing", to: "/" },
        { name: "Affiliate Program", to: "/" },
        { name: "Press Kit", to: "/" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Account", to: "/" },
        { name: "Help", to: "/" },
        { name: "Contact Us", to: "/" },
        { name: "Customer Support", to: "/" },
      ],
    },
    {
      title: "Legals",
      links: [
        { name: "Terms & Conditions", to: "/" },
        { name: "Privacy Policy", to: "/" },
        { name: "Licensing", to: "/" },
      ],
    },
  ];

  return (
    <footer className="relative overflow-hidden py-8 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-white">
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap -m-4"> {/* Adjusted margin */}
          {/* Logo and About Section */}
          <div className="w-full p-4 md:w-1/2 lg:w-4/12">
            <div className="flex flex-col justify-between h-full">
              <div className="mb-4"> {/* Reduced margin */}
                <Logo width="120px" />
              </div>
              <p className="text-sm text-gray-400">
                DevUI is dedicated to creating intuitive and powerful designs for everyone. Join us on our journey!
              </p>
              <div className="mt-4 flex space-x-3"> {/* Reduced space */}
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className={`${link.hoverColor} transition`}
                    target={link.href.startsWith("http") ? "_blank" : "_self"}
                    rel="noopener noreferrer"
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Sections */}
          {sections.map((section, index) => (
            <div key={index} className="w-full p-4 md:w-1/2 lg:w-2/12">
              <div className="h-full">
                <h3 className="mb-4 text-lg font-semibold uppercase text-gray-300"> {/* Reduced margin */}
                  {section.title}
                </h3>
                <ul>
                  {section.links.map((link, i) => (
                    <li key={i} className="mb-3"> {/* Reduced margin */}
                      <Link
                        to={link.to}
                        className="text-base font-medium transition hover:text-blue-400"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 text-center text-sm text-gray-500"> {/* Reduced margin */}
          &copy; {new Date().getFullYear()} DevUI. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;