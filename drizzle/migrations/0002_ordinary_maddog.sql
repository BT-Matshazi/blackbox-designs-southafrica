CREATE TABLE "media" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"pathname" varchar(500) NOT NULL,
	"url" varchar(1000) NOT NULL,
	"name" varchar(200) NOT NULL,
	"alt" varchar(500),
	"size" integer DEFAULT 0 NOT NULL,
	"content_type" varchar(100),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "media_pathname_unique" UNIQUE("pathname")
);
--> statement-breakpoint
CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");