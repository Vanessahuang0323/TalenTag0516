import React, { createContext, useContext, useState } from 'react';

interface User {
  type: 'company' | 'student' | null;
  data?: Record<string, any>;
}

interface AppContextType {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  currentPage: string;
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>;
  companyFormData: Record<string, string>;
  setCompanyFormData: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  candidateData: any[];
  setCandidateData: React.Dispatch<React.SetStateAction<any[]>>;
  savedCandidates: any[];
  setSavedCandidates: React.Dispatch<React.SetStateAction<any[]>>;
  resumeCompletion: number;
  setResumeCompletion: React.Dispatch<React.SetStateAction<number>>;
  studentFormData: Record<string, any>;
  setStudentFormData: React.Dispatch<React.SetStateAction<Record<string, any>>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>({ type: null });
  const [currentPage, setCurrentPage] = useState('home');
  const [companyFormData, setCompanyFormData] = useState<Record<string, string>>({});
  const [candidateData, setCandidateData] = useState<any[]>([]);
  const [savedCandidates, setSavedCandidates] = useState<any[]>([]);
  const [resumeCompletion, setResumeCompletion] = useState(65);
  const [studentFormData, setStudentFormData] = useState<Record<string, any>>({});

  return (
    <AppContext.Provider value={{
      user,
      setUser,
      currentPage, 
      setCurrentPage,
      companyFormData,
      setCompanyFormData,
      candidateData,
      setCandidateData,
      savedCandidates,
      setSavedCandidates,
      resumeCompletion,
      setResumeCompletion,
      studentFormData,
      setStudentFormData
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};