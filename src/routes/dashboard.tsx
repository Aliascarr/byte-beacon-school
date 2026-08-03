import { createFileRoute } from "@tanstack/react-router";
import {
  Award,
  Coins,
  Flame,
  Lock,
  Target,
  Timer,
  Trophy,
  Zap,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import { Progress } from "@/components/ui/progress";
import { PageHeader, Reveal } from "@/components/site/reveal";
import { achievements, xpHistory } from "@/lib/content";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Личный кабинет — AiJuz" },
      {
        name: "description",
        content:
          "Уровень, XP, решённые задачи, часы обучения, серия дней, достижения и аналитика прогресса в AiJuz.",
      },
      { property: "og:title", content: "Личный кабинет — AiJuz" },
      {
        property: "og:description",
        content: "Твоя статистика обучения: XP, streak, достижения и графики.",
      },
    ],
  }),
  component: DashboardPage,
});

const stats = [
  { icon: Zap, label: "XP", value: "12 480" },
  { icon: Target, label: "Решено задач", value: "312" },
  { icon: Timer, label: "Часов обучения", value: "184" },
  { icon: Flame, label: "Серия", value: "46 дней" },
  { icon: Coins, label: "Монеты", value: "2 340" },
  { icon: Trophy, label: "Ранг", value: "Diamond III" },
];

const activity = [
  { title: "Решена задача «Longest Substring»", meta: "+120 XP · 2 часа назад" },
  { title: "Пройден урок «Промисы и async/await»", meta: "+80 XP · вчера" },
  { title: "Мини-тест по TypeScript — 92%", meta: "+150 XP · 2 дня назад" },
  { title: "Открыт бейдж «Ночной кодер»", meta: "+1 сундук · 3 дня назад" },
];

const calendar = Array.from({ length: 91 }, (_, i) => (i * 7919) % 5);

function DashboardPage() {
  return (
    <div className="mx-auto w-[min(1180px,92vw)] pb-24">
      <PageHeader
        eyebrow="Личный кабинет"
        title="Твой прогресс под контролем"
        description="Уровень, XP, серия дней, аналитика обучения и достижения — всё на одном экране."
      />

      <Reveal>
        <div className="glass-card flex flex-wrap items-center gap-6 p-6">
          <span className="grid size-16 place-items-center rounded-2xl bg-primary/15 text-xl font-semibold text-primary">
            АК
          </span>
          <div className="min-w-[220px] flex-1">
            <p className="text-lg font-semibold">Алекс Кузнецов</p>
            <p className="text-xs text-muted-foreground">
              @alex.dev · Уровень 24 · Diamond III
            </p>
            <Progress value={68} className="mt-3" />
            <p className="mt-2 text-xs text-muted-foreground">
              До 25 уровня осталось 820 XP
            </p>
          </div>
        </div>
      </Reveal>

      <div className="mt-6 grid gap-4 grid-cols-2 lg:grid-cols-3">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.04}>
            <div className="glass-card p-5">
              <s.icon className="size-4 text-primary" />
              <p className="mt-3 text-xl font-semibold">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Reveal>
          <div className="glass-card p-6">
            <h2 className="text-base font-semibold">Рост XP за неделю</h2>
            <div className="mt-4 h-56">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={xpHistory}>
                  <defs>
                    <linearGradient id="xp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="var(--color-border)" vertical={false} />
                  <XAxis dataKey="day" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      background: "var(--color-popover)",
                      border: "1px solid var(--color-border)",
                      borderRadius: 12,
                      color: "var(--color-popover-foreground)",
                    }}
                  />
                  <Area type="monotone" dataKey="xp" stroke="var(--color-chart-1)" fill="url(#xp)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="glass-card p-6">
            <h2 className="text-base font-semibold">Минуты обучения</h2>
            <div className="mt-4 h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={xpHistory}>
                  <CartesianGrid stroke="var(--color-border)" vertical={false} />
                  <XAxis dataKey="day" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip
                    cursor={{ fill: "var(--color-accent)" }}
                    contentStyle={{
                      background: "var(--color-popover)",
                      border: "1px solid var(--color-border)",
                      borderRadius: 12,
                      color: "var(--color-popover-foreground)",
                    }}
                  />
                  <Bar dataKey="minutes" fill="var(--color-chart-2)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal>
        <div className="glass-card mt-6 p-6">
          <h2 className="text-base font-semibold">Календарь активности</h2>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {calendar.map((level, i) => (
              <span
                key={i}
                className="size-3.5 rounded-[4px] bg-primary"
                style={{ opacity: 0.12 + level * 0.22 }}
              />
            ))}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Последние 13 недель · текущая серия 46 дней
          </p>
        </div>
      </Reveal>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Reveal>
          <div className="glass-card p-6">
            <h2 className="text-base font-semibold">Последняя активность</h2>
            <ul className="mt-4 space-y-4">
              {activity.map((a) => (
                <li key={a.title} className="flex gap-3">
                  <span className="mt-1.5 size-2 shrink-0 rounded-full bg-primary" />
                  <div>
                    <p className="text-sm font-medium">{a.title}</p>
                    <p className="text-xs text-muted-foreground">{a.meta}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="glass-card p-6">
            <h2 className="text-base font-semibold">Достижения</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {achievements.map((a) => (
                <div
                  key={a.id}
                  className={`glass rounded-xl p-4 ${a.unlocked ? "" : "opacity-55"}`}
                >
                  {a.unlocked ? (
                    <Award className="size-4 text-warning" />
                  ) : (
                    <Lock className="size-4 text-muted-foreground" />
                  )}
                  <p className="mt-2 text-sm font-medium">{a.title}</p>
                  <p className="text-xs text-muted-foreground">{a.description}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
