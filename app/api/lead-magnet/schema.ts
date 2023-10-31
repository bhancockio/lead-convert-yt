import { z } from "zod";

export const leadMagnetCreateRequest = z.object({
  name: z.string({ required_error: "Name is required" }),
  status: z.string({ required_error: "Status is required" }),
  draftBody: z.string({ required_error: "Draft body is required" }),
  draftTitle: z.string({ required_error: "Draft title is required" }),
  draftSubtitle: z.string({ required_error: "Draft subtitle is required" }),
  draftPrompt: z.string({ required_error: "Draft prompt is required" }),
  draftFirstQuestion: z.string({
    required_error: "Draft first question is required",
  }),
  publishedBody: z.string({ required_error: "Published body is required" }),
  publishedTitle: z.string({ required_error: "Published title is required" }),
  publishedSubtitle: z.string({
    required_error: "Published subtitle is required",
  }),
  publishedPrompt: z.string({ required_error: "Published prompt is required" }),
  publishedFirstQuestion: z.string({
    required_error: "Published first question is required",
  }),
  draftEmailCapture: z.string({
    required_error: "Draft email capture is required",
  }),
  publishedEmailCapture: z.string({
    required_error: "Published email capture is required",
  }),
  slug: z.string({ required_error: "Slug is required" }),
});

export const leadMagnetUpdateRequest = leadMagnetCreateRequest.extend({
  id: z.string({ required_error: "Id is required" }),
  userId: z.string({ required_error: "User Id is required" }),
});
