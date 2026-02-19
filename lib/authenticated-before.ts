import prisma from "@/lib/prisma";

export default async function authenticatedBefore({
  userEmail,
}: {
  userEmail: string | null | undefined;
}) {
  if (userEmail) {
    const result = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });
    if (!result) {
      return false;
    }
    return true;
  }
  return false;
}
