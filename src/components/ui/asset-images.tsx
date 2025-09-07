import Image from "next/image";

// Import all asset images
import anxietyImage from "../../../public/assets/anxiety.png";
import botImage from "../../../public/assets/bot.png";
import communityImage from "../../../public/assets/community.png";
import copingImage from "../../../public/assets/coping.png";
import depressionImage from "../../../public/assets/depression.png";
import exerciseImage from "../../../public/assets/exercise.png";
import gratitudeImage from "../../../public/assets/gratitude.png";
import helpImage from "../../../public/assets/help.png";
import journalingImage from "../../../public/assets/journaling.png";
import logoImage from "../../../public/assets/logo.png";
import loveImage from "../../../public/assets/love.png";
import meditationImage from "../../../public/assets/meditation.png";
import mindImage from "../../../public/assets/mind.png";
import nurtureImage from "../../../public/assets/nurture.png";
import nutritionImage from "../../../public/assets/nutrition.png";
import peopleImage from "../../../public/assets/people.png";
import sleepImage from "../../../public/assets/sleep.png";
import stressImage from "../../../public/assets/stress.png";
import supportImage from "../../../public/assets/support.png";

// Asset mapping for easy access
export const assetImages = {
  anxiety: anxietyImage,
  bot: botImage,
  community: communityImage,
  coping: copingImage,
  depression: depressionImage,
  exercise: exerciseImage,
  gratitude: gratitudeImage,
  help: helpImage,
  journaling: journalingImage,
  logo: logoImage,
  love: loveImage,
  meditation: meditationImage,
  mind: mindImage,
  nurture: nurtureImage,
  nutrition: nutritionImage,
  people: peopleImage,
  sleep: sleepImage,
  stress: stressImage,
  support: supportImage,
};

// Asset info for creating dynamic content
export const assetInfo = {
  anxiety: { title: "Anxiety Support", description: "Managing anxiety and worry" },
  bot: { title: "AI Assistant", description: "Your 24/7 mental health companion" },
  community: { title: "Community", description: "Connect with others on similar journeys" },
  coping: { title: "Coping Strategies", description: "Healthy ways to handle challenges" },
  depression: { title: "Depression Help", description: "Support for depression and low mood" },
  exercise: { title: "Physical Wellness", description: "Exercise for mental health" },
  gratitude: { title: "Gratitude Practice", description: "Cultivating thankfulness and positivity" },
  help: { title: "Get Help", description: "Resources and support when you need it" },
  journaling: { title: "Journaling", description: "Express thoughts and feelings through writing" },
  logo: { title: "MindfulAI", description: "Your mental health companion" },
  love: { title: "Self-Love", description: "Building self-compassion and acceptance" },
  meditation: { title: "Meditation", description: "Mindfulness and relaxation practices" },
  mind: { title: "Mental Wellness", description: "Overall brain health and cognitive wellbeing" },
  nurture: { title: "Self-Nurturing", description: "Taking care of your emotional needs" },
  nutrition: { title: "Nutrition", description: "Eating well for mental health" },
  people: { title: "Community", description: "Connection and social support" },
  sleep: { title: "Better Sleep", description: "Improving sleep quality and habits" },
  stress: { title: "Stress Management", description: "Techniques for reducing stress" },
  support: { title: "Support System", description: "Building and maintaining relationships" },
};

// Reusable Asset Image component
interface AssetImageProps {
  name: keyof typeof assetImages;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
}

export const AssetImage: React.FC<AssetImageProps> = ({ 
  name, 
  alt, 
  width = 60, 
  height = 60, 
  className = "rounded-full" 
}) => {
  const image = assetImages[name];
  const info = assetInfo[name];
  
  return (
    <Image
      src={image}
      alt={alt || info.title}
      width={width}
      height={height}
      className={className}
    />
  );
};

// Component for displaying asset info cards
interface AssetCardProps {
  name: keyof typeof assetImages;
  showDescription?: boolean;
  className?: string;
  imageSize?: number;
}

export const AssetCard: React.FC<AssetCardProps> = ({ 
  name, 
  showDescription = true,
  className = "",
  imageSize = 80 
}) => {
  const info = assetInfo[name];
  
  return (
    <div className={`text-center p-4 ${className}`}>
      <AssetImage 
        name={name} 
        width={imageSize} 
        height={imageSize}
        className="mx-auto rounded-full shadow-lg"
      />
      <h3 className="mt-2 font-semibold text-lg">{info.title}</h3>
      {showDescription && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          {info.description}
        </p>
      )}
    </div>
  );
};

export default assetImages;
