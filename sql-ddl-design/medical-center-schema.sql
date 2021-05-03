-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.

-- Modify this code to update the DB schema diagram.
-- To reset the sample schema, replace everything with
-- two dots ('..' - without quotes).

CREATE TABLE "Centers" (
    "ID" int SERIAL PRIMARY KEY,
    "Name" string   NOT NULL,
    "Address1" string   NOT NULL,
    CONSTRAINT "pk_Centers" PRIMARY KEY (
        "ID"
     )
);

CREATE TABLE "Doctors" (
    "ID" int SERIAL PRIMARY KEY,
    "First_name" string   NOT NULL,
    "Last_name" string   NOT NULL,
    "DEA" charvar(15)   NOT NULL,
    CONSTRAINT "pk_Doctors" PRIMARY KEY (
        "ID"
     )
);

CREATE TABLE "Doctor_relations" (
    "ID" int SERIAL PRIMARY KEY,
    "Centers_ID" intger   NOT NULL,
    "MD_ID" intger   NOT NULL,
    CONSTRAINT "pk_Doctor_relations" PRIMARY KEY (
        "ID"
     )
);

CREATE TABLE "Patients_info" (
    "ID" int SERIAL PRIMARY KEY,
    "First_name" string   NOT NULL,
    "Last_name" string   NOT NULL,
    "Phone_number" string   NOT NULL,
    "Primary_MD" int   NOT NULL,
    CONSTRAINT "pk_Patients_info" PRIMARY KEY (
        "ID"
     )
);

CREATE TABLE "Diagnosis" (
    "ID" int SERIAL PRIMARY KEY,
    "Condition_name" string   NOT NULL,
    "Dia_code" string   NOT NULL,
    "PT_ID" int   NOT NULL,
    "Reviewing_MD" int   NOT NULL,
    CONSTRAINT "pk_Diagnosis" PRIMARY KEY (
        "Diagnosis_ID"
     )
);

ALTER TABLE "Doctor_relations" ADD CONSTRAINT "fk_Doctor_relations_Centers_ID" FOREIGN KEY("Centers_ID")
REFERENCES "Centers" ("ID");

ALTER TABLE "Doctor_relations" ADD CONSTRAINT "fk_Doctor_relations_MD_ID" FOREIGN KEY("MD_ID")
REFERENCES "Doctors" ("ID");

ALTER TABLE "Patients_info" ADD CONSTRAINT "fk_Patients_info_Primary_MD" FOREIGN KEY("Primary_MD")
REFERENCES "Doctor_relations" ("ID");

ALTER TABLE "Diagnosis" ADD CONSTRAINT "fk_Diagnosis_PT_ID" FOREIGN KEY("PT_ID")
REFERENCES "Patients_info" ("ID");

ALTER TABLE "Diagnosis" ADD CONSTRAINT "fk_Diagnosis_Reviewing_MD" FOREIGN KEY("Reviewing_MD")
REFERENCES "Doctor_relations" ("ID");

CREATE INDEX "idx_Centers_Name"
ON "Centers" ("Name");

