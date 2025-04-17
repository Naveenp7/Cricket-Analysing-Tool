
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Activity, BarChart3, LineChart, TrendingUp, Settings, User, BarChartHorizontal } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex items-center gap-2">
          <BarChartHorizontal className="h-6 w-6 text-cricket-green" />
          <span className="hidden font-medium sm:inline-block text-lg">
            Cricket<span className="text-cricket-green">Insight</span>
          </span>
        </div>
        <Separator orientation="vertical" className="h-6 mx-2" />
        <nav className="flex items-center space-x-4 lg:space-x-6 mx-6">
          <a
            href="/"
            className="text-sm font-medium transition-colors hover:text-cricket-green flex items-center gap-1"
          >
            <Activity className="h-4 w-4" />
            <span>Dashboard</span>
          </a>
          <a
            href="/stats"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-cricket-green flex items-center gap-1"
          >
            <BarChart3 className="h-4 w-4" />
            <span>Statistics</span>
          </a>
          <a
            href="/prediction"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-cricket-green flex items-center gap-1"
          >
            <TrendingUp className="h-4 w-4" />
            <span>Predictions</span>
          </a>
          <a
            href="/analysis"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-cricket-green flex items-center gap-1"
          >
            <LineChart className="h-4 w-4" />
            <span>Analysis</span>
          </a>
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" /> Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" /> Settings
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
