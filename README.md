# BookNook

**A small online library. Add a book, borrow a book, return a book.**

**Live site:** https://booknook-client-nine.vercel.app/

**Server repository:** https://github.com/Bijoy34-CSE/booknook-server

BookNook lets readers see all books, share their own, borrow a book for a week, and return it when they are done.

## Demo Account

Use this ready-made account to explore the app without registering:

| Field    | Value               |
| -------- | ------------------- |
| Name     | `Demo Reader`       |
| Email    | `demo@booknook.com` |
| Password | `Demo1234`          |
| Photo    | `https://i.pravatar.cc/150?img=12` |

To sign in, open the Login page and enter the email and password above.
You can also register your own account, or continue with Google.

## Features

- **Home page slider and new arrivals:** a Swiper.js banner with three slides, plus the six newest books loaded from the database
- **Secure login:** email and password sign up with password rules (uppercase, lowercase, at least 6 characters) and Google sign in, built with BetterAuth and MongoDB
- **Private routes:** Add Book, My Books, My Borrows, Book Details and Profile need a login, and you come back to the page you wanted after logging in
- **Add, edit and delete books:** book images are uploaded to imgbb, edit opens a pre-filled form, and delete asks for confirmation in a modal
- **Borrow system with live copies:** borrowing reduces the available copies, returning adds one back, and a book with no copies shows "Not Available"
- **No double borrow:** a reader cannot borrow the same book twice at the same time
- **Search and filter:** find books by title, author or category
- **Dark and light theme** with a toggle in the navbar, scroll animations with Framer Motion, and a fully responsive layout
- **Friendly feedback:** toast messages for every success and error, loading spinners, and a custom 404 page

## Tech Stack

- Next.js (App Router) and TypeScript
- Tailwind CSS
- BetterAuth with the MongoDB adapter
- JWT protected Express API (see the server repository)
- Swiper.js, Framer Motion, react-hot-toast
- MongoDB Atlas, imgbb for image upload

## Run Locally

1. Install packages

   ```bash
   npm install
   ```

2. Create a `.env.local` file in the project root with these variables

   ```
   MONGODB_URI=
   BETTER_AUTH_SECRET=
   BETTER_AUTH_URL=http://localhost:3000
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   NEXT_PUBLIC_API_URL=http://localhost:5000
   NEXT_PUBLIC_IMGBB_KEY=
   JWT_SECRET=
   GOOGLE_CLIENT_ID=
   GOOGLE_CLIENT_SECRET=
   ```

   `JWT_SECRET` must be the same value as in the server `.env`.

3. Start the server from the server repository, then start the client

   ```bash
   npm run dev
   ```

4. Open http://localhost:3000
