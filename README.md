<p align="center">
    <img src="public/images/Logo-original.png" />
</p>

# Discussio
Transforming University Learning Through Collaborative Engagement and Resource Sharing

[Demo](https://discussio6.vercel.app/)

## Motivation
The primary objective of this online platform is to create a collaborative, user-generated ecosystem where university students can effortlessly exchange information, resources, and academic support in real-time. By centralizing various learning aids and community-driven activities, we aim to enhance academic success and well-being for university students globally.

## Features
- QnA: User can post a question and answer to a certain question. Other users can like and add it to favorites. The answers can be chosen and adopted if the questioner thinks it's the best answer.
ex. "I can't understand the difference between Machine Learning and Deep Learning."

- Discussion Board: Sharing ideas of certain course.
Users can report a post with an issue (ex. swearing, bullying, etc.)
ex. "I want to share my studying tips with Machine Learning. Make sure you leave a like!"

- Flashcards: Helping students memorizing key concepts, terms, or formulas made by users. Makers can select whether to show them publicly, and for the private. Moderators & users will be detecting whether these flashcards are violating the copyright law. If a user reports the flashcard as the violation, moderators will double-check if the report was legit.

## Installation
1. Clone the repository
```bash
git clone https://github.com/Discussio6/Discussio.git
```

2. Install dependencies
```bash
npm install
```

3. Set up the environment variables
```text
// .env

// For Google OAuth
GOOGLE_CLIENT_ID=<Your Google Client ID>
GOOGLE_CLIENT_SECRET=<Your Google Client Secret>

// https://next-auth.js.org/configuration/options#secret
NEXTAUTH_SECRET=<random secret string>

// Database URL - we're using MySQL. If you want to use other databases, please change the prisma/schema.prisma file.
DATABASE_URL=<Database URL>

// For Notion API for reporting - https://developers.notion.com/reference/intro
NOTION_API_KEY=<Notion API Key>
NOTION_DATABASE_ID=<Notion DB ID>

// For Image Upload - https://uploadthing.com/
UPLOADTHING_SECRET=<UploadThing Secret>
UPLOADTHING_APP_ID=<UploadThing ID>
```

4. Prisma initialization
```bash
npx prisma generate && npx prisma db push
```


5. Run the development server
```bash
npm run dev
```

6. For production, build and start the server
```bash
npm run build && npm run start
```

## Tech Stack
- Next.js
- TypeScript
- NextAuth
- Google OAuth
- Prisma
- Tailwind CSS
- shadcn/ui
- Notion API (notionhq/client)
- UploadThing API
- React Query
- React Hook Form
- react-beautiful-dnd
- react-icons, iconify, lucide, radixui-icons (for icons)
- react-markdown
- react-md-editor
- react-responsive
- zod

## Project Structure
```text
Discussio
├─app
│  ├─(pages)
│  │  ├─(auth)
│  │  │  └─signin
│  │  └─(main)
│  │      ├─content
│  │      ├─discussions
│  │      │  ├─upload
│  │      │  └─[qid]
│  │      ├─flashcards
│  │      │  ├─upload
│  │      │  │  └─[id]
│  │      │  └─[id]
│  │      │      ├─result
│  │      │      │  └─[pid]
│  │      │      └─view
│  │      ├─questions
│  │      │  ├─upload
│  │      │  └─[qid]
│  │      ├─quiz
│  │      ├─quizzes
│  │      │  ├─upload
│  │      │  │  └─[id]
│  │      │  └─[id]
│  │      │      ├─result
│  │      │      └─view
│  │      ├─request
│  │      ├─search
│  │      ├─search_content
│  │      │  ├─resultArea
│  │      │  └─searchArea
│  │      └─users
│  │          └─[id]
│  │              ├─favorites
│  │              ├─home
│  │              ├─notifications
│  │              ├─settings
│  │              └─uploads
│  └─api
│      ├─auth
│      │  └─[...nextauth]
│      ├─comments
│      │  └─[id]
│      ├─discussions
│      │  ├─accept
│      │  ├─favorites
│      │  │  └─[id]
│      │  ├─likes
│      │  │  └─[id]
│      │  └─[id]
│      ├─favorites
│      │  ├─discussions
│      │  │  ├─view
│      │  │  └─[id]
│      │  └─flashcards
│      │      ├─view
│      │      └─[id]
│      ├─flashcards
│      │  ├─favorites
│      │  │  └─[id]
│      │  ├─result
│      │  │  └─[id]
│      │  └─[id]
│      ├─notion
│      │  └─db
│      ├─permissions
│      ├─quizs
│      │  └─[id]
│      ├─search
│      ├─tags
│      ├─uploads
│      ├─uploadthing
│      └─users
│          └─[id]
├─components
│  ├─comments
│  ├─common
│  ├─discussions
│  ├─flashcards
│  ├─providers
│  └─ui
├─constants
├─hooks
├─lib
│  └─queries
├─prisma
├─public
│  ├─images
│  └─uploads
└─ types
   ├─ next-auth.d.ts
   └─ schema.ts
```

`app` - main app directory

- `(pages)` - Next.js pages
    - `(auth)` - Login pages
    - `(main)` - Main pages
        - `discussions` - Discussion pages
        - `questions` - QnA pages
- `api` - API Routes
    - `auth/[...nextauth]` - NextAuth API Routes
    - `comments` - Comments API
    - `discussions` - QnA & Discussion APIs
        - `likes` - Likes API
        - `favorites` - Favorites API
        - `accept` - QnA Acception API
- `components` - Reusable components
    - `providers` - Library Wrappers (React Query, Session Provider) for 'use client'
    - `ui` - Shadcn UI Components
- `components.json` - Shadcn UI Components JSON
- `constants` - Fixed values
    - `data.ts` - Constants needed in the frontend (ex. menu items, page counts, etc)
    - `querykeys.ts` - React Query QueryKeys
- `hooks` - React Hooks
- `lib` - Client API Request & Server functions
    - `api.ts` - Shared Axios Instance
    - `auth.ts` - NextAuth config file
    - `db.ts` - Shared DB Connection Object
    - `notion.ts` - Shared Connection Object for Notion API
    - `utils.ts` - Shadcn UI Components Utils
    - `queries` - Client Request APIs & React Query hooks
- `prisma` - Prisma files
    - `schema.prisma` - Prisma Schema definition
- `types` - TypeScript types
    - `next-auth.d.ts` - NextAuth Custom Session Type definition
    - `schema.ts` - Common Schema Types used in the client & server

## APIs
### Questions & Discussions

#### /api/discussions
- [GET] Get all discussions
- [POST] Create a discussion

#### /api/discussions/:id
- [GET] Get a discussion by id
- [PATCH] Update a discussion by id
- [DELETE] Delete a discussion by id

#### /api/discussions/accept
- [POST] Accept a discussion by id

#### /api/discussions/favorites/:id
- [POST] Add a discussion to favorites

#### /api/discussions/likes/:id
- [POST] Like a discussion

### Flashcards

#### /api/flashcards
- [GET] Get all flashcards
- [POST] Create a flashcard

#### /api/flashcards/:id
- [GET] Get a flashcard by id
- [PATCH] Update a flashcard by id
- [DELETE] Delete a flashcard by id

#### /api/flashcards/favorites/:id
- [POST] Add a flashcard to favorites

#### /api/flashcards/result/:id
- [GET] Get all flashcard participants' results
- [POST] Create a flashcard participant's result

### Comments

#### /api/comments
- [GET] Get all comments
- [POST] Create a comment/reply

#### /api/comments/:id
- [GET] Get a comment by id
- [PATCH] Update a comment by id
- [DELETE] Delete a comment by id

### Notion (Report)

#### /api/notion/db
- [GET] Test notion DB connection
- [POST] Create a notion page for reporting

### Permissions

#### /api/permissions
- [POST] Update the user profile permission level

### Search

#### /api/search
- [GET] Get search result for discussions, flashcards, and users

### Tags

#### /api/tags
- [GET] Get all tags
- [POST] Create a tag

### Users

#### /api/users/:id
- [GET] Get a user by id
- [PATCH] Update a user by id

## API Authorization
Since api requests are sent and handled inside the Nextjs, we don't need to pass the session token to the api requests. Instead, we can use the `useServerSession` method from the `next-auth` to get the session object from the server.

## Reporting
![image](https://github.com/Discussio6/Discussio/assets/32610225/063bcb1f-7ba6-465a-874d-6086d63a51dc)

If the user reports some post, it'll be stored in our Notion database as above for efficient management.
