import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, Download, TrendingUp, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AnimatedSportsCar from "@/components/AnimatedFerrariCar";

interface TaxCalculation {
  grossIncome: number;
  taxableIncome: number;
  totalTax: number;
  netIncome: number;
  effectiveRate: number;
  breakdown: Array<{
    slab: string;
    rate: number;
    amount: number;
  }>;
}

interface FormData {
  annualIncome: string;
  age: string;
  exemptions: string;
  investments: string;
  filingStatus: string;
}

const TaxCalculator = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    annualIncome: "",
    age: "",
    exemptions: "",
    investments: "",
    filingStatus: "individual"
  });
  
  const [calculation, setCalculation] = useState<TaxCalculation | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  // Indian Tax Slabs for FY 2024-25 (New Tax Regime)
  const calculateTax = useCallback((income: number, age: number): TaxCalculation => {
    const grossIncome = income;
    
    // Standard deduction of ₹75,000 in New Tax Regime (Budget 2024)
    const standardDeduction = 75000;
    let taxableIncome = Math.max(0, income - standardDeduction);
    
    // New Tax Regime Slabs (FY 2024-25) - Updated rates
    const slabs = [
      { min: 0, max: 300000, rate: 0 },
      { min: 300000, max: 700000, rate: 5 },
      { min: 700000, max: 1000000, rate: 10 },
      { min: 1000000, max: 1200000, rate: 15 },
      { min: 1200000, max: 1500000, rate: 20 },
      { min: 1500000, max: Infinity, rate: 30 }
    ];
    
    let totalTax = 0;
    const breakdown: Array<{ slab: string; rate: number; amount: number }> = [];
    
    // Add standard deduction info
    if (standardDeduction > 0 && income > standardDeduction) {
      breakdown.push({
        slab: "Standard Deduction",
        rate: 0,
        amount: -standardDeduction
      });
    }
    
    // Calculate tax for each slab
    for (const slab of slabs) {
      if (taxableIncome > slab.min) {
        const taxableAmount = Math.min(taxableIncome, slab.max) - slab.min;
        const taxAmount = (taxableAmount * slab.rate) / 100;
        totalTax += taxAmount;
        
        if (taxAmount > 0) {
          breakdown.push({
            slab: slab.max === Infinity ? `₹${slab.min.toLocaleString('en-IN')}+` : `₹${slab.min.toLocaleString('en-IN')} - ₹${slab.max.toLocaleString('en-IN')}`,
            rate: slab.rate,
            amount: taxAmount
          });
        }
      }
    }
    
    // Calculate rebate under section 87A (for income up to ₹7 lakh)
    let rebate = 0;
    if (taxableIncome <= 700000) {
      rebate = Math.min(totalTax, 25000);
      totalTax = Math.max(0, totalTax - rebate);
      
      if (rebate > 0) {
        breakdown.push({
          slab: "Rebate u/s 87A (up to ₹25,000)",
          rate: 0,
          amount: -rebate
        });
      }
    }
    
    // Add 4% Health and Education Cess on total tax (after rebate)
    const cess = totalTax * 0.04;
    totalTax += cess;
    
    if (cess > 0) {
      breakdown.push({
        slab: "Health & Education Cess (4%)",
        rate: 4,
        amount: cess
      });
    }
    
    return {
      grossIncome,
      taxableIncome: taxableIncome + standardDeduction,
      totalTax: Math.round(totalTax),
      netIncome: Math.round(grossIncome - totalTax),
      effectiveRate: grossIncome > 0 ? (totalTax / grossIncome) * 100 : 0,
      breakdown
    };
  }, []);

  const handleCalculate = useCallback(async () => {
    const income = parseFloat(formData.annualIncome);
    const age = parseInt(formData.age);
    const exemptions = parseFloat(formData.exemptions) || 0;
    const investments = parseFloat(formData.investments) || 0;

    if (!income || !age) {
      toast({
        title: "Invalid Input",
        description: "Please enter valid annual income and age.",
        variant: "destructive"
      });
      return;
    }

    setIsCalculating(true);
    
    // Simulate calculation delay for smooth animation
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const adjustedIncome = Math.max(0, income - exemptions - investments);
    const result = calculateTax(adjustedIncome, age);
    
    setCalculation(result);
    setIsCalculating(false);
    
    toast({
      title: "Calculation Complete",
      description: "Your tax calculation has been processed successfully.",
    });
  }, [formData, calculateTax, toast]);

  const handleDownloadReport = () => {
    if (!calculation) return;
    
    toast({
      title: "Report Generated",
      description: "Your self-assessment report is being prepared for download.",
    });
    
    // Here you would implement actual PDF generation
    console.log("Generating PDF report with calculation:", calculation);
  };

  return (
    <div className="ferrari-bg min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center items-center mb-4">
            <AnimatedSportsCar className="h-20 md:h-32 scale-75" />
          </div>
          <h1 className="text-4xl md:text-6xl font-orbitron font-black text-transparent bg-gradient-to-r from-primary via-accent to-ferrari-silver bg-clip-text racing-pulse">
            TAX CALCULATOR
          </h1>
          <p className="text-xl text-muted-foreground font-rajdhani">
            Premium Income Tax Computing with Racing Performance
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card className="ferrari-card racing-hover">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl font-orbitron">
                <Calculator className="h-8 w-8 text-primary" />
                Tax Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="income" className="font-rajdhani font-semibold">Annual Income (₹)</Label>
                  <Input
                    id="income"
                    type="number"
                    placeholder="e.g. 500000"
                    value={formData.annualIncome}
                    onChange={(e) => setFormData(prev => ({ ...prev, annualIncome: e.target.value }))}
                    className="bg-muted/50 border-border/50 focus:border-primary transition-colors"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="font-rajdhani font-semibold">Age Category</Label>
                  <Select value={formData.age} onValueChange={(value) => setFormData(prev => ({ ...prev, age: value }))}>
                    <SelectTrigger className="bg-muted/50 border-border/50">
                      <SelectValue placeholder="Select age category" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border border-border z-50">
                      <SelectItem value="25">Below 60 years</SelectItem>
                      <SelectItem value="65">60–80 years</SelectItem>
                      <SelectItem value="85">Above 80 years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="exemptions" className="font-rajdhani font-semibold">Exemptions (₹)</Label>
                  <Input
                    id="exemptions"
                    type="number"
                    placeholder="e.g. 50000 (HRA, LTA, etc.)"
                    value={formData.exemptions}
                    onChange={(e) => setFormData(prev => ({ ...prev, exemptions: e.target.value }))}
                    className="bg-muted/50 border-border/50 focus:border-primary transition-colors"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="investments" className="font-rajdhani font-semibold">Investments/Deductions (₹)</Label>
                  <Input
                    id="investments"
                    type="number"
                    placeholder="e.g. 150000 (80C, 80D, etc.)"
                    value={formData.investments}
                    onChange={(e) => setFormData(prev => ({ ...prev, investments: e.target.value }))}
                    className="bg-muted/50 border-border/50 focus:border-primary transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="font-rajdhani font-semibold">Filing Status</Label>
                <Select value={formData.filingStatus} onValueChange={(value) => setFormData(prev => ({ ...prev, filingStatus: value }))}>
                  <SelectTrigger className="bg-muted/50 border-border/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-background border border-border z-50">
                    <SelectItem value="individual">Individual</SelectItem>
                    <SelectItem value="huf">HUF (Hindu Undivided Family)</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                onClick={handleCalculate} 
                disabled={isCalculating}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-orbitron font-bold text-xl py-8 rounded-xl border-2 border-red-500/50 hover:border-red-400/50 shadow-lg hover:shadow-red-500/25 transform hover:scale-[1.02] transition-all duration-300"
              >
                {isCalculating ? (
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                    <span className="text-lg">CALCULATING...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <TrendingUp className="h-6 w-6" />
                    <span className="text-lg racing-pulse">CALCULATE TAX</span>
                    <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                  </div>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Results Display */}
          {calculation && (
            <Card className="ferrari-card racing-hover">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl font-orbitron">
                  <Shield className="h-8 w-8 text-accent" />
                  Tax Calculation Results
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-primary/10 to-accent/10 p-4 rounded-lg border border-primary/20">
                    <p className="text-sm text-muted-foreground font-rajdhani">Total Tax</p>
                    <p className="text-2xl font-orbitron font-bold text-primary">
                      ₹{calculation.totalTax.toLocaleString('en-IN')}
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-accent/10 to-ferrari-silver/10 p-4 rounded-lg border border-accent/20">
                    <p className="text-sm text-muted-foreground font-rajdhani">Net Income</p>
                    <p className="text-2xl font-orbitron font-bold text-accent">
                      ₹{calculation.netIncome.toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-orbitron font-bold text-lg">Tax Breakdown</h3>
                  {calculation.breakdown.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-muted/30 rounded-lg border border-border/50">
                      <span className="font-rajdhani">{item.slab}</span>
                      <div className="text-right">
                        <span className="text-sm text-muted-foreground">{item.rate}%</span>
                        <p className="font-semibold">₹{item.amount.toLocaleString('en-IN')}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-border/50">
                  <div>
                    <p className="text-sm text-muted-foreground">Effective Tax Rate</p>
                    <p className="text-xl font-orbitron font-bold text-primary">
                      {calculation.effectiveRate.toFixed(2)}%
                    </p>
                  </div>
                  
                  <Button 
                    onClick={handleDownloadReport}
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-rajdhani font-semibold racing-hover"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Footer */}
        <div className="text-center py-8 border-t border-border/20">
          <p className="text-muted-foreground font-rajdhani">
            © 2025 SIMATS Engineering Academic Project - Advanced Web Application Development @zzzlahs
          </p>
        </div>
      </div>
    </div>
  );
};

export default TaxCalculator;