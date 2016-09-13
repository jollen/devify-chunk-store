# devify-chunk-store

IoT chunk store that is [abstract-chunk-store](https://github.com/mafintosh/abstract-chunk-store) compliant built using memory as the storage backend.

A use case of [*devify-server*](https://github.com/DevifyPlatform/devify-server).

## Quickstart

Install ```devify-chunk-store``` and start the server.

```
$ git clone https://github.com/jollen/devify-chunk-store
$ cd devify-chunk-store
$ npm install
$ export HOST=192.168.0.100
$ export PORT=8000
$ node store.js
```

The server is running at ```192.168.0.100:8000``` and provide the REST API ```coap://192.168.0.100:8000/object/12345678/send```. To send data to ```devify-chunk-store``` via CoAP, use the following message format.

```
{
	"index": 0,
	"chunk": "&lt;payload&gt;"
}
```

* *index*: the index of the chunk data
* *chunk*: the chunk data

The following examaple shows how to send sensor data to IoT server via CoAP using ESp8266/NodeMCU and Lua programming language.

```
-- Configure the ESP as a station (client)
wifi.setmode(wifi.STATION)  
wifi.sta.config("<SSID>", "<PASSWORD>")  
wifi.sta.autoconnect(1)

-- Create a CoAP client
cc = coap.Client()

-- Make a POST request
uri="coap://192.168.0.100:8000/object/12345678/send"

-- Setup a timer to send ADC data
tmr.alarm(0, 1000, 1, function() 
    buf = 
          "{" ..
          "index": 0 ..
          "\"chunk\":" ..
          adc.read(0) ..
          "}"
    
    cc:post(uri, buf)
    print(buf)
end)
```

## License

The [MIT License](http://www.opensource.org/licenses/MIT). See [LICENSE.md](LICENSE.md).
