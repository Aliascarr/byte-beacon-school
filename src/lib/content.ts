import type { LucideIcon } from "lucide-react";
import {
  Braces,
  Boxes,
  Bot,
  Brain,
  Cpu,
  Database,
  FileCode2,
  Globe,
  Layers,
  Lock,
  Palette,
  Rocket,
  Server,
  Smartphone,
  Terminal,
  Workflow,
} from "lucide-react";

export type RoadmapStatus = "done" | "active" | "locked";

export interface RoadmapNode {
  id: string;
  title: string;
  description: string;
  hours: number;
  lessons: number;
  status: RoadmapStatus;
}

export const roadmap: RoadmapNode[] = [
  {
    id: "basics",
    title: "Programming Basics",
    description: "Переменные, циклы, функции, мышление алгоритмами.",
    hours: 12,
    lessons: 24,
    status: "done",
  },
  {
    id: "html",
    title: "HTML",
    description: "Семантика, формы, доступность, SEO-разметка.",
    hours: 8,
    lessons: 18,
    status: "done",
  },
  {
    id: "css",
    title: "CSS",
    description: "Flexbox, Grid, анимации, адаптивная вёрстка.",
    hours: 14,
    lessons: 26,
    status: "done",
  },
  {
    id: "javascript",
    title: "JavaScript",
    description: "DOM, асинхронность, модули, паттерны.",
    hours: 26,
    lessons: 42,
    status: "active",
  },
  {
    id: "typescript",
    title: "TypeScript",
    description: "Типы, дженерики, строгий режим, утилити-типы.",
    hours: 16,
    lessons: 22,
    status: "locked",
  },
  {
    id: "react",
    title: "React",
    description: "Хуки, состояние, производительность, тестирование.",
    hours: 30,
    lessons: 48,
    status: "locked",
  },
  {
    id: "nextjs",
    title: "Next.js",
    description: "SSR, роутинг, кэширование, серверные функции.",
    hours: 18,
    lessons: 24,
    status: "locked",
  },
  {
    id: "backend",
    title: "Backend",
    description: "REST, GraphQL, аутентификация, архитектура.",
    hours: 34,
    lessons: 52,
    status: "locked",
  },
  {
    id: "databases",
    title: "Databases",
    description: "SQL, индексы, транзакции, моделирование данных.",
    hours: 20,
    lessons: 28,
    status: "locked",
  },
  {
    id: "devops",
    title: "DevOps",
    description: "Docker, CI/CD, мониторинг, облако.",
    hours: 22,
    lessons: 30,
    status: "locked",
  },
  {
    id: "ai",
    title: "AI",
    description: "LLM, RAG, эмбеддинги, продуктовые AI-фичи.",
    hours: 24,
    lessons: 32,
    status: "locked",
  },
];

export interface Course {
  id: string;
  title: string;
  track: string;
  level: "Начальный" | "Средний" | "Продвинутый";
  lessons: number;
  hours: number;
  rating: number;
  students: string;
  icon: LucideIcon;
}

export const tracks = [
  "Все",
  "Frontend",
  "Backend",
  "Python",
  "Java",
  "C++",
  "Go",
  "Rust",
  "AI",
  "Machine Learning",
  "Cyber Security",
  "Mobile",
  "DevOps",
  "Algorithms",
  "Data Structures",
];

