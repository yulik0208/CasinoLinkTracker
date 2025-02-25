import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { apiRequest } from "@/lib/queryClient";
import { links } from "@shared/schema";
import { motion } from "framer-motion";
import { PieChart } from "lucide-react";
import { getApiUrl } from "@/lib/constants";

// Import the proper icons
import { SiGooglemarketingplatform, SiGoogle, SiFacebook, SiAmazon, SiEbay } from "react-icons/si";

const iconMap = {
  olx: SiGooglemarketingplatform,
  google: SiGoogle,
  facebook: SiFacebook,
  amazon: SiAmazon,
  ebay: SiEbay,
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
            Welcome to Vegas Portal
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Your gateway to the best online experiences. Choose your destination below.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {links.map((link) => {
            const Icon = iconMap[link.id as keyof typeof iconMap];
            return (
              <motion.div
                key={link.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Card className="p-6 backdrop-blur-sm bg-card/80 border-primary/20">
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleClick(link.id)}
                    className="block"
                  >
                    <div className="flex items-center justify-center mb-4">
                      <Icon className="w-12 h-12 text-primary" />
                    </div>
                    <h2 className="text-xl font-semibold text-center mb-2 capitalize">
                      {link.id}
                    </h2>
                  </a>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link href="/analytics">
            <Button variant="outline" className="gap-2">
              <PieChart className="w-4 h-4" />
              View Analytics
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}