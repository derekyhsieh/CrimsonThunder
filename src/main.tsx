import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ChakraProvider } from "@chakra-ui/react"
import { BrowserRouter } from 'react-router-dom'
import { store } from "./app/store"
import { Provider } from "react-redux"
import {theme} from "../utils/theme"

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
)
