import { useState, useEffect } from "react";

const exams = [
  { date: "6 May", module: "Computational Finance", code: "CS3930", difficulty: "medium" },
  { date: "11 May", module: "Intelligent Agents & MAS", code: "CS3940", difficulty: "hard" },
  { date: "12 May", module: "Quantum Computation", code: "CS3600", difficulty: "easy" },
  { date: "14 May", module: "Machine Learning", code: "CS3920", difficulty: "hard" },
  { date: "20 May", module: "Functional Programming", code: "CS3510", difficulty: "easy" },
  { date: "26 May", module: "IT Project Management", code: "CS3003", difficulty: "easy" },
  { date: "27 May", module: "Advanced Algorithms", code: "CS2860", difficulty: "hard" },
  { date: "29 May", module: "Deep Learning", code: "CS3950", difficulty: "hard" },
];

const plan = [
  { day: "Mon 20 Apr", phase: "CS3930", tasks: ["Past papers: scan last 3 years, note recurring topics", "Flag any lecture gaps"], hours: 4, note: "Tutoring 5:30–6:30" },
  { day: "Tue 21 Apr", phase: "CS3930", tasks: ["Fill content gaps from paper scan", "Practice questions"], hours: 5, note: "Tutoring 6:30–7:30" },
  { day: "Wed 22 Apr", phase: "CS3930", tasks: ["Full past paper under timed conditions", "Review + fix weak areas"], hours: 6 },
  { day: "Thu 23 Apr", phase: "CS3940", tasks: ["Past papers: scan last 3 years", "Build topic map of what's always tested"], hours: 6 },
  { day: "Fri 24 Apr", phase: "CS3940", tasks: ["Deep dive on core concepts (agent architectures, game theory, coordination)", "Practice questions"], hours: 6 },
  { day: "Sat 25 Apr", phase: "CS3940", tasks: ["Continue IA content — solidify understanding", "Weekly questions"], hours: 5, note: "Flex day — adjust if at Marios'" },
  { day: "Sun 26 Apr", phase: "CS3940", tasks: ["Full past paper timed", "Review answers"], hours: 5, note: "Flex day" },
  { day: "Mon 27 Apr", phase: "CS3920", tasks: ["Past papers: scan, identify key topics", "Begin content sweep"], hours: 5, note: "Tutoring 5:30–6:30" },
  { day: "Tue 28 Apr", phase: "CS3920", tasks: ["ML deep dive: core algorithms, bias-variance, model selection", "Practice questions"], hours: 5, note: "Tutoring 6:30–7:30" },
  { day: "Wed 30 Apr", phase: "CS3920", tasks: ["ML revision session 9–11am", "Comp Finance revision session 4–6pm", "Sister's 18th — light day, sessions are the work"], hours: 3, note: "🎂 Sister's 18th · ML session 9–11am · CF session 4–6pm" },
  { day: "Thu 1 May", phase: "CS3920", tasks: ["Full ML past paper timed", "Fix gaps, targeted weak topics"], hours: 6 },
  { day: "Fri 2 May", phase: "BUFFER", tasks: ["Overflow day — use for whichever of Finance / IA / ML needs it most", "No new content, consolidation only"], hours: 5 },
  { day: "Sat 3 May", phase: "CS3930", tasks: ["Comp Finance final review — key formulas, one paper skim", "Rest in the evening"], hours: 4, note: "Keep it light" },
  { day: "Sun 4 May", phase: "CS3930", tasks: ["Light refresh only — no new content", "Rest and sleep well"], hours: 2 },
  { day: "Mon 5 May", phase: "CS3930", tasks: ["Morning: final skim of notes", "Afternoon: rest"], hours: 2, note: "Exam tomorrow" },
  { day: "Tue 6 May", phase: "CS3940", tasks: ["EXAM: Computational Finance", "Evening: light IA refresh if energy allows"], hours: 2, note: "🎓 Comp Finance exam" },
  { day: "Wed 7 May", phase: "CS3940", tasks: ["IA final consolidation — past paper review, weak spots"], hours: 5 },
  { day: "Thu 8 May", phase: "CS3940", tasks: ["IA + quick Quantum scan (should be fast for you)", "Quantum: one past paper"], hours: 6 },
  { day: "Fri 9 May", phase: "CS3600", tasks: ["Quantum consolidation — circuits, algorithms, complexity", "Light IA refresh"], hours: 5 },
  { day: "Sat 10 May", phase: "CS3940", tasks: ["Final IA prep", "Rest"], hours: 3, note: "Keep it easy" },
  { day: "Sun 11 May", phase: "CS3600", tasks: ["EXAM: Intelligent Agents", "Afternoon: Quantum final skim"], hours: 2, note: "🎓 IA exam" },
  { day: "Mon 12 May", phase: "CS3920", tasks: ["EXAM: Quantum Computation", "Evening: begin ML final prep"], hours: 2, note: "🎓 Quantum exam" },
  { day: "Tue 13 May", phase: "CS3920", tasks: ["ML final push — consolidate, targeted weak areas", "One more past paper"], hours: 6 },
  { day: "Wed 14 May", phase: "CS3510", tasks: ["EXAM: Machine Learning", "Evening off — you've earned it"], hours: 1, note: "🎓 ML exam" },
  { day: "Thu 15 May", phase: "CS3510", tasks: ["Functional Programming: past papers first", "Haskell patterns + key concepts refresh"], hours: 5 },
  { day: "Fri 16 May", phase: "CS3510", tasks: ["Functional deep dive if needed, else practice questions", "Should be light given your comfort level"], hours: 4 },
  { day: "Sat 17 May", phase: "CS2860", tasks: ["Advanced Algorithms: past papers scan", "Core topics: complexity classes, reductions, graph algorithms"], hours: 5, note: "Flex day" },
  { day: "Sun 18 May", phase: "CS2860", tasks: ["Adv Alg: deep dive on hardest topics", "Practice proofs/reductions"], hours: 5, note: "Flex day" },
  { day: "Mon 19 May", phase: "CS3510", tasks: ["Functional final light refresh", "Adv Alg continued if needed"], hours: 4, note: "Tutoring 5:30–6:30" },
  { day: "Tue 20 May", phase: "CS3003", tasks: ["EXAM: Functional Programming", "IT Project Management: begin scan — should be mostly comprehension"], hours: 3, note: "🎓 Functional exam" },
  { day: "Wed 21 May", phase: "CS3003", tasks: ["IT PM: past papers + core frameworks (PRINCE2, Agile, risk mgmt)", "Should be quick given 50% CW already done"], hours: 4 },
  { day: "Thu 22 May", phase: "CS2860", tasks: ["Advanced Algorithms: full past paper timed", "Fix any weak proofs"], hours: 6 },
  { day: "Fri 23 May", phase: "CS3950", tasks: ["Deep Learning: past papers scan", "Core topics: CNNs, RNNs, LSTMs, backprop, regularisation"], hours: 6 },
  { day: "Sat 24 May", phase: "CS3950", tasks: ["Deep Learning: solidify understanding — you have prior coursework here", "Practice questions"], hours: 5, note: "Flex day" },
  { day: "Sun 25 May", phase: "CS3003", tasks: ["IT PM final light refresh", "Adv Alg light consolidation"], hours: 4, note: "Flex day" },
  { day: "Mon 26 May", phase: "CS2860", tasks: ["EXAM: IT Project Management", "Adv Alg final prep"], hours: 3, note: "🎓 IT PM exam" },
  { day: "Tue 27 May", phase: "CS3950", tasks: ["EXAM: Advanced Algorithms", "Deep Learning final prep"], hours: 3, note: "🎓 Adv Alg exam" },
  { day: "Wed 28 May", phase: "CS3950", tasks: ["Deep Learning final consolidation — key architectures, exam Q types", "Rest well"], hours: 4 },
  { day: "Thu 29 May", phase: "CS3950", tasks: ["EXAM: Deep Learning 🎉"], hours: 1, note: "🎓 Deep Learning exam — done!" },
];

