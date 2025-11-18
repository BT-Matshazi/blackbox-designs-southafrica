# Payload CMS Setup Guide

This project uses **Payload CMS 3.0 Beta** as a headless CMS for managing content.

## Prerequisites

1. **MongoDB** - Payload requires MongoDB for data storage
2. **Node.js 18+** - Already installed

## Local Development Setup

### 1. Install MongoDB

**Option A: Using Docker (Recommended)**
```bash
docker run -d -p 27017:27017 --name blackbox-mongodb mongo:latest
```

**Option B: Install MongoDB Locally**
- Download from: https://www.mongodb.com/try/download/community
- Follow installation instructions for your OS

### 2. Configure Environment Variables

Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Update the following variables in `.env.local`:
```env
PAYLOAD_SECRET=your-super-secret-key-at-least-32-chars-long
MONGODB_URI=mongodb://localhost:27017/blackbox-designs
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

**Important:** Generate a secure PAYLOAD_SECRET:
```bash
openssl rand -base64 32
```

### 3. Start the Development Server

```bash
npm run dev
```

### 4. Access the Admin Panel

Navigate to: http://localhost:3000/admin

#### Create Your First Admin User

On first visit, you'll be prompted to create an admin account:
- **Name:** Your Name
- **Email:** your.email@example.com
- **Password:** (strong password)
- **Role:** Admin

## Collections

### Projects
Manage your portfolio projects with:
- Name, slug, client, description
- Card & hero images
- Gallery
- Categories & technologies
- Live site URL
- Featured flag

### Case Studies
Detailed success stories with:
- Before/after images for slider
- Challenge & solution sections
- Results & metrics
- Testimonials
- Technologies & services used

### Testimonials
Client reviews and feedback:
- Name, role, company
- Avatar image
- Quote & rating
- Featured flag

### Media
Image & file management:
- Automatic image optimization
- Multiple sizes (thumbnail, card, tablet)
- Alt text for SEO

## API Access

### Fetching Data

Payload provides REST and GraphQL APIs:

**REST API:**
```typescript
// Fetch all projects
const response = await fetch('http://localhost:3000/api/projects')
const projects = await response.json()

// Fetch single project
const response = await fetch('http://localhost:3000/api/projects/slug/project-name')
const project = await response.json()

// Fetch featured case studies
const response = await fetch('http://localhost:3000/api/case-studies?where[featured][equals]=true')
const caseStudies = await response.json()
```

**GraphQL API:**
```typescript
const query = `{
  Projects {
    docs {
      id
      name
      slug
      client
      cardImage {
        url
        alt
      }
      isFeatured
    }
  }
}`

const response = await fetch('http://localhost:3000/api/graphql', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query })
})
```

## Database Backups

### Export Data
```bash
mongoexport --db=blackbox-designs --collection=projects --out=projects.json
```

### Import Data
```bash
mongoimport --db=blackbox-designs --collection=projects --file=projects.json
```

## Production Deployment

### Environment Variables

Set these in your production environment:
```env
PAYLOAD_SECRET=<your-production-secret>
MONGODB_URI=<your-production-mongodb-uri>
NEXT_PUBLIC_SERVER_URL=https://yourwebsite.com
```

### MongoDB Cloud (MongoDB Atlas)

1. Create account: https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Update `MONGODB_URI` in production

### Recommended Hosting

- **Vercel** (for Next.js app)
- **MongoDB Atlas** (for database)
- **Cloudinary** or **AWS S3** (for media storage)

## Security

### Admin Access

The admin panel is accessible at `/admin`. Ensure you:
1. Use strong passwords
2. Keep PAYLOAD_SECRET secure
3. Enable 2FA (available in Payload settings)
4. Use environment variables for secrets

### API Security

- Authentication is required for write operations
- Public read access can be configured per collection
- Use API keys for programmatic access

## Troubleshooting

### "Cannot connect to MongoDB"
- Ensure MongoDB is running: `docker ps` or check service status
- Verify MONGODB_URI in `.env.local`
- Check MongoDB logs

### "Payload Secret Missing"
- Set PAYLOAD_SECRET in `.env.local`
- Generate with: `openssl rand -base64 32`

### Build Errors
- Clear Next.js cache: `rm -rf .next`
- Clear node_modules: `rm -rf node_modules && npm install`
- Verify all dependencies installed correctly

## Useful Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Type checking
npm run type-check

# Linting
npm run lint
```

## Documentation

- Payload CMS Docs: https://payloadcms.com/docs
- Next.js Integration: https://payloadcms.com/docs/getting-started/installation#nextjs
- MongoDB Docs: https://www.mongodb.com/docs/

## Support

For issues or questions:
1. Check Payload CMS docs
2. Search GitHub issues: https://github.com/payloadcms/payload
3. Join Discord: https://discord.gg/payload
