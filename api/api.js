const api_path = {
    prod: "https://017f7126-a4e5-43f1-922b-acca3414140f.mock.pstmn.io/",
    php: "",
  };
  
  var api = {
    getUserData: async () => {
      var request= {
        method: 'userPro',
        by: ''
      }
      return get(request)
   },
   getCarerRelationbyPatientID:(id) =>{
     var request = {
      method:'getCarerRelationbyPatientID',
      by:'?id='+id
     };
     return get(request);
   }
    
  }
  
  async function get(request) {
    return fetch(api_path.prod + request.method + api_path.php + request.by, {
      method: "GET",
    }).then((response) => response.json());
  }
  
  async function post(request) {
    return fetch(api_path.prod + request.method + api_path.php, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request.params),
    }).then((response) => response.json());
  }
  
  async function put(request) {
    return fetch(api_path.prod + request.method + api_path.php + request.by, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request.params),
    }).then((response) => response.json());
  }
  
  module.exports = api;
  
