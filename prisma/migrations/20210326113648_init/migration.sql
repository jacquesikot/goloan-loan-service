-- CreateTable
CREATE TABLE "card_verification" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "user_id" VARCHAR(200) NOT NULL,
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
