import { CreateFeedbackParams } from "@/types";
import { feedbackSchema } from "@/constants";
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

export async function createFeedback(params: CreateFeedbackParams) {
  const { transcript } = params;

  try {
    const formattedTranscript = transcript
      .map(
        (sentence: { role: string; content: string }) =>
          `- ${sentence.role}: ${sentence.content}\n`
      )
      .join("");

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
              text: `
        You are an AI interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories. Be thorough and detailed in your analysis. Don't be lenient with the candidate. If there are mistakes or areas for improvement, point them out.
        Transcript:
        ${formattedTranscript}

        Please score the candidate from 0 to 100 in the following areas. Do not add categories other than the ones provided:
        - **Communication Skills**: Clarity, articulation, structured responses.
        - **Technical Knowledge**: Understanding of key concepts for the role.
        - **Problem-Solving**: Ability to analyze problems and propose solutions.
        - **Cultural & Role Fit**: Alignment with company values and job role.
        - **Confidence & Clarity**: Confidence in responses, engagement, and clarity.

        The response should be a JSON object with the following structure and no additional text:
            ${feedbackSchema}
        `,
            },
          ],
        },
        {
          role: "system",
          content: [
            {
              type: "input_text",
              text: "You are a professional interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories",
            },
          ],
        },
      ],
    });

    if (!response) {
      return { success: false };
    }

    const result = response.output_text;

    return { success: true, feedback: result };
  } catch (error) {
    console.error("Error saving feedback:", error);
    return { success: false };
  }
}
