import { Shield, AlertTriangle, Clock, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background gradient effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        
        {/* Navigation */}
        <nav className="relative z-10 container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Shield className="h-10 w-10 text-primary" />
                <div className="absolute inset-0 animate-pulse-ring rounded-full border-2 border-primary/50" />
              </div>
              <span className="text-2xl font-bold text-foreground">Sentinel Campus</span>
            </div>
            <Link to="/admin/login">
              <Button variant="glass">Admin Login</Button>
            </Link>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-6 pt-16 pb-24">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="text-sm text-muted-foreground">AI-Powered Safety Monitoring Active</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="text-foreground">Your Safety,</span>
              <br />
              <span className="text-gradient">Our Priority</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Report safety concerns anonymously and let our AI-powered system ensure rapid response. 
              No account needed — just describe what you see.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/report">
                <Button variant="hero" size="xl" className="w-full sm:w-auto">
                  <AlertTriangle className="h-5 w-5" />
                  Report an Issue
                </Button>
              </Link>
              <Link to="/admin/login">
                <Button variant="outline" size="xl" className="w-full sm:w-auto">
                  Admin Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-card/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              A seamless flow from incident report to resolution, powered by artificial intelligence.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Step 1 */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <AlertTriangle className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Report Anonymously</h3>
                <p className="text-muted-foreground">
                  Submit safety concerns without creating an account. Your identity remains protected.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-b from-warning/20 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative p-8 rounded-2xl bg-card border border-border hover:border-warning/50 transition-all">
                <div className="w-14 h-14 rounded-xl bg-warning/10 flex items-center justify-center mb-6">
                  <Clock className="h-7 w-7 text-warning" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">AI Analysis</h3>
                <p className="text-muted-foreground">
                  Our AI instantly analyzes reports, assigns priority levels, and suggests actions.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-b from-success/20 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative p-8 rounded-2xl bg-card border border-border hover:border-success/50 transition-all">
                <div className="w-14 h-14 rounded-xl bg-success/10 flex items-center justify-center mb-6">
                  <CheckCircle className="h-7 w-7 text-success" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Rapid Response</h3>
                <p className="text-muted-foreground">
                  Security teams act quickly with AI-powered insights to resolve issues efficiently.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-muted-foreground text-sm">Active Monitoring</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-success mb-2">&lt;5min</div>
              <div className="text-muted-foreground text-sm">Avg Response Time</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-warning mb-2">100%</div>
              <div className="text-muted-foreground text-sm">Anonymous Reporting</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-foreground mb-2">AI</div>
              <div className="text-muted-foreground text-sm">Powered Analysis</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <span className="text-sm text-muted-foreground">
                Sentinel Campus — AI-Powered Campus Safety
              </span>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2024 Sentinel Campus. Protecting what matters.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
