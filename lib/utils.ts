import OpenAI from "openai";

export const GenerateQuestions = async ({
  role,
  level,
  techstack,
  type,
  amount,
}: {
  role: string;
  level: string;
  techstack: string;
  type: string;
  amount: string;
}) => {
  const openai = new OpenAI({
    apiKey: process.env.NEXT_OPENAI_API_KEY,
  });

  const response = await openai.responses.create({
    model: "gpt-5",
    input: [
      {
        role: "user",
        content: [
          {
            type: "input_text",
            text: `Prepare questions for a job interview.
        The job role is ${role}.
        The job experience level is ${level}.
        The tech stack used in the job is: ${techstack}.
        The focus between behavioural and technical questions should lean towards: ${type}.
        The amount of questions required is: ${amount}.
        Please return only the questions, without any additional text.
        The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
        Return the questions formatted like this:
        ["Question 1", "Question 2", "Question 3"]
        
        Thank you! <3
    `,
          },
        ],
      },
    ],
  });

  if (!response) {
    return null;
  }

  return response.output_text;
};
