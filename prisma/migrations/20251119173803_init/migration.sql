-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('CPF', 'CNPJ');

-- CreateTable
CREATE TABLE "crops" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "crops_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "farms" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(255) NOT NULL,
    "city" VARCHAR(255) NOT NULL,
    "state" CHAR(2) NOT NULL,
    "total_area" DOUBLE PRECISION NOT NULL,
    "arable_area" DOUBLE PRECISION NOT NULL,
    "vegetation_area" DOUBLE PRECISION NOT NULL,
    "producer_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "farms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "farm_crops" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "farm_id" UUID NOT NULL,
    "crop_id" UUID NOT NULL,
    "harvest_id" UUID NOT NULL,

    CONSTRAINT "farm_crops_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "harvests" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(30) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "harvests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "producers" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(255) NOT NULL,
    "document" VARCHAR(14) NOT NULL,
    "document_type" "DocumentType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "producers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "crops_name_key" ON "crops"("name");

-- CreateIndex
CREATE UNIQUE INDEX "farm_crops_farm_id_crop_id_harvest_id_key" ON "farm_crops"("farm_id", "crop_id", "harvest_id");

-- CreateIndex
CREATE UNIQUE INDEX "harvests_name_key" ON "harvests"("name");

-- CreateIndex
CREATE UNIQUE INDEX "producers_document_key" ON "producers"("document");

-- AddForeignKey
ALTER TABLE "farms" ADD CONSTRAINT "farms_producer_id_fkey" FOREIGN KEY ("producer_id") REFERENCES "producers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "farm_crops" ADD CONSTRAINT "farm_crops_farm_id_fkey" FOREIGN KEY ("farm_id") REFERENCES "farms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "farm_crops" ADD CONSTRAINT "farm_crops_crop_id_fkey" FOREIGN KEY ("crop_id") REFERENCES "crops"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "farm_crops" ADD CONSTRAINT "farm_crops_harvest_id_fkey" FOREIGN KEY ("harvest_id") REFERENCES "harvests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
