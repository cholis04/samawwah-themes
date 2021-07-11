/* DESIGN BY SAMAWWAH.COM DESIGN BY SAMAWWAH.COM DESIGN BY SAMAWWAH.COM DESIGN BY SAMAWWAH.COM DESIGN BY SAMAWWAH.COM */
/* DESIGN BY SAMAWWAH.COM DESIGN BY SAMAWWAH.COM DESIGN BY SAMAWWAH.COM DESIGN BY SAMAWWAH.COM DESIGN BY SAMAWWAH.COM */

const scrollEvent = document.getElementById('scroll-to-event')
const accountNumber = document.getElementById('copy-accnum')
const alertBox = document.getElementById('wrapper-alert')
const openIn = document.getElementById('open-invitation')
const guestName = document.getElementById('guest-name')
const guestList = document.getElementById('guest-list')
const btnSend = document.getElementById('send-button')
const guestForm = document.forms['form-guestbook']
const btnAudio = document.getElementById('btn-audio')
const backSound = document.getElementById('backsound-1')
const inputGuestText = document.getElementsByClassName('input-guest')
const numChar = document.getElementById('num-char')
//DEMO CONST
const dateEvent1 = document.getElementById('date-event-1')
const dateEvent2 = document.getElementById('date-event-2')
const dayEvent1 = document.getElementById('day-event-1')
const dayEvent2 = document.getElementById('day-event-2')

//CONSTANT
const urlGS = '#'

// EVENT LOAD
window.addEventListener('load', (e) => {
  const params = new URLSearchParams(window.location.search)
  if (params.has('to')) {
    const guest = params.get('to')
    guestName.innerText = decodeURIComponent(guest.substring(0, 50))
    document.getElementById('nama').value = decodeURIComponent(
      guest.substring(0, 50)
    )
  } else {
    guestName.innerText = 'Nama Tamu'
  }

  //detectBrowser()
  initialCountdown()

  guestInitial()

  //scroll to event
  scrollEvent.addEventListener('click', (e) => {
    document.getElementById('opening').scrollIntoView(true)
  })

  //copy to clipboard
  accountNumber.addEventListener('click', async function () {
    let text = document.getElementById('no-rekening-1').innerText
    await navigator.clipboard.writeText(text)
    window.alert('Teks disalin!')
  })

  // disable right click
  document.getElementsByTagName('BODY')[0].addEventListener(
    'contextmenu',
    (e) => {
      e.preventDefault()
    },
    false
  )

  openIn.addEventListener('click', () => {
    //AUDIO
    // Sound Effect
    let audio = document.getElementById('audio-flip')
    audio.play()
    // Music
    backSound.loop = true
    backSound.volume = 0.6
    backSound.play()
    //AUDIO
    document.getElementById('above-section').classList.add('above-swipe-out')
    document.getElementById('bottom-section').classList.add('bottom-flip-out')

    setTimeout(function () {
      document.documentElement.style.setProperty('--body-overflow', 'auto')
    }, 1000)

    setTimeout(function () {
      document.getElementById('modal-welcome').style.display = 'none'
      audio.pause()
    }, 2000)
  })

  for (let i = 0; i < inputGuestText.length; i++) {
    inputGuestText[i].addEventListener('keyup', limitChar)
    inputGuestText[i].addEventListener('change', limitChar)
  }

  guestForm.addEventListener('submit', (e) => {
    e.preventDefault()

    btnSend.disabled = true
    btnSend.value = 'Mengirim ... '

    // fetch(urlGS, { method: 'POST', body: new FormData(guestForm) })
    //   .then((res) => {
    //     dataSubmited()
    //   })
    //   .catch((error) => window.alert('Terjadi Kesalahan'))

    //DEMO

    dataSubmited()
  })

  // Prevent Default CTRL + U
  document.addEventListener('keydown', function (event) {
    // CTRL + U combo
    if (event.ctrlKey && event.key === 'u') {
      event.preventDefault()
      return false
    }
    if (event.key === 'F12') {
      event.preventDefault()
      return false
    }
  })

  btnAudio.addEventListener('click', () => {
    if (backSound.paused && backSound.currentTime > 0 && !backSound.ended) {
      backSound.play()
      btnAudio.setAttribute('src', './images/Icons/pause.png')
    } else {
      backSound.pause()
      btnAudio.setAttribute('src', './images/Icons/play.png')
    }
  })

  // DEMO DATE
  const months = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember'
  ]
  const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu']
  const demoTime = new Date().getTime() + 86400000 * 5
  const demoDate = new Date(demoTime).getDate()
  const demoMonth = new Date(demoTime).getMonth()
  const demoYear = new Date(demoTime).getFullYear()
  const demoDay = new Date(demoTime).getDay()
  dateEvent1.innerText = demoDate + ' ' + months[demoMonth] + ' ' + demoYear
  dateEvent2.innerText = demoDate + ' ' + months[demoMonth] + ' ' + demoYear
  dayEvent1.innerText = days[demoDay]
  dayEvent2.innerText = days[demoDay]
  // DEMO DATE
})

