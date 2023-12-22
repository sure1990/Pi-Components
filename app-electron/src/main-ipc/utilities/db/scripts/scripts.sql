
CREATE TABLE "tbl_Key_Master" (
	"id"	INTEGER NOT NULL,
	"name"	INTEGER NOT NULL UNIQUE,
	"keys"	TEXT NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
)

CREATE TABLE "tbl_Key_Frame_Master" (
	"frame_id"	INTEGER NOT NULL UNIQUE,
	"frame_key_id"	TEXT NOT NULL,
	PRIMARY KEY("frame_id" AUTOINCREMENT),
	FOREIGN KEY("frame_key_id") REFERENCES tbl_Key_Master(id) ON DELETE RESTRICT
)

CREATE TABLE "tbl_Key_Frames_Join" (
	"id"	INTEGER NOT NULL,
	"frame_id"	INTEGER,
	"start"	NUMERIC NOT NULL,
	"end"	INTEGER NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("frame_id") REFERENCES tbl_Key_Frame_Master(frame_id) ON DELETE CASCADE
)

