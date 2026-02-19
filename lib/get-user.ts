import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

export default async function getUserEmail() {
  //change this eventually to Id
  const user = await getServerSession(authOptions);
  if (user) {
    return user.user?.email;
  }
  return null;
}
