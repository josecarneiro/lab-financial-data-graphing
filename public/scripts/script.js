
window.addEventListener('load', () => {
  console.log('Ironmaker app started successfully!');
}, false);

console.log(axios);

$start=document.getElementById('satart');
$end=document.getElementById('end');



function getResult(url='http://api.coindesk.com/v1/bpi/historical/close.json'){
axios.get(url)
  .then(response=>{
    // console.log('API responded with: ', response);
    const BPIarray=response.data.bpi;
    const dateArray=Object.keys(BPIarray);
    const priceArray= dateArray.map(date=>BPIarray[date]);
    const start=document.getElementById('start');
    const end=document.getElementById('end');
    return ({dateArray,priceArray});
  })
  .then(({dateArray,priceArray})=>{
    var context= document.getElementById('myCanvas').getContext('2d');
    console.log(dateArray);
    var myChart = new Chart(context, {
      type: 'line',
      data: {
          labels: dateArray,
          datasets: [{
              label: '# of Votes',
              data: priceArray,
              backgroundColor: [
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
      }
  });
  })
  .catch(error=>{
    console.log('Error loading from API', error);
  })
}

getResult();
