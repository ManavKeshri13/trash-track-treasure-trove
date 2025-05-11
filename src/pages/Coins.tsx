
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Coins as CoinsIcon } from "lucide-react";

const Coins = () => {
  // Mock user data
  const userData = {
    totalCoins: 235,
    nextRewardAt: 250,
    history: [
      { id: 1, activity: "Waste Image Upload", coins: 10, date: "2025-05-11" },
      { id: 2, activity: "Submitted Report: Riverside Trash", coins: 15, date: "2025-05-10" },
      { id: 3, activity: "Waste Image Upload", coins: 10, date: "2025-05-09" },
      { id: 4, activity: "Submitted Report: Illegal Dumping", coins: 15, date: "2025-05-08" },
      { id: 5, activity: "Weekly Participation Bonus", coins: 25, date: "2025-05-07" },
    ],
    rewards: [
      { id: 1, name: "Eco-Friendly Water Bottle", cost: 100, image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=150&h=150&q=80" },
      { id: 2, name: "5% Discount at Green Market", cost: 250, image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=150&h=150&q=80" },
      { id: 3, name: "Tree Planting in Your Name", cost: 500, image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=150&h=150&q=80" },
    ]
  };

  const progressToNextReward = (userData.totalCoins / userData.nextRewardAt) * 100;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Eco-Coins</h1>
          <p className="text-gray-600">Earn coins by uploading waste images and submitting reports</p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-7">
          <div className="md:col-span-4 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Coin Balance</span>
                  <span className="text-sm text-gray-500">Next reward at {userData.nextRewardAt} coins</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center mb-4">
                  <div className="bg-amber-100 p-3 rounded-full mr-4">
                    <CoinsIcon className="h-8 w-8 text-amber-500" />
                  </div>
                  <div>
                    <span className="block text-3xl font-bold">{userData.totalCoins}</span>
                    <span className="text-sm text-gray-500">Available Eco-Coins</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress to next reward tier</span>
                    <span>{userData.totalCoins} / {userData.nextRewardAt}</span>
                  </div>
                  <Progress value={progressToNextReward} className="h-2" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="divide-y">
                  {userData.history.map((item) => (
                    <div key={item.id} className="py-3 flex items-center justify-between">
                      <div>
                        <p className="font-medium">{item.activity}</p>
                        <p className="text-sm text-gray-500">{item.date}</p>
                      </div>
                      <div className="flex items-center text-amber-500 font-semibold">
                        <CoinsIcon className="h-4 w-4 mr-1" />
                        +{item.coins}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Available Rewards</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userData.rewards.map((reward) => (
                    <div key={reward.id} className="flex border rounded-lg overflow-hidden">
                      <div className="w-16 h-16 flex-shrink-0">
                        <img src={reward.image} alt={reward.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-grow p-3">
                        <h4 className="font-medium">{reward.name}</h4>
                        <div className="flex items-center justify-between mt-1">
                          <div className="flex items-center text-amber-500">
                            <CoinsIcon className="h-3 w-3 mr-1" />
                            <span className="text-sm font-semibold">{reward.cost}</span>
                          </div>
                          <Button 
                            size="sm" 
                            variant="outline"
                            disabled={userData.totalCoins < reward.cost}
                          >
                            {userData.totalCoins >= reward.cost ? "Redeem" : "Not enough coins"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <div className="mt-6 bg-eco-green-light rounded-lg p-4 text-center">
              <h3 className="font-semibold mb-2">How to Earn More Coins</h3>
              <ul className="text-sm text-left list-disc pl-5 space-y-1">
                <li>Upload images of waste (+10 coins)</li>
                <li>Submit detailed waste reports (+15 coins)</li>
                <li>Weekly participation bonus (+25 coins)</li>
                <li>Join community cleanup events (+50 coins)</li>
              </ul>
            </div>
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

export default Coins;
