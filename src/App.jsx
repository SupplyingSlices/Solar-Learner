import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import TopicPage from './pages/TopicPage'
import SourcesPage from './pages/SourcesPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/topics/:topicId" element={<TopicPage />} />
        <Route path="/sources" element={<SourcesPage />} />
      </Routes>
    </BrowserRouter>
  )
}
