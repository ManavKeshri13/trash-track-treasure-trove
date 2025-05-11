
import Navbar from "@/components/Navbar";
import ImageUploader from "@/components/ImageUploader";
import { Button } from "@/components/ui/button";
import { FileText, Coins } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">TrashTrack Treasure Trove</h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            Help keep our environment clean by reporting waste. Upload images, earn eco-coins, and make a difference!
          </p>
        </div>
        
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-center mb-6">Upload Waste Image</h2>
          <ImageUploader />
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-eco-green-light rounded-lg p-6 text-center shadow-md">
            <FileText className="h-12 w-12 mx-auto mb-4 text-eco-green" />
            <h3 className="text-xl font-semibold mb-2">Submit Reports</h3>
            <p className="text-gray-600 mb-4">
              Help identify waste hotspots by submitting detailed reports about waste in your area.
            </p>
            <Link to="/reports">
              <Button className="bg-eco-green hover:bg-eco-green/90">
                View Reports
              </Button>
            </Link>
          </div>
          
          <div className="bg-eco-blue-light rounded-lg p-6 text-center shadow-md">
            <Coins className="h-12 w-12 mx-auto mb-4 text-eco-blue" />
            <h3 className="text-xl font-semibold mb-2">Earn Eco-Coins</h3>
            <p className="text-gray-600 mb-4">
              Get rewarded for your environmental contributions with eco-coins redeemable for rewards.
            </p>
            <Link to="/coins">
              <Button className="bg-eco-blue hover:bg-eco-blue/90">
                Check Balance
              </Button>
            </Link>
          </div>
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

export default Index;