export const courses: Course[] = [
  {
    id: "frontend-pro",
    title: "Frontend Pro: React и современный UI",
    track: "Frontend",
    level: "Средний",
    lessons: 96,
    hours: 48,
    rating: 4.9,
    students: "48.2k",
    icon: Palette,
  },
  {
    id: "node-backend",
    title: "Backend на Node.js и архитектура API",
    track: "Backend",
    level: "Средний",
    lessons: 74,
    hours: 42,
    rating: 4.8,
    students: "31.7k",
    icon: Server,
  },
  {
    id: "python-zero",
    title: "Python с нуля до автоматизации",
    track: "Python",
    level: "Начальный",
    lessons: 68,
    hours: 36,
    rating: 4.9,
    students: "72.4k",
    icon: FileCode2,
  },
  {
    id: "java-core",
    title: "Java Core и ООП на практике",
    track: "Java",
    level: "Начальный",
    lessons: 62,
    hours: 40,
    rating: 4.7,
    students: "24.1k",
    icon: Boxes,
  },
  {
    id: "cpp-perf",
    title: "C++: память, производительность, STL",
    track: "C++",
    level: "Продвинутый",
    lessons: 58,
    hours: 44,
    rating: 4.8,
    students: "12.9k",
    icon: Cpu,
  },
  {
    id: "go-services",
    title: "Go: высоконагруженные сервисы",
    track: "Go",
    level: "Средний",
    lessons: 46,
    hours: 28,
    rating: 4.8,
    students: "15.3k",
    icon: Rocket,
  },
  {
    id: "rust-systems",
    title: "Rust: системное программирование",
    track: "Rust",
    level: "Продвинутый",
    lessons: 52,
    hours: 38,
    rating: 4.9,
    students: "9.8k",
    icon: Braces,
  },
  {
    id: "ai-apps",
    title: "AI-приложения: LLM, RAG, агенты",
    track: "AI",
    level: "Средний",
    lessons: 40,
    hours: 24,
    rating: 4.9,
    students: "27.6k",
    icon: Bot,
  },
  {
    id: "ml-core",
    title: "Machine Learning: от регрессии до нейросетей",
    track: "Machine Learning",
    level: "Продвинутый",
    lessons: 66,
    hours: 46,
    rating: 4.8,
    students: "18.4k",
    icon: Brain,
  },
  {
    id: "security",
    title: "Cyber Security: атаки и защита веба",
    track: "Cyber Security",
    level: "Средний",
    lessons: 44,
    hours: 26,
    rating: 4.7,
    students: "11.2k",
    icon: Lock,
  },
  {
    id: "mobile",
    title: "Mobile Development на React Native",
    track: "Mobile",
    level: "Средний",
    lessons: 50,
    hours: 30,
    rating: 4.6,
    students: "14.7k",
    icon: Smartphone,
  },
  {
    id: "devops",
    title: "DevOps: Docker, CI/CD, Kubernetes",
    track: "DevOps",
    level: "Продвинутый",
    lessons: 54,
    hours: 34,
    rating: 4.8,
    students: "21.5k",
    icon: Workflow,
  },
  {
    id: "algorithms",
    title: "Алгоритмы для собеседований",
    track: "Algorithms",
    level: "Средний",
    lessons: 80,
    hours: 50,
    rating: 4.9,
    students: "63.9k",
    icon: Layers,
  },
  {
    id: "data-structures",
    title: "Структуры данных на практике",
    track: "Data Structures",
    level: "Начальный",
    lessons: 58,
    hours: 32,
    rating: 4.8,
    students: "39.1k",
    icon: Database,
  },
  {
    id: "web-platform",
    title: "Web Platform: сеть, браузер, производительность",
    track: "Frontend",
    level: "Продвинутый",
    lessons: 42,
    hours: 22,
    rating: 4.7,
    students: "17.8k",
    icon: Globe,
  },
  {
    id: "linux",
    title: "Linux и терминал для разработчика",
    track: "DevOps",
    level: "Начальный",
    lessons: 36,
    hours: 18,
    rating: 4.8,
    students: "28.3k",
    icon: Terminal,
  },
];

export type Difficulty = "Лёгкая" | "Средняя" | "Сложная";

export interface Problem {
  id: number;
  title: string;
  difficulty: Difficulty;
  topic: string;
  acceptance: number;
  solved: boolean;
}