// FUNCTION EXTERNAL

function detectBrowser() {
  let supported = false
  let navUserAgent = navigator.userAgent
  let browserName = navigator.appName
  let browserVersion = '' + parseFloat(navigator.appVersion)
  /* let majorVersion =  parseInt(navigator.appVersion, 10) */
  let tempNameOffset, tempVersionOffset, tempVersion

  if ((tempVersionOffset = navUserAgent.indexOf('Opera')) != -1) {
    browserName = 'Opera'
    browserVersion = navUserAgent.substring(tempVersionOffset + 6)
    if ((tempVersionOffset = navUserAgent.indexOf('Version')) != -1)
      browserVersion = navUserAgent.substring(tempVersionOffset + 8)
  } else if ((tempVersionOffset = navUserAgent.indexOf('MSIE')) != -1) {
    browserName = 'Microsoft Internet Explorer'
    browserVersion = navUserAgent.substring(tempVersionOffset + 5)
  } else if ((tempVersionOffset = navUserAgent.indexOf('Chrome')) != -1) {
    browserName = 'Chrome'
    browserVersion = navUserAgent.substring(tempVersionOffset + 7)
  } else if ((tempVersionOffset = navUserAgent.indexOf('Safari')) != -1) {
    browserName = 'Safari'
    browserVersion = navUserAgent.substring(tempVersionOffset + 7)
    if ((tempVersionOffset = navUserAgent.indexOf('Version')) != -1)
      browserVersion = navUserAgent.substring(tempVersionOffset + 8)
  } else if ((tempVersionOffset = navUserAgent.indexOf('Firefox')) != -1) {
    browserName = 'Firefox'
    browserVersion = navUserAgent.substring(tempVersionOffset + 8)
  } else if (
    (tempNameOffset = navUserAgent.lastIndexOf(' ') + 1) <
    (tempVersionOffset = navUserAgent.lastIndexOf('/'))
  ) {
    browserName = navUserAgent.substring(tempNameOffset, tempVersionOffset)
    browserVersion = navUserAgent.substring(tempVersionOffset + 1)
    if (browserName.toLowerCase() == browserName.toUpperCase()) {
      browserName = navigator.appName
    }
  }
  // trim version
  if ((tempVersion = browserVersion.indexOf(';')) != -1)
    browserVersion = browserVersion.substring(0, tempVersion)
  if ((tempVersion = browserVersion.indexOf(' ')) != -1)
    browserVersion = browserVersion.substring(0, tempVersion)

  // console.log(navigator.userAgentData)
  // console.log(
  //   'BrowserName = ' +
  //     browserName +
  //     '\n' +
  //     'Version = ' +
  //     parseInt(browserVersion, 10)
  // )

  switch (browserName) {
    case 'Chrome':
      if (parseInt(browserVersion, 10) >= 90) {
        supported = true
      }
      break
    case 'Firefox':
      if (parseInt(browserVersion, 10) >= 88) {
        supported = true
      }
      break
    case 'Opera':
      if (parseInt(browserVersion, 10) >= 70) {
        supported = true
      }
      break
    case 'Safari':
      if (parseInt(browserVersion, 10) >= 13) {
        supported = true
      }
      break
    default:
      supported = false
      break
  }

  if (!supported) {
    alertBox.style.setProperty('display', 'block')
  }
}

