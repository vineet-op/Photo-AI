/*
  Warnings:

  - The values [Generated] on the enum `modelTrainingEnum` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "modelTrainingEnum_new" AS ENUM ('Pending', 'Fail', 'Success');
ALTER TABLE "Model" ALTER COLUMN "trainingStatus" DROP DEFAULT;
ALTER TABLE "Model" ALTER COLUMN "trainingStatus" TYPE "modelTrainingEnum_new" USING ("trainingStatus"::text::"modelTrainingEnum_new");
ALTER TYPE "modelTrainingEnum" RENAME TO "modelTrainingEnum_old";
ALTER TYPE "modelTrainingEnum_new" RENAME TO "modelTrainingEnum";
DROP TYPE "modelTrainingEnum_old";
ALTER TABLE "Model" ALTER COLUMN "trainingStatus" SET DEFAULT 'Pending';
COMMIT;
