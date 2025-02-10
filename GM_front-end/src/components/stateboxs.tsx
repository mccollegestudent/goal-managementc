import { Box, Card, CardContent} from "@mui/material";

interface StatBoxProps {
    title: string;
    value: string | number;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    iconClassName?: string;
}

export function StatBox({title, value, description, icon:Icon, iconClassName}:StatBoxProps){
    return <>
        <Card className="flex-1 p-6 rounded-xl shadow-sm">
            <CardContent className="space-y-2">
                <Box className="flex flex-row items-center justify-between">
                    <h1 className="text-lg font-bold">{title}</h1>
                    <Icon className={`w-8 h-8 ${iconClassName}`} />
                </Box>
                <h3 className="text-2xl font-bold">{value}</h3>
                <p className="text-gray-600 text-sm">{description}</p>
            </CardContent>
        </Card>
    </>
}