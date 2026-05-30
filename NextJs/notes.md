# Next.js

**Next.js** is a full-stack framework built on top of React.

**Official Documentation:** https://nextjs.org/docs

## Evolution

```text
JavaScript → React → Next.js
```

### JavaScript

- Traditional JavaScript applications had optimization and maintainability challenges.

### React

- Introduced component-based development.
- Provides SPA (Single Page Application) architecture.
- Faster UI updates through Virtual DOM.
- However, traditional React SPAs have limitations:
  - SEO challenges
  - Client-side rendering by default
  - Manual setup for routing and optimization

### Next.js

Next.js extends React by providing:

- Better SEO support
- File-based routing
- Server-side rendering
- Static site generation
- Incremental static regeneration
- Image optimization
- Full-stack capabilities
- Improved performance

---

# SEO (Search Engine Optimization)

SEO helps websites rank higher on search engines like Google.

## Search Engine Process

### 1. Crawling

- Search engine bots visit websites.
- They analyze website content and structure.
- They determine the category and relevance of pages.

### 2. Indexing

- Pages are stored in Google's index.
- Pages are categorized based on:
  - Content
  - Keywords
  - Topics
  - Metadata

### 3. Ranking

Search engines rank pages based on several factors:

- Rendering method
- Content quality
- Keywords
- Performance
- Mobile responsiveness
- Backlinks
- User experience
- Reviews and ratings

---

# Rendering Techniques

## SSR (Server-Side Rendering)

- HTML is generated on the server for every request.
- Search engine bots can immediately see page content.
- Better for SEO.

### Flow

```text
Request
   ↓
Server renders HTML
   ↓
Browser receives complete HTML
   ↓
Page displayed
```

---

## CSR (Client-Side Rendering)

- Traditional React applications use CSR.
- Server sends a minimal HTML file.
- Browser downloads JavaScript.
- React renders content on the client side.

### Flow

```text
Request
   ↓
Empty HTML received
   ↓
JavaScript downloaded
   ↓
React renders page
```

---

## SSG (Static Site Generation)

- HTML is generated during build time.
- Pages are served as static files.
- Very fast performance.
- Excellent for blogs, documentation, and marketing websites.

### Flow

```text
Build Time
   ↓
Generate HTML
   ↓
Store static files
   ↓
Serve to users
```

---

## ISR (Incremental Static Regeneration)

- Combines advantages of SSR and SSG.
- Static pages can be regenerated after deployment.
- Content remains fresh without rebuilding the entire application.

---

# Next.js Components

## Server Components

- Default in Next.js App Router.
- Rendered on the server.
- Better performance.
- Smaller client-side JavaScript bundle.
- Good for data fetching and SEO.

## Client Components

To make a component a client component, place the following directive at the top of the file:

```javascript
"use client";
```

Use Client Components when:

- Using React hooks
- Handling user interactions
- Accessing browser APIs
- Managing local state

---

# Routing in Next.js

## File-Based Routing

Next.js creates routes based on folders and files.

### App Router Structure

```text
src/
└── app/
    └── page.js
```

### Route Mapping

```text
src/app/page.js
↓
localhost:3000/
```

### Important Rule

- Every folder represents a route.
- `page.js` represents the component rendered for that route.

Example:

```text
src/
└── app/
    ├── page.js
    └── about/
        └── page.js
```

Routes:

```text
/          → page.js
/about     → about/page.js
```

---

# Nested Routing

Nested routes are created by nesting folders.

Example:

```text
src/
└── app/
    └── home/
        └── product/
            └── page.js
```

Generated Route:

```text
/home/product
```

Rule:

- Folder = Route Segment
- `page.js` = Component for that Route

---

# Dynamic Routing

Dynamic routes are created using square brackets.

Example:

```text
src/
└── app/
    └── home/
        └── [id]/
            └── page.js
```

Generated Routes:

```text
/home/1
/home/2
/home/123
```

Accessing Dynamic Parameters:

```javascript
export default function Page({ params }) {
  return <h1>{params.id}</h1>;
}
```

---

# Features of Next.js

- File-Based Routing
- App Router
- Dynamic Routing
- Protected Routing
- Client Components
- Server Components
- Image Optimization
- Navigation Links
- API Routes
- Full-Stack Development
- SEO Optimization
- Performance Optimization