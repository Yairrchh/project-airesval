-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NewSheet" (
    "id" SERIAL NOT NULL,
    "typeTheEquipment" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "capacity" TEXT NOT NULL,
    "serial" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "ifm" TEXT,
    "ofm" TEXT,
    "evaporatorOutletTemp" TEXT,
    "capacitorOutletTemp" TEXT,
    "compressorComsumption" TEXT,
    "equipmentComsumption" TEXT,
    "returnPressure" TEXT,
    "dischargePresure" TEXT,
    "refrigerantType" TEXT,
    "evaporatorStatus" TEXT,
    "capacitorStatus" TEXT,
    "mttoPre" TEXT,
    "technicalReport" TEXT,
    "recommendations" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NewSheet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" SERIAL NOT NULL,
    "newSheetId" INTEGER NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_newSheetId_fkey" FOREIGN KEY ("newSheetId") REFERENCES "NewSheet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
