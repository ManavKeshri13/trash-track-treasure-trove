import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, Recycle, Leaf, Info } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

// Enhanced waste database with more detailed categorization and information
const wasteDatabase = [
  {
    type: "PET Plastic (Type 1)",
    category: "Plastic",
    examples: "Water bottles, soda bottles, some food containers",
    instructions: "Rinse thoroughly, remove labels if required by local program, keep caps on (most modern facilities can process attached caps). Check bottom for recycle symbol with number 1.",
    impact: "Recycling one ton of PET bottles saves about 7.4 cubic yards of landfill space and reduces energy consumption in new bottle production by up to 84%.",
    tips: "Avoid crushing bottles as intact containers are easier to sort at recycling facilities.",
    recyclable: true,
    imageMatches: ["bottle", "plastic container", "soda bottle", "water bottle"]
  },
  {
    type: "HDPE Plastic (Type 2)",
    category: "Plastic",
    examples: "Milk jugs, detergent bottles, shampoo bottles",
    instructions: "Rinse containers thoroughly, remove and discard pumps or sprayers (often contain metal springs that aren't recyclable), flatten to save space if desired.",
    impact: "HDPE is one of the most commonly recycled plastics with a high value in the recycling market. Recycling HDPE uses 66% less energy than manufacturing new plastic.",
    tips: "Keep lids on containers unless your local program specifies otherwise.",
    recyclable: true,
    imageMatches: ["milk jug", "detergent bottle", "shampoo bottle", "plastic container"]
  },
  {
    type: "PVC Plastic (Type 3)",
    category: "Plastic",
    examples: "Pipes, vinyl siding, some food wraps, blister packaging",
    instructions: "Most curbside programs DO NOT accept PVC. Check with local hazardous waste facility for disposal options.",
    impact: "PVC can release toxic chemicals when incinerated and is difficult to recycle. It's considered one of the more problematic plastics environmentally.",
    tips: "Avoid purchasing PVC products when possible. Look for the number 3 in the recycling symbol.",
    recyclable: false,
    imageMatches: ["pipe", "vinyl", "food wrap", "plastic packaging", "blister pack"]
  },
  {
    type: "LDPE Plastic (Type 4)",
    category: "Plastic",
    examples: "Grocery bags, bread bags, shrink wrap, squeeze bottles",
    instructions: "Most curbside programs don't accept film plastics. Return clean, dry bags to supermarket collection bins. Squeeze bottles may be accepted in some programs - check locally.",
    impact: "Plastic bags are a major source of litter and ocean pollution. Recycling LDPE saves petroleum resources and reduces landfill volume.",
    tips: "Reuse bags when possible before recycling. Make sure all film plastics are clean and dry before recycling.",
    recyclable: true,
    imageMatches: ["plastic bag", "grocery bag", "bread bag", "shrink wrap", "squeeze bottle"]
  },
  {
    type: "PP Plastic (Type 5)",
    category: "Plastic",
    examples: "Yogurt containers, medicine bottles, bottle caps, takeout containers",
    instructions: "Rinse containers thoroughly. Check if your program accepts these - acceptance is increasing but not universal.",
    impact: "PP has a high melting point making it ideal for hot food containers. Recycling PP reduces fossil fuel dependency and greenhouse gas emissions.",
    tips: "Remove paper labels when possible. These containers can often be reused for food storage before recycling.",
    recyclable: true,
    imageMatches: ["yogurt container", "medicine bottle", "bottle cap", "takeout container", "plastic cup"]
  },
  {
    type: "PS Plastic (Type 6)",
    category: "Plastic",
    examples: "Styrofoam containers, disposable cups and plates, CD cases",
    instructions: "Most curbside programs DO NOT accept styrofoam. Some specialized drop-off programs exist - check locally. Hard PS plastic may be accepted in some programs.",
    impact: "PS is problematic for the environment as it breaks into small pieces easily, can leach chemicals, and is difficult to recycle in most programs.",
    tips: "Avoid purchasing styrofoam when possible. Look for alternatives like paper or compostable containers.",
    recyclable: false,
    imageMatches: ["styrofoam", "foam container", "disposable cup", "CD case", "plastic plate"]
  },
  {
    type: "Other Plastics (Type 7)",
    category: "Plastic",
    examples: "Polycarbonate bottles, some food containers, biodegradable plastics",
    instructions: "Most Type 7 plastics are NOT accepted in curbside recycling. Check with manufacturer for specific disposal instructions.",
    impact: "This is a catch-all category for plastics that don't fit types 1-6, including bioplastics and multi-layer materials which can be difficult to process.",
    tips: "Avoid these materials when possible as they're rarely recyclable in conventional programs.",
    recyclable: false,
    imageMatches: ["polycarbonate", "plastic container", "biodegradable plastic", "compostable plastic"]
  },
  {
    type: "Corrugated Cardboard",
    category: "Paper",
    examples: "Shipping boxes, pizza boxes (clean portions only), product packaging",
    instructions: "Remove all packing materials, flatten boxes to save space. For pizza boxes, tear off and discard greasy/soiled portions.",
    impact: "Recycling one ton of cardboard saves 17 trees, 7,000 gallons of water, and 3.3 cubic yards of landfill space. Cardboard can be recycled 5-7 times before fibers become too short.",
    tips: "Keep cardboard dry - wet cardboard may be rejected by recycling facilities.",
    recyclable: true,
    imageMatches: ["box", "cardboard", "shipping box", "pizza box", "packaging"]
  },
  {
    type: "Paperboard",
    category: "Paper",
    examples: "Cereal boxes, shoe boxes, tissue boxes, paper towel rolls",
    instructions: "Remove plastic windows from boxes (like pasta boxes), flatten to save space.",
    impact: "Paperboard is easily recyclable and is often used to make new paperboard products. It has a high recycled content already in most new products.",
    tips: "Food residue can contaminate paperboard recycling - make sure containers are clean.",
    recyclable: true,
    imageMatches: ["cereal box", "shoe box", "tissue box", "paper roll", "packaging"]
  },
  {
    type: "Office Paper",
    category: "Paper",
    examples: "Printer paper, notebook paper, envelopes, mail",
    instructions: "Remove plastic windows from envelopes, remove paper clips, staples acceptable in most programs.",
    impact: "Virgin paper production is resource-intensive. Recycling paper saves trees, water, and reduces greenhouse gases compared to new paper production.",
    tips: "Shredded paper may not be accepted in some programs as the small pieces can jam machinery - check locally.",
    recyclable: true,
    imageMatches: ["paper", "document", "envelope", "mail", "printer paper"]
  },
  {
    type: "Newspaper",
    category: "Paper",
    examples: "Newspapers, inserts, classified sections",
    instructions: "Keep clean and dry. Can typically be recycled with other paper products.",
    impact: "Newspaper has one of the highest recycling rates of any material. It can be made into new newspaper, paperboard, insulation, and animal bedding.",
    tips: "Some programs collect newspaper separately for specialized recycling streams.",
    recyclable: true,
    imageMatches: ["newspaper", "news", "paper"]
  },
  {
    type: "Glossy Paper",
    category: "Paper",
    examples: "Magazines, catalogs, brochures",
    instructions: "Most glossy paper can be recycled with other paper products, though some older types with clay coating may not be accepted - check locally.",
    impact: "Modern glossy papers are increasingly recyclable. The clay and chemicals used for coating can be removed during the recycling process.",
    tips: "Remove any plastic wrapping or non-paper inserts before recycling.",
    recyclable: true,
    imageMatches: ["magazine", "catalog", "brochure", "glossy paper"]
  },
  {
    type: "Aluminum Cans",
    category: "Metal",
    examples: "Soda cans, beer cans, some food cans",
    instructions: "Rinse clean, no need to remove labels or crush (though crushing saves space during storage).",
    impact: "Aluminum recycling saves 95% of the energy needed to produce new aluminum. A recycled can may be back on the shelf as a new can in as little as 60 days.",
    tips: "Keep aluminum separate from steel if your program requires it. The tab can stay attached to the can.",
    recyclable: true,
    imageMatches: ["can", "soda can", "beer can", "aluminum", "metal can"]
  },
  {
    type: "Steel/Tin Cans",
    category: "Metal",
    examples: "Food cans, soup cans, vegetable cans, coffee cans",
    instructions: "Rinse clean, labels can remain. Most programs accept lids if they're placed inside the can and slightly crimped.",
    impact: "Steel is 100% recyclable and can be recycled indefinitely without loss of quality. Recycling steel saves 75% of the energy used to make new steel.",
    tips: "A magnet will stick to steel but not aluminum if you're unsure which type of metal you have.",
    recyclable: true,
    imageMatches: ["tin can", "steel can", "soup can", "food can", "metal can"]
  },
  {
    type: "Glass Bottles and Jars",
    category: "Glass",
    examples: "Wine bottles, pasta sauce jars, beverage bottles",
    instructions: "Rinse clean, remove lids (recycle metal lids separately if accepted). Some programs require separation by color (clear, green, brown).",
    impact: "Glass is 100% recyclable and can be recycled endlessly without loss in quality or purity. Recycling one glass bottle saves enough energy to power a computer for 30 minutes.",
    tips: "Not all glass is recyclable in curbside programs - window glass, drinking glasses, and ceramics use different formulations and must be disposed of separately.",
    recyclable: true,
    imageMatches: ["bottle", "jar", "glass bottle", "glass jar", "wine bottle"]
  },
  {
    type: "Food Waste",
    category: "Organic",
    examples: "Fruit and vegetable scraps, coffee grounds, eggshells, bread",
    instructions: "Ideally, compost in home or community compost. If composting unavailable, check for municipal organic waste collection.",
    impact: "When food waste decomposes in landfills, it produces methane, a potent greenhouse gas. Composting creates valuable soil amendment instead.",
    tips: "Meat, dairy, and oily foods are not recommended for home composting but may be accepted in municipal programs.",
    recyclable: false,
    compostable: true,
    imageMatches: ["food scraps", "vegetable", "fruit", "coffee grounds", "compost"]
  },
  {
    type: "Yard Waste",
    category: "Organic",
    examples: "Leaves, grass clippings, small branches, plants",
    instructions: "Use municipal yard waste collection if available, compost at home, or check for drop-off composting facilities.",
    impact: "Yard waste banned from landfills in many areas as it takes up space and creates methane when it breaks down without oxygen.",
    tips: "Consider grasscycling (leaving grass clippings on the lawn) to return nutrients to soil.",
    recyclable: false,
    compostable: true,
    imageMatches: ["leaves", "grass", "branch", "plant", "yard waste"]
  },
  {
    type: "Electronic Waste",
    category: "Hazardous",
    examples: "Computers, phones, TVs, printers, cables, batteries",
    instructions: "NEVER place in regular trash or recycling. Use e-waste collection events, retailer take-back programs, or designated e-waste recycling centers.",
    impact: "E-waste contains heavy metals like lead, mercury, and cadmium that can leach into soil and water. Proper recycling recovers valuable metals and prevents pollution.",
    tips: "Some retailers offer discounts on new electronics when recycling old ones. Many manufacturers have mail-back recycling programs.",
    recyclable: false,
    specialDisposal: true,
    imageMatches: ["computer", "phone", "TV", "electronics", "battery", "cable", "device"]
  },
  {
    type: "Household Hazardous Waste",
    category: "Hazardous",
    examples: "Paint, cleaning chemicals, pesticides, motor oil, fluorescent bulbs",
    instructions: "NEVER place in regular trash or recycling. Use county hazardous waste collection events or facilities.",
    impact: "Improper disposal can contaminate water systems and cause serious environmental damage. Many materials can be recycled or safely processed when properly collected.",
    tips: "Store in original containers with labels intact. Never mix different household chemicals together.",
    recyclable: false,
    specialDisposal: true,
    imageMatches: ["paint", "chemicals", "cleaner", "pesticide", "oil", "bulb"]
  },
  {
    type: "Textiles",
    category: "Fabric",
    examples: "Clothing, linens, towels, curtains, shoes",
    instructions: "Donate usable items to charity. Many communities now have textile recycling programs for worn/damaged items. Some retailers offer take-back programs.",
    impact: "Textiles take up significant landfill space and some synthetic materials don't break down. Even damaged textiles can be recycled into insulation or industrial wiping cloths.",
    tips: "Several major clothing brands now offer recycling programs, often with discount incentives.",
    recyclable: true,
    imageMatches: ["clothing", "fabric", "textile", "shirt", "pants", "shoes", "towel"]
  }
];

