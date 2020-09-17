import requests
from bs4 import BeautifulSoup as bs4

#----
url = "http://localhost:4000/api/add-stock"
headers = {
  'Content-Type': 'application/json'
}

#----

page = requests.get("https://www.nzx.com/markets/NZSX")
source = page.content

soup = bs4(source, 'html.parser')

table = soup.find("table", "responsive-table")

rows = table.find_all("tr")

for row in rows:
    ticker = row.find("a")
    if ticker == None:
        continue
    ticker = ticker.text.strip()
    print(ticker)
    
    company_list = row.find_all("a")
    company_name = ""
    
    for name in company_list:
        if "companies" in name["href"]:
            company_name = name.text.strip()

    price = row.find("td", { "data-title": "Price" }).text.strip().replace("$", "")

    payload = "{\r\n    \"masterkey\": \"asdfRANDOMKEYSxXRTE4vGk9V!KKasF5dxks5N$pY7Vm\
9^xCFDTgy%cHfha^7@DeaPgNx783vKcAqRCLjWqcNKfC5#DBn9sijpj$kwyvcpnhFi@b2gne@W\",\r\n    \"ticker\": \
\"" + ticker + "\",\r\n    \"name\": \"" + company_name + "\",\r\n    \"price\": " + price + "\r\n}"

    response = requests.request("POST", url, headers=headers, data = payload)

    print(response.text.encode('utf8'))
    print("\n\n")

    


    
    
    
