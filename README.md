# 🧠 MindfulAI

<div align="center">
  <img src="public/assets/logo.png" alt="MindfulAI Logo" width="120" height="120">
  
  **Your AI-Powered Mental Health Companion**
  
  A comprehensive mental health support platform that combines AI technology with evidence-based resources to provide personalized guidance, support, and tools for mental wellness.

  [![Next.js](https://img.shields.io/badge/Next.js-15.5.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
  [![Prisma](https://img.shields.io/badge/Prisma-6.15.0-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
  [![OpenAI](https://img.shields.io/badge/OpenAI-API-412991?style=for-the-badge&logo=openai)](https://openai.com/)
</div>

---

## ✨ Features

### 🤖 **AI-Powered Chat Support**
- Intelligent mental health chatbot powered by advanced language models
- Personalized conversations based on user context and history
- 24/7 availability for immediate support and guidance

### 📚 **Comprehensive Resource Library**
- Curated collection of mental health resources and educational materials
- Evidence-based articles, guides, and research papers
- Topics covering anxiety, depression, stress management, and more

### 🎯 **Interactive Tools & Activities**
- Guided meditation exercises
- Journaling prompts and mood tracking
- Coping strategies and wellness activities
- Gratitude practices and mindfulness exercises

### 👤 **Personalized User Experience**
- Secure user authentication and profile management
- Chat history and progress tracking
- Customizable preferences and settings

### 🌙 **Modern UI/UX**
- Beautiful, responsive design with dark/light theme support
- Smooth animations and transitions using Framer Motion
- Mobile-first approach for accessibility across all devices

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (version 18 or higher)
- **Bun** (recommended) or npm/yarn
- **PostgreSQL** database
- **OpenAI API key** (for AI features)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sdhanraj300/mindfulai.git
   cd mindfulai
   ```

2. **Install dependencies**
   ```bash
   bun install
   # or
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/mindfulai"
   
   # NextAuth.js
   NEXTAUTH_SECRET="your-nextauth-secret"
   NEXTAUTH_URL="http://localhost:3000"
   
   # OpenAI
   OPENAI_API_KEY="your-openai-api-key"
   
   # Pinecone (for vector search)
   PINECONE_API_KEY="your-pinecone-api-key"
   PINECONE_ENVIRONMENT="your-pinecone-environment"
   ```

4. **Set up the database**
   ```bash
   bunx prisma generate
   bunx prisma db push
   
   # Seed the database with initial data
   bun run db:seed
   ```

5. **Start the development server**
   ```bash
   bun run dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

---

## 🛠️ Tech Stack

### **Frontend**
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icons

### **Backend**
- **Next.js API Routes** - Serverless API endpoints
- **Prisma** - Type-safe database ORM
- **PostgreSQL** - Primary database
- **NextAuth.js** - Authentication solution

### **AI & ML**
- **OpenAI GPT** - Language model for chat
- **LangChain** - AI application framework
- **Pinecone** - Vector database for semantic search
- **Hugging Face** - Additional AI models

### **Development Tools**
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Static type checking
- **Prisma Studio** - Database visualization

---

## 📁 Project Structure

```
mindfulai/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── api/               # API routes
│   │   ├── chat/              # Chat interface
│   │   ├── resources/         # Resource library
│   │   ├── sign-in/           # Authentication pages
│   │   └── sign-up/
│   ├── components/            # Reusable components
│   │   ├── ui/                # Base UI components
│   │   ├── home/              # Homepage components
│   │   └── chat/              # Chat-specific components
│   ├── lib/                   # Utility libraries
│   ├── hooks/                 # Custom React hooks
│   ├── store/                 # State management
│   ├── types/                 # TypeScript type definitions
│   └── utils/                 # Helper functions
├── prisma/                    # Database schema and migrations
├── public/                    # Static assets
│   └── assets/                # Images and icons
└── src/pdfs/                  # Mental health resources (PDFs)
```

---

## 🌟 Key Features Deep Dive

### **AI Chat System**
- Context-aware conversations that remember user history
- Integration with multiple AI providers (OpenAI, Google Gemini)
- Semantic search through mental health resources
- Real-time streaming responses for better user experience

### **Mental Health Resources**
- Extensive library of academic papers and guides
- Topics include anxiety, depression, stress management, and more
- Smart categorization and search functionality
- Download and bookmark capabilities

### **User Authentication**
- Secure signup/signin with email and password
- OAuth integration ready (Google, GitHub, etc.)
- Protected routes and user session management
- Profile customization with mental health preferences

### **Responsive Design**
- Mobile-first responsive design
- Dark/light theme toggle
- Smooth animations and micro-interactions
- Accessibility features and keyboard navigation

---

## 🔧 Development Commands

```bash
# Development
bun run dev              # Start development server
bun run build            # Build for production
bun run start            # Start production server

# Database
bunx prisma studio       # Open Prisma Studio
bunx prisma generate     # Generate Prisma client
bunx prisma db push      # Push schema to database
bun run db:seed          # Seed database with sample data

# Code Quality
bun run lint             # Run ESLint
```

---

## 🤝 Contributing

We welcome contributions to MindfulAI! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add some amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### **Development Guidelines**
- Follow the existing code style and conventions
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🆘 Support & Resources

### **Mental Health Resources**
- **Crisis Text Line**: Text HOME to 741741
- **National Suicide Prevention Lifeline**: 988
- **SAMHSA National Helpline**: 1-800-662-4357

### **Getting Help**
- 📧 **Email**: support@mindfulai.com
- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/sdhanraj300/mindfulai/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/sdhanraj300/mindfulai/discussions)

---

## 🙏 Acknowledgments

- **Mental Health Organizations** for their valuable resources and research
- **Open Source Community** for the amazing tools and libraries
- **Contributors** who help make this project better
- **Users** who trust us with their mental health journey

---

<div align="center">
  <p><strong>Remember: MindfulAI is a supportive tool, not a replacement for professional mental health care.</strong></p>
  <p>If you're experiencing a mental health crisis, please contact emergency services or a mental health professional immediately.</p>
</div>

---

**Made with 💜 for mental health awareness and support**
