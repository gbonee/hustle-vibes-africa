# USABI AI Learning Platform - Product Requirements Document (PRD)

## 1. PRODUCT OVERVIEW

### Product Name
**USABI AI** - Nigerian-focused AI-powered learning platform

### Vision Statement
"Cheat the system. Win faster." - Provide practical, money-making skills education in local Nigerian languages through AI-powered mentors, bypassing traditional educational barriers.

### Target Market
- Primary: Nigerians aged 18-35 seeking practical income-generating skills
- Secondary: African diaspora community, small business owners
- Tertiary: Nigerian students seeking alternatives to traditional education

### Value Proposition
- **Localized Learning**: Education in Pidgin, Yoruba, Hausa, and Igbo
- **Practical Focus**: Real money-making skills over theoretical knowledge
- **AI-Powered**: Personalized mentors with cultural personality
- **Mobile-First**: Accessible via smartphones with limited data
- **Anti-Traditional**: Positioning against formal education system

---

## 2. CORE FEATURES & FUNCTIONALITY

### 2.1 Authentication & User Management
**Authentication System**
- Email/password authentication via Supabase
- Social login options (Google, Facebook)
- Password reset functionality
- Email verification
- Special CHFI (Certified Hacker Forensic Investigator) authentication path

**User Profiles**
- Personal information (name, email, avatar)
- Language preferences (English, Pidgin, Yoruba, Hausa, Igbo)
- Course progress tracking
- Achievement badges
- Learning path selection (Core vs Pro)

### 2.2 Onboarding Flow
**Multi-Step Onboarding**
1. **Welcome Screen**: Brand introduction and value proposition
2. **Language Selection**: Choose preferred learning language
3. **Avatar Selection**: Pick AI mentor (Digital Mama, Baker Amara, Uncle Musa)
4. **Learning Path**: Select Core (local languages) or Pro (AI/English skills)
5. **Course Assignment**: Automatic assignment based on avatar choice

**Avatar Personalities**
- **Digital Mama**: Sassy Lagos tech expert for digital marketing
- **Baker Amara**: Sweet aunty vibes for pastry business
- **Uncle Musa**: Sharp Northern businessman for importation

### 2.3 Course Management System
**Course Structure**
- **3 Main Courses**:
  1. Digital Marketing the Naija Way
  2. Start a Pastry Biz From Your Kitchen  
  3. Import From China & Sell on WhatsApp

**Module System**
- 5 modules per course
- Sequential unlocking (complete previous to unlock next)
- Video content + text content
- Quiz assessments
- Progress tracking

**Multi-Language Support**
- All content available in 5 languages
- Dynamic language switching
- Culturally appropriate translations

### 2.4 AI Chat System
**Personalized AI Mentors**
- GPT-4 powered conversations
- Personality-based responses matching selected avatar
- Language-specific interactions
- Context-aware conversations
- Progress acknowledgment
- Motivational coaching

**Chat Features**
- Real-time messaging
- Message history
- GIF integration (Nigerian comedy themes)
- Quick action buttons
- Conversation continuity

### 2.5 Video Learning Platform
**Video Player**
- Custom video player
- Multiple language tracks
- Progress tracking
- Playback controls
- Mobile-optimized

**Content Management**
- Supabase storage integration
- Course-specific video organization
- Language-specific video variants
- Admin upload capabilities

### 2.6 Assessment System
**Quiz Functionality**
- Module-specific quizzes
- Multiple choice questions
- Progress tracking
- Score calculation
- Completion certificates

### 2.7 Progress Tracking
**Learning Analytics**
- Module completion status
- Overall course progress
- Time spent learning
- Quiz scores
- Achievement tracking

**Leaderboard**
- Community ranking
- Progress-based scoring
- Social motivation

---

## 3. TECHNICAL ARCHITECTURE

### 3.1 Frontend Stack
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Shadcn/ui component library
- **State Management**: React hooks + React Query
- **Routing**: React Router DOM

### 3.2 Backend Infrastructure
- **Database**: Supabase PostgreSQL
- **Authentication**: Supabase Auth
- **File Storage**: Supabase Storage
- **API**: Supabase REST API
- **Edge Functions**: Deno-based serverless functions

### 3.3 Database Schema

