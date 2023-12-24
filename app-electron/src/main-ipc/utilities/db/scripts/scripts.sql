CREATE TABLE IF NOT EXISTS "sys_Key_Master" (
	"id" INTEGER NOT NULL,
	"name" INTEGER UNIQUE,
	"key" TEXT NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);

CREATE TABLE IF NOT EXISTS "sys_Trigger_Master" (
	"id" INTEGER,
	"name" TEXT,
	"pin_no" INTEGER NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);

CREATE TABLE IF NOT EXISTS "cfg_Trigger_To_Key_Map" (
	"trigger_id" INTEGER NOT NULL,
	"key_id" INTEGER NOT NULL,
	FOREIGN KEY("key_id") REFERENCES sys_Key_Master(id),
	FOREIGN KEY("trigger_id") REFERENCES sys_Trigger_Master(id),
	PRIMARY KEY("trigger_id", "key_id")
);

CREATE TABLE IF NOT EXISTS "cfg_Music_Tracks_Master" (
	"id" INTEGER NOT NULL,
	"trigger_id" INTEGER,
	"music_id" INTEGER NOT NULL,
	FOREIGN KEY("trigger_id") REFERENCES sys_Trigger_Master(id),
	PRIMARY KEY("id" AUTOINCREMENT)
);

CREATE TABLE IF NOT EXISTS "cfg_Track_Frames_Map" (
	"track_id" INTEGER NOT NULL,
	"start" NUMERIC NOT NULL,
	"end" NUMERIC NOT NULL,
	FOREIGN KEY("track_id") REFERENCES cfg_Music_Tracks_Master(id),
	PRIMARY KEY("track_id")
);