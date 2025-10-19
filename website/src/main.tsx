import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './app/App'
import 'lexical-react-editor/styles/lexical-react-editor-e9xST51w.css'
import './index.css'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App/>
    </StrictMode>,
)
