import { useState } from 'react'
import styles from './QuizModule.module.css'

export default function QuizModule({ questions, onPass, alreadyPassed, initialScore }) {
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState({})
  const [done, setDone] = useState(alreadyPassed || false)
  const [finalScore, setFinalScore] = useState(alreadyPassed ? initialScore : null)

  const allAnswered = questions.every((_, i) => answers[i] !== undefined)

  const handleSelect = (qIndex, optIndex) => {
    if (submitted[qIndex] || done) return
    setAnswers((prev) => ({ ...prev, [qIndex]: optIndex }))
  }

  const handleSubmitQuestion = (qIndex) => {
    if (answers[qIndex] === undefined || submitted[qIndex]) return
    const newSubmitted = { ...submitted, [qIndex]: true }
    setSubmitted(newSubmitted)

    const allNowSubmitted = questions.every((_, i) => newSubmitted[i])
    if (allNowSubmitted) {
      const score = questions.filter((q, i) => answers[i] === q.answer).length
      const passed = score >= Math.ceil(questions.length * 0.5)
      setFinalScore(score)
      setDone(true)
      onPass(score, questions.length, passed)
    }
  }

  const handleFinish = () => {
    const score = questions.filter((q, i) => answers[i] === q.answer).length
    const passed = score >= Math.ceil(questions.length * 0.5)
    // Mark all questions as submitted so feedback shows
    const allSub = {}
    questions.forEach((_, i) => { allSub[i] = true })
    setSubmitted(allSub)
    setFinalScore(score)
    setDone(true)
    onPass(score, questions.length, passed)
  }

  const handleRetry = () => {
    setAnswers({})
    setSubmitted({})
    setDone(false)
    setFinalScore(null)
  }

  const passed = finalScore !== null && finalScore >= Math.ceil(questions.length * 0.5)

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>Knowledge Check</h2>

      {done && finalScore !== null && (
        <div className={`${styles.result} ${passed ? styles.pass : styles.fail}`}>
          <strong>{passed ? '✓ Passed' : '✗ Not quite'}</strong>
          &nbsp;— You answered {finalScore} of {questions.length} correctly.
          {passed && (
            <span className={styles.passNote}> This topic has been marked as complete.</span>
          )}
          {!passed && (
            <span className={styles.retryNote}> Review the lesson above and try again.</span>
          )}
        </div>
      )}

      <div className={styles.questions}>
        {questions.map((q, qi) => {
          const isSubmitted = submitted[qi] || false
          const selected = answers[qi]
          const correct = q.answer
          const isCorrect = selected === correct

          return (
            <div key={qi} className={styles.question}>
              <p className={styles.qText}>
                <span className={styles.qNum}>{qi + 1}.</span> {q.question}
              </p>
              <div className={styles.options}>
                {q.options.map((opt, oi) => {
                  let optClass = styles.option
                  if (isSubmitted) {
                    if (oi === correct) optClass += ` ${styles.correct}`
                    else if (oi === selected && !isCorrect) optClass += ` ${styles.wrong}`
                  } else if (selected === oi) {
                    optClass += ` ${styles.selected}`
                  }
                  return (
                    <button
                      key={oi}
                      className={optClass}
                      onClick={() => handleSelect(qi, oi)}
                      disabled={isSubmitted || done}
                    >
                      <span className={styles.optLetter}>{String.fromCharCode(65 + oi)}</span>
                      {opt}
                    </button>
                  )
                })}
              </div>
              {isSubmitted && (
                <p className={styles.explanation}>
                  <span className={styles.expLabel}>Explanation: </span>
                  {q.explanation}
                </p>
              )}
              {!isSubmitted && !done && (
                <button
                  className={styles.submitQ}
                  onClick={() => handleSubmitQuestion(qi)}
                  disabled={answers[qi] === undefined}
                >
                  Submit Answer
                </button>
              )}
            </div>
          )
        })}
      </div>

      {!done && !alreadyPassed && (
        <div className={styles.finishRow}>
          <button
            className={styles.finishBtn}
            onClick={handleFinish}
            disabled={!allAnswered}
            title={!allAnswered ? 'Answer all questions before submitting' : undefined}
          >
            Submit Quiz
          </button>
          {!allAnswered && (
            <p className={styles.finishHint}>
              Answer all {questions.length} questions to submit.
            </p>
          )}
        </div>
      )}

      {done && !passed && !alreadyPassed && (
        <div className={styles.retryRow}>
          <button className={styles.retryBtn} onClick={handleRetry}>
            Try Again
          </button>
        </div>
      )}
    </div>
  )
}
