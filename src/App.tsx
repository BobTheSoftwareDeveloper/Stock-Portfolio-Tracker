import React from 'react';
import './App.css';
import Header from './Components/Header'
import Footer from './Components/Footer'
import LoginForm from './Components/LoginForm'
import PortfolioPage from './Components/PortfolioPage'
import StockPage from './Components/StockPage'
import HomePage from './Components/HomePage'
import Settings from './Components/Settings'
import { useCookies } from 'react-cookie'
import socketIOClient from 'socket.io-client'

const backend: string = String(process.env.REACT_APP_BACKEND_URL)

interface IState {
  authenticated: boolean,
  tab: number,
  currentView: any,
  portfolioList: string | undefined,
  portfolio: [{}]
}

const App = () => {
  const [tab, setTab] = React.useState<number>(localStorage.getItem("tab") !== null ? Number(localStorage.getItem("tab")) : 0)
  const [currentView, setCurrentView] = React.useState<any>("")
  const [cookies, setCookie, removeCookie] = useCookies(['SESSION_ID'])
  const [socket, setSocket] = React.useState<any>(socketIOClient(backend))
  const [count, setCount] = React.useState<number>(0)

  React.useEffect(() => {
    if (cookies["SESSION_ID"] !== undefined) {
      socket.emit("SESSION_ID", cookies["SESSION_ID"])
    }
  }, [])

  React.useEffect(() => {
    const newValue = localStorage.getItem("tab") !== null ? Number(localStorage.getItem("tab")) : 0
    changeTab(null, newValue)
  }, [])

  const changeTab = (event: any, newValue: number) => {
    localStorage.setItem("tab", newValue.toString())

    if (cookies["SESSION_ID"] !== undefined) {
      switch (newValue) {
        case 0:
          setCurrentView(<HomePage socket={socket} />)
          break;
        case 1:
          setCurrentView(<PortfolioPage socket={socket}/>)
          break;
        case 2:
          setCurrentView(<StockPage />)
          break;
        case 3:
          setCurrentView(<Settings />)
          break
      }
    }

    setTab(newValue)
  }

  if (cookies["SESSION_ID"] !== undefined) {
    // login successful
    return (
      <div className="App">
        <Header />
        {currentView}
        <Footer tab={tab} setTab={changeTab} />
      </div>
    )
  } else {
    // need to login
    return (
      <div className="App">
        <Header />
        <LoginForm />
        <Footer tab={tab} setTab={changeTab} />
      </div>
    );
  }
}
export default App;
