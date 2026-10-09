import type { AxiosInstance } from "axios";
import type { EventRequest, EventUpdateRequest, EventResponse } from "../@types";
import type { EventRepository } from "./EventRepository";

export class EventService implements EventRepository {
  private httpServiceAcessClient: AxiosInstance;

  constructor(api: AxiosInstance) {
    this.httpServiceAcessClient = api;
  }

  public async createEvent(event_data: EventRequest
  ): Promise<EventResponse> {
    const response = await this.httpServiceAcessClient.post(
      `/events/`, event_data
    );
    return response.data;
  }

  public async findEventById(eventId: string): Promise<EventResponse> {
    const response = await this.httpServiceAcessClient.get(
      `/events/${eventId}`
    );
    return response.data;
  }

//   public async deleteEvent(userId: string) : Promise<EventResponse> {
//     const response = await this.httpServiceAcessClient.get(
//       `/events/${userId}`
//     );
//     return response.data;
//   }

  public async updateEvent(event_id: string, event_data: EventUpdateRequest): Promise<EventResponse> {
    const response = await this.httpServiceAcessClient.put(
      `/events/${event_id}`, event_data
    );
    return response.data;
  }
}
