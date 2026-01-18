-- Findery Supabase GraphQL Schema
-- Generated from PRD.md requirements

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =============================================
-- AUTH EXTENSIONS
-- =============================================

-- Extend auth.users for additional user fields
CREATE TABLE public.user_profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    name TEXT NOT NULL,
    bio TEXT,
    avatar_url TEXT,
    style_tags TEXT[] DEFAULT '{}',
    followers_count INTEGER DEFAULT 0,
    following_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Vendor profiles (separate from user profiles)
CREATE TABLE public.vendors (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    logo_url TEXT,
    description TEXT,
    website TEXT,
    tier TEXT CHECK (tier IN ('free', 'featured')) DEFAULT 'free',
    tags TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- CORE ENTITIES
-- =============================================

-- Products table
CREATE TABLE public.products (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    vendor_id UUID REFERENCES public.vendors(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    image_url TEXT NOT NULL,
    category TEXT,
    tags TEXT[] DEFAULT '{}',
    link TEXT NOT NULL,
    popularity_score DECIMAL(5,4) DEFAULT 0.0,
    status TEXT CHECK (status IN ('pending', 'approved')) DEFAULT 'pending',
    sku TEXT,
    description TEXT,
    stock_quantity INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Boards/Wishlists table
CREATE TABLE public.boards (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    is_public BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Board items (many-to-many relationship between boards and products)
CREATE TABLE public.board_items (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    board_id UUID REFERENCES public.boards(id) ON DELETE CASCADE NOT NULL,
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
    added_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(board_id, product_id)
);

-- =============================================
-- SOCIAL FEATURES
-- =============================================

-- User interactions (likes, saves, views)
CREATE TABLE public.interactions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
    action TEXT CHECK (action IN ('like', 'save', 'view')) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, product_id, action)
);

-- User follows (following other users)
CREATE TABLE public.user_follows (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    follower_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    following_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(follower_id, following_id),
    CHECK (follower_id != following_id)
);

-- User follows vendors
CREATE TABLE public.vendor_follows (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    vendor_id UUID REFERENCES public.vendors(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, vendor_id)
);

-- Board likes/comments
CREATE TABLE public.board_interactions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    board_id UUID REFERENCES public.boards(id) ON DELETE CASCADE NOT NULL,
    action TEXT CHECK (action IN ('like', 'comment')) NOT NULL,
    comment_text TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, board_id, action)
);

-- =============================================
-- RECOMMENDATION SYSTEM
-- =============================================

-- Recommendations cache
CREATE TABLE public.recommendations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
    score DECIMAL(5,4) NOT NULL,
    generated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, product_id)
);

-- =============================================
-- MODERATION SYSTEM
-- =============================================

-- Moderation flags
CREATE TABLE public.moderation_flags (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
    vendor_id UUID REFERENCES public.vendors(id) ON DELETE CASCADE NOT NULL,
    reason TEXT NOT NULL,
    status TEXT CHECK (status IN ('flagged', 'reviewed', 'resolved')) DEFAULT 'flagged',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    reviewed_by UUID REFERENCES auth.users(id),
    reviewed_at TIMESTAMP WITH TIME ZONE
);

-- =============================================
-- INDEXES FOR PERFORMANCE
-- =============================================

-- User profiles indexes
CREATE INDEX idx_user_profiles_style_tags ON public.user_profiles USING GIN(style_tags);

-- Vendors indexes
CREATE INDEX idx_vendors_tier ON public.vendors(tier);
CREATE INDEX idx_vendors_tags ON public.vendors USING GIN(tags);
CREATE INDEX idx_vendors_user_id ON public.vendors(user_id);

-- Products indexes
CREATE INDEX idx_products_vendor_id ON public.products(vendor_id);
CREATE INDEX idx_products_status ON public.products(status);
CREATE INDEX idx_products_category ON public.products(category);
CREATE INDEX idx_products_tags ON public.products USING GIN(tags);
CREATE INDEX idx_products_popularity_score ON public.products(popularity_score DESC);
CREATE INDEX idx_products_created_at ON public.products(created_at DESC);
CREATE INDEX idx_products_price ON public.products(price);

-- Boards indexes
CREATE INDEX idx_boards_user_id ON public.boards(user_id);
CREATE INDEX idx_boards_is_public ON public.boards(is_public);
CREATE INDEX idx_boards_created_at ON public.boards(created_at DESC);