const phaseColors = {
  CS3930: { bg: "#1a2a1a", border: "#4ade80", text: "#4ade80", label: "Comp Finance" },
  CS3940: { bg: "#1a1a2e", border: "#818cf8", text: "#818cf8", label: "Intelligent Agents" },
  CS3600: { bg: "#2a1a2a", border: "#c084fc", text: "#c084fc", label: "Quantum" },
  CS3920: { bg: "#2a1a1a", border: "#f87171", text: "#f87171", label: "Machine Learning" },
  CS3510: { bg: "#1a2a2a", border: "#34d399", text: "#34d399", label: "Functional Prog" },
  CS3003: { bg: "#2a2a1a", border: "#fbbf24", text: "#fbbf24", label: "IT Project Mgmt" },
  CS2860: { bg: "#2a1a1e", border: "#fb923c", text: "#fb923c", label: "Adv Algorithms" },
  CS3950: { bg: "#1a1e2a", border: "#38bdf8", text: "#38bdf8", label: "Deep Learning" },
  BUFFER: { bg: "#1e1e1e", border: "#6b7280", text: "#9ca3af", label: "Buffer Day" },
};

const difficultyLabel = { easy: "✓ Comfortable", medium: "~ Medium", hard: "! Focus here" };
const difficultyColor = { easy: "#4ade80", medium: "#fbbf24", hard: "#f87171" };
const difficultyOrder = ["easy", "medium", "hard"];

