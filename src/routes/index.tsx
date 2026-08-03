import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  ArrowRight,
  Bot,
  Code2,
  Flame,
  Map,
  Sparkles,
  Swords,
  Trophy,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/reveal";
import { courses, roadmap } from "@/lib/content";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AiJuz — изучай программирование быстрее, чем где-либо" },
      {
        name: "description",
        content:
          "Интерактивный roadmap, 300+ курсов, задачи уровня LeetCode, онлайн IDE и AI-наставник. Учись каждый день и держи серию.",
      },
      { property: "og:title", content: "AiJuz — изучай программирование быстрее, чем где-либо" },
      {
        property: "og:description",
        content: "Интерактивный roadmap, 300+ курсов, задачи уровня LeetCode, онлайн IDE и AI-наставник. Учись каждый день и держи серию.",
      },
    ],
  }),
  component: Home,
});

const features = [
  {
    icon: Map,
    title: "Интерактивный Roadmap",
    text: "От основ до AI. Каждый этап открывается после закрытия предыдущего.",
  },
  {
    icon: Code2,
    title: "Онлайн IDE",
    text: "9 языков, подсветка синтаксиса и запуск кода прямо в браузере.",
  },
  {
    icon: Swords,
    title: "Задачи и контесты",
    text: "Лёгкие, средние и сложные задачи, еженедельные Speed Coding баттлы.",
  },
  {
    icon: Bot,
    title: "AI-наставник",
    text: "Объясняет ошибки, ревьюит код и генерирует персональные задания.",
  },
  {
    icon: Trophy,
    title: "Геймификация",
    text: "XP, монеты, уровни, ранги, бейджи, сундуки и ежедневные квесты.",
  },
  {
    icon: Flame,
    title: "Streak и аналитика",
    text: "Календарь обучения, графики XP и времени — прогресс всегда виден.",
  },
];

const stats = [
  { value: "480k+", label: "учеников" },
  { value: "3 200+", label: "уроков" },
  { value: "1 800+", label: "задач" },
  { value: "97%", label: "доходят до практики" },
];

function Home() {
  return (
    <div className="mx-auto w-[min(1180px,92vw)]">
      <section className="pt-32 pb-20 text-center sm:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="glass inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs text-muted-foreground">
            <Sparkles className="size-3.5 text-primary" />
            AiJuz 2.0 — с AI-наставником и генератором roadmap
          </span>
          <h1 className="text-gradient mx-auto mt-6 max-w-4xl text-4xl leading-[1.05] font-semibold tracking-tight sm:text-6xl lg:text-7xl">
            Изучай программирование быстрее, чем где-либо.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Один путь вместо десятка вкладок: интерактивный roadmap, курсы с
            практикой, задачи, встроенная IDE и AI, который объясняет каждую
            ошибку.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link to="/auth">
                Начать бесплатно <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/courses">Изучить курсы</Link>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="glass-card mt-16 overflow-hidden p-1 text-left"
        >
          <div className="flex items-center gap-1.5 px-4 py-3">
            <span className="size-2.5 rounded-full bg-destructive/70" />
            <span className="size-2.5 rounded-full bg-warning/70" />
            <span className="size-2.5 rounded-full bg-success/70" />
            <span className="ml-3 font-mono text-xs text-muted-foreground">
              aijuz — javascript/async.js
            </span>
          </div>
          <div className="grid gap-0 border-t border-border/60 md:grid-cols-[1.3fr_1fr]">
            <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-relaxed text-muted-foreground">
              <code>{`async function learn(topic) {
  const plan = await aijuz.roadmap(topic);

  for (const step of plan.steps) {
    await step.lesson();
    await step.quiz();
    await step.practice();
  }

  return { xp: plan.xp, level: "up" };
}

learn("javascript");`}</code>
            </pre>
            <div className="space-y-3 border-t border-border/60 p-5 md:border-t-0 md:border-l">
              <div className="flex items-center gap-2 text-sm">
                <Zap className="size-4 text-primary" />
                <span className="font-medium">+640 XP сегодня</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Flame className="size-4 text-warning" />
                <span className="font-medium">Серия: 46 дней</span>
              </div>
              <div className="glass rounded-xl p-3 text-xs text-muted-foreground">
                <p className="mb-1 font-medium text-foreground">AI-наставник</p>
                Твой цикл выполняется последовательно. Используй Promise.all,
                чтобы ускорить прохождение независимых шагов.
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06}>
              <div className="glass-card p-5">
                <p className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  {s.value}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-16">
        <Reveal>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-4xl">
            Всё для обучения — в одном месте
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
            Теория, практика, проверка и мотивация связаны в единую систему.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.05}>
              <div className="glass-card h-full p-6">
                <span className="grid size-10 place-items-center rounded-xl bg-primary/15 text-primary">
                  <f.icon className="size-5" />
                </span>
                <h3 className="mt-4 text-base font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-16">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-4xl">
                Твой путь разработчика
              </h2>
              <p className="mt-3 max-w-xl text-sm text-muted-foreground">
                11 этапов от первых переменных до AI-инженерии.
              </p>
            </div>
            <Button asChild variant="outline">
              <Link to="/roadmap">
                Открыть roadmap <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </Reveal>
        <div className="mt-8 flex flex-wrap gap-2">
          {roadmap.map((n, i) => (
            <Reveal key={n.id} delay={i * 0.03}>
              <span className="glass rounded-full px-4 py-2 text-sm">
                {n.title}
              </span>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-16">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-4xl">
              Популярные курсы
            </h2>
            <Button asChild variant="outline">
              <Link to="/courses">
                Все курсы <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {courses.slice(0, 6).map((c, i) => (
            <Reveal key={c.id} delay={i * 0.05}>
              <Link to="/courses" className="block h-full">
                <div className="glass-card h-full p-6">
                  <div className="flex items-center justify-between">
                    <span className="grid size-10 place-items-center rounded-xl bg-primary/15 text-primary">
                      <c.icon className="size-5" />
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {c.level}
                    </span>
                  </div>
                  <h3 className="mt-4 text-base font-semibold">{c.title}</h3>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {c.lessons} уроков · {c.hours} ч · ★ {c.rating}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-20">
        <Reveal>
          <div className="glass-card p-10 text-center">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-4xl">
              Начни сегодня — первый уровень за 15 минут
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
              Бесплатный доступ к roadmap, задачам и онлайн IDE.
            </p>
            <Button asChild size="lg" className="mt-7">
              <Link to="/auth">
                Создать аккаунт <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
