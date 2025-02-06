import { useQuery } from "@tanstack/react-query";

export function useNews(){
    const api_key = import.meta.env.VITE_NEWS_API_KEY;

    return useQuery({
        queryKey: ["latest-news"],
        queryFn: async() =>{
            try{
                const resp = await fetch('https://api.currentsapi.services/v1/latest-news', {
                    headers:{
                        Authorization: api_key,
                    }
                });
                const data = await resp.json();
                return data;
            }catch(error){
                console.error("news fetch error:",error);
                throw error;
            }
        },
        staleTime: 1000 *60*5,
        gcTime:1000 *60*10,
        refetchOnWindowFocus:false,
        refetchOnReconnect:false,
    });
}
