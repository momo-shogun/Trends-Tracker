import { LucideIcon, Smile, Meh, Frown, ThumbsDown } from "lucide-react";



const fileType: Record<string, LucideIcon> = {
    "Negative": ThumbsDown, // Represents strongly negative sentiment
    "Slightly Negative": Frown, // Represents slightly negative emotion
    "Slightly Positive": Meh, // Neutral or slightly positive emotion
    "Positive": Smile // Represents a strongly positive sentiment
};

export function TypeIcon({ type }: { type: string }) {
    const iconClass = "text-stone-400"; // Add a soft gray color for icons
    const Icon = fileType[type]; // Get the corresponding icon

    if (!Icon) {
        return null; // Return nothing if no valid icon is found
    }

    return <Icon size={24} className={iconClass} />; // Render the icon
}
