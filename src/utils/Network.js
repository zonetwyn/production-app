const ENDPOINT = 'http://192.168.206.167:3000/api';

const Routes = {
  TRADERS: ENDPOINT + '/Trader',
  FACTORIES: ENDPOINT + '/Factory',
  FARMERS: ENDPOINT + '/Farmer',
  MARKETS: ENDPOINT + '/Market',
  CUSTOMERS: ENDPOINT + '/Customer',
  GENERATE_SEEDS: ENDPOINT + '/GenerateSeed',
  TRADE_SEEDS: ENDPOINT + '/TradeSeed',
  HARVEST: ENDPOINT + '/Harvest',
  TRADE_BEANS: ENDPOINT + '/TradeBean',
  TRANSFORMATION: ENDPOINT + '/Transformation',
  PRODUCT: ENDPOINT + '/Product',
  STOCK: ENDPOINT + '/Stock',
  TRADE_PRODUCTS: ENDPOINT + '/TradeProduct',
  PROCESS_ORDER: ENDPOINT + '/ProcessOrder',
  ORDERS: ENDPOINT + '/Order',
}

export default Routes;