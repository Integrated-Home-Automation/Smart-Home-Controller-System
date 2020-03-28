let navLinks = document.querySelectorAll('a.a')
let burger = document.querySelector('.navbar-burger')
let lightButton = document.getElementById('lightButton')
let tvButton = document.getElementById('tvButton')
let fanRadio = document.querySelectorAll('input[name="fanRadio"]')
let tempDiv = document.getElementById('tempDiv')
let lightBg = document.querySelector('#LightsPage img')
let tvBg = document.querySelector('#TVPage img')
let lastFanId = 'fanRadio0'
let currentPage = 'HomePage'

let changePage = e => {
   let tempId = e.currentTarget.href.slice(
      e.currentTarget.href.indexOf('#') + 1
   )
   if (tempId === currentPage) {
      return false
   }
   document.getElementById(tempId).classList.remove('is-hidden')
   document.getElementById(currentPage).classList.add('is-hidden')
   currentPage = tempId
}

let lightClicks = async e => {
   try {
      let response = await digitalWrite(0, lightButton.checked)
   } catch (e) {
      lightButton.checked = !lightButton.checked
      alert(e.name + ' : ' + e.message)
   }
   if (lightButton.checked) {
      lightBg.src = './lighthouse.svg'
   } else {
      lightBg.src = './lighthouse_off.svg'
   }
}

let tvClicks = async e => {
   try {
      let response = await digitalWrite(2, tvButton.checked)
   } catch (e) {
      tvButton.checked = !tvButton.checked
      alert(e.name + ' : ' + e.message)
   }
   if (tvButton.checked) {
      tvBg.src = './monitor_on.svg'
   } else {
      tvBg.src = './monitor.svg'
   }
}
let myRadios = async e => {
   e.preventDefault()
   e.stopPropagation()
   if (e.currentTarget.id === lastFanId) {
      return false
   }
   try {
      let response = await analogWrite(1, e.currentTarget.value)
      e.currentTarget.checked = 1
      document
         .querySelector('#' + e.currentTarget.id + '+label')
         .classList.add('is-primary')
      document
         .querySelector('#' + lastFanId + '+label')
         .classList.remove('is-primary')
      lastFanId = e.currentTarget.id
   } catch (e) {
      alert(e.name + ' : ' + e.message)
   }
   if (lastFanId.slice(lastFanId.length - 1) > '0') {
      //last character
      document.querySelector('#FanPage svg').classList.add('fa-spin')
   } else {
      document.querySelector('#FanPage svg').classList.remove('fa-spin')
   }
}
let myTemp = async () => {
   try {
      let response = await analogRead('A0')
      tempDiv.innerText = ((parseInt(response) * 100) / 1023).toString() + '˚'
   } catch (e) {
      tempDiv.innerText = e.name + ' : ' + e.message
   }
}

let getLightsData = async () => {
   try {
      let response = await digitalRead(0)
      lightButton.checked = response
   } catch (e) {
      alert(e.name + ' : ' + e.message)
   }
}

let getTvData = async () => {
   try {
      let response = await digitalRead(2)
      tvButton.checked = response
   } catch (e) {
      alert(e.name + ' : ' + e.message)
   }
}

let burgerToggle = e => {
   let target = document.getElementById(e.currentTarget.dataset.target)
   e.currentTarget.classList.toggle('is-active')
   target.classList.toggle('is-active')
}

lightButton.checked = 0
tvButton.checked = 0
document.getElementById('fanRadio0').checked = 1
document.querySelector('#fanRadio0+label').classList.add('is-primary')
getLightsData()
getTvData()
tempDiv.innerHTML = '25˚'
myTemp()

lightButton.addEventListener('click', lightClicks)
tvButton.addEventListener('click', tvClicks)

for (let elem of fanRadio) {
   elem.addEventListener('click', myRadios)
}
setInterval(myTemp, 1000)

for (let link of navLinks) {
   link.addEventListener('click', changePage)
}

burger.addEventListener('click', burgerToggle)
