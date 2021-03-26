-- CreateTable
CREATE TABLE "user_account" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "user_id" UUID NOT NULL,
    "account_name" VARCHAR(50) NOT NULL,
    "account_number" VARCHAR(50) NOT NULL,
    "account_bank" VARCHAR(50) NOT NULL,
    "created_at" VARCHAR(50) NOT NULL,
    "updated_at" VARCHAR(50),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_card" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "user_id" UUID NOT NULL,
    "card_name" VARCHAR(50) NOT NULL,
    "card_number" VARCHAR(50) NOT NULL,
    "card_cvv" VARCHAR(50) NOT NULL,
    "card_expiry" VARCHAR(50) NOT NULL,
    "created_at" VARCHAR(50) NOT NULL,
    "updated_at" VARCHAR(50),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "first_name" VARCHAR(50) NOT NULL,
    "last_name" VARCHAR(50) NOT NULL,
    "phone_number" VARCHAR(50) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "corporate_id" VARCHAR(50),
    "gender" VARCHAR(50) NOT NULL,
    "bvn" VARCHAR(50) NOT NULL,
    "user_type" VARCHAR(50) NOT NULL,
    "created_at" VARCHAR(50) NOT NULL,
    "updated_at" VARCHAR(50),
    "password" VARCHAR(1050) NOT NULL,
    "pin" VARCHAR(1050) NOT NULL,
    "last_login" VARCHAR(50),
    "modified" VARCHAR(500),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "corporate_entity" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" VARCHAR(50) NOT NULL,
    "phone_number" VARCHAR(50) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "created_at" VARCHAR(50) NOT NULL,
    "updated_at" VARCHAR(50),
    "modified" VARCHAR(500),

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "fkidx_32" ON "user_account"("user_id");

-- CreateIndex
CREATE INDEX "fkidx_26" ON "user_card"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "users.email_unique" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users.corporate_id_unique" ON "users"("corporate_id");

-- CreateIndex
CREATE UNIQUE INDEX "corporate_entity.email_unique" ON "corporate_entity"("email");

-- AddForeignKey
ALTER TABLE "user_account" ADD FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_card" ADD FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
