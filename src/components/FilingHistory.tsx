import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { History, Download, Eye, Calendar } from "lucide-react";

interface FilingRecord {
  id: string;
  date: string;
  income: number;
  tax: number;
  status: "completed" | "pending" | "draft";
  filingYear: string;
}

const FilingHistory = () => {
  const [records] = useState<FilingRecord[]>([
    {
      id: "1",
      date: "2024-03-15",
      income: 1200000,
      tax: 78000,
      status: "completed",
      filingYear: "FY 2023-24"
    },
    {
      id: "2", 
      date: "2023-03-20",
      income: 1100000,
      tax: 65000,
      status: "completed",
      filingYear: "FY 2022-23"
    },
    {
      id: "3",
      date: "2024-12-01",
      income: 1350000,
      tax: 95000,
      status: "draft",
      filingYear: "FY 2024-25"
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "pending": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "draft": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      default: return "bg-muted";
    }
  };

  return (
    <Card className="ferrari-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-2xl font-orbitron">
          <History className="h-8 w-8 text-accent" />
          Filing History
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {records.map((record) => (
            <div key={record.id} className="bg-muted/30 p-4 rounded-lg border border-border/50 hover:border-primary/30 transition-colors">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="font-orbitron font-bold text-lg">{record.filingYear}</h3>
                    <Badge className={getStatusColor(record.status)}>
                      {record.status.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Income</p>
                      <p className="font-semibold">₹{record.income.toLocaleString('en-IN')}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Tax Paid</p>
                      <p className="font-semibold text-primary">₹{record.tax.toLocaleString('en-IN')}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Date</p>
                      <p className="font-semibold flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(record.date).toLocaleDateString('en-IN')}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="racing-hover">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="racing-hover">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FilingHistory;