#### Core Tables
```sql
-- User profiles extension
profiles (
  id: UUID (FK to auth.users),
  display_name: TEXT,
  avatar_url: TEXT,
  language: TEXT,
  avatar: TEXT,
  course: TEXT,
  learning_path: TEXT,
  preferred_languages: TEXT[],
  pro_subscription_active: BOOLEAN,
  created_at: TIMESTAMP,
  updated_at: TIMESTAMP
)

-- Course categories
course_categories (
  id: UUID,
  name: TEXT,
  path: TEXT, -- 'core' or 'pro'
  description: TEXT,
  color_scheme: TEXT,
  created_at: TIMESTAMP
)

-- User certifications
user_certifications (
  id: UUID,
  user_id: UUID,
  certification_name: TEXT,
  certification_type: TEXT,
  partner_name: TEXT,
  earned_at: TIMESTAMP,
  expires_at: TIMESTAMP,
  badge_url: TEXT,
  verification_url: TEXT
)

-- Bounties/gigs system
bounties (
  id: UUID,
  title: TEXT,
  description: TEXT,
  category: TEXT,
  path: TEXT,
  reward_amount: INTEGER,
  currency: TEXT,
  language_requirement: TEXT,
  skills_required: TEXT[],
  difficulty_level: TEXT,
  deadline: TIMESTAMP,
  status: TEXT,
  client_id: UUID,
  assigned_to: UUID,
  tags: TEXT[],
  created_at: TIMESTAMP,
  updated_at: TIMESTAMP
)

-- User earnings tracking
user_earnings (
  id: UUID,
  user_id: UUID,
  amount: INTEGER,
  currency: TEXT,
  source: TEXT,
  bounty_id: UUID,
  description: TEXT,
  status: TEXT,
  created_at: TIMESTAMP
)
```

### 3.4 AI Integration
**OpenAI Integration**
- GPT-4o-mini for cost optimization
- Personality-driven prompts
- Language-specific instructions
- Context retention
- Response optimization

**External APIs**
- Giphy API for Nigerian comedy GIFs
- OpenAI API for chat functionality

---

## 4. USER EXPERIENCE DESIGN

