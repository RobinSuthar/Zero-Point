"use server";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import getUserEmail from "./get-user";

export async function createIssue(formData: FormData) {
  // Create a new post
  // ...
  // Redirect to the new post
  const rawFormData = {
    title: formData.get("title"),
    description: formData.get("description"),
    location: formData.get("location"),
    timeperiod: formData.get("timeperiod"),
    picture: formData.get("picture"),
    label: formData.get("label"),
    authoritiesTagged: formData.get("authoritiesTagged"),
  };
  const userEmail = await getUserEmail();
  if (userEmail) {
    const result = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });

    if (result) {
      const newIssue = await prisma.issues.create({
        data: {
          userId: result.id,
          title: rawFormData.title?.toString() || "error",
          description: rawFormData.description?.toString() || "error",
          location: rawFormData.location?.toString() || "error",
          label: rawFormData.label?.toString() || "error",
          issueTimestamp: new Date().toISOString(),
          raisedUp: 1,
          raisedDown: 0,
          authoritiesTagged:
            rawFormData.authoritiesTagged?.toString() || "error",
          picture: "userwillpostthesepcitures",
        },
      });

      console.log("new Issue", newIssue);
    }

    console.log(result);
  }

  console.log("logic to add goes here");
  //if sucess redirect them to dashboard page
}
