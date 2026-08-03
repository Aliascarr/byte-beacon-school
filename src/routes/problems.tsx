import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { CheckCircle2, Circle, Lightbulb, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PageHeader, Reveal } from "@/components/site/reveal";
import { problems, type Difficulty } from "@/lib/content";

export const Route = createFileRoute("/problems")({
  head: () => ({
    meta: [
      { title: "Задачи по алгоритмам — AiJuz" },
      {
        name: "description",
        content:
          "Лёгкие, средние и сложные задачи с фильтрами, статистикой принятия, подсказками и разборами решений.",
      },
      { property: "og:title", content: "Задачи по алгоритмам — AiJuz" },
      {
        property: "og:description",
        content: "Тренируйся на задачах уровня собеседований и набирай XP.",
      },
    ],
  }),
  component: ProblemsPage,
});

const levels: Array<Difficulty | "Все"> = ["Все", "Лёгкая", "Средняя", "Сложная"];

const diffColor: Record<Difficulty, string> = {
  "Лёгкая": "text-success",
  "Средняя": "text-warning",
  "Сложная": "text-destructive",
};

function ProblemsPage() {
  const [level, setLevel] = useState<Difficulty | "Все">("Все");
  const [query, setQuery] = useState("");

  const filtered = useMemo(
    () =>
      problems.filter(
        (p) =>
          (level === "Все" || p.difficulty === level) &&
          p.title.toLowerCase().includes(query.trim().toLowerCase()),
      ),
    [level, query],
  );

  const solved = problems.filter((p) => p.solved).length;

  return (
    <div className="mx-auto w-[min(1180px,92vw)] pb-24">
      <PageHeader
        eyebrow="Практика"
        title="Задачи, которые готовят к собеседованию"
        description="Фильтруй по сложности, следи за рейтингом принятия, открывай подсказки и разборы после попытки."
      />

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Решено задач", value: `${solved} / ${problems.length}` },
          { label: "Рейтинг", value: "1 842" },
          { label: "Средняя скорость", value: "6м 24с" },
        ].map((s, i) => (
          <Reveal key={s.label} delay={i * 0.05}>
            <div className="glass-card p-5">
              <p className="text-2xl font-semibold">{s.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="glass-card mt-6 p-5">
          <div className="relative">
            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Поиск задачи…"
              className="pl-9"
            />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {levels.map((l) => (
              <Button
                key={l}
                size="sm"
                variant={l === level ? "default" : "outline"}
                onClick={() => setLevel(l)}
              >
                {l}
              </Button>
            ))}
          </div>
        </div>
      </Reveal>

      <div className="glass-card mt-6 divide-y divide-border/60 overflow-hidden">
        {filtered.map((p) => (
          <div
            key={p.id}
            className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-accent/40"
          >
            {p.solved ? (
              <CheckCircle2 className="size-4 text-success" />
            ) : (
              <Circle className="size-4 text-muted-foreground" />
            )}
            <span className="w-8 font-mono text-xs text-muted-foreground">
              #{p.id}
            </span>
            <span className="flex-1 text-sm font-medium">{p.title}</span>
            <span className="glass rounded-full px-2.5 py-1 text-[11px] text-muted-foreground">
              {p.topic}
            </span>
            <span className={`w-20 text-xs ${diffColor[p.difficulty]}`}>
              {p.difficulty}
            </span>
            <span className="w-16 text-right text-xs text-muted-foreground">
              {p.acceptance}%
            </span>
            <Button size="sm" variant="outline">
              <Lightbulb className="size-3.5" /> Решать
            </Button>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="px-5 py-10 text-center text-sm text-muted-foreground">
            Задачи не найдены.
          </p>
        )}
      </div>
    </div>
  );
}
