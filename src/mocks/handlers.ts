// src/mocks/handlers.js
import { rest } from 'msw'

export const handlers = [
  rest.get('https://finnhub.io/api/v1/search', (req, res, ctx) => {
    return res(
      // Respond with a 200 status code
      ctx.status(200),
      ctx.json({result: [{
        description: "GENPACT LTD",
        displaySymbol: "G",
        symbol: "G",
        type: "Common Stock"
      }
    ]})
    )
  }),
  rest.get('https://finnhub.io/api/v1/quote', (req, res, ctx) => {

    return res(
      // Respond with a 200 status code
      ctx.status(200),
      ctx.json([{
        data: {
          c: 142.87,
          d: 0.29,
          dp: 0.2034,
          h: 144.46,
          l: 141.5,
          o: 144,
          pc: 142.58,
          t: 1678222802
        },
        symbol: 'GOOGL'
      }])
    )
  }),
  rest.get('https://finnhub.io/api/v1/stock/profile2', (req, res, ctx) => {

    return res(
      // Respond with a 200 status code
      ctx.status(200),
      ctx.json({
        country: "US",
        currency: "USD",
        estimateCurrency: "USD",
        exchange: "NASDAQ NMS - GLOBAL MARKET",
        finnhubIndustry: "Media",
        ipo: "2004-08-19",
        logo: "https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/GOOG.svg",
        marketCapitalization: 1232589.873508846,
        name: "Alphabet Inc",
        phone: "16502530000.0",
        shareOutstanding: 12807,
        ticker: "GOOGL",
        weburl: "https://abc.xyz/"
      })
    )
  })
]