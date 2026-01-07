import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft, Shield, MapPin, Calendar, Clock, AlertTriangle,
  Brain, Lightbulb, CheckCircle, Loader2, MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { useIssues } from '@/contexts/IssueContext';
import { locationLabels, incidentTypeLabels } from '@/lib/mockData';
import { IssueStatus } from '@/lib/types';
import { format } from 'date-fns';
import { toast } from 'sonner';

export default function IssueDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated } = useAuth();
  const { getIssueById, updateIssueStatus } = useIssues();
  
  const issue = getIssueById(id || '');
  const [status, setStatus] = useState<IssueStatus>(issue?.status || 'pending');
  const [notes, setNotes] = useState(issue?.adminNotes || '');
  const [isSaving, setIsSaving] = useState(false);

  // Redirect if not authenticated
  if (!isAuthenticated) {
    navigate('/admin/login');
    return null;
  }

  if (!issue) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center">
            <AlertTriangle className="h-12 w-12 text-warning mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Issue Not Found</h2>
            <p className="text-muted-foreground mb-4">The issue you're looking for doesn't exist.</p>
            <Button onClick={() => navigate('/admin/dashboard')}>Back to Dashboard</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    updateIssueStatus(issue.id, status, notes);
    setIsSaving(false);
    toast.success('Issue updated successfully');
  };

  const handleAcceptSuggestions = () => {
    setStatus('in_progress');
    setNotes(`AI-suggested actions accepted:\n${issue.suggestedActions.map((a, i) => `${i + 1}. ${a}`).join('\n')}`);
    toast.success('AI suggestions accepted');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-card/80 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/admin/dashboard')}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <h1 className="text-lg font-semibold text-foreground">Issue Details</h1>
              </div>
            </div>
            <Badge variant={issue.priority}>
              {issue.priority.charAt(0).toUpperCase() + issue.priority.slice(1)} Priority
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 max-w-4xl">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* AI Summary */}
            <Card className="border-primary/20">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  <CardTitle>AI Analysis</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-muted-foreground">Severity Score</p>
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${
                        issue.severityScore >= 7 ? 'bg-destructive' :
                        issue.severityScore >= 4 ? 'bg-warning' : 'bg-success'
                      }`} />
                      <span className="text-xl font-bold">{issue.severityScore}/10</span>
                    </div>
                  </div>
                  <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                    <div 
                      className={`h-full transition-all ${
                        issue.severityScore >= 7 ? 'bg-destructive' :
                        issue.severityScore >= 4 ? 'bg-warning' : 'bg-success'
                      }`}
                      style={{ width: `${issue.severityScore * 10}%` }}
                    />
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">AI Summary</p>
                  <p className="text-foreground bg-card p-4 rounded-lg border border-border">
                    {issue.summary}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Suggested Actions */}
            <Card className="border-warning/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-warning" />
                    <CardTitle>Suggested Actions</CardTitle>
                  </div>
                  <Button variant="warning" size="sm" onClick={handleAcceptSuggestions}>
                    Accept All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {issue.suggestedActions.map((action, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-warning/5 border border-warning/20">
                      <div className="w-6 h-6 rounded-full bg-warning/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-warning">{i + 1}</span>
                      </div>
                      <p className="text-sm text-foreground">{action}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Original Report */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-muted-foreground" />
                  <CardTitle>Original Report</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-foreground whitespace-pre-wrap">{issue.description}</p>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Location</p>
                    <p className="text-sm text-foreground">
                      {issue.customLocation || locationLabels[issue.location]}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Incident Date</p>
                    <p className="text-sm text-foreground">
                      {format(issue.dateTime, 'PPP')}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Incident Time</p>
                    <p className="text-sm text-foreground">
                      {format(issue.dateTime, 'p')}
                    </p>
                  </div>
                </div>

                {issue.incidentType && (
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Type</p>
                      <p className="text-sm text-foreground">
                        {incidentTypeLabels[issue.incidentType]}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Reported</p>
                    <p className="text-sm text-foreground">
                      {format(issue.createdAt, 'PPP p')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Status Update */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Update Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Status</p>
                  <Select value={status} onValueChange={(v) => setStatus(v as IssueStatus)}>
                    <SelectTrigger className="bg-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border border-border z-50">
                      <SelectItem value="pending">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-warning" />
                          Pending
                        </div>
                      </SelectItem>
                      <SelectItem value="in_progress">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-primary" />
                          In Progress
                        </div>
                      </SelectItem>
                      <SelectItem value="resolved">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-success" />
                          Resolved
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground mb-2">Admin Notes</p>
                  <Textarea
                    placeholder="Add notes about actions taken..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={4}
                    className="bg-background resize-none"
                  />
                </div>

                <Button 
                  variant="hero" 
                  className="w-full" 
                  onClick={handleSave}
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
