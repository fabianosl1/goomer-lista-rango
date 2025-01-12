-- CreateTable
CREATE TABLE "restaurants" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "picture" TEXT,

    CONSTRAINT "restaurants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "restaurant_addresses" (
    "id" SERIAL NOT NULL,
    "street" TEXT NOT NULL,
    "number" TEXT,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "zipcode" TEXT NOT NULL,
    "restaurant_id" INTEGER NOT NULL,

    CONSTRAINT "restaurant_addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "restaurant_schedules" (
    "id" SERIAL NOT NULL,
    "begin" TEXT NOT NULL,
    "end" TEXT NOT NULL,
    "day" TEXT NOT NULL,
    "restaurant_id" INTEGER NOT NULL,

    CONSTRAINT "restaurant_schedules_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "restaurant_addresses_restaurant_id_key" ON "restaurant_addresses"("restaurant_id");

-- AddForeignKey
ALTER TABLE "restaurant_addresses" ADD CONSTRAINT "restaurant_addresses_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "restaurant_schedules" ADD CONSTRAINT "restaurant_schedules_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
