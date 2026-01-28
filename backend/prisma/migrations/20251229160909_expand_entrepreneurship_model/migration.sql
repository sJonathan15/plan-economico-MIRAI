-- AlterTable
ALTER TABLE "entrepreneurships" ADD COLUMN     "activitiesStartDate" TIMESTAMP(3),
ADD COLUMN     "addressCanton" TEXT,
ADD COLUMN     "addressComplete" TEXT,
ADD COLUMN     "addressParish" TEXT,
ADD COLUMN     "addressProvince" TEXT,
ADD COLUMN     "brand" TEXT,
ADD COLUMN     "commercialChannels" TEXT,
ADD COLUMN     "communicationChannels" TEXT,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "hasRuc" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "keyPartners" TEXT,
ADD COLUMN     "logoUrl" TEXT,
ADD COLUMN     "mobile" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "representativeAge" INTEGER,
ADD COLUMN     "representativeBirthDate" TIMESTAMP(3),
ADD COLUMN     "representativeGender" TEXT,
ADD COLUMN     "representativeId" TEXT,
ADD COLUMN     "representativeName" TEXT,
ADD COLUMN     "representativeNationality" TEXT,
ADD COLUMN     "supplyChainClient" TEXT,
ADD COLUMN     "supplyChainDistribution" TEXT,
ADD COLUMN     "supplyChainImageUrl" TEXT,
ADD COLUMN     "supplyChainProduction" TEXT,
ADD COLUMN     "supplyChainProviders" TEXT,
ADD COLUMN     "supplyChainStorage" TEXT,
ADD COLUMN     "supplyChainType" TEXT,
ADD COLUMN     "valueProposition" TEXT;

-- AlterTable
ALTER TABLE "usuarios_semillas" ADD COLUMN     "coverImage" TEXT,
ADD COLUMN     "profileImage" TEXT;

-- CreateTable
CREATE TABLE "team_members" (
    "id" SERIAL NOT NULL,
    "entrepreneurshipId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "experience" TEXT,
    "role" TEXT NOT NULL,

    CONSTRAINT "team_members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customer_segments" (
    "id" SERIAL NOT NULL,
    "entrepreneurshipId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "percentage" INTEGER,
    "ageRange" TEXT,
    "socioeconomicLevel" TEXT,
    "characteristics" TEXT,

    CONSTRAINT "customer_segments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "team_members" ADD CONSTRAINT "team_members_entrepreneurshipId_fkey" FOREIGN KEY ("entrepreneurshipId") REFERENCES "entrepreneurships"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer_segments" ADD CONSTRAINT "customer_segments_entrepreneurshipId_fkey" FOREIGN KEY ("entrepreneurshipId") REFERENCES "entrepreneurships"("id") ON DELETE CASCADE ON UPDATE CASCADE;
