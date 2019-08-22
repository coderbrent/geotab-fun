import React, { useEffect, useState } from 'react';
import './App.css';
import API from 'mg-api-node'

function App() {
  const [vehicle, setVehicle] = useState('');
  const api = new API('brent@redbanklimo.com', 'Zsw0wers!', 'Redbanklimo')
  
  const login = () => {  
    api.authenticate((err, result) => {
      if(err) {
        console.log('Error', err);
        return;
      } else { 
        console.log(result)
      }
    })
  }

const getVehicleInfo = () => {
  api.call("Get", {
    typeName: "DeviceStatusInfo",
    resultsLimit: 10
}, function (statusInfos) {
    const coordinates = [];
    statusInfos.forEach(function (statusInfo) {
        coordinates.push({
            x: statusInfo.longitude,
            y: statusInfo.latitude
        });
    });
    api.call("GetAddresses", {
        coordinates: coordinates
    }, function (addressResults) {
        for (var i = 0; i < statusInfos.length; i++) {
            setVehicle({
                device: statusInfos[i].device,
                isDriving: statusInfos[i].isDriving,
                address: addressResults[i]
            });
        }
        console.log(vehicle);
    });
  
  });
}
  return (
    <div className="App">
      <button onClick={login}>Login</button>
      <button onClick={getVehicleInfo}>Get Vehicle Info</button>
    </div>
  );
}

export default App;
