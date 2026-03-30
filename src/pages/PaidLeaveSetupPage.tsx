import { startTransition, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { paidLeaveSetupQuestions } from "../data/paidLeaveSetup";
import { getLibrary } from "../data/libraries";
import { getPaidLeaveSetupRecommendation } from "../lib/paidLeaveSetup";

type SetupView = "question" | "result";
type TransitionState = "idle" | "leaving" | "entering";

const EXIT_DURATION_MS = 220;
const ENTER_DURATION_MS = 420;

function getProgressLabel(view: SetupView, step: number) {
  if (view === "result") {
    return "Ready";
  }

  return `${step + 1} / ${paidLeaveSetupQuestions.length}`;
}

export function PaidLeaveSetupPage() {
  const library = getLibrary("paid-leave");
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [step, setStep] = useState(0);
  const [view, setView] = useState<SetupView>("question");
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

  const currentQuestion = paidLeaveSetupQuestions[step];
  const currentSelection = answers[currentQuestion.id] ?? [];
  const isTransitioning = transitionState !== "idle";
  const progressRatio = view === "result" ? 1 : (step + 1) / paidLeaveSetupQuestions.length;

  const recommendation = useMemo(
    () => getPaidLeaveSetupRecommendation(library.ideas, answers),
    [answers, library.ideas],
  );

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

  const toggleOption = (optionId: string) => {
    if (isTransitioning || view !== "question") {
      return;
    }

    setAnswers((previous) => {
      const values = previous[currentQuestion.id] ?? [];
      const nextValues = values.includes(optionId)
        ? values.filter((value) => value !== optionId)
        : [...values, optionId];

      return {
        ...previous,
        [currentQuestion.id]: nextValues,
      };
    });
  };

  const handleNext = () => {
    if (currentSelection.length === 0) {
      return;
    }

    if (step === paidLeaveSetupQuestions.length - 1) {
      runTransition(() => {
        setView("result");
      });
      return;
    }

    runTransition(() => {
      setStep((previous) => previous + 1);
    });
  };

  const handleBack = () => {
    if (view === "result") {
      runTransition(() => {
        setView("question");
      });
      return;
    }

    if (step === 0) {
      return;
    }

    runTransition(() => {
      setStep((previous) => previous - 1);
    });
  };

  const handleReset = () => {
    runTransition(() => {
      setAnswers({});
      setStep(0);
      setView("question");
    });
  };

  return (
    <main className="page paid-setup-page">
      <div className="setup-shell">
        <section className="setup-panel" aria-labelledby="paid-leave-setup-title">
          <div className="setup-status">
            <div>
              <p className="setup-label">Paid Leave Setup</p>
              <p className="setup-meta">有給取得促進の入口だけを静かに整える質問体験</p>
            </div>
            <div className="setup-progress" aria-label="進行状況">
              <span>{getProgressLabel(view, step)}</span>
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
            {view === "question" ? (
              <div className="setup-question-screen">
                <div className="setup-copy-block">
                  <h1 id="paid-leave-setup-title" className="setup-title">
                    {currentQuestion.title}
                  </h1>
                  <p className="setup-copy">複数選択できます。いま近いものだけを選んで進めてください。</p>
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
            ) : (
              <div className="setup-result-screen">
                <div className="setup-copy-block setup-copy-block-result">
                  <p className="setup-label">Matched Focus</p>
                  <h1 id="paid-leave-setup-title" className="setup-title">
                    あなたにぴったりの課題をみつけました
                  </h1>
                  <p className="setup-copy">
                    回答に近い論点から、最初に動かしやすい施策だけを三つに絞っています。
                  </p>
                </div>

                <div className="setup-signal-row" aria-label="選択から見えた軸">
                  {recommendation.focusSignals.map((signal) => (
                    <span className="setup-signal" key={signal}>
                      {signal}
                    </span>
                  ))}
                </div>

                <div className="setup-result-grid">
                  <article className="setup-result-card setup-result-card-primary">
                    <p className="setup-card-label">最初の一手</p>
                    <h2>{recommendation.primaryIdea.title}</h2>
                    <p className="setup-card-copy">{recommendation.primaryIdea.summary}</p>
                    <div className="setup-result-note">
                      <strong>効きやすい理由</strong>
                      <p>{recommendation.primaryIdea.why_it_works[0]}</p>
                    </div>
                    <div className="setup-card-meta">
                      <span>主担当: {recommendation.primaryIdea.owner}</span>
                      <span>コスト: {recommendation.primaryIdea.cost}</span>
                      <span>効果感: {recommendation.primaryIdea.impact}</span>
                    </div>
                    <Link className="button button-primary setup-action-link" to={`/paid-leave/ideas/${recommendation.primaryIdea.slug}`}>
                      詳細を見る
                    </Link>
                  </article>

                  <div className="setup-secondary-grid">
                    {recommendation.supportingIdeas.map((idea) => (
                      <article className="setup-result-card" key={idea.slug}>
                        <p className="setup-card-label">一緒に入れると効きやすい</p>
                        <h2>{idea.title}</h2>
                        <p className="setup-card-copy">{idea.summary}</p>
                        <div className="setup-card-meta">
                          <span>{idea.owner}</span>
                          <span>{idea.tags.slice(0, 2).join(" / ")}</span>
                        </div>
                        <Link className="text-link" to={`/paid-leave/ideas/${idea.slug}`}>
                          この施策も見る
                        </Link>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="setup-actions">
            <button className="button button-secondary setup-secondary-action" disabled={isTransitioning || (view === "question" && step === 0)} onClick={handleBack}>
              {view === "result" ? "回答を見直す" : "戻る"}
            </button>

            {view === "question" ? (
              <button
                className="button button-primary setup-primary-action"
                disabled={isTransitioning || currentSelection.length === 0}
                onClick={handleNext}
              >
                {step === paidLeaveSetupQuestions.length - 1 ? "結果を見る" : "次へ"}
              </button>
            ) : (
              <div className="setup-result-actions">
                <Link className="button button-secondary setup-secondary-action" to="/paid-leave/ideas">
                  一覧を見る
                </Link>
                <button className="button button-primary setup-primary-action" disabled={isTransitioning} onClick={handleReset}>
                  はじめから選ぶ
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
