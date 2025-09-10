import type { ReactNode } from "react";

interface SuggestionCardProps {
    icon: ReactNode;
    title: string;
    description: string;
}

function SuggestionCard({ icon, title, description }: SuggestionCardProps) {
    return (
        <div className="suggestion-card bg-black p-4 rounded-3">
            <div className="icon">{icon}</div>
            <h3 className="text-light text-center">{title}</h3>
            <p className="text-secondary">{description}</p>
        </div>
    );
}

export default SuggestionCard;