function initialCountdown() {
  // let countDownDate = new Date('Jul 4, 2021 08:00:00').getTime()
  // let endDate = new Date('Jul 4, 2021 19:59:00').getTime()
  let countDownDate = new Date().getTime() + 86400000 * 5
  let endDate = new Date().getTime() + 86400000 * 6

  let x = setInterval(function () {
    let now = new Date().getTime()
    let distance = countDownDate - now
    let duringEvent = countDownDate - endDate

    let days = Math.floor(distance / (1000 * 60 * 60 * 24))
    let hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    )
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    let seconds = Math.floor((distance % (1000 * 60)) / 1000)

    if (distance > 0) {
      document.getElementById('countdown').innerHTML = `
      <p id="timer">
        <span id="days">${
          days < 10 ? '0' + days : days
        }</span> hari <span id="hours">${
        hours < 10 ? '0' + hours : hours
      }</span> jam <span id="minutes">${
        minutes < 10 ? '0' + minutes : minutes
      }</span> menit
        <span id="seconds">${
          seconds < 10 ? '0' + seconds : seconds
        }</span> detik
        </p>
    `
    } else if (distance > duringEvent) {
      document.getElementById('countdown').classList.add('countdown-fixed-top')
      document.getElementById('countdown').innerHTML =
        '<p class="during-event">● Acara Sedang Berlangsung ●</p>'
    } else {
      //Event Ended
      clearInterval(x)
      document
        .getElementById('countdown')
        .classList.remove('countdown-fixed-top')
      document.getElementById(
        'countdown'
      ).innerHTML = `<p class="end-event"><b>Acara telah berakhir</b></p>`
    }
  }, 1000)
}

function limitChar(e) {
  if (
    e.target.value.length > e.target.maxLength &&
    e.keyCode !== 46 &&
    e.keyCode !== 8
  ) {
    e.preventDefault()
    e.target.value.substring(0, e.target.maxLength)
  } else {
    if (e.target.id === 'ucapan') {
      numChar.innerText = `(${e.target.value.length} / ${e.target.maxLength})`
    }
  }
}

function dataSubmited() {
  let newName = document.getElementById('nama').value
  let newWords = document.getElementById('ucapan').value

  const newBox = document.createElement('div')
  newBox.className = 'list-box'
  newBox.innerHTML = `
      <h5>${newName.toString().trim()}</h5>
      <p>${newWords.toString().trim()}</p>
  `

  let firstChild = guestList.children[0]

  if (firstChild.classList.contains('empty-list')) {
    firstChild.remove()
  } else {
    guestList.scrollTop = 0
  }

  guestList.insertBefore(newBox, guestList.childNodes[0])
  countDownSubmit()
  document.getElementById('ucapan').value = ''
}

async function getGuest() {
  try {
    let res = await fetch(urlGS)
    if (res.status === 200 && res.ok) {
      return await res.json()
    } else {
      return 'Error'
    }
  } catch (error) {
    return 'Error'
  }
}

async function guestInitial() {
  // let guestData = await getGuest()
  // let guests = guestData.guests
  let guestData = 'TEST OKE'
  let guests = []

  //Jika Error
  if (guestData === 'Error') {
    guestList.innerHTML = `
      <div class="empty-list">
        <p>
            Mohon maaf, sedang terjadi kesalahan. Silahkan Kembali beberapa saat lagi!
        </p>
      </div>
    `
  }

  if (guests.length > 0) {
    let tempHTML = ''
    guests.forEach((guest) => {
      let list = `
        <div class="list-box">
          <h5>${guest.nama}</h5>
          <p>${guest.ucapan}</p>
        </div>
      `
      tempHTML += list
    })

    guestList.innerHTML = tempHTML
  } else {
    guestList.innerHTML = `
      <div class="empty-list">
        <p>
            <span>✉</span><br /><br />
            Jadilah orang <b>pertama</b> yang memberikan ucapan kepada kedua mempelai!
        </p>
      </div>
    `
  }
}

function countDownSubmit() {
  let initialNumber = 30

  let x = setInterval(function () {
    if (initialNumber > 0) {
      btnSend.value = `Ditambahkan (${initialNumber})`
      initialNumber--
    } else {
      clearInterval(x)
      btnSend.disabled = false
      btnSend.value = `Kirim`
    }
  }, 1000)
}

/* DESIGN BY SAMAWWAH.COM DESIGN BY SAMAWWAH.COM DESIGN BY SAMAWWAH.COM DESIGN BY SAMAWWAH.COM DESIGN BY SAMAWWAH.COM */
/* DESIGN BY SAMAWWAH.COM DESIGN BY SAMAWWAH.COM DESIGN BY SAMAWWAH.COM DESIGN BY SAMAWWAH.COM DESIGN BY SAMAWWAH.COM */
