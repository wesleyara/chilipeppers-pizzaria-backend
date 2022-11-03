-- CreateTable
CREATE TABLE "Item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "priceSmall" REAL NOT NULL,
    "priceMedium" REAL NOT NULL,
    "priceLarge" REAL NOT NULL,
    "priceXLarge" REAL NOT NULL
);
