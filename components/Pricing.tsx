"use client";

import { useState, useEffect } from "react";
import { Check } from "lucide-react";

interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  buttonText: string;
  buttonVariant: "primary" | "secondary";
  popular?: boolean;
}

interface PricingProps {
  currentPlan?: string | null;
}

const pricingPlans: PricingPlan[] = [
  {
    name: "Free",
    price: "$0",
    period: "/month",
    description: "Perfect for getting started with interview practice",
    features: [
      "1 interview per month",
      "Basic question types",
      "Limited analysis",
      "Email support",
    ],
    buttonText: "Get Started",
    buttonVariant: "secondary",
  },
  {
    name: "Pro",
    price: "$19",
    period: "/month",
    description: "Everything you need for comprehensive interview preparation",
    features: [
      "Unlimited interviews",
      "Advanced question types",
      "Detailed performance analysis",
      "Custom tech stacks",
      "Priority support",
      "Interview recordings",
      "Progress tracking",
      "Mock coding challenges",
    ],
    buttonText: "Upgrade to Pro",
    buttonVariant: "primary",
    popular: true,
  },
];

export const Pricing = ({ currentPlan }: PricingProps) => {
  const [isAnnual, setIsAnnual] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`py-16 px-4 sm:px-6 lg:px-8 bg-white min-h-screen transition-all duration-600 ease-out transform ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-600 ease-out transform delay-100 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <h2 className="text-4xl font-bold text-black mb-4">
            Choose Your Plan
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select the perfect plan to accelerate your interview preparation
            journey
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center mt-8">
            <span
              className={`text-sm ${
                !isAnnual ? "text-black" : "text-gray-600"
              }`}
            >
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="mx-3 relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-black transition-transform ${
                  isAnnual ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            <span
              className={`text-sm ${isAnnual ? "text-black" : "text-gray-600"}`}
            >
              Annual
            </span>
            <span className="ml-2 inline-flex items-center rounded-full bg-gray-800 px-2 py-1 text-xs font-medium text-white">
              Save 20%
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto transition-all duration-600 ease-out transform delay-200 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-8 ${
                plan.popular
                  ? "bg-white border-2 border-black shadow-xl shadow-gray-400/20"
                  : "bg-white border border-gray-300"
              } transition-all duration-300 hover:shadow-lg hover:shadow-gray-400/50`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-black text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-black mb-2">
                  {plan.name}
                </h3>
                <div className="flex items-baseline justify-center mb-4">
                  <span className="text-5xl font-bold text-black">
                    {isAnnual && plan.name === "Pro" ? "$15" : plan.price}
                  </span>
                  <span className="text-gray-600 ml-2">{plan.period}</span>
                </div>
                <p className="text-gray-600 text-sm">{plan.description}</p>
              </div>

              {/* Features */}
              <div className="mb-8">
                <ul className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="h-5 w-5 text-gray-700 mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              {(() => {
                const planName = plan.name.toLowerCase();
                const isCurrentPlan = currentPlan?.toLowerCase() === planName;

                // If no current plan, show Get Started button only for Free plan
                if (!currentPlan) {
                  return planName === "free" ? (
                    <button className="w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 bg-gray-200 text-black hover:bg-gray-300 border border-gray-400 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-white focus:outline-none">
                      Get Started
                    </button>
                  ) : null;
                }

                // If current plan matches this plan, show "Current Plan"
                if (isCurrentPlan) {
                  return (
                    <button
                      disabled
                      className="w-full py-3 px-6 rounded-lg font-semibold bg-gray-300 text-gray-600 cursor-not-allowed border border-gray-400"
                    >
                      Current Plan
                    </button>
                  );
                }

                // If user has free plan and this is pro plan, show upgrade button
                if (
                  currentPlan?.toLowerCase() === "free" &&
                  planName === "pro"
                ) {
                  return (
                    <button className="w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 bg-black text-white hover:bg-gray-800 focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-white focus:outline-none">
                      Upgrade to Pro
                    </button>
                  );
                }

                // If user has pro plan, don't show any button for free plan
                if (
                  currentPlan?.toLowerCase() === "pro" &&
                  planName === "free"
                ) {
                  return null;
                }

                return null;
              })()}

              {plan.name === "Free" && (
                <p className="text-xs text-gray-500 text-center mt-3">
                  No credit card required
                </p>
              )}
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div
          className={`mt-20 text-center transition-all duration-600 ease-out transform delay-300 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <h3 className="text-2xl font-bold text-black mb-8">
            Frequently Asked Questions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-white border border-gray-300 rounded-xl p-6 text-left hover:shadow-lg transition-all duration-300 hover:shadow-gray-400/50">
              <h4 className="text-lg font-semibold text-black mb-3">
                Can I switch plans anytime?
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Yes, you can upgrade or downgrade your plan at any time. Changes
                will be reflected in your next billing cycle.
              </p>
            </div>
            <div className="bg-white border border-gray-300 rounded-xl p-6 text-left hover:shadow-lg transition-all duration-300 hover:shadow-gray-400/50">
              <h4 className="text-lg font-semibold text-black mb-3">
                What happens to my data if I cancel?
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Your interview history and analysis will remain accessible for
                30 days after cancellation.
              </p>
            </div>
            <div className="bg-white border border-gray-300 rounded-xl p-6 text-left hover:shadow-lg transition-all duration-300 hover:shadow-gray-400/50">
              <h4 className="text-lg font-semibold text-black mb-3">
                Do you offer refunds?
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                We offer a 14-day money-back guarantee for all Pro
                subscriptions.
              </p>
            </div>
            <div className="bg-white border border-gray-300 rounded-xl p-6 text-left hover:shadow-lg transition-all duration-300 hover:shadow-gray-400/50">
              <h4 className="text-lg font-semibold text-black mb-3">
                Is there a student discount?
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Yes! Students get 50% off the Pro plan. Contact support with
                your student ID.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
