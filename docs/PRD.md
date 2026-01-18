🧾 Product Requirements Document — Findery
1. Overview

Name: Findery
Type: Web + Mobile (React / React Native)
Backend: Supabase (Postgres + GraphQL)
Goal: A social fashion discovery platform where users can discover and save curated pieces from small brands, create and share boards, and follow other users or brands.

2. Problem

Fashion discovery is fragmented across social media and brand sites.
Users struggle to:

Discover emerging brands under $300

Save, organize, and share fashion inspiration

Find independent designers that fit their aesthetic

Vendors (small brands) struggle to:

Reach new audiences organically

Manage product visibility across multiple platforms

3. Solution

Findery connects shoppers and independent brands through a social discovery platform with a curated aesthetic.

Core value propositions:

Personalized “For You” feed for discovering brands and pieces

Save items to boards (like Pinterest)

Share boards with friends and followers

Vendors can list their items and gain exposure

No in-app transactions — each product links to the vendor’s site

4. Core MVP Features
4.1 User Features

Authentication: Email or social login (Google/Apple via Supabase Auth).

Onboarding: Choose 3–5 style preferences (used to seed recommendations).

Discovery Feed: Personalized “For You” feed powered by a recommendation algorithm.

Boards/Wishlists: Create and share boards of saved products.

Social: Follow other users and vendors; like/comment on boards.

Profile: Displays user info, public boards, followers/following count.

4.2 Vendor Features
1. Vendor Accounts

Vendors can register separately via Supabase Auth.

Vendor profiles include:

Brand name

Logo

Description

External website URL

Category tags (e.g. minimalist, vintage, streetwear)

Tier level: free or featured

2. Tiered Access
Tier	Features
Free	Manual moderation required for uploads; lower feed visibility.
Featured (Paid)	Auto-approved uploads, priority in “For You” feed, analytics dashboard, and badge on profile.

Stripe integration for paid upgrades: post-MVP.

3. Product Uploads

Vendors can upload products manually or via CSV.

CSV uploads auto-update inventory (price, description, stock, images).

Supabase Storage hosts images.

CSV imports handled via Supabase Edge Function.

Auto-updates occur daily when vendor re-uploads the same SKU list.

4.3 Moderation System (Hybrid Model)

Findery uses a hybrid moderation model balancing quality curation with scalability.

Logic

Free Vendors:

Product submissions marked as pending until approved by a curator.

Admin dashboard lists pending products for approval/rejection.

Featured Vendors:

Products are auto-approved and appear live instantly.

Automatic checks (Edge Function) run before publishing:

Verify image URL

Check for banned words or spam

Validate price + SKU

All flagged items are stored in a moderation_flags table.

Data Model
"ModerationFlags": {
  "id": "uuid",
  "product_id": "uuid",
  "vendor_id": "uuid",
  "reason": "string",
  "status": "flagged | reviewed | resolved",
  "created_at": "timestamp",
  "reviewed_by": "admin_id"
}

Flow

Vendor uploads CSV or product manually.

System checks vendor tier → assigns status (pending or approved).

If pending, product is hidden until approved.

If approved, product goes live.

Curators can flag or remove items later.

Admin Dashboard (Post-MVP)

Approve/reject pending products.

Filter by vendor or flag reason.

Promote vendors to Featured tier.

5. Discoverability Algorithm
Purpose

Power the personalized “For You” feed with recommendations that match user taste and social signals.

Inputs

User interactions: likes, saves, follows, time on item

Style preferences: from onboarding or board tags

Social graph: friends’ and followed users’ saves

Product metadata: tags, brand, category

Popularity: engagement score

Logic (Heuristic v1)
Recommendation Score = 
  (0.4 * UserTasteMatch) + 
  (0.3 * SocialAffinity) + 
  (0.2 * ItemPopularity) + 
  (0.1 * BrandFreshness)


UserTasteMatch: overlap between user’s tags and product tags

SocialAffinity: boosted by friends’ actions

ItemPopularity: normalized engagement

BrandFreshness: boosts newer or underexposed brands

Data Flow

User opens app → recommendation query runs.

Algorithm fetches relevant items and ranks them.

Results cached in recommendations table, refreshed daily or after major interactions.

Future (ML Upgrade)

Train collaborative filtering model using interaction data.

Real-time re-ranking based on latest activity.

6. Post-MVP Ideas

In-app checkout or affiliate integration

Collaborative boards

AI-driven outfit recommendations

Brand dashboard with analytics

Trending / Explore page

7. User Flow

User signs up → sets style preferences

Lands on “For You” feed

Saves items → creates boards

Shares boards with friends

Follows vendors or other users

Returns to feed, which updates with new signals

8. Technical Requirements
Frontend

Framework: React (Web), React Native (Mobile)

Styling: TailwindCSS

GraphQL Client: Apollo Client or URQL

Auth: Supabase Auth (Users + Vendors)

Image Hosting: Supabase Storage

Backend

Database: Supabase Postgres

API: Supabase GraphQL

Edge Functions:

CSV processing

Auto moderation checks

Recommendation score refresh

Cache: Supabase recommendations table

Integrations

Shopify / manual product feed imports

Analytics: PostHog or Firebase

Payment: Stripe (for Featured vendors, future)

9. Data Model (Draft)
User
{
  "id": "uuid",
  "name": "string",
  "email": "string",
  "bio": "string",
  "avatar_url": "string",
  "style_tags": ["minimalist", "streetwear"],
  "followers_count": "int",
  "following_count": "int"
}

Vendor
{
  "id": "uuid",
  "name": "string",
  "logo_url": "string",
  "description": "string",
  "website": "string",
  "tier": "free | featured",
  "tags": ["minimalist", "sustainable"]
}

Product
{
  "id": "uuid",
  "vendor_id": "uuid",
  "name": "string",
  "price": "float",
  "image_url": "string",
  "category": "string",
  "tags": ["knitwear", "linen"],
  "link": "string",
  "popularity_score": "float",
  "status": "pending | approved"
}

Board
{
  "id": "uuid",
  "user_id": "uuid",
  "name": "string",
  "description": "string",
  "is_public": "boolean",
  "items": ["product_id"],
  "created_at": "timestamp"
}

Interaction
{
  "user_id": "uuid",
  "product_id": "uuid",
  "action": "like | save | view",
  "created_at": "timestamp"
}

Recommendation
{
  "user_id": "uuid",
  "product_id": "uuid",
  "score": "float",
  "generated_at": "timestamp"
}

ModerationFlags

(see section 4.3 above)

10. Acceptance Criteria

✅ Personalized feed works based on the algorithm
✅ Vendors can upload via CSV or manual entry
✅ Free vendor uploads require admin approval
✅ Featured vendor uploads go live automatically
✅ Boards can be created, shared, and displayed
✅ Following vendors updates feed content

11. KPIs

% of users engaging with recommended items

Avg saves per user

DAU / MAU ratio

Vendor retention (monthly active vendors)

CTR to external brand websites