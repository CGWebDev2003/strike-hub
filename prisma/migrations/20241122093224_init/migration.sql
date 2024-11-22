-- CreateTable
CREATE TABLE "friends" (
    "id" SERIAL NOT NULL,
    "lastname" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "strikes" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "friends_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "friends_email_key" ON "friends"("email");
