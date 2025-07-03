# React Intern Assignment - Spreadsheet Table

A React 18 + TypeScript assignment that mimics a spreadsheet-like table UI. It allows editing, row filtering, sorting, and adding new rows — styled with Tailwind CSS and powered by `react-table`.

## 📦 Tech Stack

- ⚛️ React 18
- 🛠️ TypeScript (Strict Mode)
- 💨 Tailwind CSS
- 📊 react-table
- 📝 Editable inputs and tab-based filtering

## 🚀 Features

- ✅ View and sort tabular data
- ✏️ Edit individual cells inline
- 🔍 Filter rows based on **Active** or **Inactive** status via tabs
- ➕ Add new rows dynamically
- ⚡ Fast rendering with memoization and `react-table`

## 📁 Project Structure
```txt
assignment/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── components/
│   │   ├── Tabs.tsx
│   │   ├── Toolbar.tsx
│   │   └── Spreadsheet.tsx
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   └── vite-env.d.ts
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
├── README.md

## 🧪 Example Data

```ts
[
  { name: "John Doe", email: "john@example.com", status: "Active" },
  { name: "Jane Smith", email: "jane@example.com", status: "Inactive" }
]


##🧠 Learnings
Practical usage of react-table for dynamic UIs

Controlled inputs for inline editing

Efficient filtering and conditional rendering in React

Clean and responsive UI with Tailwind CSS

##👤 Author
Rohan Gahlot
GitHub: @rohangahlot27
Deployed: react-intern-assignment-nine.vercel.app

