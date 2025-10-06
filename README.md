# PrepMe - AI Interview Platform

An AI-powered virtual interview platform that helps users prepare for job interviews through voice-based interactions. PrepMe uses an agentic approach to simulate realistic interview scenarios and provides detailed performance analysis.

## Features

- **Voice-Based Interviews**: Completely hands-free interview experience - no typing required
- **Role-Specific Preparation**: Choose target roles and get tailored interview questions
- **Agentic Approach**: Intelligent AI agent conducts natural conversations and adapts to responses
- **Voice-Powered Creation**: Create and configure interviews using voice commands
- **Performance Analytics**: Receive overall scores and detailed feedback after each interview
- **Improvement Insights**: Get actionable recommendations on areas to improve
- **Real-Time Voice Interaction**: Powered by ElevenLabs.io voice agent for natural communication
- **Secure Authentication**: NextAuth integration for user management

## Tech Stack

**Frontend:**
- Next.js
- React
- TypeScript
- TailwindCSS

**Backend:**
- Next.js API Routes
- Prisma ORM
- OpenAI API

**AI & Voice:**
- ElevenLabs.io (Voice Agent)
- OpenAI API (Interview logic and analysis)

**Database:**
- PostgreSQL (via Prisma ORM)

**Authentication:**
- NextAuth

## Prerequisites

Before running this project locally, ensure the following are installed:

- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL database
- An OpenAI API key
- An ElevenLabs.io account and two Agent IDs.

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
DATABASE_URL=""
NEXTAUTH_SECRET=""
NEXTAUTH_URL=""
QUESTION_AGENT_ID=""
INTERVIEW_AGENT_ID=""
NEXT_OPENAI_API_KEY=""
```

## Local Setup

### 1. Clone the Repository

```
git clone https://github.com/AbhishekG-27/AI-Interview-Prep.git
cd AI-Interview-Prep
```

### 2. Install Dependencies

```
npm install
```

### 3. Set Up Database

Initialize Prisma and create the database schema:

```
# Generate Prisma Client
npx prisma generate

# Run migrations to create database tables
npx prisma migrate dev --name init
```

### 4. Configure ElevenLabs Voice Agent

1. Create an account at [ElevenLabs.io](https://elevenlabs.io)
2. Set up 2 conversational AI agent
3. Configure these agents for interview scenarios
4. Copy your Agent IDs to `.env`

### 5. Run the Development Server

```
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application

## Usage

### For Interview Preparation

1. **Sign Up/Login**: Create an account using NextAuth authentication
2. **Create an interview**: Create an interview by answering a few questions (like Job role, Seniority Level, etc...)
3. **Start Interview**: Use voice commands to begin the interview session
4. **Answer Questions**: Respond naturally to the AI interviewer's questions via voice
5. **Get Feedback**: After completion, view your overall score and detailed analysis
6. **Review Insights**: Check areas for improvement and recommendations

## Key Features Implementation

### Voice Interview Flow

1. User initiates interview via voice command
2. ElevenLabs agent begins conversation
3. Questions are fetched based on selected role
4. Agent asks questions and collects voice responses
5. Responses are transcribed and stored
6. OpenAI API analyzes responses in real-time
7. Final score and feedback are generated
8. Results are saved to database for review

### Agentic Approach

The AI agent dynamically adapts to:
- User's response quality
- Technical depth required
- Follow-up questions based on answers
- Interview difficulty progression

### Performance Analysis

Users receive:
- **Overall Score**: Aggregate performance rating
- **Category Breakdown**: Scores for technical skills, communication, problem-solving
- **Strength Areas**: What the user excelled at
- **Improvement Areas**: Specific skills to work on
- **Actionable Tips**: Concrete steps for improvement

## Contact

Abhishek Garg - [LinkedIn Profile](https://www.linkedin.com/in/abhishek-garg-9a8ab4235/) | [GitHub Profile](https://github.com/AbhishekG-27)

Project Link: [https://github.com/AbhishekG-27/AI-Interview-Prep](https://github.com/AbhishekG-27/AI-Interview-Prep)

## Acknowledgments

- [ElevenLabs.io](https://elevenlabs.io/) for voice AI capabilities
- [OpenAI API](https://openai.com/) for intelligent interview analysis
- [Next.js](https://nextjs.org/) for the React framework
- [Prisma](https://www.prisma.io/) for database ORM
- [NextAuth](https://next-auth.js.org/) for authentication
- [TailwindCSS](https://tailwindcss.com/) for styling
