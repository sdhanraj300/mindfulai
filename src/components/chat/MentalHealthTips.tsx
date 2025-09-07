import { AssetCard } from "../ui/asset-images";

const chatTips = [
  { name: "meditation", tip: "Try a 5-minute breathing exercise" },
  { name: "journaling", tip: "Write down three things you're grateful for" },
  { name: "exercise", tip: "Take a short walk to clear your mind" },
  { name: "sleep", tip: "Establish a calming bedtime routine" },
  { name: "nutrition", tip: "Stay hydrated and eat mindfully" },
  { name: "gratitude", tip: "Practice daily gratitude reflection" },
] as const;

interface MentalHealthTipsProps {
  className?: string;
}

export const MentalHealthTips: React.FC<MentalHealthTipsProps> = ({ 
  className = "" 
}) => {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg ${className}`}>
      <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
        💡 Daily Wellness Tips
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {chatTips.map((item) => (
          <div key={item.name} className="text-center">
            <AssetCard 
              name={item.name}
              showDescription={false}
              imageSize={50}
              className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 hover:shadow-md transition-shadow"
            />
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
              {item.tip}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MentalHealthTips;
