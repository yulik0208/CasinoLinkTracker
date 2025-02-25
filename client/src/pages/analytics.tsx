import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Link } from "wouter";
import { ArrowLeft, Users, MousePointer, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Analytics() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["/api/stats"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse">Loading analytics...</div>
      </div>
    );
  }

  const bounceRate = stats?.visits.total 
    ? ((stats.visits.total - stats.visits.clicked) / stats.visits.total * 100).toFixed(1)
    : "0";

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <Link href="/">
          <Button variant="ghost" className="mb-8 gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </Link>

        <h1 className="text-4xl font-bold mb-8">Analytics Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <Users className="w-8 h-8 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Visits</p>
                <p className="text-2xl font-bold">{stats?.visits.total || 0}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <MousePointer className="w-8 h-8 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Clicks</p>
                <p className="text-2xl font-bold">{stats?.visits.clicked || 0}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <TrendingUp className="w-8 h-8 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Bounce Rate</p>
                <p className="text-2xl font-bold">{bounceRate}%</p>
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Link Performance</h2>
          <div className="space-y-4">
            {Object.entries(stats?.links || {}).map(([linkId, clicks]) => (
              <div key={linkId}>
                <div className="flex justify-between mb-2">
                  <span className="capitalize">{linkId}</span>
                  <span>{clicks} clicks</span>
                </div>
                <Progress value={clicks / (stats?.visits.total || 1) * 100} />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