### 4.1 Design System
**Color Palette**
- Primary: Electric Yellow (#F5FF00)
- Secondary: Neon Green (#39FF14) 
- Background: Black (#000000)
- Text: White/Off-white
- Accent colors for language differentiation

**Typography**
- Headers: Oswald (bold, uppercase)
- Body: Rubik (readable, modern)
- Monospace: Code elements

**Visual Elements**
- Rebel/punk aesthetic
- Nigerian cultural references
- Meme-style banners
- Electric glow effects
- Mobile-first responsive design

### 4.2 Navigation Structure
```
/                    - Landing page
/manifesto          - Brand manifesto
/enterprise         - B2B offering
/auth               - Authentication
/chfi-auth          - Special certification path
/onboarding         - User setup flow
/dashboard          - Main learning interface
/profile            - User settings
/leaderboard        - Community rankings
/admin              - Content management
```

### 4.3 Mobile Experience
- Touch-optimized interface
- Offline-capable content
- Data-efficient design
- Bottom navigation
- Swipe gestures

---

## 5. CONTENT STRATEGY

### 5.1 Course Content
**Digital Marketing Course**
1. Intro to Digital Marketing the Naija Way
2. How to Sell on WhatsApp & Instagram  
3. Create Content That Converts (Phone only)
4. How to Run Small Ads on Meta
5. Customer Retention & Weekly Sales

**Pastry Business Course**
1. Intro to Baking as Business in Nigeria
2. How to Make Puff-Puff That Sells
3. How to Make Nigerian Meat Pie
4. Branding & Packaging for Pastry Biz
5. Finding First Customers & Starting Sales

**Importation Course**
1. Find Hot-Selling Products Nigerians Want
2. Where to Buy Cheap: 1688, Alibaba & Hidden Sources
3. Shipping & Delivery Without Wahala
4. Market & Sell Fast on WhatsApp & Instagram
5. Pricing, Profit & Customer Service Tips

### 5.2 Localization Strategy
- **Pidgin**: Street-smart, direct communication
- **Yoruba**: Cultural respect with business focus
- **Hausa**: Northern business traditions
- **Igbo**: Entrepreneurial spirit emphasis
- **English**: Professional yet accessible

---

## 6. MONETIZATION MODEL

### 6.1 Revenue Streams
1. **Course Subscriptions**: Monthly/yearly access
2. **Pro Tier**: Advanced AI/tech courses
3. **Bounty Platform**: Commission on gig completions
4. **Corporate Training**: Enterprise packages
5. **Certification Programs**: Partner integrations

### 6.2 Pricing Strategy
- **Core Path**: ₦5,000/month (local language courses)
- **Pro Path**: ₦15,000/month (AI/English courses)
- **Enterprise**: Custom pricing
- **Bounty Commission**: 10-20% of project value

---

## 7. TECHNICAL REQUIREMENTS

### 7.1 Performance Requirements
- **Page Load Time**: <3 seconds on 3G
- **Video Streaming**: Adaptive bitrate
- **API Response**: <500ms average
- **Uptime**: 99.9% availability
- **Concurrent Users**: Support 10,000+

### 7.2 Security Requirements
- **Data Encryption**: End-to-end for sensitive data
- **Authentication**: Multi-factor support
- **GDPR Compliance**: Data protection standards
- **Content Security**: Video DRM protection
- **API Security**: Rate limiting and authentication

### 7.3 Scalability Requirements
- **Database**: Horizontal scaling capability
- **CDN**: Global content delivery
- **Serverless**: Auto-scaling edge functions
- **Storage**: Unlimited file storage growth
- **Monitoring**: Real-time performance tracking

---

## 8. ADMIN & CONTENT MANAGEMENT

### 8.1 Admin Dashboard Features
- **Course Management**: Create/edit courses and modules
- **Video Upload**: Multi-language video management
- **User Management**: View and manage user accounts
- **Analytics**: Usage and performance metrics
- **Content Moderation**: Review user-generated content

### 8.2 Content Creation Tools
- **Video Uploader**: Drag-and-drop with progress tracking
- **Language Variants**: Multiple language version management
- **Quiz Builder**: Create assessments with multiple choice
- **Progress Tracking**: Monitor completion rates

---

## 9. ANALYTICS & METRICS

### 9.1 Key Performance Indicators (KPIs)
- **User Acquisition**: New registrations per month
- **Engagement**: Daily/monthly active users
- **Completion Rates**: Course and module completion
- **Revenue Metrics**: MRR, ARPU, churn rate
- **Content Performance**: Most popular courses/modules

### 9.2 User Analytics
- **Learning Paths**: Popular course selections
- **Language Preferences**: Usage by language
- **Progress Tracking**: Average completion time
- **Chat Engagement**: AI interaction frequency
- **Device Usage**: Mobile vs desktop usage

---

## 10. LAUNCH STRATEGY

### 10.1 Beta Testing
- **Closed Beta**: 100 selected users
- **Feature Testing**: Core functionality validation
- **Performance Testing**: Load and stress testing
- **Feedback Collection**: User experience improvements

### 10.2 Marketing Approach
- **Social Media**: TikTok, Instagram, WhatsApp marketing
- **Influencer Partnerships**: Nigerian content creators
- **SEO Strategy**: Nigerian education keywords
- **Community Building**: Discord/Telegram groups
- **PR Strategy**: "Banned by NUC" narrative

### 10.3 Growth Strategy
- **Referral Program**: Free months for referrals
- **Partnership Programs**: Corporate training deals
- **Content Marketing**: Free valuable content
- **Local Events**: Nigerian tech/business events
- **Celebrity Endorsements**: Nigerian business leaders

---

## 11. RISK ASSESSMENT

### 11.1 Technical Risks
- **API Dependencies**: OpenAI rate limits/costs
- **Video Hosting**: Bandwidth and storage costs
- **Performance**: Scaling challenges
- **Security**: Data breaches or attacks

### 11.2 Business Risks
- **Market Competition**: Other edtech platforms
- **Regulatory**: Nigerian education regulations
- **Economic**: Currency fluctuation impact
- **Cultural**: Misunderstanding of local context

### 11.3 Mitigation Strategies
- **API Backup**: Multiple AI providers
- **Cost Management**: Dynamic scaling and optimization
- **Legal Compliance**: Regular legal review
- **Cultural Advisors**: Local market experts

---

## 12. SUCCESS CRITERIA

### 12.1 Year 1 Targets
- **Users**: 50,000 registered users
- **Revenue**: ₦500M ARR
- **Completion**: 70% course completion rate
- **Satisfaction**: 4.5+ star rating
- **Geographic**: 80% Nigerian user base

### 12.2 Long-term Vision
- **Market Position**: #1 Nigerian practical skills platform
- **International Expansion**: Other African countries
- **Product Extensions**: Job placement platform
- **Partnership Network**: 100+ corporate clients
- **Social Impact**: 1M+ Nigerians upskilled

---

## APPENDICES

### A. Technical Dependencies
- React 18.3.1
- Supabase 2.49.4+
- OpenAI API v1
- Tailwind CSS 3.0+
- TypeScript 5.0+

### B. Browser Support
- Chrome 90+
- Safari 14+
- Firefox 88+
- Mobile browsers (iOS 14+, Android 10+)

### C. API Endpoints
- `/auth/*` - Authentication
- `/api/courses/*` - Course data
- `/api/chat/*` - AI interactions
- `/api/progress/*` - User progress
- `/api/admin/*` - Admin functions

---

**Document Version**: 1.0  
**Last Updated**: January 2024  
**Prepared For**: Development Team  
**Prepared By**: Product Team