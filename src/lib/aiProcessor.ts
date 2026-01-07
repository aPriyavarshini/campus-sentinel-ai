import { Issue, Priority, IncidentType, IncidentLocation } from './types';

// Simulated AI processing - In production, this would call the actual AI API
export function processReport(
  description: string,
  location: IncidentLocation,
  incidentType?: IncidentType,
  dateTime?: Date
): Pick<Issue, 'priority' | 'severityScore' | 'summary' | 'suggestedActions'> {
  // Keywords that indicate high urgency
  const highUrgencyKeywords = [
    'unconscious', 'bleeding', 'fire', 'violence', 'attack', 'emergency',
    'collapse', 'injured', 'threat', 'assault', 'burning', 'smoke',
    'unresponsive', 'help', 'danger', 'weapon', 'fight'
  ];
  
  const moderateUrgencyKeywords = [
    'suspicious', 'damage', 'broken', 'leak', 'unsafe', 'concern',
    'harassment', 'threat', 'following', 'vandalism', 'smell', 'noise'
  ];

  const lowerDescription = description.toLowerCase();
  
  // Calculate severity based on keywords and incident type
  let severityScore = 3;
  let priority: Priority = 'low';
  
  // Check for high urgency
  const highMatches = highUrgencyKeywords.filter(kw => lowerDescription.includes(kw)).length;
  const modMatches = moderateUrgencyKeywords.filter(kw => lowerDescription.includes(kw)).length;
  
  if (incidentType === 'medical' || incidentType === 'fire' || incidentType === 'harassment') {
    severityScore += 3;
  } else if (incidentType === 'suspicious' || incidentType === 'infrastructure') {
    severityScore += 1;
  }
  
  severityScore += highMatches * 2;
  severityScore += modMatches;
  
  // Normalize to 1-10
  severityScore = Math.min(10, Math.max(1, severityScore));
  
  // Determine priority
  if (severityScore >= 7 || highMatches >= 2 || incidentType === 'medical' || incidentType === 'fire') {
    priority = 'high';
  } else if (severityScore >= 4 || modMatches >= 2 || incidentType === 'harassment' || incidentType === 'suspicious') {
    priority = 'moderate';
  } else {
    priority = 'low';
  }
  
  // Generate summary (simplified version - real AI would do better)
  const summary = generateSummary(description, location, incidentType);
  
  // Generate suggested actions
  const suggestedActions = generateActions(priority, incidentType, location);
  
  return {
    priority,
    severityScore,
    summary,
    suggestedActions
  };
}

function generateSummary(
  description: string,
  location: IncidentLocation,
  incidentType?: IncidentType
): string {
  // Extract first two sentences and key info
  const sentences = description.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const firstPart = sentences.slice(0, 2).join('. ').trim();
  
  const locationName = getLocationName(location);
  const typeName = incidentType ? getIncidentTypeName(incidentType) : 'incident';
  
  if (firstPart.length > 200) {
    return `${typeName.charAt(0).toUpperCase() + typeName.slice(1)} reported at ${locationName}. ${firstPart.substring(0, 150)}... Immediate assessment required.`;
  }
  
  return `${firstPart}. Location: ${locationName}. Requires ${incidentType === 'medical' || incidentType === 'fire' ? 'immediate' : 'timely'} response.`;
}

function generateActions(
  priority: Priority,
  incidentType?: IncidentType,
  location?: IncidentLocation
): string[] {
  const actions: string[] = [];
  
  // Priority-based actions
  if (priority === 'high') {
    actions.push('Dispatch emergency response team immediately');
  }
  
  // Type-based actions
  switch (incidentType) {
    case 'medical':
      actions.push('Alert campus medical services');
      actions.push('Prepare for potential hospital transport');
      break;
    case 'fire':
      actions.push('Verify fire suppression systems activated');
      actions.push('Evacuate affected area if needed');
      break;
    case 'harassment':
      actions.push('Alert security personnel');
      actions.push('Document incident for investigation');
      break;
    case 'suspicious':
      actions.push('Review surveillance footage');
      actions.push('Increase patrol in area');
      break;
    case 'infrastructure':
      actions.push('Schedule maintenance inspection');
      actions.push('Cordon off area if safety risk exists');
      break;
    case 'mental_health':
      actions.push('Contact counseling services');
      actions.push('Ensure confidential support available');
      break;
    default:
      actions.push('Assess situation and determine response');
  }
  
  // Location-based actions
  if (location === 'hostel') {
    actions.push('Notify hostel warden');
  } else if (location === 'laboratory') {
    actions.push('Notify lab supervisor');
  }
  
  return actions.slice(0, 4);
}

function getLocationName(location: IncidentLocation): string {
  const names: Record<IncidentLocation, string> = {
    classroom: 'Classroom',
    hostel: 'Hostel',
    library: 'Library',
    cafeteria: 'Cafeteria',
    laboratory: 'Laboratory',
    washroom: 'Washroom',
    parking: 'Parking Area',
    playground: 'Playground',
    other: 'Campus'
  };
  return names[location];
}

function getIncidentTypeName(type: IncidentType): string {
  const names: Record<IncidentType, string> = {
    medical: 'medical emergency',
    harassment: 'harassment incident',
    fire: 'fire/electrical hazard',
    infrastructure: 'infrastructure issue',
    suspicious: 'suspicious activity',
    mental_health: 'mental health concern',
    other: 'incident'
  };
  return names[type];
}
