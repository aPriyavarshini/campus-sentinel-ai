export type Priority = 'high' | 'moderate' | 'low';
export type IssueStatus = 'pending' | 'in_progress' | 'resolved';
export type IncidentLocation = 
  | 'classroom' 
  | 'hostel' 
  | 'library' 
  | 'cafeteria' 
  | 'laboratory'
  | 'washroom'
  | 'parking'
  | 'playground'
  | 'other';

export type IncidentType = 
  | 'medical'
  | 'harassment'
  | 'fire'
  | 'infrastructure'
  | 'suspicious'
  | 'mental_health'
  | 'other';

export interface Issue {
  id: string;
  location: IncidentLocation;
  customLocation?: string;
  incidentType?: IncidentType;
  description: string;
  dateTime: Date;
  createdAt: Date;
  
  // AI-generated fields
  priority: Priority;
  severityScore: number; // 1-10
  summary: string;
  suggestedActions: string[];
  
  // Status tracking
  status: IssueStatus;
  resolvedAt?: Date;
  assignedTo?: string;
  adminNotes?: string;
}

export interface Admin {
  id: string;
  email: string;
  name: string;
  role: 'security' | 'faculty' | 'management';
  avatar?: string;
  phone?: string;
  issuesHandled: number;
  averageResponseTime: number; // in minutes
  resolutionRate: number; // percentage
}

export interface WeeklyReport {
  weekStart: Date;
  weekEnd: Date;
  totalIssues: number;
  highPriority: number;
  moderatePriority: number;
  lowPriority: number;
  resolvedCount: number;
  pendingCount: number;
  topLocations: { location: string; count: number }[];
  topTypes: { type: string; count: number }[];
  aiInsights: string[];
}
