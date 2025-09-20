export interface AuthFormtypes {
  type: "sign-in" | "sign-up";
}

export interface Interview {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  role: string;
  amount: number;
  level: string;
  questions: string[];
  techStack: string[];
  isCompleted: boolean;
  interviewAnalysis: string | null;
}

interface CreateFeedbackParams {
  transcript: { role: string; content: string }[];
}
