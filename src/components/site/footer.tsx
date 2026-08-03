import { Link } from "@tanstack/react-router";
import { Terminal, Github, Twitter, Send } from "lucide-react";

const groups = [
  {
    title: "Обучение",
    items: [
      { label: "Roadmap", to: "/roadmap" as const },
      { label: "Курсы", to: "/courses" as const },
      { label: "Задачи", to: "/problems" as const },
      { label: "Онлайн IDE", to: "/playground" as const },
    ],
  },
  {
    title: "Сообщество",
    items: [
      { label: "Лидерборд", to: "/leaderboard" as const },
      { label: "Личный кабинет", to: "/dashboard" as const },
      { label: "Регистрация", to: "/auth" as const },
      { label: "Главная", to: "/" as const },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border/60 py-14">
      <div className="mx-auto grid w-[min(1180px,92vw)] gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid size-8 place-items-center rounded-xl bg-primary text-primary-foreground">
              <Terminal className="size-4" />
            </span>
            <span className="text-base font-semibold tracking-tight">AiJuz</span>
          </div>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            Платформа, где обучение программированию превращается в ежедневную
            практику: roadmap, задачи, IDE и AI-наставник в одном месте.
          </p>
          <div className="mt-4 flex gap-2 text-muted-foreground">
            <Github className="size-4" />
            <Twitter className="size-4" />
            <Send className="size-4" />
          </div>
        </div>

        {groups.map((g) => (
          <div key={g.title}>
            <h3 className="text-sm font-semibold">{g.title}</h3>
            <ul className="mt-3 space-y-2">
              {g.items.map((i) => (
                <li key={i.label}>
                  <Link
                    to={i.to}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="mx-auto mt-10 w-[min(1180px,92vw)] text-xs text-muted-foreground">
        © {new Date().getFullYear()} AiJuz. Учись быстрее.
      </p>
    </footer>
  );
}
