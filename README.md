Examination weeks are incredibly stressful, and we’ve all been there. College students are often overwhelmed by the sheer volume of materials they need to review and retain. But learning doesn’t have to feel impossible. By introducing structured learning and leveraging powerful online tools, we believe we can empower students to succeed. Unfortunately, many helpful platforms like Quizlet are locked behind a paywall. That’s why we built Quizzit AI to provide free, AI-generated practice quizzes and flashcards for students everywhere.

Quizzit AI is an AI-powered study tool that generates customized quizzes and flashcards from a student’s notes. Students simply paste their lecture notes or upload files, and Quizzit AI intelligently creates multiple-choice and true/false quizzes, along with term-definition flashcards. It’s a fast, intuitive way to turn study materials into active recall practice without the manual effort.

We built Quizzit AI with the following stack:

- Frontend: Next.js with TypeScript and TailwindCSS for responsive UI
- Backend: Django with PostgreSQL (hosted on Supabase) for quiz and flashcard generation logic
- AI Integration: OpenAI API for language model generation of quiz content
- DevOps & Deployment: Docker for local development, and Vercel for frontend hosting

This was our first-ever hackathon, and for one of our teammates, their first time building any kind of software project. Learning to collaborate, divide tasks, and work under a deadline was a huge learning curve.

We also spent a lot of time learning how to prompt GPT effectively to return clean, parsable JSON that we could reliably store in our backend this took hours of trial and error, debugging, and tuning.

We are very proud to:

- Successfully deployed our first full-stack web application
- Built and integrated two separate GPT-powered endpoints that generate practice quizzes and flashcards
- Designed a simple and user-friendly interface that supports real learning
- Learned how to containerize our project with Docker and deploy using modern cloud tools

We learned:

- How to collaborate as a team and work through bugs together
- How to structure full-stack applications and manage both frontend and backend development
- How to prompt GPT effectively for structured output
- How to use Django, OpenAI APIs, Docker, and Supabase in a real project
- The value of good design and clear UX when building tools for students

We’re excited to continue building on this project. Our next steps include:

- User authentication and account creation
- Saving user-generated quizzes and flashcards for future practice
- Adding spaced repetition tracking and progress analytics
- Supporting PDF parsing and highlighting from uploaded notes


Video Demo
- https://www.youtube.com/watch?v=v8pZI4PBbUI
