import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Shield, LogOut, LayoutDashboard, User, BarChart3, 
  AlertTriangle, Clock, CheckCircle, ChevronRight,
  TrendingUp, MapPin
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useIssues } from '@/contexts/IssueContext';
import { locationLabels, incidentTypeLabels, mockWeeklyReport } from '@/lib/mockData';
import { format, formatDistanceToNow } from 'date-fns';

type Tab = 'dashboard' | 'profile' | 'analytics';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { admin, logout, isAuthenticated } = useAuth();
  const { issues } = useIssues();
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');

  // Redirect if not authenticated
  if (!isAuthenticated || !admin) {
    navigate('/admin/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Sort issues by priority
  const sortedIssues = [...issues].sort((a, b) => {
    const priorityOrder = { high: 0, moderate: 1, low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  const highCount = issues.filter(i => i.priority === 'high').length;
  const moderateCount = issues.filter(i => i.priority === 'moderate').length;
  const pendingCount = issues.filter(i => i.status === 'pending').length;
  const resolvedCount = issues.filter(i => i.status === 'resolved').length;

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-sidebar border-r border-sidebar-border p-4 hidden lg:block">
        <div className="flex items-center gap-3 mb-8 px-2">
          <Shield className="h-8 w-8 text-primary" />
          <span className="text-lg font-bold text-sidebar-foreground">Sentinel Campus</span>
        </div>

        <nav className="space-y-1">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'dashboard' 
                ? 'bg-sidebar-accent text-sidebar-accent-foreground' 
                : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50'
            }`}
          >
            <LayoutDashboard className="h-5 w-5" />
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'profile' 
                ? 'bg-sidebar-accent text-sidebar-accent-foreground' 
                : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50'
            }`}
          >
            <User className="h-5 w-5" />
            Profile
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'analytics' 
                ? 'bg-sidebar-accent text-sidebar-accent-foreground' 
                : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50'
            }`}
          >
            <BarChart3 className="h-5 w-5" />
            Analytics
          </button>
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-sidebar-foreground/70 hover:text-destructive"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5 mr-3" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 min-h-screen">
        {/* Mobile Header */}
        <header className="lg:hidden sticky top-0 z-40 bg-card/80 backdrop-blur-sm border-b border-border p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              <span className="font-semibold">Sentinel Campus</span>
            </div>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Mobile Nav */}
          <div className="flex gap-2 mt-4">
            <Button 
              variant={activeTab === 'dashboard' ? 'default' : 'secondary'}
              size="sm"
              onClick={() => setActiveTab('dashboard')}
            >
              Dashboard
            </Button>
            <Button 
              variant={activeTab === 'profile' ? 'default' : 'secondary'}
              size="sm"
              onClick={() => setActiveTab('profile')}
            >
              Profile
            </Button>
            <Button 
              variant={activeTab === 'analytics' ? 'default' : 'secondary'}
              size="sm"
              onClick={() => setActiveTab('analytics')}
            >
              Analytics
            </Button>
          </div>
        </header>

        <div className="p-6">
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
                <p className="text-muted-foreground">Welcome back, {admin.name}</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="border-destructive/20 bg-destructive/5">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">High Priority</p>
                        <p className="text-3xl font-bold text-destructive">{highCount}</p>
                      </div>
                      <AlertTriangle className="h-8 w-8 text-destructive/50" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-warning/20 bg-warning/5">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Moderate</p>
                        <p className="text-3xl font-bold text-warning">{moderateCount}</p>
                      </div>
                      <Clock className="h-8 w-8 text-warning/50" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-warning/20 bg-warning/5">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Pending</p>
                        <p className="text-3xl font-bold text-warning">{pendingCount}</p>
                      </div>
                      <Clock className="h-8 w-8 text-warning/50" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-success/20 bg-success/5">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Resolved</p>
                        <p className="text-3xl font-bold text-success">{resolvedCount}</p>
                      </div>
                      <CheckCircle className="h-8 w-8 text-success/50" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Issues List */}
              <Card>
                <CardHeader>
                  <CardTitle>All Issues</CardTitle>
                  <CardDescription>Sorted by priority (High → Low)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {sortedIssues.map((issue) => (
                      <div
                        key={issue.id}
                        onClick={() => navigate(`/admin/issue/${issue.id}`)}
                        className="flex items-center gap-4 p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-card cursor-pointer transition-all group"
                      >
                        {/* Priority indicator */}
                        <div className={`w-2 h-12 rounded-full ${
                          issue.priority === 'high' ? 'bg-destructive' :
                          issue.priority === 'moderate' ? 'bg-warning' : 'bg-success'
                        }`} />

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant={issue.priority}>
                              {issue.priority.charAt(0).toUpperCase() + issue.priority.slice(1)}
                            </Badge>
                            <Badge variant={issue.status === 'pending' ? 'pending' : issue.status === 'in_progress' ? 'in_progress' : 'resolved'}>
                              {issue.status === 'in_progress' ? 'In Progress' : issue.status.charAt(0).toUpperCase() + issue.status.slice(1)}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {issue.severityScore}/10
                            </span>
                          </div>
                          <p className="text-sm text-foreground font-medium truncate">
                            {issue.summary}
                          </p>
                          <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {locationLabels[issue.location]}
                            </span>
                            <span>
                              {formatDistanceToNow(issue.createdAt, { addSuffix: true })}
                            </span>
                          </div>
                        </div>

                        <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Profile</h1>
                <p className="text-muted-foreground">Your administrator profile</p>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                {/* Profile Info */}
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-10 w-10 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-foreground">{admin.name}</h3>
                        <p className="text-muted-foreground capitalize">{admin.role}</p>
                      </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-border">
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="text-foreground">{admin.email}</p>
                      </div>
                      {admin.phone && (
                        <div>
                          <p className="text-sm text-muted-foreground">Phone</p>
                          <p className="text-foreground">{admin.phone}</p>
                        </div>
                      )}
                      <div>
                        <p className="text-sm text-muted-foreground">Role</p>
                        <Badge variant="default" className="mt-1 capitalize">{admin.role}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                        <p className="text-sm text-muted-foreground">Issues Handled</p>
                        <p className="text-3xl font-bold text-primary">{admin.issuesHandled}</p>
                      </div>
                      <div className="p-4 rounded-lg bg-success/5 border border-success/20">
                        <p className="text-sm text-muted-foreground">Resolution Rate</p>
                        <p className="text-3xl font-bold text-success">{admin.resolutionRate}%</p>
                      </div>
                    </div>
                    
                    <div className="p-4 rounded-lg bg-card border border-border">
                      <p className="text-sm text-muted-foreground mb-1">Avg. Response Time</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-foreground">{admin.averageResponseTime}</span>
                        <span className="text-muted-foreground">minutes</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Analytics & Reports</h1>
                <p className="text-muted-foreground">AI-generated weekly insights</p>
              </div>

              {/* Weekly Summary */}
              <Card className="border-primary/20">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    <CardTitle>Weekly Report</CardTitle>
                  </div>
                  <CardDescription>
                    {format(mockWeeklyReport.weekStart, 'MMM d')} - {format(mockWeeklyReport.weekEnd, 'MMM d, yyyy')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Priority Distribution */}
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-3">Priority Distribution</h4>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-center">
                        <p className="text-2xl font-bold text-destructive">{mockWeeklyReport.highPriority}</p>
                        <p className="text-xs text-muted-foreground">High</p>
                      </div>
                      <div className="p-3 rounded-lg bg-warning/10 border border-warning/20 text-center">
                        <p className="text-2xl font-bold text-warning">{mockWeeklyReport.moderatePriority}</p>
                        <p className="text-xs text-muted-foreground">Moderate</p>
                      </div>
                      <div className="p-3 rounded-lg bg-success/10 border border-success/20 text-center">
                        <p className="text-2xl font-bold text-success">{mockWeeklyReport.lowPriority}</p>
                        <p className="text-xs text-muted-foreground">Low</p>
                      </div>
                    </div>
                  </div>

                  {/* Top Locations */}
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-3">Top Incident Locations</h4>
                    <div className="space-y-2">
                      {mockWeeklyReport.topLocations.map((loc, i) => (
                        <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-card border border-border">
                          <span className="text-foreground">{loc.location}</span>
                          <Badge variant="secondary">{loc.count} incidents</Badge>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* AI Insights */}
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-3">AI Insights</h4>
                    <div className="space-y-3">
                      {mockWeeklyReport.aiInsights.map((insight, i) => (
                        <div key={i} className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                          <p className="text-sm text-foreground">{insight}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
