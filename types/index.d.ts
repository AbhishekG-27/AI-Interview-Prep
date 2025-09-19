interface AuthFormtypes {
  type: "sign-in" | "sign-up";
}

interface Interview {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  role: string;
  amount: number;
  level: string;
  questions: string[];
  techStack: string[];
}
