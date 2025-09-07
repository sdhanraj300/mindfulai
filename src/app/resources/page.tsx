"use client";

import { AssetCard } from "../../components/ui/asset-images";

const resourceCategories = {
  "Mental Health Topics": ["anxiety", "depression", "stress", "mind"],
  "Wellness Practices": ["meditation", "exercise", "sleep", "nutrition"],
  "Self-Care & Growth": ["gratitude", "journaling", "love", "nurture"],
  "Support & Community": ["support", "community", "help", "people"],
  "Coping Strategies": ["coping", "bot"],
} as const;

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Mental Health Resources
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Explore our comprehensive collection of mental health topics and
            wellness practices to support your journey toward better mental
            wellbeing.
          </p>
        </div>

        {Object.entries(resourceCategories).map(([category, items]) => (
          <div key={category} className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
              {category}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {items.map((item) => (
                <div
                  key={item}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105"
                >
                  <AssetCard
                    name={item}
                    showDescription={true}
                    className="p-6"
                    imageSize={80}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Need Immediate Support?</h3>
            <p className="text-lg mb-6">
              If you&apos;re experiencing a mental health crisis, please reach
              out for help immediately.
            </p>
            <div className="space-y-2">
              <p className="font-semibold">Crisis Hotlines:</p>
              <p>National Suicide Prevention Lifeline: 988</p>
              <p>Crisis Text Line: Text HOME to 741741</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