// Enhanced waste analysis with more comprehensive matching and detailed results
const analyzeWasteImage = async (imageFile: File): Promise<{
  wasteType: string;
  category: string;
  examples: string;
  recyclingInstructions: string;
  environmentalImpact: string;
  recyclable: boolean;
  tips: string;
  confidenceScore: number;
}> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 2000));
  
  // This is a mock function that simulates AI image analysis
  // In a real app, this would be replaced with an actual AI image analysis API
  
  // Simulate image analysis based on filename as a proxy for content
  // In a real app, this would be the result from an AI vision model
  const filename = imageFile.name.toLowerCase();
  
  // Create an array to store potential matches with confidence scores
  let potentialMatches = [];
  
  // Check for matches in our database based on filename
  for (const wasteItem of wasteDatabase) {
    // Check if filename contains any of the match keywords
    for (const matchTerm of wasteItem.imageMatches || []) {
      if (filename.includes(matchTerm.toLowerCase())) {
        // Calculate a mock confidence score (would be from AI model in real implementation)
        // Add some randomness to simulate AI confidence variation
        const baseConfidence = 0.7;
        const randomVariation = Math.random() * 0.3;
        const confidenceScore = baseConfidence + randomVariation;
        
        potentialMatches.push({
          wasteItem,
          confidenceScore: confidenceScore > 0.99 ? 0.99 : confidenceScore
        });
        
        // Once we find a match for this waste item, move to the next one
        break;
      }
    }
  }
  
  // If no matches were found based on filename, select a random waste type
  // In a real app, the AI would always attempt to identify the waste
  if (potentialMatches.length === 0) {
    const randomWaste = wasteDatabase[Math.floor(Math.random() * wasteDatabase.length)];
    potentialMatches.push({
      wasteItem: randomWaste,
      confidenceScore: 0.5 + (Math.random() * 0.3) // Lower confidence for random matches
    });
  }
  
  // Sort by confidence score, highest first
  potentialMatches.sort((a, b) => b.confidenceScore - a.confidenceScore);
  
  // Return the best match
  const bestMatch = potentialMatches[0];
  
  return {
    wasteType: bestMatch.wasteItem.type,
    category: bestMatch.wasteItem.category,
    examples: bestMatch.wasteItem.examples,
    recyclingInstructions: bestMatch.wasteItem.instructions,
    environmentalImpact: bestMatch.wasteItem.impact,
    recyclable: bestMatch.wasteItem.recyclable || false,
    tips: bestMatch.wasteItem.tips,
    confidenceScore: bestMatch.confidenceScore
  };
};

