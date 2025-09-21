"use client";

import { useEffect, useState } from "react";
import {
  Award,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  BarChart3,
  Star,
  Target,
  Brain,
  MessageSquare,
  Code,
  Users,
  Eye,
} from "lucide-react";

interface CategoryScore {
  name: string;
  score: number;
  comment: string;
}

interface AnalysisData {
  totalScore: number;
  categoryScores: CategoryScore[];
  strengths: string[];
  areasForImprovement: string[];
  finalAssessment: string;
}

interface InterviewAnalysisProps {
  analysis: string;
}

const InterviewAnalysis = ({ analysis }: InterviewAnalysisProps) => {
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [animateCards, setAnimateCards] = useState(false);

  useEffect(() => {
    const parseAnalysis = () => {
      try {
        setLoading(true);
        
        if (!analysis || analysis.trim() === "") {
          setError("No analysis data provided");
          return;
        }

        const parsedData = JSON.parse(analysis);
        
        // Validate the parsed data structure
        if (!parsedData.totalScore || !parsedData.categoryScores || !Array.isArray(parsedData.categoryScores)) {
          setError("Invalid analysis data structure");
          return;
        }

        setAnalysisData(parsedData);
        setError(null);
      } catch (err) {
        setError("Failed to parse analysis data");
        console.error("Analysis parsing error:", err);
      } finally {
        setLoading(false);
      }
    };

    parseAnalysis();
  }, [analysis]);

  useEffect(() => {
    if (analysisData) {
      const timer = setTimeout(() => setAnimateCards(true), 100);
      return () => clearTimeout(timer);
    }
  }, [analysisData]);

  const getCategoryIcon = (categoryName: string) => {
    switch (categoryName.toLowerCase()) {
      case "communication skills":
        return MessageSquare;
      case "technical knowledge":
        return Code;
      case "problem solving":
        return Brain;
      case "cultural fit":
        return Users;
      case "confidence and clarity":
        return Eye;
      default:
        return Target;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return "text-green-600 bg-green-50 border-green-200";
    if (score >= 6) return "text-yellow-600 bg-yellow-50 border-yellow-200";
    return "text-red-600 bg-red-50 border-red-200";
  };

  const getScoreBarColor = (score: number) => {
    if (score >= 8) return "bg-green-500";
    if (score >= 6) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getTotalScoreColor = (score: number) => {
    if (score >= 8) return "from-green-500 to-green-600";
    if (score >= 6) return "from-yellow-500 to-yellow-600";
    return "from-red-500 to-red-600";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
          <p className="text-gray-600 font-medium">
            Loading your interview analysis...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center space-y-4 p-6">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto" />
          <h2 className="text-2xl font-bold text-gray-900">
            Analysis Not Found
          </h2>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!analysisData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <AlertCircle className="h-16 w-16 text-gray-400 mx-auto" />
          <h2 className="text-2xl font-bold text-gray-900">
            No Analysis Available
          </h2>
          <p className="text-gray-600">
            This interview hasn't been analyzed yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fadeIn">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Interview Analysis Report
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive feedback and insights from your AI interview session
          </p>
        </div>

        {/* Overall Score Card */}
        <div
          className={`mb-8 transform transition-all duration-700 ${
            animateCards
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Overall Performance
              </h2>
              <div
                className={`relative inline-flex items-center justify-center w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br ${getTotalScoreColor(
                  analysisData.totalScore
                )} text-white shadow-lg`}
              >
                <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-gray-900">
                      {analysisData.totalScore}/10
                    </div>
                    <div className="text-sm text-gray-600 font-medium">
                      Score
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-center space-x-2">
                  <Award className="h-5 w-5 text-yellow-500" />
                  <span className="text-lg font-semibold text-gray-900">
                    {analysisData.totalScore >= 8
                      ? "Excellent Performance"
                      : analysisData.totalScore >= 6
                      ? "Good Performance"
                      : "Needs Improvement"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Category Scores */}
        <div
          className={`mb-8 transform transition-all duration-700 delay-150 ${
            animateCards
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Performance Breakdown
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {analysisData.categoryScores.map((category, index) => {
              const IconComponent = getCategoryIcon(category.name);
              return (
                <div
                  key={category.name}
                  className={`bg-white rounded-xl shadow-lg p-4 md:p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 transform ${
                    animateCards ? "animate-slideInLeft" : ""
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2 md:space-x-3 min-w-0 flex-1">
                      <div
                        className={`p-2 rounded-lg ${getScoreColor(
                          category.score
                        )} flex-shrink-0`}
                      >
                        <IconComponent className="h-4 w-4 md:h-5 md:w-5" />
                      </div>
                      <h3 className="font-semibold text-gray-900 text-sm md:text-base truncate">
                        {category.name}
                      </h3>
                    </div>
                    <div
                      className={`px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-bold border ${getScoreColor(
                        category.score
                      )} flex-shrink-0 ml-2`}
                    >
                      {category.score}/10
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${getScoreBarColor(
                          category.score
                        )} transition-all duration-1000 ease-out`}
                        style={{ width: `${(category.score / 10) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                    {category.comment}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Strengths and Areas for Improvement */}
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 transform transition-all duration-700 delay-300 ${
            animateCards
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >
          {/* Strengths */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-green-50 rounded-lg border border-green-200">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Key Strengths</h2>
            </div>
            <div className="space-y-4">
              {analysisData.strengths.map((strength, index) => (
                <div
                  key={index}
                  className={`flex items-start space-x-3 transform transition-all duration-500 ${
                    animateCards
                      ? "translate-x-0 opacity-100"
                      : "-translate-x-4 opacity-0"
                  }`}
                  style={{ animationDelay: `${(index + 5) * 100}ms` }}
                >
                  <Star className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700 leading-relaxed">{strength}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Areas for Improvement */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-blue-50 rounded-lg border border-blue-200">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">
                Areas for Growth
              </h2>
            </div>
            <div className="space-y-4">
              {analysisData.areasForImprovement.map((area, index) => (
                <div
                  key={index}
                  className={`flex items-start space-x-3 transform transition-all duration-500 ${
                    animateCards
                      ? "translate-x-0 opacity-100"
                      : "-translate-x-4 opacity-0"
                  }`}
                  style={{ animationDelay: `${(index + 8) * 100}ms` }}
                >
                  <Target className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700 leading-relaxed">{area}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Final Assessment */}
        <div
          className={`transform transition-all duration-700 delay-500 ${
            animateCards
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-xl p-6 md:p-8 text-white">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-white/10 rounded-lg">
                <BarChart3 className="h-6 w-6" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold">
                Final Assessment
              </h2>
            </div>
            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-gray-100 leading-relaxed text-base md:text-lg">
                {analysisData.finalAssessment}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div
          className={`mt-8 flex flex-col sm:flex-row gap-4 justify-center transform transition-all duration-700 delay-700 ${
            animateCards
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >
          <button
            onClick={() => window.print()}
            className="inline-flex items-center justify-center px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
          >
            Download Report
          </button>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center px-6 py-3 bg-white text-black border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Back to Interviews
          </button>
        </div>
      </div>
    </div>
  );
};

export default InterviewAnalysis;
