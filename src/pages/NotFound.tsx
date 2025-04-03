
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Construction, AlertCircle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="text-center p-8 bg-gray-950 rounded-lg shadow-lg border border-gray-800 max-w-md">
        <div className="mb-6 flex justify-center">
          <div className="bg-red-900/30 p-4 rounded-full">
            <AlertCircle className="h-12 w-12 text-red-500" />
          </div>
        </div>
        <h1 className="text-5xl font-bold mb-4 text-construction-400">404</h1>
        <p className="text-xl text-gray-300 mb-2">Page Not Found</p>
        <p className="text-gray-400 mb-6">
          The page "{location.pathname}" doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <Button asChild className="bg-construction-600 hover:bg-construction-700">
            <Link to="/">Return to Dashboard</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/settings">Go to Settings</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
