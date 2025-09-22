import { type Interview } from "@/types";
import {
  Calendar,
  Code,
  FileText,
  CheckCircle,
  User,
  Star,
} from "lucide-react";
import Link from "next/link";

const InterviewCard = ({ interview }: { interview: Interview }) => {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getInterviewTypeColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "easy":
        return "bg-green-50 text-green-700 border-green-200";
      case "medium":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "hard":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="group bg-white border border-gray-200 rounded-xl p-8 hover:shadow-xl hover:border-gray-300 transition-all duration-300 cursor-pointer w-full min-h-[420px] flex flex-col">
      {/* Header with Badge */}
      <div className="relative mb-6">
        {/* Difficulty Badge - Top Right */}
        <div
          className={`absolute -top-2 -right-2 px-4 py-2 rounded-bl-xl rounded-tr-xl border ${getInterviewTypeColor(
            interview.level
          )}`}
        >
          <p className="text-sm font-semibold uppercase tracking-wide">
            {interview.level}
          </p>
        </div>

        {/* Profile Icon */}
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-gray-200 transition-colors">
          <User size={32} className="text-gray-600" />
        </div>

        {/* Interview Title */}
        <div className="flex items-center gap-3">
          <h3 className="text-2xl font-bold text-gray-900 capitalize group-hover:text-black transition-colors">
            {interview.role} Interview
          </h3>
          {interview.isCompleted && (
            <CheckCircle size={24} className="text-green-600" />
          )}
        </div>
      </div>

      {/* Date & Stats Row */}
      <div className="flex items-center gap-6 mb-6">
        <div className="flex items-center gap-2">
          <Calendar size={20} className="text-gray-400" />
          <p className="text-base font-medium text-gray-600">
            {formatDate(interview.createdAt)}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Star size={20} className="text-gray-400" />
          <p className="text-base font-medium text-gray-600">
            {interview.isCompleted ? "100" : "---"}/100
          </p>
        </div>
      </div>

      {/* Description */}
      <div className="mb-6 flex-1">
        <p className="text-gray-600 leading-relaxed">
          {interview.isCompleted
            ? `You have completed this ${interview.level} level ${interview.role} interview with ${interview.amount} questions.`
            : `Take this ${interview.level} level ${interview.role} interview with ${interview.amount} questions to improve your skills.`}
        </p>
      </div>

      {/* Tech Stack */}
      {interview.techStack.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Code size={18} className="text-gray-400" />
            <span className="text-base font-semibold text-gray-700">
              Tech Stack
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {interview.techStack
              .slice(0, 6)
              .map((tech: string, index: number) => (
                <span
                  key={index}
                  className="px-3 py-1.5 bg-gray-50 text-gray-700 text-sm rounded-lg border font-medium"
                >
                  {tech}
                </span>
              ))}
            {interview.techStack.length > 6 && (
              <span className="px-3 py-1.5 bg-gray-50 text-gray-500 text-sm rounded-lg border">
                +{interview.techStack.length - 6} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-6 border-t border-gray-100">
        {/* Left side stats */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <FileText size={18} className="text-gray-400" />
            <span className="text-base font-medium text-gray-600">
              {interview.amount} Questions
            </span>
          </div>
        </div>

        {/* Action Button */}
        <Link
          href={`/interview/${interview.id}`}
          className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-all duration-200 font-medium group-hover:translate-x-1 transform"
        >
          {interview.isCompleted ? "Check Feedback" : "Start Interview"}
        </Link>
      </div>
    </div>
  );
};

export default InterviewCard;
