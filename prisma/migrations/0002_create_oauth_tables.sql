-- CreateTable
CREATE TABLE "oauth_state" (
    "key" TEXT NOT NULL PRIMARY KEY,
    "state" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "oauth_session" (
    "key" TEXT NOT NULL PRIMARY KEY,
    "session" TEXT NOT NULL
);
