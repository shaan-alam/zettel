
![alt text](https://firebasestorage.googleapis.com/v0/b/zettel-b2004.appspot.com/o/images%2Fa27ec947-5035-4519-9fec-2316a8cc3eb2.jpg?alt=media&token=bec6d4e5-b577-42f7-ad37-4008f649e251)

![License](https://img.shields.io/github/license/shaan71845/facebook2.0) ![Made with love](https://img.shields.io/badge/Made%20with-%E2%9D%A4%EF%B8%8F-red) ![Github forks](https://img.shields.io/github/forks/shaan71845/facebook2.0) ![Github Start](https://img.shields.io/github/stars/shaan71845/facebook2.0)

## Introduction
Introducing Zettel: Your Markdown Note-Taking Companion

Elevate your note-taking experience with Zettel – a harmonious blend of simplicity and sophistication. Seamlessly capture thoughts and ideas in the elegance of Markdown, while effortlessly organizing them into vibrant collections, each adorned with its unique color code for easy categorization. Unveil the beauty of your code with syntax highlighting, and embrace the comfort of Dark Mode for extended productivity. Welcome to Zettel, where note-taking becomes a refined art, and your ideas find a canvas to flourish.

## Technologies Used 👩‍💻️
* Next 13 - Frontend
* TailwindCSS - CSS Library
* shadcn/ui - Tailwind Components
* React Query - Data Fetching Library
* Formik - Form handling Library
* Yup - For schema validation
* TypeScript - To add types to the application
* prismjs - Syntax Highlighting
* Firebase - Authentication & Storage
* React Markdown - Render markdown in HTML
* next-themes - To handle light/dark mode switching

## Installation & Configuration
### Client Configuration
* Clone this repo by typing `git clone https://github.com/shaan-alam/zettel.git` in your terminal.
* Create a .env.local file and paste your firebase config in here.
```
NEXT_PUBLIC_API_KEY=
NEXT_PUBLIC_AUTH_DOMAIN=
NEXT_PUBLIC_PROJECT_ID=
NEXT_PUBLIC_STORAGE_BUCKET=
NEXT_PUBLIC_MESSAGE_SENDER_ID=
NEXT_PUBLIC_APP_ID=
NEXT_PUBLIC_MEASUREMENT_ID=
```
* Run `npm ru dev` to start the client.
* ### Server Configuration
* Clone the backend repo by typing `git clone https://github.com/shaan-alam/Zettel-backend.git` in your terminal.
* Create .env file and paste the following config.
```
MONGO_URI=
PORT=
JWT_SECRET=
```
* Run `node src/index.ts` to start the server.
