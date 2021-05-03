-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.

-- Modify this code to update the DB schema diagram.
-- To reset the sample schema, replace everything with
-- two dots ('..' - without quotes).

CREATE TABLE "Teams" (
    "ID" int SERIAL PRIMARY KEY,
    "Name" String   NOT NULL,
    "Ranking" intger   NOT NULL,
    "League" String   NOT NULL,
    CONSTRAINT "pk_Teams" PRIMARY KEY (
        "ID"
     ),
    CONSTRAINT "uc_Teams_Ranking" UNIQUE (
        "Ranking"
    )
);

CREATE TABLE "Players" (
    "ID" int SERIAL PRIMARY KEY,
    "First_name" STRING   NULL,
    "Last_name" STRING   NULL,
    "TEAM" INT   NULL,
    CONSTRAINT "pk_Players" PRIMARY KEY (
        "ID"
     )
);

CREATE TABLE "Referees" (
    "ID" int SERIAL PRIMARY KEY,
    "First_name" STRING   NULL,
    "Last_name" STRING   NULL,
    CONSTRAINT "pk_Referees" PRIMARY KEY (
        "ID"
     )
);

CREATE TABLE "Matches" (
    "ID" int SERIAL PRIMARY KEY,
    "Home_team" INT   NOT NULL,
    "Away_team" INT   NOT NULL,
    "Referee_1" INT   NOT NULL,
    "Referee_2" INT   NOT NULL,
    "Referee_3" INT   NOT NULL,
    CONSTRAINT "pk_Matches" PRIMARY KEY (
        "ID"
     )
);

CREATE TABLE "Goals" (
    "ID" int SERIAL PRIMARY KEY,
    "Match_ID" INT   NULL,
    "Player_ID" INT   NULL,
    CONSTRAINT "pk_Goals" PRIMARY KEY (
        "ID"
     )
);

CREATE TABLE "Calander" (
    "ID" int SERIAL PRIMARY KEY,
    "Year" INT   NULL,
    "Start_date" DATE   NULL,
    "End_date" DATE   NULL,
    CONSTRAINT "pk_Calander" PRIMARY KEY (
        "ID"
     )
);

ALTER TABLE "Players" ADD CONSTRAINT "fk_Players_TEAM" FOREIGN KEY("TEAM")
REFERENCES "Teams" ("ID");

ALTER TABLE "Matches" ADD CONSTRAINT "fk_Matches_Home_team" FOREIGN KEY("Home_team")
REFERENCES "Teams" ("ID");

ALTER TABLE "Matches" ADD CONSTRAINT "fk_Matches_Away_team" FOREIGN KEY("Away_team")
REFERENCES "Teams" ("ID");

ALTER TABLE "Matches" ADD CONSTRAINT "fk_Matches_Referee_1" FOREIGN KEY("Referee_1")
REFERENCES "Referees" ("ID");

ALTER TABLE "Matches" ADD CONSTRAINT "fk_Matches_Referee_2" FOREIGN KEY("Referee_2")
REFERENCES "Referees" ("ID");

ALTER TABLE "Matches" ADD CONSTRAINT "fk_Matches_Referee_3" FOREIGN KEY("Referee_3")
REFERENCES "Referees" ("ID");

ALTER TABLE "Goals" ADD CONSTRAINT "fk_Goals_Match_ID" FOREIGN KEY("Match_ID")
REFERENCES "Matches" ("ID");

ALTER TABLE "Goals" ADD CONSTRAINT "fk_Goals_Player_ID" FOREIGN KEY("Player_ID")
REFERENCES "Players" ("ID");

