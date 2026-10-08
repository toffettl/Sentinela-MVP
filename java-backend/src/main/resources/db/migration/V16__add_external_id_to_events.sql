ALTER TABLE events
    ADD COLUMN external_id UUID;

ALTER TABLE events
    ADD CONSTRAINT uk_events_external_id UNIQUE (external_id);
