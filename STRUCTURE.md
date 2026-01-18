# The Findery - Project Structure

A scalable React TypeScript application structure designed for growth.

## Directory Structure

```
src/
├── assets/              # Static files (images, fonts, etc.)
│   ├── images/
│   ├── fonts/
│   └── icons/
│
├── components/          # Reusable UI components
│   ├── common/         # Generic components (Button, Input, Card, etc.)
│   ├── forms/          # Form-related components
│   ├── layout/         # Layout components (Header, Footer, Sidebar, etc.)
│   └── index.ts        # Barrel exports
│
├── views/              # Page-level components (routes)
│   ├── Waitlist/
│   │   ├── Waitlist.tsx
│   │   ├── Waitlist.css
│   │   └── index.ts
│   ├── Discover/
│   ├── UserLogin/
│   └── index.ts
│
├── features/           # Feature-based modules (optional for larger features)
│   └── waitlist/
│       ├── components/
│       ├── hooks/
│       ├── utils/
│       └── index.ts
│
├── lib/                # External service integrations & utilities
│   ├── supabase.ts
│   ├── api/           # API client configurations
│   └── utils/         # Utility functions
│
├── hooks/              # Custom React hooks
│   ├── useAuth.ts
│   ├── useWaitlist.ts
│   └── index.ts
│
├── context/            # React Context providers
│   ├── AuthContext.tsx
│   └── index.ts
│
├── styles/             # Global styles and theme
│   ├── globals.css
│   ├── theme.ts
│   └── variables.css
│
├── types/              # TypeScript type definitions
│   ├── index.ts
│   ├── api.ts
│   └── models.ts
│
├── config/             # App configuration
│   ├── constants.ts
│   └── env.ts
│
├── routes/             # Route definitions
│   └── index.tsx
│
├── App.tsx
├── index.tsx
└── index.css
```

## Naming Conventions

### Files
- **Components**: PascalCase (e.g., `Button.tsx`, `UserProfile.tsx`)
- **Utilities**: camelCase (e.g., `formatDate.ts`, `apiClient.ts`)
- **Styles**: kebab-case or match component (e.g., `button.css`, `Button.css`)
- **Types**: PascalCase (e.g., `User.ts`, `ApiResponse.ts`)

### Folders
- **Feature folders**: camelCase (e.g., `userAuth/`, `productCatalog/`)
- **Component folders**: PascalCase when they contain a single component

## Component Structure

Each complex component should have its own folder:

```
ComponentName/
├── ComponentName.tsx      # Component logic
├── ComponentName.css      # Component styles
├── ComponentName.test.tsx # Unit tests
├── types.ts              # Component-specific types
└── index.ts              # Barrel export
```

## Import Order

1. External libraries (React, third-party packages)
2. Internal absolute imports (from `src/`)
3. Relative imports (from `./` or `../`)
4. Styles
5. Types

Example:
```typescript
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/common';
import { useAuth } from '@/hooks';

import { LoginForm } from './LoginForm';
import './UserLogin.css';

import type { User } from '@/types';
```

## Barrel Exports

Use `index.ts` files to simplify imports:

```typescript
// components/common/index.ts
export { Button } from './Button';
export { Input } from './Input';
export { Card } from './Card';

// Usage
import { Button, Input, Card } from '@/components/common';
```

## Feature-Based Organization (for larger features)

For complex features, use a self-contained structure:

```
features/
└── checkout/
    ├── components/
    │   ├── CheckoutForm.tsx
    │   └── PaymentMethod.tsx
    ├── hooks/
    │   └── useCheckout.ts
    ├── utils/
    │   └── validatePayment.ts
    ├── types.ts
    └── index.ts
```

## Path Aliases

Configure TypeScript path aliases in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": "src",
    "paths": {
      "@/components/*": ["components/*"],
      "@/views/*": ["views/*"],
      "@/hooks/*": ["hooks/*"],
      "@/lib/*": ["lib/*"],
      "@/types/*": ["types/*"],
      "@/assets/*": ["assets/*"]
    }
  }
}
```

## Benefits

- **Scalability**: Clear separation makes it easy to add new features
- **Maintainability**: Consistent structure helps developers navigate the codebase
- **Reusability**: Common components and utilities are easy to find and share
- **Testing**: Co-located tests make it easy to maintain test coverage
- **Team collaboration**: Clear conventions reduce onboarding time
