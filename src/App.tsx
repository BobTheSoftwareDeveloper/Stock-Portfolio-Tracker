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
  currentView: any
}

class App extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props)
    this.state = ({
      authenticated: localStorage.getItem("authenticated") === "true" ? true : false,
      tab: 0,
      currentView: "Default text"
    })
  }

  render() {
    const changeTab = (event: React.ChangeEvent<{}>, newValue: number) => {
      console.log("change tab", newValue)
      this.setState({
        tab: newValue
      })

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
          <LoginForm />
          <Footer tab={this.state.tab} changeTab={changeTab} />
        </div>
      );
    }
  }
}

export default App;
