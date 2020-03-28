let api_key = ''
let d_name = ''
let base_url = 'https://cloud.boltiot.com/remote/' + api_key

function setKey(key, device_name) {
   api_key = key
   d_name = device_name
   base_url = 'https://cloud.boltiot.com/remote/' + api_key
}

async function digitalWrite(pin, value, device_name = d_name) {
   let response = await fetch(
      base_url +
         '/digitalWrite?pin=' +
         pin +
         '&state=' +
         (value ? 'HIGH' : 'LOW') +
         '&deviceName=' +
         device_name
   )
   if (response.ok) {
      let obj = await response.json()
      if (obj.success === '1') {
         return value
      } else {
         return Promise.reject({
            name: obj.value,
            message: 'digitalWrite operation failed'
         })
      }
   } else {
      return Promise.reject({
         name: response.status,
         message: response.statusText
      })
   }
}

async function digitalMultiWrite(pins, values, device_name = d_name) {
   let response = await fetch(
      base_url +
         '/digitalMultiWrite?pins=' +
         pins.join() +
         '&states=' +
         values.map(elem => (elem === 1 ? 'HIGH' : 'LOW')).join() +
         '&deviceName=' +
         device_name
   )
   if (response.ok) {
      let obj = await response.json()
      if (obj.success === '1') {
         return values
      } else {
         return Promise.reject({
            name: obj.value,
            message: 'digitalMultiWrite operation failed'
         })
      }
   } else {
      return Promise.reject({
         name: response.status,
         message: response.statusText
      })
   }
}

async function digitalRead(pin, device_name = d_name) {
   let response = await fetch(
      base_url + '/digitalRead?pin=' + pin + '&deviceName=' + device_name
   )
   if (response.ok) {
      let obj = await response.json()
      if (obj.success === '1') {
         return obj.value
      } else {
         return Promise.reject({
            name: obj.value,
            message: 'digitalRead operation failed'
         })
      }
   } else {
      return Promise.reject({
         name: response.status,
         message: response.statusText
      })
   }
}

async function digitalMultiRead(pins, device_name = d_name) {
   let response = await fetch(
      base_url +
         '/digitalMultiRead?pins=' +
         pins.join() +
         '&deviceName=' +
         device_name
   )
   if (response.ok) {
      let obj = await response.json()
      if (obj.success === '1') {
         return obj.value.split(',')
      } else {
         return Promise.reject({
            name: obj.value,
            message: 'digitalMultiRead operation failed'
         })
      }
   } else {
      return Promise.reject({
         name: response.status,
         message: response.statusText
      })
   }
}

async function analogWrite(pin, value, device_name = d_name) {
   let response = await fetch(
      base_url +
         '/analogWrite?pin=' +
         pin +
         '&value=' +
         value +
         '&deviceName=' +
         device_name
   )
   if (response.ok) {
      let obj = await response.json()
      if (obj.success === '1') {
         return obj.value
      } else {
         return Promise.reject({
            name: obj.value,
            message: 'analogWrite operation failed'
         })
      }
   } else {
      return Promise.reject({
         name: response.status,
         message: response.statusText
      })
   }
}

async function analogMultiWrite(pins, values, device_name = d_name) {
   let response = await fetch(
      base_url +
         '/analogMultiWrite?pins=' +
         pins.join() +
         '&values=' +
         values.join() +
         '&deviceName=' +
         device_name
   )
   if (response.ok) {
      let obj = await response.json()
      if (obj.success === '1') {
         return values
      } else {
         return Promise.reject({
            name: obj.value,
            message: 'analogMultiWrite operation failed'
         })
      }
   } else {
      return Promise.reject({
         name: response.status,
         message: response.statusText
      })
   }
}

async function analogRead(pin = 'A0', device_name = d_name) {
   let response = await fetch(
      base_url + '/analogRead?pin=' + pin + '&deviceName=' + device_name
   )
   if (response.ok) {
      let obj = await response.json()
      if (obj.success === '1') {
         return obj.value
      } else {
         return Promise.reject({
            name: obj.value,
            message: 'analogRead operation failed'
         })
      }
   } else {
      return Promise.reject({
         name: response.status,
         message: response.statusText
      })
   }
}

async function servoWrite(pin, value, device_name = d_name) {
   let response = await fetch(
      base_url +
         '/servoWrite?pin=' +
         pin +
         '&value=' +
         value +
         '&deviceName=' +
         device_name
   )
   if (response.ok) {
      let obj = await response.json()
      if (obj.success === '1') {
         return value
      } else {
         return Promise.reject({
            name: obj.value,
            message: 'servoWrite operation failed'
         })
      }
   } else {
      return Promise.reject({
         name: response.status,
         message: response.statusText
      })
   }
}

