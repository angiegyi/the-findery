-- Waitlist table for email collection
CREATE TABLE IF NOT EXISTS public.waitlist (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    synced_to_beehiv BOOLEAN DEFAULT false,
    beehiv_subscriber_id TEXT
);

-- Add index for faster email lookups
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON public.waitlist(email);

-- Add index for synced status
CREATE INDEX IF NOT EXISTS idx_waitlist_synced ON public.waitlist(synced_to_beehiv);

-- Enable Row Level Security
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (for public waitlist signup)
CREATE POLICY "Allow public insert" ON public.waitlist
    FOR INSERT
    WITH CHECK (true);

-- Only allow authenticated users to view waitlist
CREATE POLICY "Allow authenticated read" ON public.waitlist
    FOR SELECT
    USING (auth.role() = 'authenticated');
