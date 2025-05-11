
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const ImageUploader = () => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      
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
      setImage(null);
      setPreview(null);
      
      toast({
        title: "Upload successful!",
        description: "You've earned 10 eco-coins for your contribution.",
      });
    }, 2000);
  };

  return (
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
            disabled={!image || uploading}
          >
            {uploading ? "Uploading..." : "Submit Waste Report"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ImageUploader;