function Modal({ day, phase, onClose, notes, setNotes }) {
  const c = phaseColors[phase];
  const [text, setText] = useState(notes[day] || "");

  const save = () => {
    setNotes(prev => {
      const updated = { ...prev, [day]: text };
      localStorage.setItem("revision-notes", JSON.stringify(updated));
      return updated;
    });
    onClose();
  };

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 100, padding: "1rem",
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "#161616",
        border: `1px solid ${c.border}44`,
        borderTop: `3px solid ${c.border}`,
        borderRadius: "10px",
        padding: "1.5rem",
        width: "100%",
        maxWidth: "480px",
        fontFamily: "'DM Mono', monospace",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <div>
            <div style={{ fontSize: "0.65rem", color: c.text, letterSpacing: "0.1em", textTransform: "uppercase" }}>{phase}</div>
            <div style={{ fontSize: "1rem", fontWeight: 500, color: "#e5e7eb" }}>{day}</div>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#6b7280", fontSize: "1.2rem", cursor: "pointer" }}>✕</button>
        </div>
        <textarea
          autoFocus
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Add notes for this day..."
          style={{
            width: "100%", minHeight: "140px",
            background: "#0d0d0d", border: `1px solid ${c.border}33`,
            borderRadius: "6px", color: "#d1d5db",
            fontFamily: "'DM Mono', monospace", fontSize: "0.8rem",
            padding: "0.75rem", resize: "vertical", outline: "none",
            boxSizing: "border-box",
          }}
        />
        <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.75rem", justifyContent: "flex-end" }}>
          <button onClick={onClose} style={{
            background: "transparent", border: "1px solid #333", color: "#6b7280",
            borderRadius: "4px", padding: "0.4rem 0.9rem", fontSize: "0.75rem",
            cursor: "pointer", fontFamily: "'DM Mono', monospace",
          }}>Cancel</button>
          <button onClick={save} style={{
            background: `${c.border}22`, border: `1px solid ${c.border}`, color: c.text,
            borderRadius: "4px", padding: "0.4rem 0.9rem", fontSize: "0.75rem",
            cursor: "pointer", fontFamily: "'DM Mono', monospace",
          }}>Save</button>
        </div>
      </div>
    </div>
  );
}

