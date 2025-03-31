
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
  features?: string[];
  onToggle: () => void;
  className?: string;
}

export function IntegrationCard({
  name,
  logo,
  description,
  connected,
  category,
  features,
  onToggle,
  className,
}: IntegrationCardProps) {
  return (
    <Card className={cn("overflow-hidden border-gray-700/50 bg-black/60 backdrop-blur-sm hover-scale transition-all duration-300", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded overflow-hidden bg-black border border-gray-700/50 flex items-center justify-center">
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
            <CardTitle className="text-base font-semibold">{name}</CardTitle>
            <Badge variant="outline" className="mt-1 text-xs bg-black/40 border-gray-700/50">{category}</Badge>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Switch id={`integration-${name}`} checked={connected} onCheckedChange={onToggle} />
          <Label htmlFor={`integration-${name}`} className="sr-only">
            {connected ? "Disconnect" : "Connect"} {name}
          </Label>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-400">{description}</p>
        
        {features && features.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {features.map((feature, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="text-xs bg-black/40 border-gray-700/50"
              >
                {feature}
              </Badge>
            ))}
          </div>
        )}
        
        <div className="mt-4">
          <span className={cn(
            "text-xs font-medium rounded-full px-2.5 py-0.5",
            connected 
              ? "bg-green-900/20 text-green-400 border border-green-700/30" 
              : "bg-gray-800 text-gray-400 border border-gray-700/30"
          )}>
            {connected ? "Connected" : "Disconnected"}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
