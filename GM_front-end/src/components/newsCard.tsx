import { Card, Skeleton } from "@mui/material";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { useNews } from "@/features/auth/hooks/use_news";

export function NewsCard() {
    const { data } = useNews();

    return <>
        <Card className="flex-1 rounded-xl shadow-sm">
            <div className="p-5 border-b-2" >
                <h1 className="text-lg font-bold">Recent News</h1>
            </div>
            <ScrollArea className="h-[200px]">
                <div className="flex flex-col space-y-4 p-4">
                    {data?.news
                        ? data.news.map((newsItem: any) => (
                            <figure
                                key={newsItem.id}
                                className="flex space-x-4 hover:bg-muted/50 p-2 rounded-lg transition-colors"
                            >
                                <img
                                    src={newsItem.image || '/api/placeholder/45/60'}
                                    className="aspect-[3/4] object-contain w-[105px] h-[105px] rounded-md"
                                    loading="lazy"
                                />
                                <div className="pt-2 text-muted-foreground flex-1">
                                    <h2 className="text-sm font-medium text-foreground line-clamp-2">{newsItem.title}</h2>
                                    <p className="text-xs line-clamp-2">{newsItem.description}</p>
                                    {newsItem.published && (
                                        <p className="text-xs mt-1 text-muted-foreground">
                                            {new Date(newsItem.published).toLocaleDateString()}
                                        </p>
                                    )}
                                </div>
                            </figure>
                        ))
                        :
                        Array.from({ length: 5 }).map((_, index) => (
                            <div key={index} className="flex space-x-4">
                                <Skeleton className="h-[60px] w-[45px] rounded-md" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-[200px]" />
                                    <Skeleton className="h-4 w-[160px]" />
                                </div>
                            </div>
                        ))}
                </div>
                <ScrollBar orientation="vertical" />
            </ScrollArea>
        </Card>
    </>
}