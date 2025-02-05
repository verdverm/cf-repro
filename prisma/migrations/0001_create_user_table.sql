-- CreateTable
CREATE TABLE "user" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "did" TEXT NOT NULL,
    "handle" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "user_did_key" ON "user"("did");

-- CreateIndex
CREATE UNIQUE INDEX "user_handle_key" ON "user"("handle");
