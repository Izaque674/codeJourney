-- CreateTable
CREATE TABLE "CasoTeste" (
    "id" SERIAL NOT NULL,
    "input" TEXT NOT NULL,
    "esperado" TEXT NOT NULL,
    "desafioId" INTEGER NOT NULL,

    CONSTRAINT "CasoTeste_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CasoTeste" ADD CONSTRAINT "CasoTeste_desafioId_fkey" FOREIGN KEY ("desafioId") REFERENCES "Desafio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
