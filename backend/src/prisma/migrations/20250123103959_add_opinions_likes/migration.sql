-- CreateTable
CREATE TABLE "OpinionsLike" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "opinionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "OpinionsLike_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OpinionsLike_opinionId_userId_key" ON "OpinionsLike"("opinionId", "userId");

-- AddForeignKey
ALTER TABLE "OpinionsLike" ADD CONSTRAINT "OpinionsLike_opinionId_fkey" FOREIGN KEY ("opinionId") REFERENCES "Opinion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OpinionsLike" ADD CONSTRAINT "OpinionsLike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
