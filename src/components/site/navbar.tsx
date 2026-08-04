import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { Menu, Moon, Sun, Terminal, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  { to: "/roadmap", label: "Roadmap" },
  { to: "/courses", label: "Курсы" },
  { to: "/problems", label: "Задачи" },
  { to: "/playground", label: "IDE" },
  { to: "/leaderboard", label: "Лидеры" },
  { to: "/dashboard", label: "Кабинет" },
] as const;

function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Переключить тему"
      onClick={() => setDark((v) => !v)}
    >
      {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </Button>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="glass mx-auto mt-3 flex w-[min(1180px,94vw)] items-center justify-between rounded-2xl px-4 py-2.5">
        <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="grid size-8 place-items-center rounded-xl bg-primary text-primary-foreground">
            <Terminal className="size-4" />
          </span>
          <span className="text-base font-semibold tracking-tight">AiJuz</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="rounded-lg px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              activeProps={{ className: "bg-accent text-foreground" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
            <Link to="/auth">Войти</Link>
          </Button>
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link to="/auth">Начать бесплатно</Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label="Меню"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="glass mx-auto mt-2 flex w-[min(1180px,94vw)] flex-col gap-1 rounded-2xl p-3 lg:hidden"
          >
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                activeProps={{ className: "bg-accent text-foreground" }}
              >
                {l.label}
              </Link>
            ))}
            <Button asChild className="mt-1">
              <Link to="/auth" onClick={() => setOpen(false)}>
                Начать бесплатно
              </Link>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
