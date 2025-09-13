import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TaxCalculator from "@/components/TaxCalculator";
import FilingHistory from "@/components/FilingHistory";
import { Calculator, History, Info } from "lucide-react";
import AnimatedSportsCar from "@/components/AnimatedFerrariCar";
const Index = () => {
  const [activeTab, setActiveTab] = useState("home");
  return <div className="min-h-screen">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="ferrari-bg">
          <div className="max-w-7xl mx-auto p-6">
            <TabsList className="grid w-full max-w-lg mx-auto grid-cols-3 mb-8 bg-card/50 backdrop-blur-sm">
              <TabsTrigger value="home" className="font-rajdhani font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Info className="h-4 w-4 mr-2" />
                Home
              </TabsTrigger>
              <TabsTrigger value="calculator" className="font-rajdhani font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Calculator className="h-4 w-4 mr-2" />
                Calculator
              </TabsTrigger>
              <TabsTrigger value="history" className="font-rajdhani font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <History className="h-4 w-4 mr-2" />
                History
              </TabsTrigger>
            </TabsList>
          </div>
        </div>
        
        <TabsContent value="home" className="mt-0">
          <div className="ferrari-bg min-h-screen">
            {/* Hero Section with Ferrari Racing Car */}
            <div className="relative overflow-hidden py-20">
              <div className="max-w-7xl mx-auto px-6 text-center">
                <h1 className="text-6xl md:text-8xl font-orbitron font-black text-transparent bg-gradient-to-r from-primary via-accent to-ferrari-silver bg-clip-text racing-pulse mb-8">
                  INCOME TAX CALCULATOR
                </h1>
                <p className="text-2xl md:text-3xl text-muted-foreground font-rajdhani mb-12 max-w-4xl mx-auto">
                  Professional Tax Computing with Racing Performance
                </p>
                
                {/* Racing Style Calculator Button */}
                <div className="mb-16">
                  <button onClick={() => setActiveTab("calculator")} className="group relative inline-flex items-center gap-4 bg-gradient-to-r from-primary via-accent to-primary hover:from-accent hover:via-primary hover:to-accent text-white font-orbitron font-bold text-xl px-12 py-6 rounded-full border-2 border-primary/50 hover:border-accent/50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-primary/50">
                    <div className="flex items-center gap-3">
                      <Calculator className="h-8 w-8 group-hover:rotate-12 transition-transform duration-300" />
                      <span className="racing-pulse">START CALCULATE🏎️💨</span>
                      
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  </button>
                </div>
                
                {/* Animated Sports Car */}
                <div className="relative mb-16">
                  <AnimatedSportsCar className="w-full max-w-4xl mx-auto" />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-accent/20 pointer-events-none"></div>
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className="max-w-7xl mx-auto px-6 pb-20">
              <div className="ferrari-card p-8 md:p-12">
                <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-primary mb-8 text-center">
                  About This Project
                </h2>
                
                <div className="text-lg text-muted-foreground font-rajdhani leading-relaxed space-y-6">
                  <p>
                    The Income Tax Calculator Web Application is designed to simplify tax filing by providing accurate, fast, 
                    and user-friendly calculations. Users can enter their income, age, exemptions, and investments, and the 
                    system instantly applies tax slabs and deductions to generate liability reports. It also allows users to 
                    download self-assessment forms and maintain a filing history.
                  </p>
                  
                  <p className="text-xl font-semibold text-foreground">
                    This project is developed based on two models:
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-8 mt-8">
                    <div className="bg-card/40 backdrop-blur-sm border border-primary/20 rounded-lg p-6">
                      <h3 className="text-2xl font-orbitron font-bold text-primary mb-4">Model 1</h3>
                      <p className="text-accent font-semibold mb-2">Lead Developer: Aravindan VG</p>
                      <p>Focuses on income slab entry, standard deductions, and automatic tax calculation.</p>
                    </div>
                    
                    <div className="bg-card/40 backdrop-blur-sm border border-accent/20 rounded-lg p-6">
                      <h3 className="text-2xl font-orbitron font-bold text-accent mb-4">Model 2</h3>
                      <p className="text-primary font-semibold mb-2">Developer: Parjapath Jogender</p>
                      <p>Extends the system into a tax payment portal with filing history and downloadable report generation.</p>
                    </div>
                  </div>
                  
                  <div className="text-center mt-12 p-6 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border border-primary/30">
                    <p className="text-xl font-semibold text-primary">
                      SIMATS Engineering Academic Project
                    </p>
                    <p className="text-muted-foreground mt-2">ITA0201 - WEB TECHNOLOGY FOR SERVELT</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Footer */}
            <div className="text-center py-8 border-t border-border/20">
              <p className="text-muted-foreground font-rajdhani">© 2025 SIMATS Engineering Project by Aravindan VG  @zzzlahs</p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="calculator" className="mt-0">
          <TaxCalculator />
        </TabsContent>
        
        <TabsContent value="history" className="mt-0">
          <div className="ferrari-bg min-h-screen p-6">
            <div className="max-w-7xl mx-auto space-y-8">
              <div className="text-center space-y-4">
                <h1 className="text-5xl md:text-7xl font-orbitron font-black text-transparent bg-gradient-to-r from-primary via-accent to-ferrari-silver bg-clip-text racing-pulse">
                  FILING HISTORY
                </h1>
                <p className="text-xl text-muted-foreground font-rajdhani">
                  Track Your Tax Calculations & Filings
                </p>
              </div>
              
              <FilingHistory />
              
              {/* Footer */}
              <div className="text-center py-8 border-t border-border/20">
                <p className="text-muted-foreground font-rajdhani">
                  © 2025 SIMATS Engineering Academic Project - Advanced Web Application Development @zzzlahs
                </p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>;
};
export default Index;