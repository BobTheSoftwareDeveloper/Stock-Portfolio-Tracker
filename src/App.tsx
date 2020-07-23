import React from 'react';
import './App.css';
import Header from './Components/Header'
import Footer from './Components/Footer'
import LoginForm from './Components/LoginForm'
import PortfolioPage from './Components/PortfolioPage'
import StockPage from './Components/StockPage'

interface IState {
  authenticated: boolean,
  tab: number,
  currentView: any,
  portfolioList: string | undefined,
  portfolio: [{}]
}

class App extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props)
    this.state = ({
      authenticated: localStorage.getItem("authenticated") === "true" ? true : false,
      tab: localStorage.getItem("tab") !== null ? Number(localStorage.getItem("tab")) : 0,
      currentView: "Default text",
      portfolioList: localStorage.getItem("portfolioList") !== "" ? localStorage.getItem("portfolioList")?.toString() : "",
      portfolio: [{}]
    })
  }

  componentDidMount() {
    const newValue = localStorage.getItem("tab") !== null ? Number(localStorage.getItem("tab")) : 0
    if (this.state.authenticated) {
      switch (newValue) {
        case 0:
          this.setState({
            currentView: "Home PPPPAGE"
          })
          break;
        case 1:
          this.setState({
            currentView: <PortfolioPage />
          })
          break;
        case 2:
          this.setState({
            currentView: <StockPage />
          })
          break;
      }
    }
  }

  render() {
    const portfolio = this.state.portfolio

    const updatePortfolio = (portfolio: [{}]) => {
      this.setState({
        portfolio: portfolio
      })
    }

    const changeTab = (event: React.ChangeEvent<{}>, newValue: number) => {
      this.setState({
        tab: newValue
      })

      localStorage.setItem("tab", newValue.toString())

      if (this.state.authenticated) {
        switch (newValue) {
          case 0:
            this.setState({
              currentView: "Home PPPPAGE"
            })
            break;
          case 1:
            this.setState({
              currentView: <PortfolioPage />
            })
            break;
          case 2:
            this.setState({
              currentView: <StockPage />
            })
            break;
        }
      }
    }
    

    if (this.state.authenticated) {
      // login successful
      return (
        <div className="App">
          <Header />
          {this.state.currentView}
          <Footer tab={this.state.tab} changeTab={changeTab} />
        </div>
      )
    } else {
      // need to login
      return (
        <div className="App">
          <Header />
          <LoginForm portfolio={this.state.portfolioList} />
          <Footer tab={this.state.tab} changeTab={changeTab} />
        </div>
      );
    }
  }
}

export default App;
