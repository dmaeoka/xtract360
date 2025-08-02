# xtract360 Frontend Challenge

This project is a React + TypeScript application built to fulfill the requirements of a dynamic form challenge. The app includes custom field rendering, validation, conditional visibility logic, and unit tests with Jest and React Testing Library.

## 🧱 Tech Stack

- **React 18**
- **TypeScript**
- **Material UI (MUI)**
- **Ramda**
- **Jest + React Testing Library**
- **React Router v6**

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/dmaeoka/xtract360.git
cd xtract360
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm start
```

This will run the app on [http://localhost:3000](http://localhost:3000)

## 🧪 Running Tests

```bash
npm test
```

Tests are written with:

- **Jest** for the test runner
- **React Testing Library** for DOM testing
- **ts-jest** for TypeScript support

### Test Features

- Validates required fields and submission behavior
- Verifies dynamic field rendering (e.g. select, input, numeric, currency)
- Checks conditional visibility logic
- Ensures form navigation works correctly

## 📦 Project Structure

```
.
├── src/
│   ├── components/
│   │   ├── StaticForm.tsx      # Main form component
│   │   ├── DynamicField.tsx    # Reusable dynamic field renderer
│   ├── utils/
│   │   ├── index.ts            # setDeep, getDeep, isEmpty, getData, etc.
│   ├── tests/
│   │   ├── utils.test.ts
│   │   ├── DynamicField.test.tsx
│   │   └── StaticForm.test.tsx
│   ├── AppRoutes.tsx
│   ├── index.tsx
├── jest.config.js
├── jest.setup.ts
└── README.md
```

## ✅ Features Implemented

- [x] Render form dynamically from config
- [x] Handle input, numeric, select, and currency types
- [x] Deep state updates with Ramda
- [x] Required field validation
- [x] Visual error alerts
- [x] Conditional field visibility (e.g. `if` rules: `equals`, `greaterThan`, `not`, etc.)
- [x] Navigation to `/submitted` page on success
- [x] Unit tests for utilities and components

## 📄 License

This project is provided for technical assessment purposes. License restrictions may apply.
