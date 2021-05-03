-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.

-- Modify this code to update the DB schema diagram.
-- To reset the sample schema, replace everything with
-- two dots ('..' - without quotes).

CREATE TABLE "Region" (
    "ID" int SERIAL PRIMARY KEY,
    "Name" string   NOT NULL,
    CONSTRAINT "pk_Region" PRIMARY KEY (
        "ID"
     )
);

CREATE TABLE "Users" (
    "ID" int SERIAL PRIMARY KEY,
    "Name" charvar(15)   NOT NULL,
    "Password" charvar(50)   NOT NULL,
    "Primary_region" int   NOT NULL,
    CONSTRAINT "pk_Users" PRIMARY KEY (
        "ID","Name"
     )
);

CREATE TABLE "Posts" (
    "ID" int SERIAL PRIMARY KEY,
    "Region" interger   NULL,
    "Location" string   NULL,
    "Title" charvar(50)   NULL,
    "Description" charvar(5000)   NULL,
    "Posting_user" Interger   NULL,
    "Cat_ID" interger   NULL
);

CREATE TABLE "Catergories" (
    "ID" int SERIAL PRIMARY KEY,
    "Cat_name" string   NOT NULL,
    CONSTRAINT "pk_Catergories" PRIMARY KEY ("ID","Cat_name")
);

ALTER TABLE "Users" ADD CONSTRAINT "fk_Users_Primary_region" FOREIGN KEY("Primary_region")
REFERENCES "Region" ("ID");

ALTER TABLE "Posts" ADD CONSTRAINT "fk_Posts_Region" FOREIGN KEY("Region")
REFERENCES "Region" ("ID");

ALTER TABLE "Posts" ADD CONSTRAINT "fk_Posts_Posting_user" FOREIGN KEY("Posting_user")
REFERENCES "Users" ("ID");

ALTER TABLE "Posts" ADD CONSTRAINT "fk_Posts_Cat_ID" FOREIGN KEY("Cat_ID")
REFERENCES "Catergories" ("ID");

CREATE INDEX "idx_Region_Name"
ON "Region" ("Name");

CREATE INDEX "idx_Posts_Title"
ON "Posts" ("Title");

