-- CreateTable
CREATE TABLE "Kurakke" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Kurakke_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KurakkeChild" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "kurakkeId" TEXT NOT NULL,

    CONSTRAINT "KurakkeChild_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "KurakkeChild" ADD CONSTRAINT "KurakkeChild_kurakkeId_fkey" FOREIGN KEY ("kurakkeId") REFERENCES "Kurakke"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