-- Board items indexes
CREATE INDEX idx_board_items_board_id ON public.board_items(board_id);
CREATE INDEX idx_board_items_product_id ON public.board_items(product_id);

-- Interactions indexes
CREATE INDEX idx_interactions_user_id ON public.interactions(user_id);
CREATE INDEX idx_interactions_product_id ON public.interactions(product_id);
CREATE INDEX idx_interactions_action ON public.interactions(action);
CREATE INDEX idx_interactions_created_at ON public.interactions(created_at DESC);

-- Follows indexes
CREATE INDEX idx_user_follows_follower_id ON public.user_follows(follower_id);
CREATE INDEX idx_user_follows_following_id ON public.user_follows(following_id);
CREATE INDEX idx_vendor_follows_user_id ON public.vendor_follows(user_id);
CREATE INDEX idx_vendor_follows_vendor_id ON public.vendor_follows(vendor_id);

-- Board interactions indexes
CREATE INDEX idx_board_interactions_user_id ON public.board_interactions(user_id);
CREATE INDEX idx_board_interactions_board_id ON public.board_interactions(board_id);

-- Recommendations indexes
CREATE INDEX idx_recommendations_user_id ON public.recommendations(user_id);
CREATE INDEX idx_recommendations_score ON public.recommendations(score DESC);
CREATE INDEX idx_recommendations_generated_at ON public.recommendations(generated_at DESC);

-- Moderation flags indexes
CREATE INDEX idx_moderation_flags_product_id ON public.moderation_flags(product_id);
CREATE INDEX idx_moderation_flags_vendor_id ON public.moderation_flags(vendor_id);
CREATE INDEX idx_moderation_flags_status ON public.moderation_flags(status);

-- =============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =============================================

-- Enable RLS on all tables
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.boards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.board_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_follows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vendor_follows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.board_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.moderation_flags ENABLE ROW LEVEL SECURITY;

-- User profiles policies
CREATE POLICY "Users can view all public profiles" ON public.user_profiles
    FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON public.user_profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.user_profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Vendors policies
CREATE POLICY "Anyone can view vendors" ON public.vendors
    FOR SELECT USING (true);

CREATE POLICY "Vendors can update own vendor profile" ON public.vendors
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can create vendor profile" ON public.vendors
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Products policies
CREATE POLICY "Anyone can view approved products" ON public.products
    FOR SELECT USING (status = 'approved');

CREATE POLICY "Vendors can view own products" ON public.products
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.vendors 
            WHERE vendors.id = products.vendor_id 
            AND vendors.user_id = auth.uid()
        )
    );

CREATE POLICY "Vendors can insert products" ON public.products
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.vendors 
            WHERE vendors.id = vendor_id 
            AND vendors.user_id = auth.uid()
        )
    );

CREATE POLICY "Vendors can update own products" ON public.products
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.vendors 
            WHERE vendors.id = vendor_id 
            AND vendors.user_id = auth.uid()
        )
    );

-- Boards policies
CREATE POLICY "Users can view public boards" ON public.boards
    FOR SELECT USING (is_public = true);

CREATE POLICY "Users can view own boards" ON public.boards
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create boards" ON public.boards
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own boards" ON public.boards
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own boards" ON public.boards
    FOR DELETE USING (auth.uid() = user_id);

-- Board items policies
CREATE POLICY "Users can view board items for accessible boards" ON public.board_items
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.boards 
            WHERE boards.id = board_items.board_id 
            AND (boards.is_public = true OR boards.user_id = auth.uid())
        )
    );

CREATE POLICY "Users can manage items in own boards" ON public.board_items
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.boards 
            WHERE boards.id = board_items.board_id 
            AND boards.user_id = auth.uid()
        )
    );

-- Interactions policies
CREATE POLICY "Users can view interactions" ON public.interactions
    FOR SELECT USING (true);

CREATE POLICY "Users can manage own interactions" ON public.interactions
    FOR ALL USING (auth.uid() = user_id);

-- User follows policies
CREATE POLICY "Users can view follows" ON public.user_follows
    FOR SELECT USING (true);

CREATE POLICY "Users can manage own follows" ON public.user_follows
    FOR ALL USING (auth.uid() = follower_id);

