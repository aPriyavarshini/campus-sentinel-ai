import { Issue, Admin, WeeklyReport } from './types';

export const mockIssues: Issue[] = [
  {
    id: '1',
    location: 'hostel',
    incidentType: 'medical',
    description: 'A student collapsed in the hostel corridor near room 204. They appear to be unconscious and not responding. Some students tried to help but the person is still unresponsive. Need immediate medical attention.',
    dateTime: new Date(Date.now() - 1000 * 60 * 30), // 30 mins ago
    createdAt: new Date(Date.now() - 1000 * 60 * 30),
    priority: 'high',
    severityScore: 9,
    summary: 'Unconscious student found in hostel corridor near room 204. Immediate medical response required. Student is unresponsive to initial aid attempts.',
    suggestedActions: [
      'Dispatch medical response team immediately',
      'Alert hostel warden',
      'Prepare for potential emergency transport'
    ],
    status: 'pending'
  },
  {
    id: '2',
    location: 'parking',
    incidentType: 'suspicious',
    description: 'There is an unknown person who has been wandering around the parking area for the past hour. They seem to be checking car doors and looking into windows. They are wearing a dark hoodie and avoiding the security cameras.',
    dateTime: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
    createdAt: new Date(Date.now() - 1000 * 60 * 120),
    priority: 'high',
    severityScore: 8,
    summary: 'Suspicious individual observed checking vehicles in parking area for extended period. Subject actively avoiding surveillance.',
    suggestedActions: [
      'Alert security team immediately',
      'Review parking lot CCTV footage',
      'Increase patrol frequency in area'
    ],
    status: 'in_progress',
    assignedTo: 'security_team'
  },
  {
    id: '3',
    location: 'laboratory',
    incidentType: 'fire',
    description: 'There was a small fire in Chemistry Lab 3 due to an experiment gone wrong. The fire was contained but there is significant smoke and some equipment damage. The lab needs inspection before it can be used again.',
    dateTime: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5),
    priority: 'moderate',
    severityScore: 6,
    summary: 'Contained fire incident in Chemistry Lab 3. Equipment damage present. Lab requires safety inspection before reopening.',
    suggestedActions: [
      'Schedule safety inspection',
      'Document equipment damage for insurance',
      'Review lab safety protocols with students'
    ],
    status: 'in_progress'
  },
  {
    id: '4',
    location: 'cafeteria',
    incidentType: 'infrastructure',
    description: 'Several ceiling tiles in the cafeteria are loose and look like they might fall. This has been an issue for a few weeks but it seems to be getting worse. The area near the entrance is particularly affected.',
    dateTime: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    priority: 'moderate',
    severityScore: 5,
    summary: 'Deteriorating ceiling tiles in cafeteria entrance area. Progressive damage observed over weeks. Potential falling hazard.',
    suggestedActions: [
      'Cordon off affected area',
      'Schedule maintenance repair',
      'Assess structural integrity'
    ],
    status: 'pending'
  },
  {
    id: '5',
    location: 'library',
    incidentType: 'infrastructure',
    description: 'Some of the emergency exit lights in the library basement are not working. Noticed this while studying late yesterday. Could be a problem if there is an actual emergency.',
    dateTime: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48),
    priority: 'low',
    severityScore: 4,
    summary: 'Non-functional emergency exit lights in library basement. Safety compliance issue requiring maintenance.',
    suggestedActions: [
      'Submit maintenance work order',
      'Check all emergency lighting in building',
      'Update fire safety compliance records'
    ],
    status: 'resolved',
    resolvedAt: new Date(Date.now() - 1000 * 60 * 60 * 12)
  },
  {
    id: '6',
    location: 'playground',
    incidentType: 'other',
    description: 'The water fountain near the basketball court has been leaking for days. There is a small puddle forming which can be slippery. Not urgent but should be fixed soon.',
    dateTime: new Date(Date.now() - 1000 * 60 * 60 * 72), // 3 days ago
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72),
    priority: 'low',
    severityScore: 2,
    summary: 'Leaking water fountain near basketball court creating slip hazard. Ongoing for multiple days.',
    suggestedActions: [
      'Place wet floor signage',
      'Schedule plumbing repair',
      'Monitor for worsening'
    ],
    status: 'pending'
  }
];

export const mockAdmin: Admin = {
  id: 'admin-1',
  email: 'admin@sentinelcampus.edu',
  name: 'Dr. Sarah Mitchell',
  role: 'management',
  phone: '+1 (555) 123-4567',
  issuesHandled: 147,
  averageResponseTime: 12,
  resolutionRate: 94
};

export const mockWeeklyReport: WeeklyReport = {
  weekStart: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
  weekEnd: new Date(),
  totalIssues: 24,
  highPriority: 5,
  moderatePriority: 11,
  lowPriority: 8,
  resolvedCount: 18,
  pendingCount: 6,
  topLocations: [
    { location: 'Hostel', count: 8 },
    { location: 'Parking', count: 5 },
    { location: 'Laboratory', count: 4 }
  ],
  topTypes: [
    { type: 'Infrastructure', count: 9 },
    { type: 'Medical', count: 6 },
    { type: 'Suspicious Activity', count: 5 }
  ],
  aiInsights: [
    'Hostel area shows 35% increase in medical incidents during evening hours (8-11 PM). Consider extending medical staff coverage.',
    'Infrastructure complaints have risen by 28% this week, primarily in older buildings. Preventive maintenance recommended.',
    'No high-priority security incidents in library for 30+ days - current measures effective.'
  ]
};

export const locationLabels: Record<string, string> = {
  classroom: 'Classroom',
  hostel: 'Hostel',
  library: 'Library',
  cafeteria: 'Cafeteria',
  laboratory: 'Laboratory',
  washroom: 'Washroom',
  parking: 'Parking Area',
  playground: 'Playground',
  other: 'Other'
};

export const incidentTypeLabels: Record<string, string> = {
  medical: 'Medical Emergency',
  harassment: 'Harassment / Violence',
  fire: 'Fire / Electrical Hazard',
  infrastructure: 'Infrastructure Damage',
  suspicious: 'Suspicious Activity',
  mental_health: 'Mental Health Concern',
  other: 'Other'
};
