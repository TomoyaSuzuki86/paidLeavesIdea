import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

const questions = [
  {
    id: "q1",
    title: "選択肢の中からあなたの抱えている課題を教えてください",
    options: [
      "有給を取りづらい空気がある",
      "業務が偏っていて休みにくい",
      "十分に眠れていない人が多い",
      "残業や時間外対応が常態化している",
      "制度はあるが使われていない",
      "何から手を付けるべきかわからない",
    ],
  },
  {
    id: "q2",
    title: "どんな場面で困りやすいですか？",
    options: [
      "引き継ぎがしづらい",
      "属人化している業務が多い",
      "管理職が忙しすぎる",
      "繁忙期に休みが集中できない",
      "夜遅くまでスマホやPCを見がち",
      "睡眠改善の施策が個人任せになっている",
    ],
  },
  {
    id: "q3",
    title: "どんな改善から始めたいですか？",
    options: [
      "すぐ始められる小さな施策",
      "制度の見せ方・周知改善",
      "管理職向けの働きかけ",
      "業務設計や分担の見直し",
      "睡眠リテラシー向上",
      "データを見ながら改善したい",
    ],
  },
];

const recommendations = [
  "引き継ぎテンプレートの標準化",
  "繁忙期前の休暇取得計画ルール",
  "勤務間インターバルの見える化",
  "管理職向け 休暇取得マネジメント指針",
];

export default function SleepLeaveDiagnosticMockup() {
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<Record<string, string[]>>({});

  const currentQuestion = questions[step];
  const currentValues = selected[currentQuestion?.id] || [];
  const progress = useMemo(() => ((step + 1) / questions.length) * 100, [step]);

  const toggleOption = (questionId: string, value: string) => {
    setSelected((prev) => {
      const current = prev[questionId] || [];
      const exists = current.includes(value);
      return {
        ...prev,
        [questionId]: exists ? current.filter((item) => item !== value) : [...current, value],
      };
    });
  };

  const next = () => {
    if (step === questions.length - 1) {
      setFinished(true);
      return;
    }
    setStep((prev) => prev + 1);
  };

  const back = () => {
    if (step === 0) return;
    setStep((prev) => prev - 1);
  };

  const reset = () => {
    setStarted(false);
    setFinished(false);
    setStep(0);
    setSelected({});
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#050816] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-12rem] h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute bottom-[-10rem] right-[-8rem] h-[24rem] w-[24rem] rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute left-[-6rem] top-[35%] h-[18rem] w-[18rem] rounded-full bg-violet-500/15 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-4xl items-center justify-center px-4 py-10">
        <div className="w-full max-w-3xl rounded-[36px] border border-white/10 bg-white/6 p-4 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl md:p-6">
          <div className="rounded-[30px] border border-white/10 bg-gradient-to-b from-white/10 to-white/[0.03] p-6 md:p-10">
            {!started ? (
              <motion.div
                initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex min-h-[560px] flex-col items-center justify-center text-center"
              >
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/90">
                  <Sparkles className="h-4 w-4" />
                  セットアップをはじめます
                </div>
                <div className="max-w-2xl">
                  <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">
                    選択肢の中から
                    <br />
                    あなたの抱えている課題を教えてください
                  </h1>
                  <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/65 md:text-base">
                    2〜3問だけで、今の状況に合う施策を見つけます。
                  </p>
                </div>
                <Button
                  size="lg"
                  onClick={() => setStarted(true)}
                  className="mt-10 h-12 rounded-full px-8 text-base shadow-[0_10px_30px_rgba(96,165,250,0.35)]"
                >
                  はじめる
                </Button>
              </motion.div>
            ) : finished ? (
              <motion.div
                initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className="flex min-h-[560px] flex-col items-center justify-center text-center"
              >
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/15">
                  <Check className="h-7 w-7 text-emerald-300" />
                </div>
                <Badge className="rounded-full border-0 bg-white/10 px-4 py-1 text-white hover:bg-white/10">
                  診断完了
                </Badge>
                <h2 className="mt-6 text-3xl font-semibold tracking-tight md:text-4xl">
                  あなたにぴったりの課題をみつけました
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-white/65 md:text-base">
                  属人化による休暇取得の停滞と、時間外対応による睡眠圧迫が重なっている可能性があります。
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  {recommendations.map((item) => (
                    <div key={item} className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-white/90">
                      {item}
                    </div>
                  ))}
                </div>
                <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                  <Button className="h-11 rounded-full px-7">施策を見る</Button>
                  <Button variant="outline" className="h-11 rounded-full border-white/15 bg-transparent px-7 text-white hover:bg-white/10 hover:text-white" onClick={reset}>
                    もう一度やる
                  </Button>
                </div>
              </motion.div>
            ) : (
              <div className="flex min-h-[560px] flex-col">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-white/50">{step + 1} / {questions.length}</div>
                  <div className="flex items-center gap-2">
                    {questions.map((question, index) => (
                      <div
                        key={question.id}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          index === step ? "w-10 bg-white" : index < step ? "w-6 bg-white/55" : "w-6 bg-white/20"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="relative mt-10 flex flex-1 items-center justify-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentQuestion.id}
                      initial={{ opacity: 0, y: 26, filter: "blur(14px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -18, filter: "blur(10px)" }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className="w-full"
                    >
                      <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-2xl font-semibold tracking-tight md:text-4xl">{currentQuestion.title}</h2>
                      </div>

                      <div className="mx-auto mt-10 grid max-w-2xl gap-3 md:grid-cols-2">
                        {currentQuestion.options.map((option) => {
                          const checked = currentValues.includes(option);
                          return (
                            <button
                              key={option}
                              type="button"
                              onClick={() => toggleOption(currentQuestion.id, option)}
                              className={`group rounded-3xl border px-5 py-5 text-left transition-all duration-200 ${
                                checked
                                  ? "border-white/40 bg-white/16 shadow-[0_10px_30px_rgba(255,255,255,0.06)]"
                                  : "border-white/10 bg-white/[0.04] hover:border-white/25 hover:bg-white/[0.08]"
                              }`}
                            >
                              <div className="flex items-start gap-3">
                                <div className={`mt-0.5 rounded-md border p-0.5 ${checked ? "border-white/50 bg-white/10" : "border-white/20 bg-transparent"}`}>
                                  <Checkbox checked={checked} className="border-white data-[state=checked]:bg-white data-[state=checked]:text-slate-900" />
                                </div>
                                <div className="text-sm leading-6 text-white/92">{option}</div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="mt-8 flex items-center justify-between gap-3">
                  <Button
                    variant="ghost"
                    onClick={back}
                    disabled={step === 0}
                    className="h-11 rounded-full px-5 text-white hover:bg-white/10 hover:text-white disabled:opacity-30"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    戻る
                  </Button>
                  <Button onClick={next} className="h-11 rounded-full px-6 shadow-[0_10px_30px_rgba(96,165,250,0.35)]">
                    {step === questions.length - 1 ? "結果を見る" : "次へ"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>

                <div className="mt-4 text-center text-xs text-white/40">複数選択できます</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
