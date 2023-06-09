-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "userType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lawyer" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "userId" INTEGER NOT NULL,
    "BarNumberId" INTEGER NOT NULL,
    "barNumberId" INTEGER NOT NULL,

    CONSTRAINT "Lawyer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Client" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "rg" VARCHAR(20) NOT NULL,
    "cpf" VARCHAR(11) NOT NULL,
    "phone" VARCHAR(11) NOT NULL,
    "birthday" TIMESTAMP(3) NOT NULL,
    "occupation" VARCHAR(100),
    "maritalStatus" VARCHAR(30),
    "nationality" VARCHAR(30),
    "birthPlace" VARCHAR(30),
    "userId" INTEGER NOT NULL,
    "addressId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "cep" VARCHAR(8),
    "street" VARCHAR(100),
    "city" VARCHAR(100),
    "state" VARCHAR(100),
    "number" VARCHAR(100),
    "neighborhood" VARCHAR(100),
    "complement" VARCHAR(100),

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" SERIAL NOT NULL,
    "token" TEXT,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BarNumber" (
    "id" SERIAL NOT NULL,
    "oab" TEXT NOT NULL,
    "state" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BarNumber_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LegalArea" (
    "id" SERIAL NOT NULL,
    "name" TEXT,

    CONSTRAINT "LegalArea_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LawSuite" (
    "id" SERIAL NOT NULL,
    "number" TEXT NOT NULL,
    "court" TEXT,
    "courtNumber" TEXT,
    "judge" TEXT,
    "finished" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "clientId" INTEGER NOT NULL,
    "LegalAreaId" INTEGER NOT NULL,
    "legalAreaId" INTEGER NOT NULL,

    CONSTRAINT "LawSuite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CaseProgress" (
    "id" SERIAL NOT NULL,
    "data" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "lawsuitId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "lawSuiteId" INTEGER NOT NULL,

    CONSTRAINT "CaseProgress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Lawyer_id_key" ON "Lawyer"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Client_id_key" ON "Client"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Client_cpf_key" ON "Client"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Address_id_key" ON "Address"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Session_id_key" ON "Session"("id");

-- CreateIndex
CREATE UNIQUE INDEX "BarNumber_id_key" ON "BarNumber"("id");

-- CreateIndex
CREATE UNIQUE INDEX "BarNumber_oab_key" ON "BarNumber"("oab");

-- CreateIndex
CREATE UNIQUE INDEX "LegalArea_id_key" ON "LegalArea"("id");

-- CreateIndex
CREATE UNIQUE INDEX "LegalArea_name_key" ON "LegalArea"("name");

-- CreateIndex
CREATE UNIQUE INDEX "LawSuite_id_key" ON "LawSuite"("id");

-- CreateIndex
CREATE UNIQUE INDEX "CaseProgress_id_key" ON "CaseProgress"("id");

-- AddForeignKey
ALTER TABLE "Lawyer" ADD CONSTRAINT "Lawyer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lawyer" ADD CONSTRAINT "Lawyer_barNumberId_fkey" FOREIGN KEY ("barNumberId") REFERENCES "BarNumber"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LawSuite" ADD CONSTRAINT "LawSuite_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LawSuite" ADD CONSTRAINT "LawSuite_legalAreaId_fkey" FOREIGN KEY ("legalAreaId") REFERENCES "LegalArea"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CaseProgress" ADD CONSTRAINT "CaseProgress_lawSuiteId_fkey" FOREIGN KEY ("lawSuiteId") REFERENCES "LawSuite"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CaseProgress" ADD CONSTRAINT "CaseProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
