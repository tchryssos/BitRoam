$(document).ready(() => {

    $("#item-text-div").hide()

    let stepRight = "<img src='/static/art/stepping right.png' id='step-right'/>"

    let lookRight = "<img src='/static/art/looking right.png' id='look-right'/>"

    let stepLeft = "<img src='/static/art/stepping left.png' id='step-left'/>"

    let lookLeft = "<img src='/static/art/looking left.png' id='look-left'/>"

    let keyPressed = null

    let currentFrame = $("#boy-walking").children()

    let songPaused = false

    let rainFrame=0
    let hill1Position = 0
    let hill2Position = 0
    let cloudsPosition = 0
    let instOpacity = 0.7
    let itemOpacity=0.7
    let walking=false
    let lat=null
    let lon=null
    let weather="Clear"

    let items=[{cigarette:`You found a cigarette on the ground. Smoking is bad for you. Put that down.`},{penny:`You found a penny on the ground. Face down. Unlucky.`}, {quarter:`You found a quarter on the ground. You only need to find 3 more to get a soda.`}, {cactus: `You found a piece of a cactus on the ground. If you think about it, that's kind of like finding a cactus arm. Weird.`}, {comic:`You found a comic book on the ground. It doesn't look like it's in mint condition.`}, {bottle:`You found a glass bottle on the ground. Looks like there's still some liquid inside. You probably shouldn't drink it.`}, {chess:`You found a chess piece on the ground. It's a pawn.`}, {cd: `You found a CD on the ground. 'Shoegaze Sampler'? No thanks.`}, {baseball:`You found a baseball on the ground. Did someone hit this all the way out here?`}, {foreignCurrency:`You found some foreign currency on the ground. Maybe you're rich in Moldova now.`}, {screw: `You found a screw on the ground. It doesn't seem to fit anything nearby.`}, {manual:`You found an instruction manual on the ground. Now you can take proper care of your VCR.`}, {tradingCard: `You found a trading card on the ground. The monster on the front doesn't look very strong.`}, {basket: `You found a picnic basket on the ground. Ew! A moldy sandwich is inside!`}, {magnifyingGlass: `You found a magnifying glass on the ground. Maybe there's a clue nearby?`}, {candle: `You found a candle on the ground. It's been a while since you participated in a seance.`}, {rock: `You found a rock on the ground... although there are rocks everywhere. Did you really 'find' this?`}, {Headphones: `You found a pair of headphones on the ground. If only you had brought your CD player.`}, {mouthpiece: `You found a  mouthpiece on the ground. Does mom still have your trumpet in the attic?`}, {cork: `You found a cork on the ground. Don't scientists say you should drink some wine every day?`}, {mouse: `You found a computer mouse on the ground. This will be great for your RPGs.`}, {key: `You found a key on the ground. Oh wait, it's yours. Good thing you found it.`}, {marble: `You found a marble on the ground. Do people still play with these?`}, {bookmark: `You found a bookmark on the ground. Maybe now you'll do more reading.`}, {crayon: `You found a crayon on the ground. It's a nice teal color.`}, {actionFigure: `You found an action figure on the ground. Commander Riker! Cool!`}, {watch: `You found a watch on the ground. It has the wrong time.`}, {fortune: `You found a fortune cookie fortune on the ground. 'Cheer Up!' Is that a fortune?`}]
    let itemsBool=true

    function clouds1Move() {
        setInterval(() => {
            cloudsPosition = cloudsPosition + 1
            $("#clouds-1-div").css('background-position-x', cloudsPosition)
        }, 200)
    }
    clouds1Move()

    function clouds2Move() {
        setInterval(() => {
            cloudsPosition = cloudsPosition + 1
            $("#clouds-2-div").css('background-position-x', cloudsPosition)
        }, 250)
    }
    clouds2Move()

    function weatherFall1(){
      setInterval(() => {
        if (rainFrame<2){
          rainFrame=rainFrame+1
          $("#weather-div").css('background-image', `url('/static/art/rain${rainFrame}.png')`)
        } else {
          rainFrame=0
          $("#weather-div").css('background-image', `url('/static/art/rain${rainFrame}.png')`)
        }
      }, 175)
    }

    weatherFall1()

    function hills1Right() {
        hill1Position = hill1Position - 10;

        $("#hills-1-div").css('background-position-x', hill1Position)
    }

    function hills1Left() {
        hill1Position = hill1Position + 10;

        $("#hills-1-div").css('background-position-x', hill1Position)
    }

    function hills2Left() {
        hill2Position = hill2Position + 4

        $("#hills-2-div").css('background-position-x', hill2Position)
    }

    function hills2Right() {
        hill2Position = hill2Position - 4

        $("#hills-2-div").css('background-position-x', hill2Position)
    }

    $("#boy-walking").append(lookRight)

    function findItems(){
      setInterval(()=>{
        if (itemsBool===true && walking===true){
          $("#item-text").empty()
          let foundItem=_.sample(items)
          $("#item-text").append(Object.values(foundItem)[0])
          $("#item-text-div").fadeIn(1000,()=>{
            window.setTimeout(()=>{
              $("#item-text-div").fadeOut(2500)
            },4000)
          })
        }
      },19500)
    }

    findItems()

    $('body').keydown((e) => {

        $("#moving-instructions-div").fadeOut(4500)

        // $("#boy-walking").empty()
        if (e.which === 39) {

            walking=true

            hills1Right()
            hills2Right()

            if (keyPressed) return

            keyPressed = setInterval(() => {
                if ($("#boy-walking").children()[0].id === "look-right") {
                    $("#boy-walking").empty()
                    $("#boy-walking").append(stepRight)
                } else {
                    $("#boy-walking").empty()
                    $("#boy-walking").append(lookRight)
                }
            }, 250)

        } else if (e.which === 37) {

            walking=true

            hills1Left()
            hills2Left()

            if (keyPressed) return
            keyPressed = setInterval(() => {
                if ($("#boy-walking").children()[0].id === "look-left") {
                    $("#boy-walking").empty()
                    $("#boy-walking").append(stepLeft)
                } else {
                    $("#boy-walking").empty()
                    $("#boy-walking").append(lookLeft)
                }
            }, 250)
        }
    })

    $('body').keyup((e) => {
        if (e.which === 39) {
            walking=false
            $("#boy-walking").empty()
            clearInterval(keyPressed)
            keyPressed = null
            $("#boy-walking").append(lookRight)

        } else if (e.which === 37) {
            walking=false
            $("#boy-walking").empty()
            clearInterval(keyPressed)
            keyPressed = null
            $("#boy-walking").append(lookLeft)
        }
    })

    $('#audio-icon-div').click(() => {
        if (songPaused == false) {
            $('#song-player')[0].pause()
            $('#audio-icon-div').empty()
            $('#audio-icon-div').append("<img id='audio-icon' src='/static/art/no audio.png'/>")
            $('#song-player')[0].currentTime = 0
            songPaused = true
        } else {
            $('#song-player')[0].play()
            $('#audio-icon-div').empty()
            $('#audio-icon-div').append("<img id='audio-icon' src='/static/art/audio.png'/>")
            songPaused = false
        }
    })

    function getWeather() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(fetchWeatherData, ()=>{
        console.log("Geolocation failed.")
      })
    }
  }

  function fetchWeatherData(position){
    lat=position.coords.latitude
    lon=position.coords.longitude
    $.ajax({
      url: '/weather',
      method: "POST",
      data: `{latitude: ${lat}, longitude: ${lon}}`,
      success: (weatherData, status)=>{
        weather=weatherData
        console.log(weather)
      },
      error: ()=>{
        console.log("Error fetching weather!")
      }
    })
  }

  getWeather()
})
