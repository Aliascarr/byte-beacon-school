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

export interface LessonQuiz {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  videoUrl: string;
  description: string;
  codeSnippet?: string;
  quiz?: LessonQuiz;
}

export interface LessonModule {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  description?: string;
  track: string;
  level: "Начальный" | "Средний" | "Продвинутый";
  lessons: number;
  hours: number;
  rating: number;
  students: string;
  icon: LucideIcon;
  modules?: LessonModule[];
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
    description: "Глубокое погружение в React 19, JSX, хуки, управление состоянием, паттерны и адаптивный UI.",
    track: "Frontend",
    level: "Средний",
    lessons: 96,
    hours: 48,
    rating: 4.9,
    students: "48.2k",
    icon: Palette,
    modules: [
      {
        id: "react-basics",
        title: "Модуль 1: Основы React и JSX",
        lessons: [
          {
            id: "m1-l1",
            title: "Введение в React 19 и современную веб-разработку",
            duration: "14:20",
            videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk",
            description: "В этом уроке мы разберём, как устроена библиотека React 19, что такое виртуальный DOM (Virtual DOM), почему компонентный подход изменил веб-разработку и как настроить проект с помощью Vite.",
            codeSnippet: `import { useState } from 'react';\n\nexport function Counter() {\n  const [count, setCount] = useState(0);\n  return (\n    <button onClick={() => setCount(count + 1)}>\n      Кликов: {count}\n    </button>\n  );\n}`,
            quiz: {
              question: "Что такое Virtual DOM в React?",
              options: [
                "Прямая копия объективной памяти браузера",
                "Легковесное виртуальное представление реального DOM в памяти",
                "Плагин для Google Chrome",
                "Специальный серверный фреймворк"
              ],
              correctIndex: 1,
              explanation: "Virtual DOM — это виртуальная копия реального DOM, с помощью которой React вычислят минимальные диффы перед обновлением страницы."
            }
          },
          {
            id: "m1-l2",
            title: "JSX: Синтаксис, выражения и отрисовка списков",
            duration: "18:45",
            videoUrl: "https://www.youtube.com/embed/bMknfKXIFA8",
            description: "Изучение JSX-синтаксиса. Рассматриваем внедрение JavaScript-выражений, условную отрисовку (conditional rendering) и ключевой атрибут key при работе со списками array.map().",
            codeSnippet: `const items = ['React', 'TypeScript', 'Vite'];\n\nexport function TechList() {\n  return (\n    <ul>\n      {items.map((item, index) => (\n        <li key={index}>{item}</li>\n      ))}\n    </ul>\n  );\n}`,
            quiz: {
              question: "Зачем в React нужен атрибут key при выводе массивов?",
              options: [
                "Для стилизации элементов CSS",
                "Для помощи React в идентифицировании изменённых элементов",
                "Для работы SEO индексаторов",
                "Для ускорения скачивания видео"
              ],
              correctIndex: 1,
              explanation: "Ключи (key) помогают React однозначно связывать элементы Virtual DOM с реальными элементами при перерисовке."
            }
          }
        ]
      },
      {
        id: "react-hooks",
        title: "Модуль 2: Углубленные Хуки (Hooks)",
        lessons: [
          {
            id: "m2-l1",
            title: "useEffect, useMemo и useCallback — жизненный цикл компонентов",
            duration: "22:10",
            videoUrl: "https://www.youtube.com/embed/00lxm_doFYw",
            description: "Разбор асинхронных эффектов и оптимизации производительности. Как избежать бесконечных циклов в useEffect и когда применять мемоизацию.",
            codeSnippet: `import { useState, useEffect } from 'react';\n\nexport function DataFetcher() {\n  const [data, setData] = useState(null);\n  useEffect(() => {\n    fetch('https://api.github.com/users/octocat')\n      .then(res => res.json())\n      .then(setData);\n  }, []);\n  return <div>User: {data?.login}</div>;\n}`,
            quiz: {
              question: "Когда срабатывает эффект useEffect без массива зависимостей?",
              options: [
                "Только при монтировании компонента",
                "При каждом рендере компонента",
                "Только при клике на кнопку",
                "Никогда не срабатывает"
              ],
              correctIndex: 1,
              explanation: "Если массив зависимостей упущен, эффект выполняется при каждом рендере компонента."
            }
          }
        ]
      }
    ]
  },
  {
    id: "node-backend",
    title: "Backend на Node.js и архитектура API",
    description: "Разработка масштабируемых REST и GraphQL API на Node.js, Express, Fastify и PostgreSQL.",
    track: "Backend",
    level: "Средний",
    lessons: 74,
    hours: 42,
    rating: 4.8,
    students: "31.7k",
    icon: Server,
    modules: [
      {
        id: "node-core",
        title: "Модуль 1: Архитектура Node.js и Event Loop",
        lessons: [
          {
            id: "node-l1",
            title: "Как работает Node.js: V8 engine, Event Loop и Libuv",
            duration: "19:30",
            videoUrl: "https://www.youtube.com/embed/PNa9OMajw9w",
            description: "Разбор архитектуры runtime-среды Node.js. Архитектура асинхронного неблокирующего ввода-вывода (Non-blocking I/O) и устройство фаз Event Loop.",
            codeSnippet: `import http from 'http';\n\nconst server = http.createServer((req, res) => {\n  res.writeHead(200, { 'Content-Type': 'application/json' });\n  res.end(JSON.stringify({ status: 'ok', time: new Date() }));\n});\n\nserver.listen(3000, () => console.log('Server running on :3000'));`,
            quiz: {
              question: "Что отвечает за асинхронный ввод-вывод в Node.js?",
              options: [
                "Библиотека Libuv",
                "Движок V8",
                "Nginx",
                "React DOM"
              ],
              correctIndex: 0,
              explanation: "Libuv — это C-библиотека с открытым исходным кодом, которая предоставляет Node.js пулы потоков и Event Loop."
            }
          }
        ]
      }
    ]
  },
  {
    id: "python-zero",
    title: "Python с нуля до автоматизации",
    description: "Изучение программирования на Python: основы, структуры данных, функции, парсинг сайтов и автоматизация.",
    track: "Python",
    level: "Начальный",
    lessons: 68,
    hours: 36,
    rating: 4.9,
    students: "72.4k",
    icon: FileCode2,
    modules: [
      {
        id: "py-basics",
        title: "Модуль 1: Введение в Python 3",
        lessons: [
          {
            id: "py-l1",
            title: "Первая программа на Python, переменные и типы данных",
            duration: "16:15",
            videoUrl: "https://www.youtube.com/embed/rfscVS0vtbw",
            description: "Основы синтаксиса Python 3. Работа с числами, строками, списком (list), словарями (dict) и выравниванием отступов (PEP 8).",
            codeSnippet: `# Приветствие на Python\ndef greet(name: str):\n    return f"Привет, {name}! Добро пожаловать в AiJuz."\n\nusers = ["Алиса", "Марк", "Тимур"]\nfor u in users:\n    print(greet(u))`,
            quiz: {
              question: "Какой оператор используется для целочисленного деления в Python?",
              options: [
                "/",
                "//",
                "%",
                "div"
              ],
              correctIndex: 1,
              explanation: "Оператор // возвращает результат деления с отбрасыванием дробной части."
            }
          }
        ]
      }
    ]
  },
  {
    id: "java-core",
    title: "Java Core и ООП на практике",
    description: "Полный курс по Java: типы данных, коллекции, ООП паттерны, Multithreading и Spring Boot.",
    track: "Java",
    level: "Начальный",
    lessons: 62,
    hours: 40,
    rating: 4.7,
    students: "24.1k",
    icon: Boxes,
    modules: [
      {
        id: "java-basics",
        title: "Модуль 1: Java Syntax и ООП",
        lessons: [
          {
            id: "java-l1",
            title: "Классы, Объекты, Инкапсуляция и Наследование в Java",
            duration: "21:00",
            videoUrl: "https://www.youtube.com/embed/eIrMbAQSU34",
            description: "Объектно-ориентированное программирование на Java. Создание классов, модификаторы доступа, конструкторы и интерфейсы.",
            codeSnippet: `public class User {\n    private String name;\n    public User(String name) {\n        this.name = name;\n    }\n    public String getName() {\n        return name;\n    }\n}`,
            quiz: {
              question: "Какое ключевое слово запрещает наследование от класса в Java?",
              options: [
                "static",
                "final",
                "abstract",
                "private"
              ],
              correctIndex: 1,
              explanation: "Класс со спецмодификатором final не может иметь дочерних наследников."
            }
          }
        ]
      }
    ]
  },
  {
    id: "cpp-perf",
    title: "C++: память, производительность, STL",
    description: "Управление памятью, указатели, ссылки, шаблоны, Move-семантика и алгоритмы STL.",
    track: "C++",
    level: "Продвинутый",
    lessons: 58,
    hours: 44,
    rating: 4.8,
    students: "12.9k",
    icon: Cpu,
    modules: [
      {
        id: "cpp-mem",
        title: "Модуль 1: Указатели и управление памятью",
        lessons: [
          {
            id: "cpp-l1",
            title: "Stack vs Heap, Указатели и Умные указатели (std::unique_ptr)",
            duration: "25:40",
            videoUrl: "https://www.youtube.com/embed/vLnPwxZdW4Y",
            description: "Продвинутое управление памятью в современном C++20. Различия между стеком и кучей, применение RAII и smart pointers.",
            codeSnippet: `#include <iostream>\n#include <memory>\n\nclass Resource {\npublic:\n    Resource() { std::cout << "Created\\n"; }\n    ~Resource() { std::cout << "Destroyed\\n"; }\n};\n\nint main() {\n    auto ptr = std::make_unique<Resource>();\n    return 0;\n}`,
            quiz: {
              question: "Какой умный указатель обеспечивает эксклюзивное владение ресурсом в C++?",
              options: [
                "std::shared_ptr",
                "std::unique_ptr",
                "std::weak_ptr",
                "std::auto_ptr"
              ],
              correctIndex: 1,
              explanation: "std::unique_ptr гарантирует владение ресурсом ровно в одном месте и автоматическую очистку."
            }
          }
        ]
      }
    ]
  },
  {
    id: "go-services",
    title: "Go: высоконагруженные сервисы",
    description: "Программирование на Go: горутины, каналы, контекст, микросервисная архитектура и gRPC.",
    track: "Go",
    level: "Средний",
    lessons: 46,
    hours: 28,
    rating: 4.8,
    students: "15.3k",
    icon: Rocket,
    modules: [
      {
        id: "go-concurrency",
        title: "Модуль 1: Конкурентность в Go (Goroutines)",
        lessons: [
          {
            id: "go-l1",
            title: "Горутины, каналы и паттерн Worker Pool",
            duration: "20:15",
            videoUrl: "https://www.youtube.com/embed/YS4e4q9oBaU",
            description: "Изучение конкурентного программирования на Golang. Запуск лёгких потоков (goroutines), обмен сообщениями через каналы.",
            codeSnippet: `package main\n\nimport (\n\t"fmt"\n\t"time"\n)\n\nfunc worker(id int, jobs <-chan int, results chan<- int) {\n\tfor j := range jobs {\n\t\tfmt.Printf("worker %d started job %d\\n", id, j)\n\t\ttime.Sleep(time.Millisecond * 100)\n\t\tresults <- j * 2\n\t}\n}\n\nfunc main() {\n\tfmt.Println("Go Worker Pool")\n}`,
            quiz: {
              question: "Как в Go создать буферизованный канал на 5 элементов?",
              options: [
                "make(chan int)",
                "make(chan int, 5)",
                "new(chan int[5])",
                "channel.create(5)"
              ],
              correctIndex: 1,
              explanation: "Второй аргумент функции make(chan T, capacity) задаёт размер буфера канала."
            }
          }
        ]
      }
    ]
  },
  {
    id: "rust-systems",
    title: "Rust: системное программирование",
    description: "Система владения (Ownership), Borrowing, Lifetimes, беспековая конкурентность и системные утилиты.",
    track: "Rust",
    level: "Продвинутый",
    lessons: 52,
    hours: 38,
    rating: 4.9,
    students: "9.8k",
    icon: Braces,
    modules: [
      {
        id: "rust-ownership",
        title: "Модуль 1: Владение и заимствование (Ownership)",
        lessons: [
          {
            id: "rust-l1",
            title: "Правила Ownership, References и Borrow Checker в Rust",
            duration: "24:30",
            videoUrl: "https://www.youtube.com/embed/zF34dRivLOw",
            description: "Управление памятью без сборщика мусора через уникальную систему владения и статические проверки компилятора.",
            codeSnippet: `fn main() {\n    let s1 = String::from("hello");\n    let len = calculate_length(&s1);\n    println!("Длина '{}': {}", s1, len);\n}\n\nfn calculate_length(s: &String) -> usize {\n    s.len()\n}`,
            quiz: {
              question: "Сколько мутабельных (изменяемых) ссылок на объект может существовать одновременно в одной области видимости в Rust?",
              options: [
                "Сколько угодно",
                "Ровно одна",
                "Две",
                "Зависит от архитектуры процессора"
              ],
              correctIndex: 1,
              explanation: "Правило заимствования Rust разрешает иметь либо одну изменяемую ссылку &mut T, либо неограниченное число неизменяемых ссылок &T."
            }
          }
        ]
      }
    ]
  },
  {
    id: "ai-apps",
    title: "AI-приложения: LLM, RAG, агенты",
    description: "Разработка продуктовых AI-решений: OpenAI API, LangChain, векторные базы данных и мультиагентные системы.",
    track: "AI",
    level: "Средний",
    lessons: 40,
    hours: 24,
    rating: 4.9,
    students: "27.6k",
    icon: Bot,
    modules: [
      {
        id: "ai-rag",
        title: "Модуль 1: RAG (Retrieval-Augmented Generation)",
        lessons: [
          {
            id: "ai-l1",
            title: "Построение RAG системы на базе LLM и векторных эмбеддингов",
            duration: "28:10",
            videoUrl: "https://www.youtube.com/embed/wVzuvf9D9BU",
            description: "Как предоставить нейросети доступ к вашей собственной базе знаний. Векторный поиск, cosine similarity и чат-боты.",
            codeSnippet: `import { OpenAIEmbeddings } from '@langchain/openai';\n\nconst embeddings = new OpenAIEmbeddings();\nconst vector = await embeddings.embedQuery("Что такое AIJuz?");\nconsole.log("Vector size:", vector.length);`,
            quiz: {
              question: "Что расшифровывается как RAG в контексте AI?",
              options: [
                "Random Access Generation",
                "Retrieval-Augmented Generation",
                "Recursive AI Gateway",
                "Realtime Automated Graphic"
              ],
              correctIndex: 1,
              explanation: "RAG (Retrieval-Augmented Generation) обогащает промпт LLM релевантной информацией из базы знаний."
            }
          }
        ]
      }
    ]
  },
  {
    id: "ml-core",
    title: "Machine Learning: от регрессии до нейросетей",
    description: "Математика ML, NumPy, Pandas, Scikit-Learn, PyTorch и построение глубоких нейросетей.",
    track: "Machine Learning",
    level: "Продвинутый",
    lessons: 66,
    hours: 46,
    rating: 4.8,
    students: "18.4k",
    icon: Brain,
    modules: [
      {
        id: "ml-intro",
        title: "Модуль 1: Введение в машинное обучение и PyTorch",
        lessons: [
          {
            id: "ml-l1",
            title: "Линейная регрессия и градиентный спуск в PyTorch",
            duration: "26:50",
            videoUrl: "https://www.youtube.com/embed/i_LwzRVP7bg",
            description: "Математические основы ML: тензоры, автоматическое дифференцирование (autograd), оптимизатор Adam и функция потерь MSE.",
            codeSnippet: `import torch\nimport torch.nn as nn\n\nmodel = nn.Linear(in_features=10, out_features=1)\nx = torch.randn(32, 10)\noutput = model(x)\nprint(output.shape)`,
            quiz: {
              question: "Какая функция потерь часто используется в задачах регрессии?",
              options: [
                "Binary Cross Entropy",
                "Mean Squared Error (MSE)",
                "Categorical Cross Entropy",
                "Hinge Loss"
              ],
              correctIndex: 1,
              explanation: "Mean Squared Error измеряет средний квадрат разностей между предсказанными и реальными значениями."
            }
          }
        ]
      }
    ]
  },
  {
    id: "security",
    title: "Cyber Security: атаки и защита веба",
    description: "Веб-безопасность: OWASP Top 10, SQLi, XSS, CSRF, JWT-уязвимости и безопасная архитектура.",
    track: "Cyber Security",
    level: "Средний",
    lessons: 44,
    hours: 26,
    rating: 4.7,
    students: "11.2k",
    icon: Lock,
    modules: [
      {
        id: "sec-owasp",
        title: "Модуль 1: OWASP Top 10 и веб-уязвимости",
        lessons: [
          {
            id: "sec-l1",
            title: "XSS и SQL Инъекции: механизация атак и методы защиты",
            duration: "23:15",
            videoUrl: "https://www.youtube.com/embed/3Kq1MIfTWCE",
            description: "Разбор наиболее распространённых угроз безопасности веб-приложений. Экранирование ввода, параметризованные SQL-запросы.",
            codeSnippet: `// Безопасный параметризованный запрос\nconst query = 'SELECT * FROM users WHERE email = $1';\nconst values = [userInputEmail];\nawait db.query(query, values);`,
            quiz: {
              question: "Какой главный способ предотвращения SQL-инъекций?",
              options: [
                "Использование шифрования RSA",
                "Использование подготовленных (параметризованных) запросов",
                "Отключение JavaScript в браузере",
                "Перевод сайта на HTTPS"
              ],
              correctIndex: 1,
              explanation: "Параметризованные запросы отделяют SQL-код от передаваемых пользовательских данных."
            }
          }
        ]
      }
    ]
  },
  {
    id: "mobile",
    title: "Mobile Development на React Native",
    description: "Создание кроссплатформенных мобильных приложений для iOS и Android на React Native и Expo.",
    track: "Mobile",
    level: "Средний",
    lessons: 50,
    hours: 30,
    rating: 4.6,
    students: "14.7k",
    icon: Smartphone,
    modules: [
      {
        id: "mobile-expo",
        title: "Модуль 1: Основы React Native и Expo",
        lessons: [
          {
            id: "mob-l1",
            title: "Компоненты View, Text, FlatList и стилизация в React Native",
            duration: "18:40",
            videoUrl: "https://www.youtube.com/embed/0-S5a0eXPoc",
            description: "Разработка первого мобильного приложения. Отличия верстки Flexbox в вебе и на мобильных устройствах.",
            codeSnippet: `import { View, Text, StyleSheet } from 'react-native';\n\nexport default function App() {\n  return (\n    <View style={styles.container}>\n      <Text style={styles.text}>Привет от AiJuz Mobile!</Text>\n    </View>\n  );\n}`,
            quiz: {
              question: "Какое базовое направление оси flex-direction используется по умолчанию в React Native?",
              options: [
                "row",
                "column",
                "row-reverse",
                "grid"
              ],
              correctIndex: 1,
              explanation: "В отличие от веб-браузеров, в React Native по умолчанию flexDirection: 'column'."
            }
          }
        ]
      }
    ]
  },
  {
    id: "devops",
    title: "DevOps: Docker, CI/CD, Kubernetes",
    description: "Контейнеризация, оркестрация, автоматизация CI/CD пайплайнов в GitHub Actions и Kubernetes.",
    track: "DevOps",
    level: "Продвинутый",
    lessons: 54,
    hours: 34,
    rating: 4.8,
    students: "21.5k",
    icon: Workflow,
    modules: [
      {
        id: "devops-docker",
        title: "Модуль 1: Контейнеризация с Docker",
        lessons: [
          {
            id: "devops-l1",
            title: "Dockerfile, Docker Compose и многоэтапная сборка (Multi-stage build)",
            duration: "21:50",
            videoUrl: "https://www.youtube.com/embed/gAkwW2tuIqE",
            description: "Понимание контейнеризации и её преимуществ над виртуальными машинами. Написание оптимизированных Dockerfile.",
            codeSnippet: `FROM node:20-alpine AS builder\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nRUN npm run build\n\nFROM nginx:alpine\nCOPY --from=builder /app/dist /usr/share/nginx/html`,
            quiz: {
              question: "В чём главное преимущество multi-stage сборок Docker?",
              options: [
                "Ускорение интернета в контейнере",
                "Уменьшение итогового размера Docker-образа за счёт исключения инструментов сборки",
                "Автоматическое включение HTTPS",
                "Запуск нескольких операционных систем одновременно"
              ],
              correctIndex: 1,
              explanation: "Multi-stage сборка позволяет перенести в финальный образ только скомпилированные артефакты."
            }
          }
        ]
      }
    ]
  },
  {
    id: "algorithms",
    title: "Алгоритмы для собеседований",
    description: "Подготовка к алгоритмическим секциям: Двумя указателями, Двумерная динамика, Графы, Деревья, Big O.",
    track: "Algorithms",
    level: "Средний",
    lessons: 80,
    hours: 50,
    rating: 4.9,
    students: "63.9k",
    icon: Layers,
    modules: [
      {
        id: "algo-patterns",
        title: "Модуль 1: Ключевые паттерны задач (Two Pointers & Sliding Window)",
        lessons: [
          {
            id: "algo-l1",
            title: "Техника Sliding Window и Скользящее окно для строк и массивов",
            duration: "24:10",
            videoUrl: "https://www.youtube.com/embed/MK-NZ4hN7SM",
            description: "Разбор алгоритмического шаблона Скользящее окно (Sliding Window), оптимизирующего сложность до O(N).",
            codeSnippet: `function minSubArrayLen(target: number, nums: number[]): number {\n  let left = 0, sum = 0, minLen = Infinity;\n  for (let right = 0; right < nums.length; right++) {\n    sum += nums[right];\n    while (sum >= target) {\n      minLen = Math.min(minLen, right - left + 1);\n      sum -= nums[left++];\n    }\n  }\n  return minLen === Infinity ? 0 : minLen;\n}`,
            quiz: {
              question: "Какая временная сложность у алгоритма Sliding Window для массива длины N?",
              options: [
                "O(N²)",
                "O(N)",
                "O(log N)",
                "O(2^N)"
              ],
              correctIndex: 1,
              explanation: "В Sliding Window каждый элемент проходит окно максимум один раз, давая O(N)."
            }
          }
        ]
      }
    ]
  },
  {
    id: "data-structures",
    title: "Структуры данных на практике",
    description: "Связанные списки, Стеки, Очереди, Хеш-таблицы, Кучи (Heaps), Деревья поиска (BST) и Графы.",
    track: "Data Structures",
    level: "Начальный",
    lessons: 58,
    hours: 32,
    rating: 4.8,
    students: "39.1k",
    icon: Database,
    modules: [
      {
        id: "ds-intro",
        title: "Модуль 1: Линейные структуры данных и Хеш-таблицы",
        lessons: [
          {
            id: "ds-l1",
            title: "Устройство Хеш-таблиц: хэш-функции и разрешение коллизий",
            duration: "17:45",
            videoUrl: "https://www.youtube.com/embed/shsBwiTITZU",
            description: "Как устроена память под капотом Map и Set. Алгоритмы хэширования, методы цепей и открытой адресации.",
            codeSnippet: `class HashMap {\n  private buckets = new Array(16).fill(null).map(() => []);\n  \n  hash(key: string): number {\n    let code = 0;\n    for (let i = 0; i < key.length; i++) code += key.charCodeAt(i);\n    return code % 16;\n  }\n}`,
            quiz: {
              question: "Какова средняя временная сложность поиска по ключу в Хеш-таблице?",
              options: [
                "O(N)",
                "O(1)",
                "O(log N)",
                "O(N log N)"
              ],
              correctIndex: 1,
              explanation: "При хорошей хэш-функции поиск в хеш-таблице выполняется за константное время O(1)."
            }
          }
        ]
      }
    ]
  },
  {
    id: "web-platform",
    title: "Web Platform: сеть, браузер, производительность",
    description: "HTTP/3, TLS, Critical Rendering Path, браузерный движок, сервис-воркеры и Core Web Vitals.",
    track: "Frontend",
    level: "Продвинутый",
    lessons: 42,
    hours: 22,
    rating: 4.7,
    students: "17.8k",
    icon: Globe,
    modules: [
      {
        id: "web-crp",
        title: "Модуль 1: Critical Rendering Path и браузер",
        lessons: [
          {
            id: "web-l1",
            title: "Как браузер отрисовывает страницу: DOM, CSSOM, Render Tree, Layout & Paint",
            duration: "20:00",
            videoUrl: "https://www.youtube.com/embed/0fONene3OIA",
            description: "Детальный путь превращения HTML и CSS в пиксели на экране. Оптимизация Layout Shift (CLS) и парсинг.",
            codeSnippet: `// Измерение метрики LCP (Largest Contentful Paint)\nnew PerformanceObserver((entryList) => {\n  for (const entry of entryList.getEntries()) {\n    console.log('LCP candidate:', entry.startTime, entry);\n  }\n}).observe({ type: 'largest-contentful-paint', buffered: true });`,
            quiz: {
              question: "Какая фаза рендеринга вычисляет точные координаты элементов на экране?",
              options: [
                "Paint",
                "Layout (Reflow)",
                "Composite",
                "Tokenization"
              ],
              correctIndex: 1,
              explanation: "Фаза Layout (или Reflow) высчитывает геометрию и положение каждого элемента."
            }
          }
        ]
      }
    ]
  },
  {
    id: "linux",
    title: "Linux и терминал для разработчика",
    description: "Bash, zsh, управление процессами, права доступа, SSH, сетевые утилиты и автоматизация скриптов.",
    track: "DevOps",
    level: "Начальный",
    lessons: 36,
    hours: 18,
    rating: 4.8,
    students: "28.3k",
    icon: Terminal,
    modules: [
      {
        id: "linux-bash",
        title: "Модуль 1: Основы командной строки и скрипты",
        lessons: [
          {
            id: "linux-l1",
            title: "Навигация, управление файлами, grep, find и bash-скрипты",
            duration: "19:10",
            videoUrl: "https://www.youtube.com/embed/v_1EQD6yOqM",
            description: "Ключевые утилиты командной строки Linux. Конвейеры, перенаправление потоков и автоматизация.",
            codeSnippet: `#!/usr/bin/env bash\n# Поиск логирования ошибок в файле\necho "Анализ логов сервера..."\ngrep -i "error" /var/log/syslog | tail -n 10`,
            quiz: {
              question: "Какая команда используется для изменения прав доступа к файлу в Linux?",
              options: [
                "chown",
                "chmod",
                "chgrp",
                "sudo"
              ],
              correctIndex: 1,
              explanation: "Команда chmod меняет права на чтение, запись и выполнение файлов."
            }
          }
        ]
      }
    ]
  }
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
