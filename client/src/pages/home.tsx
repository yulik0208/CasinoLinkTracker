import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { apiRequest } from "@/lib/queryClient";
import { links } from "@shared/schema";
import { motion } from "framer-motion";
import { PieChart } from "lucide-react";
import { getApiUrl } from "@/lib/constants";

// Import gaming-themed icons
import { 
  SiPlaystation, 
  SiNintendo,   
  SiRoblox,     
  SiAtari,      
  SiSega,      
  SiKongregate  
} from "react-icons/si";

const iconMap = {
  pragmatic: SiPlaystation,
  plinko: SiNintendo,
  candyrush: SiRoblox,
  jocker: SiAtari,
  sweetbonanza: SiSega,
  supremehot: SiKongregate
};

export default function Home() {
  useEffect(() => {
    apiRequest("POST", getApiUrl("/visits"));
  }, []);

  const handleClick = async (linkId: string) => {
    try {
      await apiRequest("POST", getApiUrl("/clicks"), { visitId: 1, linkId });
    } catch (error) {
      console.error("Failed to record click:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/90 relative overflow-hidden">
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1511512578047-dfb367046420')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-yellow-500 to-yellow-200 bg-clip-text text-transparent mb-4">
            Обирай найкращий оффер
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Your gateway to the best online casino experiences. Choose your game below.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {Object.entries(iconMap).map(([id, Icon]) => (
            <motion.div
              key={id}
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Card className="p-6 backdrop-blur-sm bg-card/80 border-primary/20 hover:bg-primary/5 transition-colors">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick(id);
                  }}
                  className="block"
                >
                  <div className="flex items-center justify-center mb-4">
                    <Icon className="w-16 h-16 text-primary animate-pulse" />
                  </div>
                  <h2 className="text-xl font-semibold text-center mb-2 capitalize">
                    {id === 'sweetbonanza' ? 'Sweet Bonanza' :
                     id === 'supremehot' ? 'Supreme Hot' :
                     id.replace(/([A-Z])/g, ' $1').trim()}
                  </h2>
                  <p className="text-center text-muted-foreground">
                    Play Now
                  </p>
                </a>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/analytics">
            <Button variant="outline" className="gap-2 bg-primary/10 hover:bg-primary/20">
              <PieChart className="w-4 h-4" />
              View Analytics
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}