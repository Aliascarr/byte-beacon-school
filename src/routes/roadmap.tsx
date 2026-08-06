import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Lock, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PageHeader, Reveal } from "@/components/site/reveal";
import { roadmap } from "@/lib/content";

export const Route = createFileRoute("/roadmap")({
  head: () => ({
    meta: [
      { title: "Roadmap разработчика — AiJuz" },
      {
        name: "description",
        content:
          "Интерактивная карта обучения AiJuz: от основ программирования до AI. Каждый этап открывается после завершения предыдущего.",
      },
      { property: "og:title", content: "Roadmap разработчика — AiJuz" },
      {
        property: "og:description",
        content: "11 этапов обучения: Basics, HTML, CSS, JS, TS, React, Backend, AI.",
      },
    ],
  }),
  component: RoadmapPage,
});

const statusStyles: Record<string, string> = {
  done: "bg-success/15 text-success border-success/30",
  active: "bg-primary/15 text-primary border-primary/40",
  locked: "bg-muted text-muted-foreground border-border",
};

const statusLabel: Record<string, string> = {
  done: "Пройдено",
  active: "В процессе",
  locked: "Закрыто",
};

const nodeToCourseId: Record<string, string> = {
  basics: "python-zero",
  html: "frontend-pro",
  css: "frontend-pro",
  javascript: "frontend-pro",
  typescript: "frontend-pro",
  react: "frontend-pro",
  nextjs: "web-platform",
  backend: "node-backend",
  databases: "data-structures",
  devops: "devops",
  ai: "ai-apps",
};

function RoadmapPage() {
  const done = roadmap.filter((n) => n.status === "done").length;
  const percent = Math.round((done / roadmap.length) * 100);

  return (
    <div className="mx-auto w-[min(1180px,92vw)] pb-24">
      <PageHeader
        eyebrow="Roadmap"
        title="Карта обучения от основ до AI"
        description="Последовательный путь без хаоса. Следующий этап открывается, когда закрыт предыдущий: видеоуроки, конспект и практика."
      />

      <Reveal>
        <div className="glass-card mb-12 p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-medium">
              Прогресс пути: {done} из {roadmap.length} этапов
            </p>
            <span className="text-sm text-muted-foreground">{percent}%</span>
          </div>
          <Progress value={percent} className="mt-4" />
        </div>
      </Reveal>

      <div className="relative">
        <div className="absolute top-0 bottom-0 left-[19px] w-px bg-border md:left-1/2" />
        <div className="space-y-5">
          {roadmap.map((node, i) => {
            const courseId = nodeToCourseId[node.id] || "frontend-pro";

            return (
              <Reveal key={node.id} delay={i * 0.04}>
                <div
                  className={`relative flex gap-5 md:w-1/2 ${
                    i % 2 === 0 ? "md:pr-10" : "md:ml-auto md:pl-10"
                  }`}
                >
                  <span
                    className={`absolute top-6 z-10 grid size-10 place-items-center rounded-full border ${statusStyles[node.status]} ${
                      i % 2 === 0
                        ? "left-0 md:-right-5 md:left-auto"
                        : "left-0 md:-left-5"
                    }`}
                  >
                    {node.status === "done" ? (
                      <Check className="size-4" />
                    ) : node.status === "active" ? (
                      <Play className="size-4" />
                    ) : (
                      <Lock className="size-4" />
                    )}
                  </span>

                  <div
                    className={`glass-card ml-14 w-full p-6 md:ml-0 ${
                      node.status === "locked" ? "opacity-60" : ""
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h2 className="text-lg font-semibold">{node.title}</h2>
                      <span
                        className={`rounded-full border px-2.5 py-0.5 text-[11px] ${statusStyles[node.status]}`}
                      >
                        {statusLabel[node.status]}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {node.description}
                    </p>
                    <p className="mt-3 text-xs text-muted-foreground">
                      {node.lessons} уроков · {node.hours} часов
                    </p>
                    {node.status !== "locked" ? (
                      <Button
                        asChild
                        size="sm"
                        variant={node.status === "active" ? "default" : "outline"}
                        className="mt-4"
                      >
                        <Link to="/courses/$courseId" params={{ courseId }}>
                          {node.status === "done" ? "Повторить уроки" : "Продолжить обучение"}
                        </Link>
                      </Button>
                    ) : (
                      <Button size="sm" variant="outline" className="mt-4" disabled>
                        Закрыто
                      </Button>
                    )}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </div>
  );
}

