-- CreateEnum
CREATE TYPE "public"."Sentiment" AS ENUM ('Happy', 'Unhappy');

-- CreateTable
CREATE TABLE "Feedback" (
"id" SERIAL,
    "pageUrl" TEXT NOT NULL,
    "userAgent" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "sentiment" "Sentiment" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);
