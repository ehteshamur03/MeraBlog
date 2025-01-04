/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

function Footer() {
  const socialLinks = [
    { icon: <FaFacebookF size={20} />, href: "/", hoverColor: "hover:text-blue-600" },
    { icon: <FaTwitter size={20} />, href: "/", hoverColor: "hover:text-blue-400" },
    { icon: <FaInstagram size={20} />, href: "/", hoverColor: "hover:text-pink-500" },
    { icon: <FaLinkedinIn size={20} />, href: "https://www.linkedin.com/in/md-ehteshamur-rahman-45a493263/", hoverColor: "hover:text-blue-700" },
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
    <footer className="py-6 bg-[#1f1f1f] text-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Logo and About Section */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <div className="mb-3">
              <Logo width="120px" />
            </div>
            <p className="text-xs text-gray-400 mb-3">
              Creating intuitive and powerful designs. Join our journey!
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className={`${link.hoverColor} transition-colors duration-200`}
                  target={link.href.startsWith("http") ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Sections */}
          {sections.map((section, index) => (
            <div key={index} className="text-center sm:text-left">
              <h3 className="mb-3 text-base font-semibold text-gray-300">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <Link
                      to={link.to}
                      className="text-sm font-medium text-gray-400 hover:text-[#F57C5F]"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer Bottom */}
        <div className="mt-6 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} DevUI. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
