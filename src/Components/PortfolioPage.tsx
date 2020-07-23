import React from 'react'
import axios from 'axios'

interface IStatePortfolio {
  [portfolioId: number]: {
    quantity: number,
    stockId: number
  }
}

interface IStateStock {
  [stockId: number]: {
    stockName: string,
    stockTicker: string
  }
}

const PortfolioPage = () => {
  const [portfolioArray, setPortfolioArray] = React.useState<IStatePortfolio>({})
  const [stockArray, setStockArray] = React.useState<IStateStock>({})

  React.useEffect(() => {
    var newObj = {}
    axios
      .get("https://stockportfoliotrackerapi.azurewebsites.net/api/portfolio")
      .then(res => {
        Object.keys(res.data).map((currentValue: string, index: number) => {
          newObj = {
            ...newObj,
            [res.data[currentValue].portfolioId]: {
              quantity: res.data[currentValue].quantity,
              stockId: res.data[currentValue].stockId
            }
          }
        })
        setPortfolioArray(newObj)
      })
  }, [])

  React.useEffect(() => {
    var newObj = {}
    axios
      .get("https://stockportfoliotrackerapi.azurewebsites.net/api/stock")
      .then(res => {
        Object.keys(res.data).map((currentNum: string, index: number) => {
          newObj = {
            ...newObj,
            [res.data[currentNum].stockId]: {
              stockName: res.data[currentNum].stockName,
              stockTicker: res.data[currentNum].stockTicker
            }
          }
        })
        setStockArray(newObj)
      })
  }, [])

  var items: any = [];

  // Check all objects are initialized
  if (Object.keys(stockArray).length !== 0 && Object.keys(portfolioArray).length !== 0) {

    // Objects initialized
    const userPortfolio = localStorage.getItem("portfolioList")?.split(",")
    // structure:
    // StockTicker   |   Quantity    |   Current Price    |    Total Value
    userPortfolio?.forEach((currentValue: string, index: number) => {
      const portId = Number(currentValue)
      const currentPrice: number = 4.32;
      items.push(
        <React.Fragment key={currentValue}>
          <div>
            <p>{stockArray[portfolioArray[portId].stockId].stockTicker}</p>
            <p>{portfolioArray[portId].quantity}</p>
            <p>{currentPrice}</p>
            <p>{currentPrice * portfolioArray[portId].quantity}</p>
          </div>
        </React.Fragment>
      )
    })
  } else {
    items.push(
      <p key={0}>Loading...</p>
    )
  }

  return (
    <React.Fragment>
      {items}
    </React.Fragment>
  )
}

export default PortfolioPage

// class PortfolioPage extends React.Component<any, any> {
//   constructor(props: any) {
//     super(props);
//   }

//   componentDidMount() {
//     this.GetStockList()
//   }

//   GetStockList() {

//     axios
//       .get("https://stockportfoliotrackerapi.azurewebsites.net/api/stock")
//       .then(response => console.log(response.data))
//   } 
  
//   render() {
//     return (
//       <h1>Portfolio</h1>
//     )
//   }
// }

// export default PortfolioPage