CREATE TABLE "funnel_daily" (
	"day" date NOT NULL,
	"locale" text NOT NULL,
	"qr_type" text NOT NULL,
	"step" text NOT NULL,
	"count" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "funnel_daily_day_locale_qr_type_step_pk" PRIMARY KEY("day","locale","qr_type","step")
);
--> statement-breakpoint
ALTER TABLE "qr_logs" ADD COLUMN "locale" text;--> statement-breakpoint
ALTER TABLE "qr_logs" ADD COLUMN "page" text;