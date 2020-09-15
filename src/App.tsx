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
  const [authenticated, setAuthenticated] = React.useState(false)

  React.useEffect(() => {
    const newValue = localStorage.getItem("tab") !== null ? Number(localStorage.getItem("tab")) : 0
    if (cookies["SESSION_ID"] !== undefined) {
      switch (newValue) {
        case 0:
          setCurrentView(<HomePage />)
          break;
        case 1:
          setCurrentView(<PortfolioPage />)
          break;
        case 2:
          setCurrentView(<StockPage />)
          break;
        case 3:
          setCurrentView(<Settings />)
          break;
      }
    }
  }, [])

  const changeTab = (event: React.ChangeEvent<{}>, newValue: number) => {
    console.log("NNew tab:" + newValue)

    localStorage.setItem("tab", newValue.toString())

    if (cookies["SESSION_ID"] !== undefined) {
      switch (newValue) {
        case 0:
          setCurrentView(<HomePage />)
          break;
        case 1:
          setCurrentView(<PortfolioPage />)
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
