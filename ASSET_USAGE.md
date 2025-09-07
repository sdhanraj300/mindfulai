# Using Asset Images in MindfulAI

This document explains how to use the images from `/public/assets` throughout your website.

## Asset Images Component

We've created a comprehensive asset management system in `/src/components/ui/asset-images.tsx` that provides:

1. **Centralized image imports** - All images are imported once and accessible via the `assetImages` object
2. **Asset information** - Each image has associated metadata (title, description)
3. **Reusable components** - `AssetImage` and `AssetCard` components for consistent usage

## Available Images

The following images are available in your assets folder:

- `anxiety.png` - Anxiety Support
- `bot.png` - AI Assistant
- `community.png` - Community
- `coping.png` - Coping Strategies
- `depression.png` - Depression Help
- `exercise.png` - Physical Wellness
- `gratitude.png` - Gratitude Practice
- `help.png` - Get Help
- `journaling.png` - Journaling
- `logo.png` - MindfulAI Logo
- `love.png` - Self-Love
- `meditation.png` - Meditation
- `mind.png` - Mental Wellness
- `nurture.png` - Self-Nurturing
- `nutrition.png` - Nutrition
- `people.png` - Community/People
- `sleep.png` - Better Sleep
- `stress.png` - Stress Management
- `support.png` - Support System

## Usage Examples

### 1. Basic Asset Image

```tsx
import { AssetImage } from "@/components/ui/asset-images";

<AssetImage 
  name="meditation" 
  width={60} 
  height={60}
  alt="Meditation practice"
  className="rounded-full"
/>
```

### 2. Asset Card with Title and Description

```tsx
import { AssetCard } from "@/components/ui/asset-images";

<AssetCard 
  name="anxiety"
  showDescription={true}
  imageSize={80}
  className="p-4 bg-white rounded-lg shadow-lg"
/>
```

### 3. Direct Import (for specific use cases)

```tsx
import anxietyImage from "../public/assets/anxiety.png";
import Image from "next/image";

<Image src={anxietyImage} alt="Anxiety support" width={100} height={100} />
```

### 4. Using Asset Info

```tsx
import { assetInfo } from "@/components/ui/asset-images";

const info = assetInfo.meditation;
console.log(info.title); // "Meditation"
console.log(info.description); // "Mindfulness and relaxation practices"
```

## Implementation Examples

### Chat Page
- **Bot Avatar**: Uses `bot.png` for AI assistant messages
- **User Avatar**: Uses `people.png` as fallback for unauthenticated users
- **Mental Health Tips**: Shows 6 wellness tips with corresponding images

### Homepage
- **Hero Section**: Features main logo and wellness images
- **Features Section**: Uses relevant images for each feature
- **Resources Section**: Displays categorized mental health topics

### Resources Page
- **Categorized Display**: Groups images by mental health topics
- **Interactive Cards**: Hover effects and organized layout
- **Crisis Support**: Uses support-related images

### About Page
- **Logo Display**: Prominent logo placement
- **Values Grid**: Shows core values with corresponding images
- **Feature Showcase**: Highlights app capabilities with visuals

### Sidebar
- **Logo**: Main branding in header
- **User Avatar**: People image as fallback
- **Navigation**: Enhanced with meaningful icons

## Best Practices

1. **Accessibility**: Always provide meaningful alt text
2. **Performance**: Use appropriate sizes (avoid oversized images)
3. **Consistency**: Use the AssetImage/AssetCard components for uniform styling
4. **Context**: Choose images that match the content context
5. **Dark Mode**: Ensure images work well in both light and dark themes

## Adding New Images

1. Add the image to `/public/assets/`
2. Import it in `/src/components/ui/asset-images.tsx`
3. Add it to the `assetImages` object
4. Add metadata to the `assetInfo` object
5. Update this documentation

## Responsive Design

The components are designed to be responsive:

```tsx
// Mobile-first approach
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  {images.map(image => (
    <AssetCard key={image} name={image} imageSize={60} />
  ))}
</div>
```

## Dark Mode Support

All asset components automatically adapt to dark mode using Tailwind's dark mode classes:

```tsx
<div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
  <AssetImage name="meditation" />
</div>
```

This comprehensive system ensures your images are:
- ✅ Properly optimized
- ✅ Consistently styled
- ✅ Accessible
- ✅ Easy to maintain
- ✅ Responsive
- ✅ Dark mode compatible
