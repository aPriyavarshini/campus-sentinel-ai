import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, ArrowLeft, MapPin, Calendar, FileText, Tag, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useIssues } from '@/contexts/IssueContext';
import { processReport } from '@/lib/aiProcessor';
import { IncidentLocation, IncidentType, Issue } from '@/lib/types';
import { Input } from '@/components/ui/input';

const locations: { value: IncidentLocation; label: string }[] = [
  { value: 'classroom', label: 'Classroom' },
  { value: 'hostel', label: 'Hostel' },
  { value: 'library', label: 'Library' },
  { value: 'cafeteria', label: 'Cafeteria' },
  { value: 'laboratory', label: 'Laboratory' },
  { value: 'washroom', label: 'Washroom' },
  { value: 'parking', label: 'Parking Area' },
  { value: 'playground', label: 'Playground' },
  { value: 'other', label: 'Other' },
];

const incidentTypes: { value: IncidentType; label: string }[] = [
  { value: 'medical', label: 'Medical Emergency' },
  { value: 'harassment', label: 'Harassment / Violence' },
  { value: 'fire', label: 'Fire / Electrical Hazard' },
  { value: 'infrastructure', label: 'Infrastructure Damage' },
  { value: 'suspicious', label: 'Suspicious Activity' },
  { value: 'mental_health', label: 'Mental Health Concern' },
  { value: 'other', label: 'Other' },
];

export default function ReportPage() {
  const navigate = useNavigate();
  const { addIssue } = useIssues();
  
  const [location, setLocation] = useState<IncidentLocation | ''>('');
  const [customLocation, setCustomLocation] = useState('');
  const [incidentType, setIncidentType] = useState<IncidentType | ''>('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!location || !description || !date || !time) {
      return;
    }

    setIsSubmitting(true);

    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const dateTime = new Date(`${date}T${time}`);
    const aiAnalysis = processReport(
      description,
      location as IncidentLocation,
      incidentType as IncidentType || undefined,
      dateTime
    );

    const newIssue: Issue = {
      id: `issue-${Date.now()}`,
      location: location as IncidentLocation,
      customLocation: location === 'other' ? customLocation : undefined,
      incidentType: incidentType as IncidentType || undefined,
      description,
      dateTime,
      createdAt: new Date(),
      ...aiAnalysis,
      status: 'pending'
    };

    addIssue(newIssue);
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <Card className="max-w-md w-full text-center">
          <CardContent className="pt-12 pb-8">
            <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-success" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-3">Report Submitted</h2>
            <p className="text-muted-foreground mb-8">
              Thank you for reporting. Our AI has analyzed your report and assigned it to the appropriate team. 
              Your anonymity is protected.
            </p>
            <div className="flex flex-col gap-3">
              <Button variant="hero" onClick={() => navigate('/')}>
                Return Home
              </Button>
              <Button variant="outline" onClick={() => {
                setIsSubmitted(false);
                setLocation('');
                setCustomLocation('');
                setIncidentType('');
                setDescription('');
                setDate('');
                setTime('');
              }}>
                Submit Another Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-lg font-semibold text-foreground">Report a Safety Issue</h1>
                <p className="text-sm text-muted-foreground">Anonymous • AI-Analyzed • Rapid Response</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="container mx-auto px-6 py-8 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Location */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <MapPin className="h-4 w-4 text-primary" />
                Incident Location
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Select value={location} onValueChange={(value) => setLocation(value as IncidentLocation)}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Where did the incident happen?" />
                </SelectTrigger>
                <SelectContent className="bg-popover border border-border z-50">
                  {locations.map((loc) => (
                    <SelectItem key={loc.value} value={loc.value}>
                      {loc.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {location === 'other' && (
                <Input
                  placeholder="Specify the location..."
                  value={customLocation}
                  onChange={(e) => setCustomLocation(e.target.value)}
                  className="bg-background"
                />
              )}
            </CardContent>
          </Card>

          {/* Date & Time */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Calendar className="h-4 w-4 text-primary" />
                When Did It Happen?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="bg-background"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Incident Type */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Tag className="h-4 w-4 text-primary" />
                Issue Category
                <span className="text-muted-foreground font-normal text-sm">(Optional)</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={incidentType} onValueChange={(value) => setIncidentType(value as IncidentType)}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Select category if known" />
                </SelectTrigger>
                <SelectContent className="bg-popover border border-border z-50">
                  {incidentTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Description */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <FileText className="h-4 w-4 text-primary" />
                Describe the Incident
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Please describe what happened in detail. Include any relevant information that could help responders..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={6}
                className="bg-background resize-none"
              />
              <p className="text-xs text-muted-foreground mt-2">
                {description.length}/1000 characters
              </p>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="pt-4">
            <Button 
              type="submit" 
              variant="hero" 
              size="lg" 
              className="w-full"
              disabled={!location || !description || !date || !time || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  AI Analyzing Report...
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  Submit Report
                </>
              )}
            </Button>
            <p className="text-center text-xs text-muted-foreground mt-4">
              Your report is completely anonymous. No personal data is collected or stored.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
