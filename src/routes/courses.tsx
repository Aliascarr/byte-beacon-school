import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Star, Clock, BookOpen, PlayCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PageHeader, Reveal } from "@/components/site/reveal";
import { courses, tracks } from "@/lib/content";
import { CourseViewerPage } from "./courses_.$courseId";

export const Route = createFileRoute("/courses")({
  head: () => ({
    meta: [
      { title: "Курсы по программированию — AiJuz" },
      {
        name: "description",
        content:
          "Frontend, Backend, Python, Java, C++, Go, Rust, AI, ML, Cyber Security, Mobile, DevOps, алгоритмы и структуры данных.",
      },
      { property: "og:title", content: "Курсы по программированию — AiJuz" },
      {
        property: "og:description",
        content: "16 направлений с видео, практикой, домашкой и мини-тестами.",
      },
    ],
  }),
  component: CoursesPage,
});

function CoursesPage() {
  const [track, setTrack] = useState("Все");
  const [query, setQuery] = useState("");
  const [activeCourseId, setActiveCourseId] = useState<string | null>(null);

  const filtered = useMemo(
    () =>
      courses.filter(
        (c) =>
          (track === "Все" || c.track === track) &&
          c.title.toLowerCase().includes(query.trim().toLowerCase()),
      ),
    [track, query],
  );

  // If a course is selected, render the Course Viewer directly!
  if (activeCourseId) {
    return (
      <CourseViewerPage
        courseIdOverride={activeCourseId}
        onClose={() => setActiveCourseId(null)}
      />
    );
  }

  return (
    <div className="mx-auto w-[min(1180px,92vw)] pb-24">
      <PageHeader
        eyebrow="Курсы"
        title="Курсы с видеоуроками, практикой и конспектами"
        description="Каждый курс содержит видеоуроки, детальный конспект, примеры кода, мини-тест и тесты знаний."
      />

      <Reveal>
        <div className="glass-card p-5">
          <div className="relative">
            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Поиск курса…"
              className="pl-9"
            />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {tracks.map((t) => (
              <Button
                key={t}
                size="sm"
                variant={t === track ? "default" : "outline"}
                onClick={() => setTrack(t)}
              >
                {t}
              </Button>
            ))}
          </div>
        </div>
      </Reveal>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((c, i) => (
          <Reveal key={c.id} delay={i * 0.04}>
            <article
              onClick={() => setActiveCourseId(c.id)}
              className="glass-card flex h-full flex-col p-6 group hover:border-primary/50 cursor-pointer transition-all"
            >
              <div className="flex items-start justify-between">
                <span className="grid size-11 place-items-center rounded-xl bg-primary/15 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <c.icon className="size-5" />
                </span>
                <span className="glass rounded-full px-2.5 py-1 text-[11px] text-muted-foreground">
                  {c.track}
                </span>
              </div>
              <h2 className="mt-4 text-base font-semibold group-hover:text-primary transition-colors">
                {c.title}
              </h2>
              {c.description && (
                <p className="mt-1.5 text-xs text-muted-foreground line-clamp-2">
                  {c.description}
                </p>
              )}
              <p className="mt-2 text-xs text-muted-foreground">
                Уровень: {c.level} · {c.students} учеников
              </p>
              <div className="mt-auto flex flex-wrap items-center gap-4 pt-5 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <BookOpen className="size-3.5" /> {c.lessons} уроков
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="size-3.5" /> {c.hours} ч
                </span>
                <span className="inline-flex items-center gap-1.5 text-warning">
                  <Star className="size-3.5 fill-warning" /> {c.rating}
                </span>
              </div>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveCourseId(c.id);
                }}
                className="mt-4 gap-2"
                size="sm"
              >
                <PlayCircle className="size-4" /> Начать курс
              </Button>
            </article>
          </Reveal>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-12 text-center text-sm text-muted-foreground">
          Ничего не найдено. Попробуй другой запрос.
        </p>
      )}
    </div>
  );
}