const ImageUploader = () => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [recyclingInfo, setRecyclingInfo] = useState<{
    wasteType: string;
    category: string;
    examples: string;
    recyclingInstructions: string;
    environmentalImpact: string;
    recyclable: boolean;
    tips: string;
    confidenceScore: number;
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
      
      const confidenceLevel = analysisResult.confidenceScore > 0.8 ? "high" : 
                             analysisResult.confidenceScore > 0.6 ? "medium" : "low";
      
      toast({
        title: "Analysis complete!",
        description: `Identified as: ${analysisResult.wasteType} (${confidenceLevel} confidence)`,
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
                  <span className="text-xs text-gray-500">Try to include the waste type in the filename for better analysis</span>
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
            
            <Alert className={`${recyclingInfo.recyclable ? 'bg-eco-green-light border-eco-green' : 'bg-amber-50 border-amber-300'}`}>
              <AlertTitle className={`${recyclingInfo.recyclable ? 'text-eco-green' : 'text-amber-700'} font-semibold flex items-center gap-2`}>
                <span>Waste Type: {recyclingInfo.wasteType}</span>
                <span className="text-xs font-normal px-2 py-1 bg-gray-100 rounded-full">
                  {Math.round(recyclingInfo.confidenceScore * 100)}% confidence
                </span>
              </AlertTitle>
              <AlertDescription className="text-gray-700">
                <div className="mt-2">
                  <h4 className="font-medium flex items-center gap-1">
                    <Info className="h-4 w-4" /> Category:
                  </h4>
                  <p className="mt-1">{recyclingInfo.category}</p>
                </div>
                
                <div className="mt-2">
                  <h4 className="font-medium flex items-center gap-1">
                    <Info className="h-4 w-4" /> Examples:
                  </h4>
                  <p className="mt-1">{recyclingInfo.examples}</p>
                </div>
                
                <div className="mt-2">
                  <h4 className="font-medium flex items-center gap-1">
                    <Recycle className="h-4 w-4" /> How to Recycle:
                  </h4>
                  <p className="mt-1">{recyclingInfo.recyclingInstructions}</p>
                </div>
                
                <div className="mt-2">
                  <h4 className="font-medium flex items-center gap-1">
                    <Leaf className="h-4 w-4" /> Environmental Impact:
                  </h4>
                  <p className="mt-1">{recyclingInfo.environmentalImpact}</p>
                </div>
                
                <div className="mt-2">
                  <h4 className="font-medium flex items-center gap-1">
                    <Info className="h-4 w-4" /> Pro Tips:
                  </h4>
                  <p className="mt-1">{recyclingInfo.tips}</p>
                </div>
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
