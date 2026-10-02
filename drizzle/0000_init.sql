CREATE TABLE "admin_audit" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"action" text NOT NULL,
	"key" text,
	"old_value" text,
	"new_value" text,
	"ip" text,
	"user_agent" text
);
--> statement-breakpoint
CREATE TABLE "qr_logs" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"qr_type" text NOT NULL,
	"event" text NOT NULL,
	"payload_json" jsonb NOT NULL,
	"encoded_preview" text,
	"options_json" jsonb,
	"ip" text,
	"user_agent" text,
	"referer" text,
	"accept_language" text
);
--> statement-breakpoint
CREATE TABLE "settings" (
	"key" text PRIMARY KEY NOT NULL,
	"value" text NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "idx_admin_audit_created" ON "admin_audit" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "idx_qr_logs_created" ON "qr_logs" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "idx_qr_logs_type" ON "qr_logs" USING btree ("qr_type");