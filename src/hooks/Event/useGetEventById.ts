import type { EventResponse } from "@/api/@types";
import { eventServiceInstance } from "@/api/implements";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";


export function useGetEventById(event_id : string) {

    return useQuery<EventResponse, AxiosError>({

        enabled: !!event_id,

        queryKey: ['event', 'get_id', event_id],

        queryFn: async () => {

            const response = await eventServiceInstance.findEventById(event_id);

            return response;
        },

        staleTime: 1000 * 60 * 5, // 5 minutos

    });

}