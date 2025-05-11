
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-6xl font-bold text-eco-green mb-4">404</h1>
          <p className="text-xl text-gray-700 mb-6">Oops! This page has been recycled.</p>
          <p className="text-gray-500 mb-8">The page you're looking for doesn't exist or has been moved.</p>
          <Link to="/">
            <Button className="bg-eco-green hover:bg-eco-green/90">
              Return to Home
            </Button>
          </Link>
        </div>
      </main>
      
      <footer className="bg-white py-6">
        <div className="container mx-auto px-4 text-center text-gray-500">
          <p>© 2025 TrashTrack Treasure Trove. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default NotFound;
