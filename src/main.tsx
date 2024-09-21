import React from 'react'
import ReactDOM from 'react-dom/client'
import { YTE } from './pages/YTE'

import 'modern-normalize'
import './global.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <YTE />
  </React.StrictMode>,
)
