import React from 'react'
import { Typography, createMuiTheme } from '@material-ui/core'
import CanvasJSReact from '../assests/canvasjs.react'
import axios from 'axios'
import Loading from './Loading'

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

type IStatePortfolio = {
  [portfolioId: number]: {
    accountId: number
    quantity: number,
    stockId: number
  }
}

type IStateStock = {
  [stockId: number]: {
    stockName: string,
    stockTicker: string
  }
}

const theme = createMuiTheme();

const HomePage = () => {
  const [portfolioArray, setPortfolioArray] = React.useState<IStatePortfolio>({})
  const [stockArray, setStockArray] = React.useState<IStateStock>({})
  const [check, setCheck] = React.useState<boolean>(false)

  React.useEffect(() => {
    axios
      .post("https://stockportfoliotrackerapi.azurewebsites.net/api/login", {
        username: localStorage.getItem("username"),
        password: localStorage.getItem("password")
      })
      .then((res) => {
        var list = ""
        Object.keys(res.data).map((currentValue) => {
          const key = Number(currentValue)
          list += res.data[key] + ","
        })
        localStorage.setItem("portfolioList", list)
        setCheck(true)
      })
      .catch((error) => {console.log(error.response)})
  }, [])

  React.useEffect(() => {
    var newObj = {}
    axios
      .get("https://stockportfoliotrackerapi.azurewebsites.net/api/portfolio")
      .then(res => {
        Object.keys(res.data).map((currentValue: string, index: number) => {
          newObj = {
            ...newObj,
            [res.data[currentValue].portfolioId]: {
              accountId: res.data[currentValue].accountId,
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


  var items: any = "";

  if (Object.keys(portfolioArray).length !== 0 && Object.keys(stockArray).length !== 0 && check) {
    
    // data options for the graph
    var dataP: {y: number, label: string}[] = []

    var options = {
      animationEnabled: true,
      title: {
        text: ""
      },
      data: [{
        type: "pie",
        startAngle: 75,
        toolTipContent: "<b>{label}</b>: {y}%",
        showInLegend: "true",
        legendText: "{label}",
        indexLabelFontSize: 16,
        indexLabel: "{label} - {y}%",
        dataPoints: dataP
      }]
    }

    var stockData: any = new Map()
    const portfolioList = localStorage.getItem("portfolioList")?.split(",")
    var total: number = 0
    
    console.log("portfolio arr", portfolioArray)
    console.log("stock arr", stockArray)
    portfolioList?.forEach((currentValue: string) => {
      console.log("logging", currentValue)
      if (currentValue === "") {
        return 
      }

      const currentNumber: number = Number(currentValue)
      const stockTicker: string = stockArray[portfolioArray[currentNumber].stockId].stockTicker
      const quantity: number = Number(portfolioArray[currentNumber].quantity)
      total += quantity

      if (stockData.has(stockTicker)) {
        // key exist
        stockData.set(stockTicker, stockData.get(stockTicker) + quantity)
      } else {
        stockData.set(stockTicker, quantity)
      }
    })

    console.log("stock data", stockData)
    console.log("total", total)
    stockData.forEach((value: number, key: string) => {
      const percentage: number = Number(Number((value / total) * 100).toFixed(2))
      dataP.push({
        y: percentage,
        label: key
      })
    })

    items = 
      <div style={{marginTop: 30, marginBottom: theme.spacing(10)}}>
        <CanvasJSChart options={options} />
      </div>
  } else {
    items = 
      <React.Fragment>
        {/* <br /><p>Loading...</p> */}
        <br />
        <Loading />
      </React.Fragment>
  }
  
  return (
    <React.Fragment>
      <Typography component="h1" variant="h5" style={{ marginTop: theme.spacing(2), fontWeight: 600 }}>
        Portfolio Overview
      </Typography>
      {items}
    </React.Fragment>
  )
}

export default HomePage