import { createFileRoute } from "@tanstack/react-router";
import { Crown, Medal, Timer, Zap } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PageHeader, Reveal } from "@/components/site/reveal";
import { leaderboard } from "@/lib/content";

export const Route = createFileRoute("/leaderboard")({
  head: () => ({
    meta: [
      { title: "Лидерборд — AiJuz" },
      {
        name: "description",
        content:
          "Рейтинг лучших учеников AiJuz по XP, количеству решённых задач и скорости решения.",
      },
      { property: "og:title", content: "Лидерборд — AiJuz" },
      {
        property: "og:description",
        content: "Топ учеников недели по XP, задачам и скорости.",
      },
    ],
  }),
  component: LeaderboardPage,
});

const sorts = [
  { key: "xp", label: "По XP", icon: Zap },
  { key: "solved", label: "По задачам", icon: Medal },
  { key: "speed", label: "По скорости", icon: Timer },
] as const;

type SortKey = (typeof sorts)[number]["key"];

function LeaderboardPage() {
  const [sort, setSort] = useState<SortKey>("xp");

  const rows = [...leaderboard].sort((a, b) =>
    sort === "speed" ? a.speed.localeCompare(b.speed) : b[sort] - a[sort],
  );

  return (
    <div className="mx-auto w-[min(1180px,92vw)] pb-24">
      <PageHeader
        eyebrow="Сообщество"
        title="Лидерборд недели"
        description="Соревнуйся с тысячами разработчиков: XP, решённые задачи, скорость и длина серии."
      />

      <div className="mb-6 flex flex-wrap gap-2">
        {sorts.map((s) => (
          <Button
            key={s.key}
            size="sm"
            variant={s.key === sort ? "default" : "outline"}
            onClick={() => setSort(s.key)}
          >
            <s.icon className="size-3.5" /> {s.label}
          </Button>
        ))}
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        {rows.slice(0, 3).map((u, i) => (
          <Reveal key={u.handle} delay={i * 0.06}>
            <div className="glass-card p-6 text-center">
              <span className="mx-auto grid size-12 place-items-center rounded-full bg-primary/15 text-primary">
                <Crown className="size-5" />
              </span>
              <p className="mt-3 text-base font-semibold">{u.name}</p>
              <p className="text-xs text-muted-foreground">{u.handle}</p>
              <p className="mt-3 text-2xl font-semibold">
                {u.xp.toLocaleString("ru-RU")}
              </p>
              <p className="text-xs text-muted-foreground">XP</p>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="glass-card divide-y divide-border/60 overflow-hidden">
        <div className="hidden grid-cols-[48px_1fr_100px_100px_100px_80px] gap-4 px-5 py-3 text-xs text-muted-foreground sm:grid">
          <span>#</span>
          <span>Пользователь</span>
          <span className="text-right">XP</span>
          <span className="text-right">Задачи</span>
          <span className="text-right">Скорость</span>
          <span className="text-right">Streak</span>
        </div>
        {rows.map((u, i) => (
          <div
            key={u.handle}
            className="grid grid-cols-2 gap-4 px-5 py-4 text-sm transition-colors hover:bg-accent/40 sm:grid-cols-[48px_1fr_100px_100px_100px_80px]"
          >
            <span className="text-muted-foreground">{i + 1}</span>
            <span>
              <span className="font-medium">{u.name}</span>
              <span className="block text-xs text-muted-foreground">
                {u.handle}
              </span>
            </span>
            <span className="text-right">{u.xp.toLocaleString("ru-RU")}</span>
            <span className="text-right">{u.solved}</span>
            <span className="text-right text-muted-foreground">{u.speed}</span>
            <span className="text-right text-warning">{u.streak}д</span>
          </div>
        ))}
      </div>
    </div>
  );
}
