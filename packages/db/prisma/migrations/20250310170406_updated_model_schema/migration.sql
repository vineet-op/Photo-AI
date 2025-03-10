-- CreateEnum
CREATE TYPE "modelTrainingEnum" AS ENUM ('Pending', 'Generated', 'Success');

-- AlterTable
ALTER TABLE "Model" ADD COLUMN     "falAiRequestId" TEXT,
ADD COLUMN     "tensorPath" TEXT,
ADD COLUMN     "trainingStatus" "modelTrainingEnum" NOT NULL DEFAULT 'Pending',
ADD COLUMN     "triggerWord" TEXT;

-- AlterTable
ALTER TABLE "OutputImages" ADD COLUMN     "falAiRequestId" TEXT;
