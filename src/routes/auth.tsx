import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Github, Chrome, MessageCircle, Mail, Lock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Reveal } from "@/components/site/reveal";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Вход и регистрация — AiJuz" },
      {
        name: "description",
        content:
          "Создай бесплатный аккаунт AiJuz: вход по email, Google, GitHub или Discord и доступ к roadmap, курсам и задачам.",
      },
      { property: "og:title", content: "Вход и регистрация — AiJuz" },
      {
        property: "og:description",
        content: "Бесплатный аккаунт: roadmap, курсы, задачи и онлайн IDE.",
      },
    ],
  }),
  component: AuthPage,
});

const providers = [
  { name: "Google", icon: Chrome },
  { name: "GitHub", icon: Github },
  { name: "Discord", icon: MessageCircle },
];

function AuthPage() {
  const [mode, setMode] = useState<"signup" | "login">("signup");

  return (
    <div className="mx-auto grid w-[min(1180px,92vw)] gap-10 pt-32 pb-24 lg:grid-cols-2">
      <Reveal>
        <div className="hidden h-full flex-col justify-center lg:flex">
          <h1 className="text-4xl font-semibold tracking-tight">
            Присоединяйся к AiJuz
          </h1>
          <p className="mt-4 max-w-md text-sm text-muted-foreground">
            480 000 разработчиков уже учатся здесь: интерактивный roadmap, задачи
            с автопроверкой, онлайн IDE и AI-наставник, который объясняет каждую
            ошибку.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-muted-foreground">
            {[
              "Бесплатный доступ к roadmap и базовым курсам",
              "Ежедневные задания и серия обучения",
              "XP, уровни, бейджи и лидерборд",
            ].map((t) => (
              <li key={t} className="flex items-center gap-3">
                <span className="size-1.5 rounded-full bg-primary" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <Reveal delay={0.08}>
        <div className="glass-card mx-auto w-full max-w-md p-7">
          <div className="glass mb-6 grid grid-cols-2 gap-1 rounded-xl p-1">
            {(["signup", "login"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`rounded-lg px-3 py-2 text-sm transition-colors ${
                  mode === m
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {m === "signup" ? "Регистрация" : "Вход"}
              </button>
            ))}
          </div>

          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              toast.success(
                "Подключите Lovable Cloud, чтобы включить реальную авторизацию",
              );
            }}
          >
            {mode === "signup" && (
              <div className="space-y-2">
                <Label htmlFor="name">Имя</Label>
                <div className="relative">
                  <User className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="name" placeholder="Алекс" className="pl-9" required />
                </div>
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="pl-9"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <div className="relative">
                <Lock className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-9"
                  required
                />
              </div>
            </div>
            <Button type="submit" className="w-full">
              {mode === "signup" ? "Создать аккаунт" : "Войти"}
            </Button>
          </form>

          <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
            <span className="h-px flex-1 bg-border" /> или <span className="h-px flex-1 bg-border" />
          </div>

          <div className="space-y-2">
            {providers.map((p) => (
              <Button
                key={p.name}
                variant="outline"
                className="w-full"
                onClick={() =>
                  toast.info(`${p.name}: включите Lovable Cloud для OAuth-входа`)
                }
              >
                <p.icon className="size-4" /> Продолжить с {p.name}
              </Button>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  );
}
