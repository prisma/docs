-- AlterTable
ALTER TABLE "Feedback" ADD COLUMN     "feedback" TEXT,
ALTER COLUMN "userAgent" DROP NOT NULL,
ALTER COLUMN "ip" DROP NOT NULL;
