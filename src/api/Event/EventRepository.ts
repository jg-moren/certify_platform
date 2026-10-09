import type { EventRequest, EventUpdateRequest, EventResponse } from "../@types";

export interface EventRepository {
  createEvent : (event_data: EventRequest) => Promise<EventResponse>;
  findEventById : (eventId: string) => Promise<EventResponse>;
  //deleteEvent : (userId: string) => Promise<EventResponse>; // Nao implementado no back
  updateEvent : (event_id: string, event_data: EventUpdateRequest) => Promise<EventResponse>;
}