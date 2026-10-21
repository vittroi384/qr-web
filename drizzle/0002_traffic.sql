CREATE TABLE "crawler_daily" (
	"day" date NOT NULL,
	"crawler" text NOT NULL,
	"count" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "crawler_daily_day_crawler_pk" PRIMARY KEY("day","crawler")
);
--> statement-breakpoint
CREATE TABLE "source_daily" (
	"day" date NOT NULL,
	"locale" text NOT NULL,
	"source" text NOT NULL,
	"count" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "source_daily_day_locale_source_pk" PRIMARY KEY("day","locale","source")
);
--> statement-breakpoint
ALTER TABLE "qr_logs" ADD COLUMN "source" text;