async function servoMultiWrite(pins, values, device_name = d_name) {
   let response = await fetch(
      base_url +
         '/servoMultiWrite?pins=' +
         pins.join() +
         '&values=' +
         values.join() +
         '&deviceName=' +
         device_name
   )
   if (response.ok) {
      let obj = await response.json()
      if (obj.success === '1') {
         return values
      } else {
         return Promise.reject({
            name: obj.value,
            message: 'servoMultiWrite operation failed'
         })
      }
   } else {
      return Promise.reject({
         name: response.status,
         message: response.statusText
      })
   }
}

async function serialBegin(baud, device_name = d_name) {
   let response = await fetch(
      base_url + '/serialBegin?baud=' + baud + '&deviceName=' + device_name
   )
   if (response.ok) {
      let obj = await response.json()
      if (obj.success === '1') {
         return baud
      } else {
         return Promise.reject({
            name: obj.value,
            message: 'serialBegin operation failed'
         })
      }
   } else {
      return Promise.reject({
         name: response.status,
         message: response.statusText
      })
   }
}

async function serialWrite(data, device_name = d_name) {
   let response = await fetch(
      base_url + '/serialWrite?data=' + data + '&deviceName=' + device_name
   )
   if (response.ok) {
      let obj = await response.json()
      if (obj.success === '1') {
         return data
      } else {
         return Promise.reject({
            name: obj.value,
            message: 'serialWrite operation failed'
         })
      }
   } else {
      return Promise.reject({
         name: response.status,
         message: response.statusText
      })
   }
}

async function serialRead(till, device_name = d_name) {
   let response = await fetch(
      base_url + '/serialRead?till=' + till + '&deviceName=' + device_name
   )
   if (response.ok) {
      let obj = await response.json()
      if (obj.success === '1') {
         return obj.value
      } else {
         return Promise.reject({
            name: obj.value,
            message: 'serialRead operation failed'
         })
      }
   } else {
      return Promise.reject({
         name: response.status,
         message: response.statusText
      })
   }
}

async function serialWR(data, till, device_name = d_name) {
   let response = await fetch(
      base_url +
         '/serialWR?data=' +
         data +
         '&till=' +
         till +
         '&deviceName=' +
         device_name
   )
   if (response.ok) {
      let obj = await response.json()
      if (obj.success === '1') {
         return obj.value
      } else {
         return Promise.reject({
            name: obj.value,
            message: 'serialWR operation failed'
         })
      }
   } else {
      return Promise.reject({
         name: response.status,
         message: response.statusText
      })
   }
}

async function fetchData(device_name = d_name) {
   let response = await fetch(base_url + '/fetchData?deviceName=' + device_name)
   if (response.ok) {
      let obj = await response.json()
      if (obj.success === '1') {
         return { data_format: obj.data_format, data: obj.data }
      } else {
         return Promise.reject({
            name: obj.value,
            message: 'fetchData operation failed'
         })
      }
   } else {
      return Promise.reject({
         name: response.status,
         message: response.statusText
      })
   }
}

async function version(device_name = d_name) {
   let response = await fetch(base_url + '/version?deviceName=' + device_name)
   if (response.ok) {
      let obj = await response.json()
      if (obj.success === '1') {
         return JSON.parse(obj.value)
      } else {
         return Promise.reject({
            name: obj.value,
            message: 'version operation failed'
         })
      }
   } else {
      return Promise.reject({
         name: response.status,
         message: response.statusText
      })
   }
}

async function restart(device_name = d_name) {
   let response = await fetch(base_url + '/restart?deviceName=' + device_name)
   if (response.ok) {
      let obj = await response.json()
      if (obj.success === '1') {
         return obj.value
      } else {
         return Promise.reject({
            name: obj.value,
            message: 'restart operation failed'
         })
      }
   } else {
      return Promise.reject({
         name: response.status,
         message: response.statusText
      })
   }
}

async function isOnline(device_name = d_name) {
   let response = await fetch(base_url + '/isOnline?deviceName=' + device_name)
   if (response.ok) {
      let obj = await response.json()
      if (obj.success === '1') {
         return { value: obj.value, time: obj.time }
      } else {
         return Promise.reject({
            name: obj.value,
            message: 'isOnline operation failed'
         })
      }
   } else {
      return Promise.reject({
         name: response.status,
         message: response.statusText
      })
   }
}
