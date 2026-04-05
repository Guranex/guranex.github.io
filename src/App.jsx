import { HashRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { notes, posts, siteConfig } from './data/content.js'
import ExtraDetailPage from './pages/ExtraDetailPage.jsx'
import ExtraPage from './pages/ExtraPage.jsx'
import HomePage from './pages/HomePage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import WriteupDetailPage from './pages/WriteupDetailPage.jsx'
import WriteupsPage from './pages/WriteupsPage.jsx'

function App() {
  return (
    <ThemeProvider>
      <HashRouter>
        <Routes>
          <Route element={<Layout siteConfig={siteConfig} />}>
            <Route
              index
              element={<HomePage notes={notes} posts={posts} siteConfig={siteConfig} />}
            />
            <Route path="posts" element={<WriteupsPage posts={posts} />} />
            <Route path="posts/:slug" element={<WriteupDetailPage posts={posts} />} />
            <Route path="notes" element={<ExtraPage posts={notes} />} />
            <Route path="notes/:slug" element={<ExtraDetailPage posts={notes} />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </HashRouter>
    </ThemeProvider>
  )
}

export default App