-- Vendor follows policies
CREATE POLICY "Users can view vendor follows" ON public.vendor_follows
    FOR SELECT USING (true);

CREATE POLICY "Users can manage own vendor follows" ON public.vendor_follows
    FOR ALL USING (auth.uid() = user_id);

-- Board interactions policies
CREATE POLICY "Users can view board interactions" ON public.board_interactions
    FOR SELECT USING (true);

CREATE POLICY "Users can manage own board interactions" ON public.board_interactions
    FOR ALL USING (auth.uid() = user_id);

-- Recommendations policies
CREATE POLICY "Users can view own recommendations" ON public.recommendations
    FOR SELECT USING (auth.uid() = user_id);

-- Moderation flags policies (admin only)
CREATE POLICY "Admins can manage moderation flags" ON public.moderation_flags
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM auth.users 
            WHERE auth.users.id = auth.uid() 
            AND auth.users.raw_user_meta_data->>'role' = 'admin'
        )
    );

-- =============================================
-- FUNCTIONS AND TRIGGERS
-- =============================================

-- Function to update follower counts
CREATE OR REPLACE FUNCTION update_follower_counts()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        -- Increment following count for follower
        UPDATE public.user_profiles 
        SET following_count = following_count + 1 
        WHERE id = NEW.follower_id;
        
        -- Increment followers count for following
        UPDATE public.user_profiles 
        SET followers_count = followers_count + 1 
        WHERE id = NEW.following_id;
        
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        -- Decrement following count for follower
        UPDATE public.user_profiles 
        SET following_count = following_count - 1 
        WHERE id = OLD.follower_id;
        
        -- Decrement followers count for following
        UPDATE public.user_profiles 
        SET followers_count = followers_count - 1 
        WHERE id = OLD.following_id;
        
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger for follower count updates
CREATE TRIGGER trigger_update_follower_counts
    AFTER INSERT OR DELETE ON public.user_follows
    FOR EACH ROW EXECUTE FUNCTION update_follower_counts();

-- Function to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at timestamps
CREATE TRIGGER trigger_user_profiles_updated_at
    BEFORE UPDATE ON public.user_profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_vendors_updated_at
    BEFORE UPDATE ON public.vendors
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_products_updated_at
    BEFORE UPDATE ON public.products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_boards_updated_at
    BEFORE UPDATE ON public.boards
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- SAMPLE DATA (Optional - for testing)
-- =============================================

-- Insert sample style tags for testing
-- INSERT INTO public.user_profiles (id, name, style_tags) VALUES 
-- (uuid_generate_v4(), 'Test User', ARRAY['minimalist', 'streetwear']);

-- =============================================
-- GRAPHQL SCHEMA ANNOTATIONS
-- =============================================

-- Add GraphQL schema annotations for better API generation
COMMENT ON TABLE public.user_profiles IS 'User profile information extending auth.users';
COMMENT ON TABLE public.vendors IS 'Vendor/brand profiles';
COMMENT ON TABLE public.products IS 'Product catalog items';
COMMENT ON TABLE public.boards IS 'User-created boards/wishlists';
COMMENT ON TABLE public.board_items IS 'Products saved to boards';
COMMENT ON TABLE public.interactions IS 'User interactions with products';
COMMENT ON TABLE public.user_follows IS 'User-to-user following relationships';
COMMENT ON TABLE public.vendor_follows IS 'User-to-vendor following relationships';
COMMENT ON TABLE public.board_interactions IS 'User interactions with boards';
COMMENT ON TABLE public.recommendations IS 'Cached recommendation scores';
COMMENT ON TABLE public.moderation_flags IS 'Product moderation tracking';

-- Column comments for better API documentation
COMMENT ON COLUMN public.user_profiles.style_tags IS 'Array of style preference tags';
COMMENT ON COLUMN public.vendors.tier IS 'Vendor tier: free or featured';
COMMENT ON COLUMN public.products.status IS 'Product approval status';
COMMENT ON COLUMN public.products.popularity_score IS 'Calculated popularity score for recommendations';
COMMENT ON COLUMN public.interactions.action IS 'Type of interaction: like, save, or view';
COMMENT ON COLUMN public.recommendations.score IS 'Recommendation algorithm score';
COMMENT ON COLUMN public.moderation_flags.status IS 'Flag status: flagged, reviewed, or resolved';
