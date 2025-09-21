export const feedbackSchema = `{
  totalScore: "number (a single overall score)",
  categoryScores: [
    {
      name: "Communication Skills",
      score: "number (score for this category)",
      comment: "string (specific feedback on this category)",
    },
    {
      name: "Technical Knowledge",
      score: "number (score for this category)",
      comment: "string (specific feedback on this category)",
    },
    {
      name: "Problem Solving",
      score: "number (score for this category)",
      comment: "string (specific feedback on this category)",
    },
    {
      name: "Cultural Fit",
      score: "number (score for this category)",
      comment: "string (specific feedback on this category)",
    },
    {
      name: "Confidence and Clarity",
      score: "number (score for this category)",
      comment: "string (specific feedback on this category)",
    },
  ],
  strengths: ["string (a bullet point describing a key strength)", "..."],
  areasForImprovement: [
    "string (a bullet point suggesting an area for improvement)",
    "...",
  ],
  finalAssessment: "string (a concluding summary or final recommendation)",
}`;
