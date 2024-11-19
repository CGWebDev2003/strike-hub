-- CreateTable
CREATE TABLE "Friends" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "strikes" INTEGER NOT NULL,

    CONSTRAINT "Friends_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Friends_email_key" ON "Friends"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Friends_phone_key" ON "Friends"("phone");
