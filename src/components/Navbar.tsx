
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Image, Upload, FileText, Coins, User } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { name: "Home", path: "/", icon: <Image className="w-5 h-5 mr-2" /> },
    { name: "Reports", path: "/reports", icon: <FileText className="w-5 h-5 mr-2" /> },
    { name: "Coins", path: "/coins", icon: <Coins className="w-5 h-5 mr-2" /> },
    { name: "Profile", path: "/profile", icon: <User className="w-5 h-5 mr-2" /> },
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <div className="bg-eco-green rounded-full p-2 mr-2">
                <Image className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">TrashTrack</span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-eco-green hover:bg-eco-green-light"
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="md:hidden">
            <Button
              variant="ghost"
              onClick={toggleNavbar}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-eco-green hover:bg-eco-green-light"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </Button>
          </div>
        </div>
      </div>
      
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-eco-green hover:bg-eco-green-light"
                onClick={() => setIsOpen(false)}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
