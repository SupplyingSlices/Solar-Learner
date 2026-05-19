import { useState, useCallback } from 'react'

const STORAGE_KEY = 'fti-solar-progress'

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function saveProgress(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    // storage unavailable
  }
}

export function useProgress() {
  const [progress, setProgress] = useState(() => loadProgress())

  const markVisited = useCallback((topicId) => {
    setProgress((prev) => {
      if (prev[topicId]?.visited) return prev
      const next = {
        ...prev,
        [topicId]: { ...prev[topicId], visited: true },
      }
      saveProgress(next)
      return next
    })
  }, [])

  const recordQuizResult = useCallback((topicId, score, total, passed) => {
    setProgress((prev) => {
      const next = {
        ...prev,
        [topicId]: {
          ...prev[topicId],
          visited: true,
          quizScore: score,
          quizTotal: total,
          quizPassed: passed,
        },
      }
      saveProgress(next)
      return next
    })
  }, [])

  const markComplete = useCallback((topicId) => {
    setProgress((prev) => {
      if (!prev[topicId]?.quizPassed) return prev
      const next = {
        ...prev,
        [topicId]: { ...prev[topicId], complete: true },
      }
      saveProgress(next)
      return next
    })
  }, [])

  const getTopicStatus = useCallback(
    (topicId) => {
      const t = progress[topicId]
      if (!t || !t.visited) return 'not-started'
      if (t.complete) return 'complete'
      return 'in-progress'
    },
    [progress]
  )

  return { progress, markVisited, recordQuizResult, markComplete, getTopicStatus }
}
