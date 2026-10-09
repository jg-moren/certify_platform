
import type { EventRequest, EventResponse } from "@/api/@types"
import { eventServiceInstance } from "@/api/implements"

import { useMutation } from "@tanstack/react-query"
import type { AxiosError } from "axios"
import { toast } from "react-toastify"
import { TOAST_STYLES } from "@/pages/ToastStyleContainer"

export const useCreateEvent = () =>  {

  const queryFn = eventServiceInstance

  const mutateData = async ({event_data}: {event_data:EventRequest}): Promise<EventResponse> => {
    const res = await queryFn.createEvent(event_data);
    return res;
  };

  return useMutation({
    mutationFn : mutateData,

    onSuccess : (data) => { 

      console.log("Event created successfully!", data);


       toast.success('Certificado Disponivel', {
            position: "top-center",
            autoClose: 5000,
            ...TOAST_STYLES.success
          })
      
    },
    onError : (error: AxiosError<{ message?: string }>) => {
      const errorMessage =
    (error.response?.data as { message?: string })?.message ||
    error.message ||
    "Ocorreu um erro inesperado.";
    console.log(error)

  toast.error(errorMessage, {
    position: "top-center",
    autoClose: 5000,
    ...TOAST_STYLES.error,
  });

    }
  })

}
