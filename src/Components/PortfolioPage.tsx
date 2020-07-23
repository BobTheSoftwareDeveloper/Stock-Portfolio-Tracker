import React from 'react'
import axios from 'axios'
import { LocalSeeOutlined, CallMergeOutlined } from '@material-ui/icons'


// const PortfolioTable = ( {portfolioList, portfolioArr, stockArr}: any) => {
//   var Items: any = [];

//   portfolioList?.map((currentVal: any) => {
//     console.log("mapping", portfolioArr)
//     Items.push(<h2>{currentVal}</h2>)
    
//   })

//   return (
//     {Items}
//   );
// }

// const PortfolioPage = () => {
//   // const [portfolioArr, setPortfolioArr] = React.useState<any>({})

//   React.useEffect(() => {
//     let stockArr: any = {} 

//     axios
//     .get("https://stockportfoliotrackerapi.azurewebsites.net/api/stock")
//     .then(response => {
//       console.log("called stock api")
//       response.data.map((currentValue: any) => {
//         stockArr = {
//           ...stockArr,
//           [currentValue.stockId]: currentValue
//         }
//       })
//     })

//     let portfolioArr: any = {}

//     axios
//     .get("https://stockportfoliotrackerapi.azurewebsites.net/api/portfolio")
//     .then(response => {
//       console.log("called portfolio api")
//       response.data.map((currentValue: any) => {
//         portfolioArr = {
//           ...portfolioArr,
//           [currentValue.portfolioId]: currentValue
//         }
//       })
//       // setPortfolioArr(portfolioArrTemp)
//     })

//     const portfolioList = localStorage.getItem("portfolioList")?.split(",")
//   })
  
//   // localStorage.setItem("stock", JSON.stringify(stockArr))

//   // console.log("new portfolio", portfolioArr)
//   // console.log("new stock", stockArr)

//   // let items
//   // if (portfolioArr) {
//   //   console.log("not empty")
//   // }

//   return (
//     <React.Fragment>
//       <h1>Portfolio page</h1>
//       {/* <PortfolioTable portfolioList={portfolioList} portfolioArr={portfolioArr} stockArr={stockArr} /> */}
//       <React.Fragment>
//         {/* {items} */}
//       </React.Fragment>
//     </React.Fragment>
//   )
// }

// export default PortfolioPage

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