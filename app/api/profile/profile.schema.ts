import { z } from "zod";

export const profileCreateRequest = z.object({
  title: z.string({ required_error: "Title is required" }),
  description: z.string({ required_error: "Description is required" }),
  profileImageUrl: z.string({ required_error: "Profile image is required" }),
});

export const profileUpdateRequest = profileCreateRequest.extend({
  id: z.string({ required_error: "ID is required" }),
  userId: z.string({ required_error: "User ID is required" }),
});
