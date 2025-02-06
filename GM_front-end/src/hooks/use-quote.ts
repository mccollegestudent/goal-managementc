import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios-config";

type Quote = {
  quote: string;
  author: string;
  category: string;
};

export function useQuote() {
  const { data} = useQuery({
    queryKey: ["quote"],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get<Quote[]>("https://api.api-ninjas.com/v1/quotes", {
          headers: {
            'X-Api-Key': import.meta.env.VITE_QUOTE_API_KEY
          },
        
        });
        return response.data[0];
      } catch (err) {
        console.error("Failed to fetch quote:", err);
        throw err;
      }
    },
    staleTime: 1000 * 60 * 5, 
  });

  return {
    quote: data?.quote,
    author: data?.author,
    category: data?.category
  };
}