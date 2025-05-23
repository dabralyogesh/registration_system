// registrationService.ts

import { Registration } from "@/types/types";

export const registrationService = {
  getAllRegistrations: async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/registrations`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch registrations");
    }
    const data = await response.json();
    return data;
  },
  deleteRegistrations: async (id: string) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/registrations/${id}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to delete registration");
    }
    const data = await response.json();
    return data;
  },
  updateRegistration: async (id: string, registration: Registration) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/registrations/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registration),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to update registration");
    }
    const data = await response.json();
    return data;
  },
};
