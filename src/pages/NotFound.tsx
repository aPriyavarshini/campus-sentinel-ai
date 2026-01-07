import { Link } from "react-router-dom";
import { Shield, AlertTriangle, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-destructive/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/3 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-destructive/10 flex items-center justify-center">
              <AlertTriangle className="h-12 w-12 text-destructive" />
            </div>
            <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center">
              <Shield className="h-5 w-5 text-primary" />
            </div>
          </div>
        </div>

        <h1 className="text-6xl font-bold text-foreground mb-2">404</h1>
        <h2 className="text-xl font-semibold text-foreground mb-4">Page Not Found</h2>
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved. Let's get you back to safety.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/">
            <Button variant="hero" size="lg">
              <Home className="h-4 w-4" />
              Go Home
            </Button>
          </Link>
          <Link to="/report">
            <Button variant="outline" size="lg">
              <AlertTriangle className="h-4 w-4" />
              Report Issue
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
