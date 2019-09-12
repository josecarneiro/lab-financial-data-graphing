let ctx = document.getElementById("myChart").getContext("2d");
let $from = document.getElementById("from");
let $to = document.getElementById("to");
let $currency = document.getElementById("currency");

$from.value = "2019-01-01";
$to.value = new Date().toISOString().substr(0, 10);
$currency.value = "eur";

displayGraph(); // To display the graph the 1st time
$from.onchange = displayGraph; // To display graph with the from input is changed
$to.onchange = displayGraph;
$currency.onchange = displayGraph;

function displayGraph() {
  let baseUrl = "http://api.coindesk.com/v1/bpi/historical/close.json";
  let start = $from.value;
  let end = $to.value;
  let currency = $currency.value;
  axios
    .get(`${baseUrl}?start=${start}&end=${end}&currency=${currency}`)
    .then(response => {
      let dates = Object.keys(response.data.bpi);
      let values = Object.values(response.data.bpi); 
      console.log(response.data.bpi, dates, values);

      let chart = new Chart(ctx, {
        // The type of chart we want to create
        type: "line",

        // The data for our dataset
        data: {
          labels: dates,
          datasets: [
            {
              label: "Bitcoin",
              backgroundColor: "#425cbb22",
              borderColor: "#425cbb",
              data: values
            }
          ]
        },
        // Configuration options go here
        options: {}
      });
    });
}
