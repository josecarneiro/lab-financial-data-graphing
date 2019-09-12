
const data2=[];
const data3=[];

//corredct the data

function organize(data2){
  //count the ,
  
  for(let i=0;i<data2.length;i++){
    
  }
}


axios.get('http://api.coindesk.com/v1/bpi/historical/close.json')
  .then(function (response) {
    console.log(response);
    data2.push(response.data.bpi)
    console.log(data2[0])
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });
