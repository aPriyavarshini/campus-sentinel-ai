import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Issue, IssueStatus } from '@/lib/types';
import { mockIssues } from '@/lib/mockData';

interface IssueContextType {
  issues: Issue[];
  addIssue: (issue: Issue) => void;
  updateIssueStatus: (id: string, status: IssueStatus, notes?: string) => void;
  getIssueById: (id: string) => Issue | undefined;
}

const IssueContext = createContext<IssueContextType | undefined>(undefined);

export function IssueProvider({ children }: { children: ReactNode }) {
  const [issues, setIssues] = useState<Issue[]>(mockIssues);

  const addIssue = (issue: Issue) => {
    setIssues(prev => [issue, ...prev]);
  };

  const updateIssueStatus = (id: string, status: IssueStatus, notes?: string) => {
    setIssues(prev => prev.map(issue => {
      if (issue.id === id) {
        return {
          ...issue,
          status,
          adminNotes: notes || issue.adminNotes,
          resolvedAt: status === 'resolved' ? new Date() : issue.resolvedAt
        };
      }
      return issue;
    }));
  };

  const getIssueById = (id: string) => {
    return issues.find(issue => issue.id === id);
  };

  return (
    <IssueContext.Provider value={{ issues, addIssue, updateIssueStatus, getIssueById }}>
      {children}
    </IssueContext.Provider>
  );
}

export function useIssues() {
  const context = useContext(IssueContext);
  if (!context) {
    throw new Error('useIssues must be used within an IssueProvider');
  }
  return context;
}
