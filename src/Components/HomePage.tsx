import React from 'react'
import ReactDOM from 'react-dom';
import { Typography, createMuiTheme, Button } from '@material-ui/core'
import CanvasJSReact from '../assests/canvasjs.react'
import axios from 'axios'
import Loading from './Loading'
import { useCookies } from 'react-cookie'
import StockAPI from './Utilities/StockAPI'
import PortfolioAPI from './Utilities/PortfolioAPI'
// import { Twitter, Facebook, Google, Pinterest, Reddit  } from 'react-social-sharing'
import { FacebookShareButton, FacebookIcon,
EmailShareButton, EmailIcon,
PinterestShareButton, PinterestIcon,
RedditShareButton, RedditIcon,
TwitterShareButton, TwitterIcon,
WhatsappShareButton, WhatsappIcon } from "react-share"

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const theme = createMuiTheme();

const HomePage = () => {
  const [portfolioArray, setPortfolioArray] = React.useState<any>([])
  const [stockArray, setStockArray] = React.useState<any>([])
  const [check, setCheck] = React.useState<boolean>(false)
  const [cookies, setCookie, removeCookie] = useCookies(['SESSION_ID'])
  const [count, setCount] = React.useState<number>(0)
  const canvasRef = React.createRef<any>()
  const websiteUrl: string = "https://stockportfoliotracker.azurewebsites.net/"

  React.useEffect(() => {
    const url: string = process.env.REACT_APP_BACKEND_URL + "api/check-session"
    axios
      .post(url, {
        session_id: cookies["SESSION_ID"]
      })
      .then((res) => {
        // valid
        return true
      })
      .catch((error) => {
        // invalid
        removeCookie("SESSION_ID")
        window.location.href = "/"
        return false
      })
  }, [])

  React.useEffect(() => {
    PortfolioAPI.get(cookies["SESSION_ID"])
      .then(response => {
        setPortfolioArray(response)
        setCheck(true)
      })
      .catch(err => {
        alert("Error: " + err)
      })
  }, [count])

  React.useEffect(() => {
    StockAPI.get(cookies["SESSION_ID"])
      .then(response => {
        setStockArray(response)
      })
      .catch(err => {
        alert("Error: " + err)
      })
  }, [count])


  var items: any = "";

  if (Object.keys(stockArray).length !== 0 && check) {

    if (Object.keys(portfolioArray).length === 0) {
      // empty
      items =
        <div style={{ marginTop: 30, marginBottom: theme.spacing(10) }}>
          <h2>No portfolio added yet.</h2>
        </div>
    } else {
      // data options for the graph
      var dataP: { y: number, label: string }[] = []

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
      var total: number = 0

      portfolioArray.forEach((currentValue: any) => {
        if (currentValue === "") {
          return
        }

        const stockTicker: string = currentValue.stock_ticker
        const quantity: number = currentValue.quantity
        total += quantity

        if (stockData.has(stockTicker)) {
          // key exist
          stockData.set(stockTicker, stockData.get(stockTicker) + quantity)
        } else {
          stockData.set(stockTicker, quantity)
        }
      })

      let shareText = "I am using Stock Portfolio Tracker and it's very cool!\n\nMy portfolio is currently:\n"

      stockData.forEach((value: number, key: string) => {
        const percentage: number = Number(Number((value / total) * 100).toFixed(2))
        shareText += key + " - " + percentage + "%\n"
        dataP.push({
          y: percentage,
          label: key
        })
      })

      shareText += "\nCome join me with the link below!"

      items =
        <>
          <div style={{ marginTop: 30, marginBottom: theme.spacing(6) }}>
            <CanvasJSChart options={options} />
          </div>
          <div style={{ width: '100%', height: 'auto' }}>
            <Typography variant="body1">Share my current portfolio:</Typography>
            <EmailShareButton url={websiteUrl} subject="Sharing an amazing website with you" body={shareText} style={{ marginLeft: 5, marginRight: 5}}>
              <EmailIcon size={32} round />
            </EmailShareButton>
            <FacebookShareButton url={websiteUrl} quote={shareText} style={{ marginLeft: 5, marginRight: 5}}>
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            <TwitterShareButton url={websiteUrl} title={`${shareText}`} style={{ marginLeft: 5, marginRight: 5}}>
              <TwitterIcon size={32} round />
            </TwitterShareButton>
            <RedditShareButton url={websiteUrl} title={shareText} style={{ marginLeft: 5, marginRight: 5}}>
              <RedditIcon size={32} round />
            </RedditShareButton>
            <PinterestShareButton url={websiteUrl} description={shareText} media={websiteUrl} style={{ marginLeft: 5, marginRight: 5}}>
              <PinterestIcon size={32} round />
            </PinterestShareButton>
            <WhatsappShareButton url={websiteUrl} title={shareText} style={{ marginLeft: 5, marginRight: 5}}>
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
          </div>
        </>
    }
  } else {
    items =
      <React.Fragment>
        {/* <br /><p>Loading...</p> */}
        <br />
        <Loading />
      </React.Fragment>
  }
  // console.log(document.getElementsByClassName("canvasjs-chart-canvas")[0].toDataURL("image/png", "1"))


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