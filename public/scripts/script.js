$startDate = document.getElementById("start");
$endDate = document.getElementById("end");


let date = new Date();
let oldDate = new Date(date-1000*60*60*24*30);
let today = date.toISOString().slice(0,10);
let lastMonth = oldDate.toISOString().slice(0,10);
$endDate.value = today;
$startDate.value = lastMonth;

$startDate.addEventListener('change', event => {
  const start = $startDate.value;
  const end = $endDate.value;
  getBPI(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}`)
})

$endDate.addEventListener('change', event => {
  const start = $startDate.value;
  const end = $endDate.value;
  getBPI(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}`)
})

function getBPI(url = 'http://api.coindesk.com/v1/bpi/historical/close.json') {
  axios.get(url)
    .then(response => {
      // console.log(response);
      const BPIarray = response.data.bpi;
      const dateArray = Object.keys(BPIarray);
      const priceArray = dateArray.map(date => BPIarray[date]);

      // Create the chart
      var ctx = document.getElementById('myChart').getContext('2d');
      var myChart = new Chart(ctx, {
          type: 'line',
          data: {
              labels: dateArray, // This is where the coinbase date values go
              datasets: [{
                  label: 'BTC closing price (USD)',
                  data: priceArray, // This is where the coinbase money values
                  backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                  ],
                  borderColor: [
                      'rgba(255, 99, 132, 1)',
                  ],
                  borderWidth: 1
              }]
          },
          options: {
          }
      });
    })
    .catch(err => {
      console.log(err);
    });
}

// get info from coinbase API
getBPI();