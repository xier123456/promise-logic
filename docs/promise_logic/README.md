# PromiseLogic Documentation

Official documentation website for the PromiseLogic library - a powerful Promise composition toolkit that maps complex asynchronous operations to intuitive logic gate semantics.

## Overview

PromiseLogic is a JavaScript library designed to simplify Promise composition by leveraging familiar logic gate concepts from digital circuit design. The library provides a semantic and intuitive approach to handling multiple asynchronous operations, making complex concurrency patterns easier to understand and maintain.

### Core Philosophy

**"Forget the API, remember the logic"** - PromiseLogic transforms Promise composition from a technical challenge into a logical reasoning process by mapping operations to well-known logic gates (AND, OR, XOR, NAND, NOR, etc.).

## Key Features

### Logic Gate Semantics

- **Basic Logic Gates**: AND, OR, NOT operations for standard Promise composition
- **Advanced Logic Gates**: XOR, NAND, NOR, XNOR for complex concurrency scenarios
- **Extended Operations**: Majority voting, all-fulfilled, all-rejected for specialized use cases
- **Utility Methods**: Race, allSettled, create-flip-flop for state management

### Developer Experience

- **Intuitive Naming**: Method names that clearly express their logical intent
- **Type Safety**: Full TypeScript support with comprehensive type definitions
- **Zero Dependencies**: Lightweight implementation with no external runtime dependencies
- **Semantic Consistency**: Maintains compatibility with standard Promise API while providing enhanced functionality

### Documentation Features

- **Interactive Code Examples**: Monaco Editor-powered live code execution
- **Comprehensive API Reference**: Detailed documentation for all methods and parameters
- **Real-time Preview**: Test logic gates directly in the browser
- **Dark Mode Support**: Optimized reading experience in both light and dark themes

## Technology Stack

### Frontend Framework
- **Next.js 15**: React framework with App Router for optimal performance
- **React 19**: Latest React features and hooks
- **TypeScript 5**: Strong type safety and enhanced developer experience

### UI/UX
- **Tailwind CSS 4**: Utility-first CSS framework for rapid styling
- **Lucide React**: Consistent and modern icon library
- **next-themes**: Seamless dark/light mode switching

### Code Editor
- **Monaco Editor**: VS Code's editor engine for rich code editing
- **react-markdown**: Markdown rendering with syntax highlighting
- **rehype-highlight**: Code syntax highlighting for multiple languages

### Development Tools
- **ESLint 9**: Code quality and consistency enforcement
- **PostCSS**: CSS processing and optimization
- **Autoprefixer**: Cross-browser CSS compatibility

## Project Structure

```
promise-logic-docs/
├── src/
│   ├── app/                      # Next.js App Router pages
│   │   ├── docs/                 # Documentation pages
│   │   │   ├── concepts/         # Core concepts and philosophy
│   │   │   ├── logic-gates/      # Logic gate documentation
│   │   │   ├── utility-methods/  # Utility method documentation
│   │   │   ├── extended-features/ # Extended features documentation
│   │   │   ├── factory-function/ # Factory function documentation
│   │   │   ├── installation/     # Installation guide
│   │   │   └── quick-start/     # Quick start guide
│   │   ├── layout.tsx           # Root layout
│   │   └── page.tsx             # Homepage
│   ├── components/               # React components
│   │   ├── docs/                # Documentation-specific components
│   │   ├── features/            # Feature components (editor, demos)
│   │   └── layout/             # Layout components (header, navigation)
│   ├── lib/                    # Utility libraries
│   │   ├── constants/          # Application constants
│   │   ├── types/              # TypeScript type definitions
│   │   └── utils/             # Helper functions
│   └── types/                 # Shared TypeScript types
├── public/                     # Static assets
└── package.json               # Project dependencies
```

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm, yarn, pnpm, or bun package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd promise-logic-docs
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open your browser and navigate to [http://localhost:3000](http://localhost:3000)

## Development

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build production-optimized application
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality checks
- `npm run type-check` - Run TypeScript type checking

### Code Style

The project follows strict code quality standards:

- **TypeScript**: All code must be properly typed with no `any` types
- **ESLint**: Code must pass ESLint checks before committing
- **Component Organization**: Components should be modular and reusable
- **Type Definitions**: Shared types should be defined in the `types/` directory

### Adding Documentation

To add new documentation pages:

1. Create a new directory under `src/app/docs/`
2. Add a `page.tsx` file with your documentation content
3. Use existing components for consistency:
   - `ParameterTable` for method parameters
   - `ReturnValue` for return value descriptions
   - `BehaviorSection` for behavior descriptions
   - `CodeExamples` for code examples
   - `NoteSection` for important notes

### Interactive Code Examples

The documentation supports interactive code examples using Monaco Editor:

```tsx
<InteractiveCodeEditor
  initialCode="// Your code here"
  language="javascript"
  onChange={(code) => console.log(code)}
/>
```

## Deployment

### Vercel (Recommended)

The easiest way to deploy is using Vercel:

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com/new)
3. Follow the deployment wizard
4. Your site will be live at `your-project.vercel.app`

### Other Platforms

The application can be deployed to any platform that supports Next.js:

- **Netlify**: Use the Next.js build preset
- **AWS Amplify**: Configure as a Next.js application
- **Docker**: Build and deploy as a containerized application
- **Static Export**: Use `next export` for static site generation

## Browser Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch
3. Make your changes with proper type definitions
4. Run `npm run lint` and `npm run type-check`
5. Submit a pull request with a clear description

## License

This documentation website is part of the PromiseLogic project. See the main project repository for license information.

## Support

- **Documentation**: [https://docs.promise-logic.dev](https://docs.promise-logic.dev)
- **Issues**: Report bugs and feature requests on GitHub
- **Discussions**: Join community discussions on GitHub

## Acknowledgments

Built with modern web technologies and inspired by digital circuit design principles. Special thanks to the open-source community for the excellent tools and libraries that make this project possible.