function NotesPage({ notes, onBack }) {
  const entries = Object.entries(notes).filter(([, v]) => v.trim());
  const planMap = Object.fromEntries(plan.map(d => [d.day, d]));

  return (
    <div style={{
      background: "#0d0d0d", minHeight: "100vh",
      fontFamily: "'DM Mono', 'Courier New', monospace",
      color: "#e5e7eb", padding: "2rem 1rem",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Syne:wght@700;800&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #0d0d0d; }
      `}</style>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <button onClick={onBack} style={{
          background: "transparent", border: "1px solid #333", color: "#9ca3af",
          borderRadius: "4px", padding: "0.35rem 0.8rem", fontSize: "0.72rem",
          cursor: "pointer", fontFamily: "'DM Mono', monospace", marginBottom: "1.5rem",
        }}>← Back to plan</button>
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "2rem", fontWeight: 800, marginBottom: "0.25rem" }}>Your Notes</h1>
        <p style={{ color: "#6b7280", fontSize: "0.8rem", marginBottom: "2rem" }}>{entries.length} {entries.length === 1 ? "entry" : "entries"}</p>
        {entries.length === 0 ? (
          <div style={{ color: "#374151", fontSize: "0.85rem", textAlign: "center", marginTop: "4rem" }}>
            No notes yet — click the 📝 on any day to add one.
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {entries.map(([day, note]) => {
              const d = planMap[day];
              const c = d ? phaseColors[d.phase] : phaseColors.BUFFER;
              return (
                <div key={day} style={{
                  background: c.bg, border: `1px solid ${c.border}33`,
                  borderLeft: `3px solid ${c.border}`, borderRadius: "8px", padding: "1rem",
                }}>
                  <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginBottom: "0.5rem", flexWrap: "wrap" }}>
                    <span style={{ fontSize: "0.7rem", color: c.text, fontWeight: 500 }}>{day}</span>
                    <span style={{
                      background: `${c.border}22`, color: c.text,
                      fontSize: "0.6rem", padding: "0.1rem 0.4rem", borderRadius: "3px", letterSpacing: "0.05em",
                    }}>{d?.phase || "—"}</span>
                    {d?.phase && d.phase !== "BUFFER" && (
                      <span style={{
                        background: "#1a1a1a", color: "#6b7280",
                        fontSize: "0.6rem", padding: "0.1rem 0.4rem", borderRadius: "3px",
                      }}>{phaseColors[d.phase]?.label}</span>
                    )}
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "#d1d5db", whiteSpace: "pre-wrap", lineHeight: 1.6 }}>{note}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default function RevisionPlan() {
  const [filter, setFilter] = useState("ALL");
  const [checked, setChecked] = useState(() => {
    try { return JSON.parse(localStorage.getItem("revision-checked") || "{}"); } catch { return {}; }
  });
  const [notes, setNotes] = useState(() => {
    try { return JSON.parse(localStorage.getItem("revision-notes") || "{}"); } catch { return {}; }
  });
  const [modal, setModal] = useState(null);
  const [page, setPage] = useState("plan");

  const toggleCheck = (day) => {
    setChecked(prev => {
      const updated = { ...prev, [day]: !prev[day] };
      localStorage.setItem("revision-checked", JSON.stringify(updated));
      return updated;
    });
  };

  const phases = ["ALL", ...Object.keys(phaseColors)];
  const filtered = filter === "ALL" ? plan : plan.filter(d => d.phase === filter);
  const totalDays = plan.length;
  const doneDays = plan.filter(d => checked[d.day]).length;

  const [examFeelings, setExamFeelings] = useState(() => {
    try { return JSON.parse(localStorage.getItem("revision-feelings") || "{}"); } catch { return {}; }
  });

  const cycleFeelings = (code) => {
    setExamFeelings(prev => {
      const current = prev[code] || exams.find(e => e.code === code).difficulty;
      const next = difficultyOrder[(difficultyOrder.indexOf(current) + 1) % 3];
      const updated = { ...prev, [code]: next };
      localStorage.setItem("revision-feelings", JSON.stringify(updated));
      return updated;
    });
  };

  if (page === "notes") return <NotesPage notes={notes} onBack={() => setPage("plan")} />;

  return (
    <div style={{
      background: "#0d0d0d", minHeight: "100vh",
      fontFamily: "'DM Mono', 'Courier New', monospace",
      color: "#e5e7eb", padding: "2rem 1rem",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Syne:wght@700;800&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #0d0d0d; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #111; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 2px; }
        .day-card { transition: transform 0.15s ease; }
        .day-card:hover { transform: translateX(3px); }
        .filter-btn:hover { opacity: 1 !important; }
        .icon-btn:hover { opacity: 1 !important; }
      `}</style>

      {modal && (
        <Modal
          day={modal}
          phase={plan.find(d => d.day === modal)?.phase || "BUFFER"}
          onClose={() => setModal(null)}
          notes={notes}
          setNotes={setNotes}
        />
      )}

      <div style={{ maxWidth: 720, margin: "0 auto 2rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
          <p style={{ color: "#6b7280", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>
            20 Apr – 29 May 2026
          </p>
          <button onClick={() => setPage("notes")} style={{
            background: "transparent", border: "1px solid #333", color: "#9ca3af",
            borderRadius: "4px", padding: "0.3rem 0.7rem", fontSize: "0.7rem",
            cursor: "pointer", fontFamily: "'DM Mono', monospace",
          }}>📝 Notes ({Object.values(notes).filter(v => v.trim()).length})</button>
        </div>

        <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(1.8rem, 5vw, 2.8rem)", fontWeight: 800, margin: "0 0 0.25rem", lineHeight: 1.1 }}>
          Exam Revision Plan
        </h1>
        <p style={{ color: "#9ca3af", fontSize: "0.85rem", margin: "0 0 0.75rem" }}>
          8 modules · past papers first · exam order logic
        </p>

        {/* Progress bar */}
        <div style={{ marginBottom: "2rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.65rem", color: "#6b7280", marginBottom: "0.3rem" }}>
            <span>{doneDays} of {totalDays} days done</span>
            <span>{Math.round((doneDays / totalDays) * 100)}%</span>
          </div>
          <div style={{ height: "3px", background: "#1f1f1f", borderRadius: "2px" }}>
            <div style={{
              height: "100%", borderRadius: "2px",
              width: `${(doneDays / totalDays) * 100}%`,
              background: "linear-gradient(90deg, #4ade80, #38bdf8)",
              transition: "width 0.3s ease",
            }} />
          </div>
        </div>

        {/* Exam overview */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "0.5rem", marginBottom: "2rem" }}>
          {exams.map(e => {
            const c = phaseColors[e.code];
            return (
              <div key={e.code} style={{
                background: c.bg, border: `1px solid ${c.border}22`,
                borderLeft: `3px solid ${c.border}`, borderRadius: "6px", padding: "0.6rem 0.75rem",
              }}>
                <div style={{ fontSize: "0.65rem", color: c.text, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.2rem" }}>{e.date}</div>
                <div style={{ fontSize: "0.78rem", fontWeight: 500, lineHeight: 1.3, marginBottom: "0.3rem" }}>{e.module}</div>
                <div
                  onClick={() => cycleFeelings(e.code)}
                  style={{ fontSize: "0.65rem", color: difficultyColor[examFeelings[e.code] || e.difficulty], cursor: "pointer", userSelect: "none" }}
                >
                  {difficultyLabel[examFeelings[e.code] || e.difficulty]}
                </div>
              </div>
            );
          })}
        </div>

        {/* Filter */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.5rem" }}>
          {phases.map(p => {
            const c = p === "ALL" ? { border: "#6b7280", text: "#9ca3af" } : phaseColors[p];
            const active = filter === p;
            return (
              <button key={p} className="filter-btn" onClick={() => setFilter(p)} style={{
                background: active ? `${c.border}22` : "transparent",
                border: `1px solid ${active ? c.border : "#333"}`,
                color: active ? c.text : "#6b7280",
                borderRadius: "4px", padding: "0.3rem 0.65rem", fontSize: "0.7rem",
                cursor: "pointer", letterSpacing: "0.05em", opacity: active ? 1 : 0.7,
                transition: "all 0.15s", fontFamily: "'DM Mono', monospace",
              }}>
                {p === "ALL" ? "ALL" : p === "BUFFER" ? "BUFFER" : phaseColors[p].label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Day cards */}
      <div style={{ maxWidth: 720, margin: "0 auto", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {filtered.map((d, i) => {
          const c = phaseColors[d.phase];
          const isExam = d.note && d.note.includes("🎓");
          const isDone = checked[d.day];
          const hasNote = notes[d.day]?.trim();

          return (
            <div key={i} className="day-card" style={{
              background: isDone ? "#111" : isExam ? `${c.border}15` : c.bg,
              border: `1px solid ${isDone ? "#222" : isExam ? c.border : c.border + "33"}`,
              borderLeft: `3px solid ${isDone ? "#333" : c.border}`,
              borderRadius: "8px", padding: "0.85rem 1rem",
              display: "grid", gridTemplateColumns: "28px 100px 1fr auto",
              gap: "0.6rem", alignItems: "start",
              opacity: isDone ? 0.5 : 1, transition: "opacity 0.2s",
            }}>
              {/* Checkbox */}
              <div
                onClick={() => toggleCheck(d.day)}
                style={{
                  width: "18px", height: "18px", borderRadius: "4px", marginTop: "2px",
                  border: `1.5px solid ${isDone ? c.border : "#444"}`,
                  background: isDone ? `${c.border}33` : "transparent",
                  cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0, transition: "all 0.15s",
                }}
              >
                {isDone && <span style={{ color: c.border, fontSize: "11px", lineHeight: 1 }}>✓</span>}
              </div>

              {/* Date + code */}
              <div>
                <div style={{ fontSize: "0.7rem", color: isDone ? "#444" : c.text, fontWeight: 500, marginBottom: "0.15rem" }}>{d.day}</div>
                <div style={{
                  display: "inline-block", background: `${c.border}22`, color: isDone ? "#444" : c.text,
                  fontSize: "0.6rem", padding: "0.15rem 0.4rem", borderRadius: "3px", letterSpacing: "0.05em", marginBottom: "0.3rem",
                }}>
                  {d.phase === "BUFFER" ? "BUFFER" : d.phase}
                </div>
                <div style={{ fontSize: "0.65rem", color: "#444" }}>~{d.hours}h</div>
              </div>

              {/* Tasks */}
              <div>
                {d.tasks.map((t, j) => (
                  <div key={j} style={{ fontSize: "0.78rem", color: isDone ? "#444" : isExam ? c.text : "#d1d5db", marginBottom: "0.2rem", display: "flex", gap: "0.4rem" }}>
                    <span style={{ color: isDone ? "#333" : c.border, flexShrink: 0 }}>›</span>
                    <span style={{ textDecoration: isDone ? "line-through" : "none" }}>{t}</span>
                  </div>
                ))}
                {d.note && (
                  <div style={{ fontSize: "0.68rem", color: isDone ? "#333" : isExam ? c.text : "#9ca3af", marginTop: "0.35rem", fontStyle: isExam ? "normal" : "italic" }}>
                    {d.note}
                  </div>
                )}
                {hasNote && (
                  <div style={{ fontSize: "0.68rem", color: isDone ? "#333" : c.text, marginTop: "0.35rem", fontStyle: "italic", opacity: 0.8 }}>
                    📝 {notes[d.day].length > 60 ? notes[d.day].slice(0, 60) + "…" : notes[d.day]}
                  </div>
                )}
              </div>

              {/* Note button */}
              <button
                className="icon-btn"
                onClick={() => setModal(d.day)}
                title="Add note"
                style={{
                  background: hasNote ? `${c.border}22` : "transparent",
                  border: `1px solid ${hasNote ? c.border + "66" : "#2a2a2a"}`,
                  color: hasNote ? c.text : "#444",
                  borderRadius: "4px", padding: "0.25rem 0.4rem", fontSize: "0.7rem",
                  cursor: "pointer", opacity: 0.8, transition: "all 0.15s", flexShrink: 0,
                  marginTop: "2px",
                }}
              >
                📝
              </button>
            </div>
          );
        })}
      </div>

      <div style={{ maxWidth: 720, margin: "2rem auto 0", textAlign: "center", color: "#2a2a2a", fontSize: "0.7rem" }}>
        flex days = adjust freely around Marios / tutoring · this is a guide not a contract
      </div>
    </div>
  );
}