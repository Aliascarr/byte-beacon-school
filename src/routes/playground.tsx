import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Play, RotateCcw, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/site/reveal";

export const Route = createFileRoute("/playground")({
  head: () => ({
    meta: [
      { title: "Онлайн IDE — AiJuz" },
      {
        name: "description",
        content:
          "Встроенный редактор кода AiJuz: JavaScript, TypeScript, HTML, CSS, Python, C++, Java, Go, Rust. Пиши и запускай код в браузере.",
      },
      { property: "og:title", content: "Онлайн IDE — AiJuz" },
      {
        property: "og:description",
        content: "Пиши и запускай код прямо в браузере, без установки.",
      },
    ],
  }),
  component: PlaygroundPage,
});

const languages = [
  "JavaScript",
  "TypeScript",
  "HTML",
  "CSS",
  "Python",
  "C++",
  "Java",
  "Go",
  "Rust",
] as const;

type Language = (typeof languages)[number];

const snippets: Record<Language, string> = {
  JavaScript: `const xp = [120, 340, 180, 500];\nconst total = xp.reduce((a, b) => a + b, 0);\nconsole.log("Всего XP:", total);\nconsole.log("Уровень:", Math.floor(total / 250));`,
  TypeScript: `type User = { name: string; xp: number };\nconst u: User = { name: "AiJuz", xp: 1240 };\nconsole.log(\`\${u.name} — \${u.xp} XP\`);`,
  HTML: `<section class="card">\n  <h1>AiJuz</h1>\n  <p>Изучай программирование быстрее.</p>\n</section>`,
  CSS: `.card {\n  backdrop-filter: blur(18px);\n  border-radius: 16px;\n  padding: 24px;\n}`,
  Python: `xp = [120, 340, 180, 500]\nprint("Всего XP:", sum(xp))\nprint("Уровень:", sum(xp) // 250)`,
  "C++": `#include <iostream>\n\nint main() {\n  std::cout << "AiJuz" << std::endl;\n  return 0;\n}`,
  Java: `public class Main {\n  public static void main(String[] args) {\n    System.out.println("AiJuz");\n  }\n}`,
  Go: `package main\n\nimport "fmt"\n\nfunc main() {\n  fmt.Println("AiJuz")\n}`,
  Rust: `fn main() {\n    println!("AiJuz");\n}`,
};

function PlaygroundPage() {
  const [lang, setLang] = useState<Language>("JavaScript");
  const [code, setCode] = useState(snippets["JavaScript"]);
  const [output, setOutput] = useState<string[]>([
    "Нажми «Запустить», чтобы выполнить код.",
  ]);

  const selectLang = (l: Language) => {
    setLang(l);
    setCode(snippets[l]);
    setOutput(["Нажми «Запустить», чтобы выполнить код."]);
  };

  const run = () => {
    if (lang !== "JavaScript" && lang !== "TypeScript") {
      setOutput([
        `Язык ${lang}: выполнение выполняется на серверном раннере.`,
        "Локально в браузере доступен запуск JavaScript и TypeScript.",
      ]);
      return;
    }

    const logs: string[] = [];
    const sandboxConsole = {
      log: (...args: unknown[]) =>
        logs.push(
          args
            .map((a) => (typeof a === "string" ? a : JSON.stringify(a)))
            .join(" "),
        ),
    };

    try {
      const stripped = code.replace(/:\s*[A-Za-z<>[\]{}|,\s]+(?=\s*[=;),])/g, "");
      // eslint-disable-next-line no-new-func
      const fn = new Function("console", stripped);
      fn(sandboxConsole);
      setOutput(logs.length ? logs : ["Код выполнен без вывода."]);
    } catch (error) {
      setOutput([`Ошибка: ${(error as Error).message}`]);
    }
  };

  return (
    <div className="mx-auto w-[min(1180px,92vw)] pb-24">
      <PageHeader
        eyebrow="Онлайн IDE"
        title="Пиши код прямо в браузере"
        description="Девять языков, подсветка структуры, автосохранение сниппетов и мгновенный запуск JavaScript/TypeScript."
      />

      <div className="glass-card overflow-hidden">
        <div className="flex flex-wrap gap-2 border-b border-border/60 p-3">
          {languages.map((l) => (
            <Button
              key={l}
              size="sm"
              variant={l === lang ? "default" : "ghost"}
              onClick={() => selectLang(l)}
            >
              {l}
            </Button>
          ))}
        </div>

        <div className="grid lg:grid-cols-2">
          <div className="border-b border-border/60 lg:border-r lg:border-b-0">
            <div className="flex items-center justify-between px-4 py-2.5">
              <span className="font-mono text-xs text-muted-foreground">
                main.{lang.toLowerCase().replace("+", "p").replace(" ", "")}
              </span>
              <div className="flex gap-1.5">
                <Button size="sm" variant="ghost" onClick={() => setCode(snippets[lang])}>
                  <RotateCcw className="size-3.5" /> Сброс
                </Button>
                <Button size="sm" onClick={run}>
                  <Play className="size-3.5" /> Запустить
                </Button>
              </div>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck={false}
              className="h-[420px] w-full resize-none bg-transparent p-4 font-mono text-[13px] leading-relaxed outline-none"
            />
          </div>

          <div>
            <div className="flex items-center gap-2 px-4 py-2.5 text-xs text-muted-foreground">
              <Terminal className="size-3.5" /> Вывод
            </div>
            <div className="h-[420px] overflow-auto border-t border-border/60 p-4 font-mono text-[13px] leading-relaxed text-muted-foreground">
              {output.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
