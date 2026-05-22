-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "nivel" TEXT NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Desafio" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "dificuldade" TEXT NOT NULL,
    "outputEsperado" TEXT NOT NULL,

    CONSTRAINT "Desafio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tentativa" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "desafioId" INTEGER NOT NULL,
    "quantidadeErros" INTEGER NOT NULL,

    CONSTRAINT "Tentativa_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- AddForeignKey
ALTER TABLE "Tentativa" ADD CONSTRAINT "Tentativa_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tentativa" ADD CONSTRAINT "Tentativa_desafioId_fkey" FOREIGN KEY ("desafioId") REFERENCES "Desafio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
