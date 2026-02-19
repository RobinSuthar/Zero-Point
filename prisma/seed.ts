import { PrismaClient, Prisma } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";
import { v4 as uuidv4 } from "uuid";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

const userData: Prisma.UserCreateInput[] = [
  {
    name: "Alice",
    email: "alice@prisma.io",
    image:
      "https://fastly.picsum.photos/id/757/200/200.jpg?hmac=63cyrpvD1Rfu-liH-cup8mezZlu53E5a-3bzcknXxxk",
    id: uuidv4(),
  },
  {
    name: "Bob",
    email: "bob@prisma.io",
    image:
      "https://fastly.picsum.photos/id/1061/200/200.jpg?hmac=PiYsc13E4RCmWNhJHpV_tSaL3hzcJl4pkKtDXmQJ_uI",
    id: uuidv4(),
  },
];

export async function main() {
  for (const u of userData) {
    await prisma.user.create({ data: u });
  }
}

main();
