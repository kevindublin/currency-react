          {
            countries.map(country =>(
              <div>
                <div class="BarChart-bar" style="height: 100px">
                  <h1 class="BarChart--title">${country.currencyKey}</h1>
                  <p>${country.currencyExchange}</p> 
                </div>
              </div>
            ))
          }


