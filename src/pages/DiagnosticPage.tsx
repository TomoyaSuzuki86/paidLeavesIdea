import { startTransition, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { paidLeaveSetupFallbackSlugs, paidLeaveSetupQuestions } from "../data/paidLeaveSetup";
import { getLibrary } from "../data/libraries";
import { sleepSetupFallbackSlugs, sleepSetupQuestions } from "../data/sleepSetup";
import { getSetupRecommendation } from "../lib/setupRecommendations";
import type { ThemeKey } from "../types/idea";

type DiagnosticStage = "theme" | "question" | "result";
type TransitionState = "idle" | "leaving" | "entering";

const EXIT_DURATION_MS = 220;
const ENTER_DURATION_MS = 420;

const diagnosticConfigs = {
  "paid-leave": {
    themeKey: "paid-leave" as const,
    title: "有休取得促進",
    description: "JKS の有休取得で詰まりやすい論点から、最初の打ち手を絞る入口です。",
    questions: paidLeaveSetupQuestions,
    fallbackSlugs: paidLeaveSetupFallbackSlugs,
  },
  sleep: {
    themeKey: "sleep" as const,
    title: "睡眠改善",
    description: "JKS の勤務設計や会議運用で崩れやすい回復ポイントから、優先施策を探す入口です。",
    questions: sleepSetupQuestions,
    fallbackSlugs: sleepSetupFallbackSlugs,
  },
};

function getProgressLabel(stage: DiagnosticStage, questionCount: number, step: number) {
  if (stage === "theme") {
    return "Start";
  }

  if (stage === "result") {
    return "Ready";
  }

  return `${step + 1} / ${questionCount}`;
}

export function DiagnosticPage() {
  const [activeTheme, setActiveTheme] = useState<ThemeKey | null>(null);
  const [answersByTheme, setAnswersByTheme] = useState<Record<ThemeKey, Record<string, string[]>>>({
    "paid-leave": {},
    sleep: {},
  });
  const [step, setStep] = useState(0);
  const [stage, setStage] = useState<DiagnosticStage>("theme");
  const [transitionState, setTransitionState] = useState<TransitionState>("entering");
  const timerIdsRef = useRef<number[]>([]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setTransitionState("idle");
    });

    return () => {
      window.cancelAnimationFrame(frame);
      timerIdsRef.current.forEach((timerId) => window.clearTimeout(timerId));
    };
  }, []);

  const currentConfig = activeTheme ? diagnosticConfigs[activeTheme] : null;
  const library = currentConfig ? getLibrary(currentConfig.themeKey) : null;
  const currentQuestion = currentConfig ? currentConfig.questions[step] : null;
  const currentAnswers = activeTheme ? answersByTheme[activeTheme] : {};
  const currentSelection = currentQuestion ? currentAnswers[currentQuestion.id] ?? [] : [];
  const isTransitioning = transitionState !== "idle";

  const questionCount = currentConfig?.questions.length ?? 0;
  const progressRatio =
    stage === "theme" ? 0.08 : stage === "result" ? 1 : questionCount > 0 ? (step + 1) / questionCount : 0;

  const recommendation = useMemo(() => {
    if (!currentConfig || !library || !activeTheme) {
      return null;
    }

    return getSetupRecommendation(
      library.ideas,
      currentConfig.questions,
      currentConfig.fallbackSlugs,
      answersByTheme[activeTheme],
      activeTheme,
    );
  }, [activeTheme, answersByTheme, currentConfig, library]);

  const queueTimer = (callback: () => void, delay: number) => {
    const timerId = window.setTimeout(callback, delay);
    timerIdsRef.current.push(timerId);
  };

  const runTransition = (update: () => void) => {
    if (isTransitioning) {
      return;
    }

    setTransitionState("leaving");

    queueTimer(() => {
      startTransition(() => {
        update();
      });

      setTransitionState("entering");
      queueTimer(() => {
        setTransitionState("idle");
      }, ENTER_DURATION_MS);
    }, EXIT_DURATION_MS);
  };

  const handleThemeSelect = (themeKey: ThemeKey) => {
    runTransition(() => {
      setActiveTheme(themeKey);
      setStep(0);
      setStage("question");
    });
  };

  const toggleOption = (optionId: string) => {
    if (!activeTheme || !currentQuestion || isTransitioning || stage !== "question") {
      return;
    }

    setAnswersByTheme((previous) => {
      const themeAnswers = previous[activeTheme];
      const values = themeAnswers[currentQuestion.id] ?? [];
      const nextValues = values.includes(optionId)
        ? values.filter((value) => value !== optionId)
        : [...values, optionId];

      return {
        ...previous,
        [activeTheme]: {
          ...themeAnswers,
          [currentQuestion.id]: nextValues,
        },
      };
    });
  };

  const handleNext = () => {
    if (!currentConfig || currentSelection.length === 0) {
      return;
    }

    if (step === currentConfig.questions.length - 1) {
      runTransition(() => {
        setStage("result");
      });
      return;
    }

    runTransition(() => {
      setStep((previous) => previous + 1);
    });
  };

  const handleBack = () => {
    if (stage === "result") {
      runTransition(() => {
        setStage("question");
      });
      return;
    }

    if (stage === "question" && step === 0) {
      runTransition(() => {
        setStage("theme");
        setActiveTheme(null);
      });
      return;
    }

    if (stage === "question") {
      runTransition(() => {
        setStep((previous) => previous - 1);
      });
    }
  };

  const handleReset = () => {
    runTransition(() => {
      setActiveTheme(null);
      setStep(0);
      setStage("theme");
    });
  };

  return (
    <main className="page paid-setup-page">
      <div className="setup-shell">
        <section className="setup-panel" aria-labelledby="diagnostic-title">
          <div className="setup-status">
            <div>
              <p className="setup-label">Diagnostic</p>
              <p className="setup-meta">テーマを選んでから、JKS で優先して見たい論点へ進みます。</p>
            </div>
            <div className="setup-progress" aria-label="進行状況">
              <span>{getProgressLabel(stage, questionCount, step)}</span>
              <div className="setup-progress-track" aria-hidden="true">
                <div className="setup-progress-value" style={{ width: `${progressRatio * 100}%` }} />
              </div>
            </div>
          </div>

          <div
            className={`setup-stage${
              transitionState === "leaving"
                ? " is-leaving"
                : transitionState === "entering"
                  ? " is-entering"
                  : ""
            }`}
          >
            {stage === "theme" ? (
              <div className="setup-question-screen">
                <div className="setup-copy-block">
                  <p className="setup-label">Theme Select</p>
                  <h1 id="diagnostic-title" className="setup-title">
                    どのテーマから見立てを始めますか
                  </h1>
                  <p className="setup-copy">
                    有休と睡眠のどちらを先に見るかを選び、そのテーマに必要な質問だけに絞って進みます。
                  </p>
                </div>

                <div className="setup-theme-grid">
                  {(["paid-leave", "sleep"] as const).map((themeKey) => {
                    const config = diagnosticConfigs[themeKey];

                    return (
                      <button
                        key={themeKey}
                        type="button"
                        className={`setup-option setup-theme-option theme-${themeKey}`}
                        disabled={isTransitioning}
                        onClick={() => handleThemeSelect(themeKey)}
                      >
                        <span className="setup-theme-copy">
                          <strong>{config.title}</strong>
                          <span>{config.description}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : stage === "question" && currentConfig && currentQuestion ? (
              <div className="setup-question-screen">
                <div className="setup-copy-block">
                  <p className="setup-label">{currentConfig.title}</p>
                  <h1 id="diagnostic-title" className="setup-title">
                    {currentQuestion.title}
                  </h1>
                  <p className="setup-copy">複数選択できます。今の JKS に近いものだけを選んで進めてください。</p>
                </div>

                <div className="setup-options-grid">
                  {currentQuestion.options.map((option) => {
                    const selected = currentSelection.includes(option.id);

                    return (
                      <button
                        key={option.id}
                        type="button"
                        className={`setup-option${selected ? " is-selected" : ""}`}
                        aria-pressed={selected}
                        disabled={isTransitioning}
                        onClick={() => toggleOption(option.id)}
                      >
                        <span className="setup-option-copy">{option.label}</span>
                        <span className="setup-option-mark" aria-hidden="true">
                          {selected ? "✓" : ""}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : currentConfig && recommendation ? (
              <div className="setup-result-screen">
                <div className="setup-copy-block setup-copy-block-result">
                  <p className="setup-label">{currentConfig.title} Diagnostic</p>
                  <h1 id="diagnostic-title" className="setup-title">
                    あなたにぴったりの課題をみつけました
                  </h1>
                  <p className="setup-copy">
                    選んだ論点に近い順で、JKS で最初に動かしやすい施策だけを三つに絞っています。
                  </p>
                </div>

                <div className="setup-signal-row" aria-label="選択から見えた論点">
                  {recommendation.focusSignals.map((signal) => (
                    <span className="setup-signal" key={signal}>
                      {signal}
                    </span>
                  ))}
                </div>

                <div className="setup-result-grid">
                  <article className="setup-result-card setup-result-card-primary">
                    <p className="setup-card-label">最初の一案</p>
                    <h2>{recommendation.primaryIdea.title}</h2>
                    <p className="setup-card-copy">{recommendation.primaryIdea.summary}</p>
                    <div className="setup-result-note">
                      <strong>効きやすい理由</strong>
                      <p>{recommendation.primaryIdea.why_it_works[0]}</p>
                    </div>
                    <div className="setup-card-meta">
                      <span>主担当: {recommendation.primaryIdea.owner}</span>
                      <span>コスト感: {recommendation.primaryIdea.cost}</span>
                      <span>効果感: {recommendation.primaryIdea.impact}</span>
                    </div>
                    <Link
                      className="button button-primary setup-action-link"
                      to={`/${recommendation.themeKey}/ideas/${recommendation.primaryIdea.slug}`}
                    >
                      詳細を見る
                    </Link>
                  </article>

                  <div className="setup-secondary-grid">
                    {recommendation.supportingIdeas.map((idea) => (
                      <article className="setup-result-card" key={idea.slug}>
                        <p className="setup-card-label">一緒に見たい施策</p>
                        <h2>{idea.title}</h2>
                        <p className="setup-card-copy">{idea.summary}</p>
                        <div className="setup-card-meta">
                          <span>{idea.owner}</span>
                          <span>{idea.cost} / {idea.impact}</span>
                        </div>
                        <Link className="text-link" to={`/${recommendation.themeKey}/ideas/${idea.slug}`}>
                          この施策も見る
                        </Link>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          <div className="setup-actions">
            <button
              className="button button-secondary setup-secondary-action"
              disabled={isTransitioning || stage === "theme"}
              onClick={handleBack}
            >
              {stage === "result" ? "回答を見直す" : "戻る"}
            </button>

            {stage === "theme" ? (
              <div className="setup-result-actions">
                <Link className="button button-secondary setup-secondary-action" to="/paid-leave">
                  有休トップへ
                </Link>
                <Link className="button button-secondary setup-secondary-action" to="/sleep">
                  睡眠トップへ
                </Link>
              </div>
            ) : stage === "question" ? (
              <button
                className="button button-primary setup-primary-action"
                disabled={isTransitioning || currentSelection.length === 0}
                onClick={handleNext}
              >
                {currentConfig && step === currentConfig.questions.length - 1 ? "結果を見る" : "次へ"}
              </button>
            ) : recommendation ? (
              <div className="setup-result-actions">
                <Link className="button button-secondary setup-secondary-action" to={`/${recommendation.themeKey}/ideas`}>
                  一覧を見る
                </Link>
                <button
                  className="button button-primary setup-primary-action"
                  disabled={isTransitioning}
                  onClick={handleReset}
                >
                  テーマから選び直す
                </button>
              </div>
            ) : null}
          </div>
        </section>
      </div>
    </main>
  );
}
