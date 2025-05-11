
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, Recycle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

// Mock API for waste analysis - in a real app, this would be a call to an AI service
const analyzeWasteImage = async (imageFile: File): Promise<{
  wasteType: string;
  recyclingInstructions: string;
  environmentalImpact: string;
}> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500));
  
  // This is a mock function that randomly selects waste analysis results
  // In a real app, this would be replaced with an actual AI image analysis API
  const wasteTypes = [
    {
      type: "Plastic Bottles",
      instructions: "Rinse bottles, remove caps, and place in recycling bin. Most communities accept PET (#1) and HDPE (#2) plastics.",
      impact: "Recycling plastic bottles reduces landfill waste and conserves petroleum resources used in manufacturing new bottles."
    },
    {
      type: "Paper/Cardboard",
      instructions: "Flatten cardboard boxes and keep paper dry. Place in paper recycling bin. Remove any non-paper materials like tape or staples.",
      impact: "Recycling one ton of paper saves 17 trees, 7,000 gallons of water, and 3 cubic yards of landfill space."
    },
    {
      type: "Electronic Waste",
      instructions: "Never throw electronics in regular trash. Take to designated e-waste recycling centers or retailer take-back programs.",
      impact: "E-waste contains toxic materials like lead and mercury that can leach into soil and water if improperly disposed of."
    },
    {
      type: "Glass Containers",
      instructions: "Rinse thoroughly and separate by color (clear, green, brown) if required by your local recycling program.",
      impact: "Glass can be recycled indefinitely without loss of quality, saving energy and raw materials with each recycling cycle."
    },
    {
      type: "Food Waste",
      instructions: "Compost food scraps to create nutrient-rich soil for gardens. Keep meat, dairy, and oily foods out of home compost.",
      impact: "Composting food waste reduces methane emissions from landfills and creates valuable soil amendments."
    }
  ];
  
  // Select a random waste type for the demo
  const randomWaste = wasteTypes[Math.floor(Math.random() * wasteTypes.length)];
  
  return {
    wasteType: randomWaste.type,
    recyclingInstructions: randomWaste.instructions,
    environmentalImpact: randomWaste.impact
  };
};

const ImageUploader = () => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [recyclingInfo, setRecyclingInfo] = useState<{
    wasteType: string;
    recyclingInstructions: string;
    environmentalImpact: string;
  } | null>(null);
  const { toast } = useToast();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setRecyclingInfo(null); // Reset recycling info when new image is selected
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!image) {
      toast({
        title: "No image selected",
        description: "Please select an image to upload.",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    // Simulate upload delay
    setTimeout(() => {
      setUploading(false);
      
      toast({
        title: "Upload successful!",
        description: "You've earned 10 eco-coins for your contribution.",
      });
      
      // Start waste analysis after successful upload
      analyzeWaste();
    }, 2000);
  };
  
  const analyzeWaste = async () => {
    if (!image) return;
    
    setAnalyzing(true);
    
    try {
      const analysisResult = await analyzeWasteImage(image);
      setRecyclingInfo(analysisResult);
      
      toast({
        title: "Analysis complete!",
        description: `Identified as: ${analysisResult.wasteType}`,
      });
    } catch (error) {
      console.error("Error analyzing waste:", error);
      toast({
        title: "Analysis failed",
        description: "We couldn't analyze your waste image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="w-full max-w-md mx-auto shadow-lg">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
              {preview ? (
                <div className="relative w-full">
                  <img 
                    src={preview} 
                    alt="Preview" 
                    className="w-full h-48 object-cover rounded-md" 
                  />
                  <Button 
                    type="button" 
                    variant="destructive" 
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => {
                      setImage(null);
                      setPreview(null);
                      setRecyclingInfo(null);
                    }}
                  >
                    Remove
                  </Button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center cursor-pointer">
                  <Upload className="h-12 w-12 text-eco-green mb-2" />
                  <span className="text-sm font-medium text-gray-700">Click to upload waste image</span>
                  <span className="text-xs text-gray-500 mt-1">PNG, JPG, WEBP up to 10MB</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-eco-orange hover:bg-eco-orange/90 text-white"
              disabled={!image || uploading || analyzing}
            >
              {uploading ? "Uploading..." : analyzing ? "Analyzing..." : "Submit Waste Report"}
            </Button>
          </form>
        </CardContent>
      </Card>
      
      {recyclingInfo && (
        <Card className="w-full max-w-md mx-auto shadow-lg border border-eco-green">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <Recycle className="h-6 w-6 text-eco-green" />
              <h3 className="text-lg font-semibold">Recycling Analysis Results</h3>
            </div>
            
            <Alert className="bg-eco-green-light border-eco-green">
              <AlertTitle className="text-eco-green font-semibold">Waste Type: {recyclingInfo.wasteType}</AlertTitle>
              <AlertDescription className="text-gray-700">
                <h4 className="font-medium mt-2">How to Recycle:</h4>
                <p className="mt-1">{recyclingInfo.recyclingInstructions}</p>
                
                <h4 className="font-medium mt-3">Environmental Impact:</h4>
                <p className="mt-1">{recyclingInfo.environmentalImpact}</p>
              </AlertDescription>
            </Alert>
            
            <div className="text-center text-sm text-gray-500 mt-2">
              <p>You've earned an additional 5 eco-coins for learning about proper recycling!</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ImageUploader;
