-- CreateTable
CREATE TABLE "card_verification" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "user_id" VARCHAR(200) NOT NULL,
    "authorization_url" VARCHAR(200) NOT NULL,
    "access_code" VARCHAR(200) NOT NULL,
    "reference" VARCHAR(200) NOT NULL,
    "verified" BOOLEAN,
    "created_at" VARCHAR(50) NOT NULL,
    "updated_at" VARCHAR(50),
    "modified" VARCHAR(500),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "card_authorization" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "user_id" VARCHAR(200) NOT NULL,
    "authorization_code" VARCHAR(50) NOT NULL,
    "card_type" VARCHAR(50) NOT NULL,
    "last4" VARCHAR(4) NOT NULL,
    "exp_month" VARCHAR(3) NOT NULL,
    "exp_year" VARCHAR(4) NOT NULL,
    "bin" VARCHAR(6) NOT NULL,
    "bank" VARCHAR(50) NOT NULL,
    "channel" VARCHAR(50) NOT NULL,
    "signature" VARCHAR(50) NOT NULL,
    "reusable" VARCHAR(50) NOT NULL,
    "country_code" VARCHAR(50) NOT NULL,
    "account_name" VARCHAR(50) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transfer_recipient" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "user_id" VARCHAR(200) NOT NULL,
    "type" VARCHAR(50) NOT NULL,
    "account_number" VARCHAR(11) NOT NULL,
    "bank_code" VARCHAR(3) NOT NULL,
    "currency" VARCHAR(5) NOT NULL,
    "created_at" VARCHAR(50) NOT NULL,
    "updated_at" VARCHAR(50),
    "modified" VARCHAR(500),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "loan" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "user_id" VARCHAR(200) NOT NULL,
    "loan_amount" VARCHAR(50) NOT NULL,
    "due_date" VARCHAR(50) NOT NULL,
    "created_at" VARCHAR(50) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "card_verification.user_id_unique" ON "card_verification"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "card_verification.reference_unique" ON "card_verification"("reference");

-- CreateIndex
CREATE UNIQUE INDEX "card_authorization.user_id_unique" ON "card_authorization"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "card_authorization.authorization_code_unique" ON "card_authorization"("authorization_code");

-- CreateIndex
CREATE UNIQUE INDEX "transfer_recipient.user_id_unique" ON "transfer_recipient"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "transfer_recipient.account_number_unique" ON "transfer_recipient"("account_number");

-- CreateIndex
CREATE UNIQUE INDEX "loan.user_id_unique" ON "loan"("user_id");
