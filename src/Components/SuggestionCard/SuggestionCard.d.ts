import type { ReactNode } from "react";
interface SuggestionCardProps {
    icon: ReactNode;
    title: string;
    description: string;
}
declare function SuggestionCard({ icon, title, description }: SuggestionCardProps): import("react/jsx-runtime").JSX.Element;
export default SuggestionCard;
