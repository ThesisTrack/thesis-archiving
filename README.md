#GettersSetters

## Getting Started

## Setup for development

### 1. Installing needed tools

- Install [NodeJS](https://nodejs.org/en)
- Install [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) (can be found in vscode marketplace)
- Install [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) (can be found in vscode marketplace)

#### Optional tools
- Install [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) (can be found in vscode marketplace)

### 2. Clone Repository

```bash
git clone https://github.com/ThesisTrack/thesis-archiving.git
cd ThesisTrack/thesis-archiving
code .
```

### 3. Install dependencies

```bash
npm install
```

### 4. Setup your .env

```bash
cp .env.example .env
```

### 4. Initialize your database

```bash
npm run db:push
```

### 5. Start development

```bash
npm run dev
```

## How to do your task?

### 1. Branch out

```bash
git checkout -b <branch_name>
```

### 2. Code

### 3. Review your changes

### 4. Stage your changes

```bash
git add .
```

### 5. Commit your stage

```bash
git commit -m "<message>"
```

### 6. Push your commit

```bash
git push -u origin <your_branch_name>
```

### 7. Create your PR (Pull Request) in GitHub
