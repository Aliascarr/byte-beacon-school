import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Circle,
  Code2,
  Copy,
  Check,
  Play,
  HelpCircle,
  MessageSquare,
  Sparkles,
  Star,
  Clock,
  Send,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PageHeader, Reveal } from "@/components/site/reveal";
import { courses, Lesson, LessonModule } from "@/lib/content";

export const Route = createFileRoute("/courses/$courseId")({
  head: ({ params }) => {
    const course = courses.find((c) => c.id === params.courseId);
    const title = course ? `${course.title} — Видеоуроки AiJuz` : "Курс — AiJuz";
    return {
      meta: [
        { title },
        {
          name: "description",
          content: course?.description || "Смотри видеоуроки, читай конспекты и делай практические задания.",
        },
      ],
    };
  },
  component: CourseViewerPage,
});

function CourseViewerPage() {
  const { courseId } = Route.useParams();
  const navigate = useNavigate();

  const course = courses.find((c) => c.id === courseId);

  // Flatten lessons list
  const allLessons: Lesson[] = course?.modules?.flatMap((m) => m.lessons) || [];

  const [activeLessonId, setActiveLessonId] = useState<string>(
    allLessons[0]?.id || ""
  );
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<"summary" | "code" | "quiz" | "discussion">("summary");
  
  // Quiz state
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [xpEarned, setXpEarned] = useState<boolean>(false);

  // Discussion comments
  const [comments, setComments] = useState<{ id: string; author: string; text: string; time: string }[]>([
    { id: "c1", author: "Максим Р.", text: "Отличный урок! Теперь перешел к практике.", time: "2 часа назад" },
    { id: "c2", author: "Елена С.", text: "Объяснение очень понятное, спасибо!", time: "вчера" },
  ]);
  const [newComment, setNewComment] = useState("");
  const [copiedCode, setCopiedCode] = useState(false);
  const [runOutput, setRunOutput] = useState<string | null>(null);

  // Load completed lessons from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`aijuz_completed_${courseId}`);
      if (saved) {
        setCompletedLessonIds(JSON.parse(saved));
      }
    } catch {
      // fallback
    }
  }, [courseId]);

  // Reset quiz state when active lesson changes
  useEffect(() => {
    setSelectedQuizOption(null);
    setQuizSubmitted(false);
    setRunOutput(null);
  }, [activeLessonId]);

  if (!course) {
    return (
      <div className="mx-auto w-[min(1180px,92vw)] py-24 text-center">
        <h1 className="text-2xl font-bold">Курс не найден</h1>
        <p className="mt-2 text-muted-foreground">Запрошенный курс не существует или был удален.</p>
        <Button asChild className="mt-6">
          <Link to="/courses">Вернуться к списку курсов</Link>
        </Button>
      </div>
    );
  }

  const activeLesson = allLessons.find((l) => l.id === activeLessonId) || allLessons[0];
  const activeLessonIndex = allLessons.findIndex((l) => l.id === activeLessonId);

  const prevLesson = activeLessonIndex > 0 ? allLessons[activeLessonIndex - 1] : null;
  const nextLesson = activeLessonIndex < allLessons.length - 1 ? allLessons[activeLessonIndex + 1] : null;

  const progressPercent = allLessons.length
    ? Math.round((completedLessonIds.length / allLessons.length) * 100)
    : 0;

  const toggleComplete = (id: string) => {
    const updated = completedLessonIds.includes(id)
      ? completedLessonIds.filter((item) => item !== id)
      : [...completedLessonIds, id];

    setCompletedLessonIds(updated);
    try {
      localStorage.setItem(`aijuz_completed_${courseId}`, JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleCopyCode = (snippet?: string) => {
    if (!snippet) return;
    navigator.clipboard.writeText(snippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleRunCode = () => {
    setRunOutput("⏳ Выполнение кода...\n✅ Программа успешно завершена с кодом 0.\nВывод: Результат корректен!");
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setComments([
      { id: Date.now().toString(), author: "Вы (Алекс)", text: newComment.trim(), time: "Только что" },
      ...comments,
    ]);
    setNewComment("");
  };

  const handleQuizSubmit = () => {
    if (selectedQuizOption === null) return;
    setQuizSubmitted(true);
    if (selectedQuizOption === activeLesson?.quiz?.correctIndex && !xpEarned) {
      setXpEarned(true);
      if (!completedLessonIds.includes(activeLesson.id)) {
        toggleComplete(activeLesson.id);
      }
    }
  };

  return (
    <div className="mx-auto w-[min(1280px,94vw)] pb-24 pt-6">
      {/* Top Breadcrumb & Navigation */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <Link
          to="/courses"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-4" /> Назад к курсам
        </Link>
        <div className="flex items-center gap-3">
          <span className="glass rounded-full px-3 py-1 text-xs text-muted-foreground">
            {course.track} · {course.level}
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-warning">
            <Star className="size-3.5 fill-warning text-warning" /> {course.rating}
          </span>
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left Column: Video Player & Tabs (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Video Container */}
          <div className="glass-card overflow-hidden p-2 rounded-2xl border border-border/80 shadow-2xl">
            <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black">
              {activeLesson?.videoUrl ? (
                <iframe
                  src={`${activeLesson.videoUrl}?autoplay=0&rel=0`}
                  title={activeLesson.title}
                  className="size-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="grid size-full place-items-center bg-muted/40 text-center p-6">
                  <Play className="size-12 text-primary animate-pulse" />
                  <p className="mt-3 text-sm text-muted-foreground">Видеоурок загружается...</p>
                </div>
              )}
            </div>

            {/* Video Controls & Lesson Title */}
            <div className="p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 border-t border-border/50">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                  Урок {activeLessonIndex + 1} из {allLessons.length}
                </span>
                <h1 className="text-xl font-bold mt-0.5">{activeLesson?.title}</h1>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant={completedLessonIds.includes(activeLesson?.id) ? "default" : "outline"}
                  onClick={() => toggleComplete(activeLesson.id)}
                  className="gap-2"
                >
                  <CheckCircle2 className="size-4" />
                  {completedLessonIds.includes(activeLesson?.id) ? "Пройдено" : "Отметить пройденным"}
                </Button>

                {nextLesson && (
                  <Button
                    size="sm"
                    onClick={() => setActiveLessonId(nextLesson.id)}
                    className="gap-1.5"
                  >
                    Следующий <ChevronRight className="size-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Interactive Content Tabs */}
          <div className="glass-card p-6 rounded-2xl">
            <div className="flex border-b border-border gap-6 text-sm font-medium">
              <button
                onClick={() => setActiveTab("summary")}
                className={`pb-3 relative transition-colors ${
                  activeTab === "summary" ? "text-primary font-semibold" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="inline-flex items-center gap-2">
                  <BookOpen className="size-4" /> Конспект
                </span>
                {activeTab === "summary" && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                )}
              </button>

              <button
                onClick={() => setActiveTab("code")}
                className={`pb-3 relative transition-colors ${
                  activeTab === "code" ? "text-primary font-semibold" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="inline-flex items-center gap-2">
                  <Code2 className="size-4" /> Код и Практика
                </span>
                {activeTab === "code" && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                )}
              </button>

              <button
                onClick={() => setActiveTab("quiz")}
                className={`pb-3 relative transition-colors ${
                  activeTab === "quiz" ? "text-primary font-semibold" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="inline-flex items-center gap-2">
                  <HelpCircle className="size-4" /> Мини-тест (+50 XP)
                </span>
                {activeTab === "quiz" && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                )}
              </button>

              <button
                onClick={() => setActiveTab("discussion")}
                className={`pb-3 relative transition-colors ${
                  activeTab === "discussion" ? "text-primary font-semibold" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="inline-flex items-center gap-2">
                  <MessageSquare className="size-4" /> Вопросы ({comments.length})
                </span>
                {activeTab === "discussion" && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                )}
              </button>
            </div>

            {/* Tab Contents */}
            <div className="pt-6">
              {/* Summary Tab */}
              {activeTab === "summary" && (
                <div className="space-y-4">
                  <h3 className="text-base font-semibold">Описание урока и теории</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {activeLesson?.description}
                  </p>
                  <div className="glass rounded-xl p-4 border border-primary/20 bg-primary/5">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-primary mb-2 flex items-center gap-1.5">
                      <Sparkles className="size-3.5" /> Главное из урока
                    </h4>
                    <ul className="text-xs text-muted-foreground space-y-1.5 list-disc list-inside">
                      <li>Понимание фундаментальных принципов работы технологии</li>
                      <li>Применение лучших практик построения чистой архитектуры</li>
                      <li>Практические навыки написания эффективного и оптимизированного кода</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Code & Practice Tab */}
              {activeTab === "code" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold">Пример кода к уроку</h3>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleCopyCode(activeLesson?.codeSnippet)}
                        className="gap-1.5 text-xs"
                      >
                        {copiedCode ? <Check className="size-3.5 text-success" /> : <Copy className="size-3.5" />}
                        {copiedCode ? "Скопировано" : "Копировать"}
                      </Button>
                      <Button size="sm" onClick={handleRunCode} className="gap-1.5 text-xs">
                        <Play className="size-3.5 fill-current" /> Запустить код
                      </Button>
                    </div>
                  </div>

                  <pre className="p-4 rounded-xl bg-slate-950 text-slate-100 text-xs font-mono overflow-x-auto border border-slate-800">
                    <code>{activeLesson?.codeSnippet || "// Код для данного урока подготавливается..."}</code>
                  </pre>

                  {runOutput && (
                    <div className="p-4 rounded-xl bg-slate-900 border border-success/30 text-xs font-mono text-emerald-400 whitespace-pre-wrap">
                      {runOutput}
                    </div>
                  )}
                </div>
              )}

              {/* Quiz Tab */}
              {activeTab === "quiz" && (
                <div className="space-y-4">
                  {activeLesson?.quiz ? (
                    <div>
                      <div className="flex items-center justify-between">
                        <h3 className="text-base font-semibold">{activeLesson.quiz.question}</h3>
                        {xpEarned && (
                          <span className="glass inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs text-amber-400 border border-amber-400/30">
                            <Zap className="size-3.5 fill-amber-400" /> +50 XP получено!
                          </span>
                        )}
                      </div>

                      <div className="mt-4 space-y-2.5">
                        {activeLesson.quiz.options.map((opt, i) => {
                          const isSelected = selectedQuizOption === i;
                          const isCorrect = i === activeLesson.quiz?.correctIndex;

                          let btnStyle = "glass-card hover:border-primary/50 text-left w-full p-3.5 text-sm rounded-xl transition-all";

                          if (quizSubmitted) {
                            if (isCorrect) {
                              btnStyle = "bg-emerald-500/15 border-emerald-500/50 text-emerald-300 w-full p-3.5 text-sm rounded-xl text-left";
                            } else if (isSelected && !isCorrect) {
                              btnStyle = "bg-rose-500/15 border-rose-500/50 text-rose-300 w-full p-3.5 text-sm rounded-xl text-left";
                            }
                          } else if (isSelected) {
                            btnStyle = "border-primary bg-primary/10 text-primary w-full p-3.5 text-sm rounded-xl text-left";
                          }

                          return (
                            <button
                              key={i}
                              disabled={quizSubmitted}
                              onClick={() => setSelectedQuizOption(i)}
                              className={btnStyle}
                            >
                              <div className="flex items-center gap-3">
                                <span className="grid size-6 place-items-center rounded-full border text-xs font-semibold">
                                  {String.fromCharCode(65 + i)}
                                </span>
                                <span>{opt}</span>
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      {!quizSubmitted ? (
                        <Button
                          onClick={handleQuizSubmit}
                          disabled={selectedQuizOption === null}
                          className="mt-5"
                        >
                          Проверить ответ
                        </Button>
                      ) : (
                        <div className="mt-5 p-4 rounded-xl glass border border-primary/30">
                          <p className="text-xs font-semibold text-primary mb-1">Пояснение:</p>
                          <p className="text-xs text-muted-foreground">{activeLesson.quiz.explanation}</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">Мини-тест для данного урока временно не требуется.</p>
                  )}
                </div>
              )}

              {/* Discussion Tab */}
              {activeTab === "discussion" && (
                <div className="space-y-4">
                  <form onSubmit={handleAddComment} className="flex gap-2">
                    <input
                      type="text"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Задай вопрос по уроку..."
                      className="flex-1 glass rounded-xl px-4 py-2 text-sm outline-none border border-border focus:border-primary"
                    />
                    <Button type="submit" size="sm" className="gap-1">
                      <Send className="size-3.5" /> Отправить
                    </Button>
                  </form>

                  <div className="space-y-3 pt-2">
                    {comments.map((c) => (
                      <div key={c.id} className="glass p-3.5 rounded-xl space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold">{c.author}</span>
                          <span className="text-[11px] text-muted-foreground">{c.time}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{c.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Course Playlist & Modules (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Progress Card */}
          <div className="glass-card p-5 rounded-2xl">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="font-semibold">Прогресс по курсу</span>
              <span className="text-xs text-muted-foreground font-mono">
                {completedLessonIds.length} / {allLessons.length} уроков ({progressPercent}%)
              </span>
            </div>
            <Progress value={progressPercent} className="h-2" />
          </div>

          {/* Modules Accordion Playlist */}
          <div className="glass-card p-5 rounded-2xl space-y-4">
            <h2 className="text-base font-semibold flex items-center justify-between">
              Программа курса
              <span className="text-xs text-muted-foreground font-normal">
                {course.modules?.length || 0} модулей
              </span>
            </h2>

            <div className="space-y-4">
              {course.modules?.map((mod: LessonModule, modIndex: number) => (
                <div key={mod.id} className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-1">
                    {mod.title}
                  </p>
                  <div className="space-y-1">
                    {mod.lessons.map((l: Lesson) => {
                      const isCurrent = l.id === activeLessonId;
                      const isDone = completedLessonIds.includes(l.id);

                      return (
                        <button
                          key={l.id}
                          onClick={() => setActiveLessonId(l.id)}
                          className={`w-full text-left p-3 rounded-xl text-xs flex items-center gap-3 transition-all ${
                            isCurrent
                              ? "bg-primary text-primary-foreground font-semibold shadow-md"
                              : "glass hover:bg-accent/50 text-foreground"
                          }`}
                        >
                          <span className="shrink-0">
                            {isDone ? (
                              <CheckCircle2 className={`size-4 ${isCurrent ? "text-primary-foreground" : "text-emerald-400"}`} />
                            ) : isCurrent ? (
                              <Play className="size-4 fill-current" />
                            ) : (
                              <Circle className="size-4 text-muted-foreground" />
                            )}
                          </span>
                          <span className="flex-1 truncate">{l.title}</span>
                          <span className={`text-[10px] shrink-0 opacity-80 ${isCurrent ? "text-primary-foreground" : "text-muted-foreground"}`}>
                            {l.duration}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
