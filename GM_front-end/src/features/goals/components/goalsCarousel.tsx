import { Accordion, AccordionSummary } from "@mui/material";
import { useGoals } from "../hooks/use-goals";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface GoalsAccordionProps {
    onSelect: (selectedId: number) => void;
}

export function GoalsAccordion({ onSelect }: GoalsAccordionProps) {
    const { data, isLoading } = useGoals();
    const [selectedId, setSelectedId] = useState<number | null>(null);

    useEffect(() => {
        if (selectedId !== null) {
            onSelect(selectedId);
        }
    }, [selectedId, onSelect]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-[500px]">
                <div className="text-lg text-gray-500 animate-pulse">Loading goals...</div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {data?.map((goal) => {
                let goalClass = "cursor-pointer p-4 transition-colors duration-200 bg-white text-gray-700 hover:bg-gray-50";
                if (selectedId === goal.id) {
                    goalClass = "cursor-pointer p-4 transition-colors duration-200 bg-purple-50 text-purple-700 font-semibold";
                }

                return (
                    <Accordion
                        key={goal.id}
                        expanded={selectedId === goal.id}
                        onChange={() => setSelectedId(selectedId === goal.id ? null : goal.id)}
                        className="border border-gray-200 shadow-sm"
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={`panel-${goal.id}-content`}
                            id={`panel-${goal.id}-header`}
                            className={cn(goalClass)}
                        >
                            <span className="text-lg">{goal.objective}</span>
                        </AccordionSummary>

                    
                    </Accordion>
                );
            })}
        </div>
    );
}

export default GoalsAccordion;
