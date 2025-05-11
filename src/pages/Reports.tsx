
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { FileText } from "lucide-react";

// Mock reports data
const initialReports = [
  {
    id: 1,
    title: "Riverside Trash Accumulation",
    location: "Riverbank Park, East Side",
    description: "Large amount of plastic waste accumulating along the riverbank. Needs immediate attention.",
    date: "2025-05-10",
    status: "Under Review",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    title: "Illegal Dumping Near School",
    location: "Behind Central Elementary",
    description: "Someone has been dumping construction waste behind the school fence. Creating hazard for children.",
    date: "2025-05-08",
    status: "Processing",
    imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    title: "Overflowing Public Bin",
    location: "Main Street & 5th Avenue",
    description: "Public waste bin has been overflowing for days. Attracting pests and creating litter around the area.",
    date: "2025-05-06",
    status: "Resolved",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
  },
];

const Reports = () => {
  const [reports, setReports] = useState(initialReports);
  const [newReport, setNewReport] = useState({
    title: "",
    location: "",
    description: "",
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewReport((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (!newReport.title || !newReport.location || !newReport.description) {
      toast({
        title: "Missing information",
        description: "Please fill all the required fields.",
        variant: "destructive",
      });
      return;
    }

    const report = {
      id: reports.length + 1,
      ...newReport,
      date: new Date().toISOString().split("T")[0],
      status: "Submitted",
      imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=600&q=80",
    };

    setReports([report, ...reports]);
    setNewReport({ title: "", location: "", description: "" });
    setDialogOpen(false);

    toast({
      title: "Report submitted successfully!",
      description: "You've earned 15 eco-coins for your contribution.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Waste Reports</h1>
          
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-eco-orange hover:bg-eco-orange/90">
                <FileText className="w-4 h-4 mr-2" />
                New Report
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Submit Waste Report</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={newReport.title}
                    onChange={handleInputChange}
                    placeholder="Brief title of the waste issue"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    value={newReport.location}
                    onChange={handleInputChange}
                    placeholder="Where is this located?"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={newReport.description}
                    onChange={handleInputChange}
                    placeholder="Describe the waste problem in detail"
                    rows={4}
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Image (Optional)</Label>
                  <Input
                    type="file"
                    accept="image/*"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleSubmit} className="bg-eco-green hover:bg-eco-green/90">
                  Submit Report
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reports.map((report) => (
            <Card key={report.id} className="overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img 
                  src={report.imageUrl} 
                  alt={report.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>{report.title}</CardTitle>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    report.status === "Resolved" 
                      ? "bg-green-100 text-green-800" 
                      : report.status === "Processing" 
                      ? "bg-blue-100 text-blue-800" 
                      : "bg-amber-100 text-amber-800"
                  }`}>
                    {report.status}
                  </span>
                </div>
                <CardDescription>{report.location}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">{report.description}</p>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-4">
                <span className="text-sm text-gray-500">Reported on {report.date}</span>
                <Button variant="outline" size="sm">View Details</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {reports.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 mx-auto text-gray-400" />
            <h3 className="mt-4 text-lg font-medium text-gray-900">No reports yet</h3>
            <p className="mt-2 text-sm text-gray-500">Be the first to submit a waste report!</p>
          </div>
        )}
      </main>
      
      <footer className="bg-white py-6">
        <div className="container mx-auto px-4 text-center text-gray-500">
          <p>© 2025 TrashTrack Treasure Trove. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Reports;
