# SBA Academy App

A modern Next.js application built with TypeScript, featuring internationalization, authentication, and a component-based architecture.

## 🚀 Project Overview

This is a Next.js 15 application using the App Router with TypeScript, SCSS, and Tailwind CSS. The project follows a clean architecture pattern with modular components, custom hooks, and centralized state management.

## 📁 Project Structure

```
new_app/
├── app/                          # Next.js App Router directory
│   ├── api/                      # API routes
│   │   ├── auth/                 # NextAuth.js authentication
│   │   └── file-proxy/           # File proxy endpoints
│   ├── components/               # App-specific components
│   │   ├── dialog-provider/      # Global dialog provider
│   │   └── dialogs/              # Dialog components
│   ├── [locale]/                 # Internationalized pages
│   │   ├── 404/                  # Custom 404 page
│   │   ├── home/                 # Home page
│   │   └── _dummy/               # Development/testing pages
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Root page
│   └── not-found.tsx             # Global 404 handler
├── components/                   # Reusable UI components
│   ├── alert/                    # Alert component
│   ├── async-select-input/       # Async select input
│   ├── breadcrumb/               # Breadcrumb navigation
│   ├── button/                   # Button component
│   ├── checkbox/                 # Checkbox components
│   ├── checkbox-controller/      # Form-controlled checkbox
│   ├── checkbox-group/           # Checkbox group
│   ├── collapse/                 # Collapsible component
│   └── ...                       # Other UI components
├── hooks/                        # Custom React hooks
│   ├── get-screen-size.hook.tsx  # Screen size detection
│   ├── isActive-link.hook.ts     # Active link detection
│   ├── local-storage.hook.tsx    # Local storage management
│   ├── toggle-menu-open.hook.tsx # Menu toggle functionality
│   ├── use-back-step.hook.ts     # Navigation step management
│   └── index.ts                  # Hooks barrel export
├── context/                      # React Context providers
│   ├── dialog.context.tsx        # Dialog state management
│   ├── toggle-menu.context.tsx   # Menu toggle state
│   └── index.ts                  # Context barrel export
├── constant/                     # Application constants
│   ├── api-endpoint.constant.ts  # API endpoint definitions
│   ├── dialog-keys.constant.ts   # Dialog identifier keys
│   ├── routes.constant.ts        # Application routes
│   ├── revalidate-paths.constant.ts # Cache revalidation paths
│   └── index.ts                  # Constants barrel export
├── models/                       # TypeScript type definitions
│   ├── dialog.model.ts           # Dialog-related types
│   ├── dropdown-options.model.ts # Dropdown option types
│   ├── search-params.model.ts    # Search parameter types
│   └── index.ts                  # Models barrel export
├── i18n/                         # Internationalization setup
│   ├── request.ts                # i18n request handling
│   └── routing.ts                # i18n routing configuration
├── locales/                      # Translation files
│   ├── ar.json                   # Arabic translations
│   └── en.json                   # English translations
├── auth.ts                       # NextAuth.js configuration
├── middleware.ts                 # Next.js middleware
├── i18n.ts                       # i18n configuration
└── next.config.mjs               # Next.js configuration
```

## 🏗️ Architecture Patterns

### 📦 Component Structure
Each component follows a consistent structure:
```
component-name/
├── component-name.component.tsx  # Main component file
├── component-name.scss          # Component-specific styles
└── index.ts                     # Component export (if needed)
```

### 🔗 Barrel Exports
The project uses barrel exports (`index.ts` files) for clean imports:
- `components/index.ts` - Export all components
- `hooks/index.ts` - Export all custom hooks
- `context/index.ts` - Export all context providers
- `constant/index.ts` - Export all constants
- `models/index.ts` - Export all TypeScript types

### 🌐 Internationalization (i18n)
- **Routing**: Locale-based routing with `[locale]` dynamic segments
- **Translations**: JSON files in `locales/` directory
- **Setup**: Configuration in `i18n/` directory
- **Middleware**: Automatic locale detection and redirection

### 🎯 State Management
- **React Context**: Global state management
- **Custom Hooks**: Reusable stateful logic
- **Local State**: Component-level state with React hooks

## 🛠️ Technology Stack

### Core Technologies
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **React 19** - UI library
- **SCSS & Tailwind CSS** - Styling solutions

### Key Dependencies
- **NextAuth.js** - Authentication
- **next-intl** - Internationalization
- **React Hook Form** - Form management
- **React Select** - Advanced select components
- **Axios** - HTTP client
- **Chart.js** - Data visualization
- **Firebase** - Backend services

### Development Tools
- **Turbopack** - Fast development bundler
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 🚦 Getting Started

### Installation
```bash
# Install dependencies
npm install
# or
yarn install
```

### Development
```bash
# Start development server with Turbopack
npm run dev
# or
yarn dev
```

### Build
```bash
# Build for production
npm run build
# or
yarn build
```

### Start Production
```bash
# Start production server
npm start
# or
yarn start
```

## 📝 Development Guidelines

### 🎨 Styling Guidelines
- Use SCSS modules for component-specific styles
- Utilize Tailwind CSS for utility classes
- Store design tokens (colors, spacing, fonts) in variable files
- Import styles from variable files when available

### 🧩 Component Guidelines
- Create small, reusable components
- Use TypeScript for type safety
- Follow the established naming conventions
- Keep components focused on single responsibility

### 🔄 Custom Hooks
- Extract reusable logic into custom hooks
- Place hooks in the `hooks/` directory
- Use descriptive names ending with `.hook.ts`
- Export hooks through the barrel export

### 🌍 Internationalization
- All user-facing text should be translatable
- Add new translations to both `ar.json` and `en.json`
- Use the established translation keys structure
- Implement translations using the `next-intl` library

### 📁 File Organization
- Follow the established directory structure
- Use consistent naming conventions
- Group related files in directories
- Maintain barrel exports for clean imports

## 🔧 Configuration Files

- **`next.config.mjs`** - Next.js configuration
- **`auth.ts`** - NextAuth.js setup
- **`middleware.ts`** - Request/response middleware
- **`i18n.ts`** - Internationalization config
- **`tailwind.config.js`** - Tailwind CSS configuration
- **`postcss.config.js`** - PostCSS configuration

## 🎯 Key Features

- ✅ **Multi-language Support** (Arabic & English)
- ✅ **Authentication** with NextAuth.js
- ✅ **Responsive Design** with Tailwind CSS
- ✅ **Type Safety** with TypeScript
- ✅ **Modern Styling** with SCSS modules
- ✅ **Component Library** with reusable UI components
- ✅ **Form Management** with React Hook Form
- ✅ **State Management** with React Context
- ✅ **API Integration** with Axios
- ✅ **Data Visualization** with Chart.js

## 📚 Notes

- The project uses Next.js App Router (not Pages Router)
- Components are designed to be reusable and modular
- Custom hooks encapsulate reusable stateful logic
- The project follows clean architecture principles
- All hard-coded text should be internationalized
- CSS variables should be used for consistent design tokens
