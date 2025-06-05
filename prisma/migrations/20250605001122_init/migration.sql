-- CreateTable
CREATE TABLE "OrdemServico" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "descricao" TEXT NOT NULL,
    "assinaturaTecnico" TEXT,
    "assinaturaGestor" TEXT,
    "dataAssinaturaTecnico" DATETIME,
    "dataAssinaturaGestor" DATETIME
);
