export const radioPlayerInit = () => {

  //get need items for Radio Player
  const radio = document.querySelector('.radio')
  const radioCoverImg = document.querySelector('.radio-cover__img')
  const radioHeaderBig = document.querySelector('.radio-header__big')
  const radioNavigation = document.querySelector('.radio-navigation')
  const radioItem = document.querySelectorAll('.radio-item')
  const radioStop = document.querySelector('.radio-stop')
  const radioVolume = document.querySelector('.radio-volume')

  const audio = new Audio()
  audio.type = 'audio/aac'

  const changeValue = () => {
    const value = radioVolume.value
    audio.volume = value / 100
  }

  radioStop.disabled = true

  //add animating button Play
  const changeIconPlay = () => {
    if (audio.paused) {
      radio.classList.remove('play')
      radioStop.classList.add('fa-play')
      radioStop.classList.remove('fa-stop')
    } else {
      radio.classList.add('play')
      radioStop.classList.add('fa-stop')
      radioStop.classList.remove('fa-play')
    }
  }

  const selectItem = elem => {
    radioItem.forEach(item => item.classList.remove('select'))
    elem.classList.add('select')
  }

  //we implement the functionality of selecting the station
  radioNavigation.addEventListener('change', event => {
    const target = event.target
    const parent = target.closest('.radio-item')
    selectItem(parent)

    //change radio title name
    const title = parent.querySelector('.radio-name').textContent
    radioHeaderBig.textContent = title

    //change radio cover image  
    const urlImg = parent.querySelector('.radio-img').src
    radioCoverImg.src = urlImg

    radioStop.disabled = false
    audio.src = target.dataset.radioStantion
    audio.play()
    changeIconPlay()
  })

  //add functionality button Play 
  radioStop.addEventListener('click', () => {
    if (audio.paused) {
      audio.play()
    } else {
      audio.pause()
    }
    changeIconPlay()
  })

  radioVolume.addEventListener('input', changeValue)
  changeValue()

  radioPlayerInit.stop = () => {
    audio.pause()
    changeIconPlay()
  }
}