export const problems: Problem[] = [
  { id: 1, title: "Two Sum", difficulty: "Лёгкая", topic: "Хеш-таблицы", acceptance: 52, solved: true },
  { id: 2, title: "Valid Parentheses", difficulty: "Лёгкая", topic: "Стек", acceptance: 48, solved: true },
  { id: 3, title: "Merge Intervals", difficulty: "Средняя", topic: "Сортировка", acceptance: 44, solved: true },
  { id: 4, title: "LRU Cache", difficulty: "Средняя", topic: "Дизайн", acceptance: 41, solved: false },
  { id: 5, title: "Course Schedule", difficulty: "Средняя", topic: "Графы", acceptance: 46, solved: false },
  { id: 6, title: "Word Ladder", difficulty: "Сложная", topic: "BFS", acceptance: 37, solved: false },
  { id: 7, title: "Median of Two Sorted Arrays", difficulty: "Сложная", topic: "Бинарный поиск", acceptance: 35, solved: false },
  { id: 8, title: "Longest Substring Without Repeating", difficulty: "Средняя", topic: "Два указателя", acceptance: 49, solved: true },
  { id: 9, title: "Binary Tree Level Order", difficulty: "Средняя", topic: "Деревья", acceptance: 63, solved: false },
  { id: 10, title: "Trapping Rain Water", difficulty: "Сложная", topic: "Массивы", acceptance: 39, solved: false },
  { id: 11, title: "Climbing Stairs", difficulty: "Лёгкая", topic: "Динамика", acceptance: 68, solved: true },
  { id: 12, title: "Serialize Binary Tree", difficulty: "Сложная", topic: "Деревья", acceptance: 33, solved: false },
];

export interface LeaderboardEntry {
  rank: number;
  name: string;
  handle: string;
  xp: number;
  solved: number;
  speed: string;
  streak: number;
}

export const leaderboard: LeaderboardEntry[] = [
  { rank: 1, name: "Алиса Ким", handle: "@alice.dev", xp: 148_920, solved: 1284, speed: "3м 12с", streak: 214 },
  { rank: 2, name: "Марк Соловьёв", handle: "@marksol", xp: 141_300, solved: 1198, speed: "3м 41с", streak: 189 },
  { rank: 3, name: "Дана Ержан", handle: "@dana.rs", xp: 133_540, solved: 1122, speed: "4м 02с", streak: 173 },
  { rank: 4, name: "Игорь Панов", handle: "@ipanov", xp: 121_870, solved: 1043, speed: "4м 18с", streak: 141 },
  { rank: 5, name: "Sara Lin", handle: "@saralin", xp: 118_240, solved: 988, speed: "4м 25с", streak: 132 },
  { rank: 6, name: "Тимур Абдуллаев", handle: "@timur.a", xp: 109_610, solved: 921, speed: "4м 47с", streak: 118 },
  { rank: 7, name: "Nina Petrova", handle: "@ninap", xp: 102_450, solved: 884, speed: "5м 03с", streak: 96 },
  { rank: 8, name: "Олег Крамер", handle: "@okramer", xp: 97_310, solved: 842, speed: "5м 12с", streak: 88 },
];

export const xpHistory = [
  { day: "Пн", xp: 320, minutes: 45 },
  { day: "Вт", xp: 480, minutes: 62 },
  { day: "Ср", xp: 260, minutes: 38 },
  { day: "Чт", xp: 610, minutes: 78 },
  { day: "Пт", xp: 540, minutes: 71 },
  { day: "Сб", xp: 780, minutes: 96 },
  { day: "Вс", xp: 690, minutes: 84 },
];

export interface Achievement {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
}

export const achievements: Achievement[] = [
  { id: "first-blood", title: "Первая задача", description: "Решена первая задача на платформе", unlocked: true },
  { id: "streak-30", title: "30 дней подряд", description: "Месяц без пропусков", unlocked: true },
  { id: "night-owl", title: "Ночной кодер", description: "10 задач после полуночи", unlocked: true },
  { id: "algo-master", title: "Мастер алгоритмов", description: "100 задач по алгоритмам", unlocked: false },
  { id: "polyglot", title: "Полиглот", description: "Код на 5 языках", unlocked: false },
  { id: "contest-win", title: "Победа в контесте", description: "Топ-1 в еженедельном контесте", unlocked: false },
];
