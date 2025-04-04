
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface IntegrationCardProps {
  name: string;
  logo: string;
  description: string;
  connected: boolean;
  category: string;
  onToggle: () => void;
  className?: string;
}

export function IntegrationCard({
  name,
  logo,
  description,
  connected,
  category,
  onToggle,
  className,
}: IntegrationCardProps) {
  return (
    <Card className={cn("overflow-hidden bg-gray-950 border-gray-800 hover:border-gray-700 transition-all", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-md overflow-hidden bg-white dark:bg-white flex items-center justify-center">
            <img 
              src={logo} 
              alt={`${name} logo`} 
              className="w-8 h-8 object-contain"
              onError={(e) => {
                e.currentTarget.src = 'https://via.placeholder.com/40?text=' + name[0];
              }} 
            />
          </div>
          <div>
            <CardTitle className="text-base font-semibold text-white">{name}</CardTitle>
            <Badge variant="outline" className="mt-1 text-xs bg-gray-900/60 text-gray-400 border-gray-700">{category}</Badge>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Switch 
            id={`integration-${name}`} 
            checked={connected} 
            onCheckedChange={onToggle} 
            className={connected ? "data-[state=checked]:bg-cyan-600" : ""}
          />
          <Label htmlFor={`integration-${name}`} className="sr-only">
            {connected ? "Disconnect" : "Connect"} {name}
          </Label>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-400 mb-4">{description}</p>
        <div>
          <span className={cn(
            "text-xs font-medium rounded-full px-2.5 py-1",
            connected 
              ? "bg-cyan-900/20 text-cyan-400 border border-cyan-800/30" 
              : "bg-gray-900 text-gray-400 border border-gray-800"
          )}>
            {connected ? "Connected" : "Disconnected"}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
