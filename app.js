$(document).ready(() => {

    let stepRight = "<img src='./art/stepping right.png' id='step-right'/>"

    let lookRight = "<img src='./art/looking right.png' id='look-right'/>"

    let stepLeft = "<img src='./art/stepping left.png' id='step-left'/>"

    let lookLeft = "<img src='./art/looking left.png' id='look-left'/>"

    let keyPressed = null

    let currentFrame = $("#boy-walking").children()

    let songPaused = false

    let background1Position = 0
    let background2Position = 0
    let cloudsPosition = 0
    let instOpacity = 0.7
    let itemOpacity=0.7
    let walking=false
    let items=[{'cigarette':"You found a cigarette on the ground. Smoking is bad for you. Put that down."},{'penny':"You found a penny on the ground. Face down. Unlucky."}, {'tooth':"You found an animal tooth on the ground. You hope it's a baby tooth."}, {'cactus': "You found a piece of a cactus on the ground. If you think about it, it's kind of like finding a cactus arm. Weird."}, {'comic':"You found a comic book on the ground. It doesn't look like it's in mint condition."}, {'bottle':"You found a glass bottle on the ground. Looks like there's still some liquid inside. You probably shouldn't drink it."}, {'chess':"You found a chess piece on the ground. How did anyone lose this?"}, {'cd': "You found a CD on the ground. 'Shoegaze Sampler'. No thanks."}]
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

    function hills1Right() {
        background1Position = background1Position - 10;

        $("#hills-1-div").css('background-position-x', background1Position)
    }

    function hills1Left() {
        background1Position = background1Position + 10;

        $("#hills-1-div").css('background-position-x', background1Position)
    }

    function hills2Left() {
        background2Position = background2Position + 4

        $("#hills-2-div").css('background-position-x', background2Position)
    }

    function hills2Right() {
        background2Position = background2Position - 4

        $("#hills-2-div").css('background-position-x', background2Position)
    }

    $("#boy-walking").append(lookRight)

    function findItems(){
      setInterval(()=>{
        if (itemsBool===true && walking===true){
          $("#item-text").empty()
          let foundItem=_.sample(items)
          $("#item-text").append(Object.values(foundItem)[0])
          itemOpacity=0.7
          $("#item-text-div").css('opacity', itemOpacity)
          window.setTimeout(()=>{
            itemOpacity=0
            $("#item-text-div").css('opacity', itemOpacity)
          },3500)
        }
      },180000)
    }

    findItems()

    $('body').keydown((e) => {

        setInterval(() => {
            instOpacity = instOpacity - 0.02
            $("#moving-instructions-div").css('opacity', instOpacity)
        }, 1000)

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
        if (songPaused === false) {
            $('#song-player')[0].pause()
            $('#audio-icon-div').empty()
            $('#audio-icon-div').append("<img id='audio-icon' src='./art/no audio.png'/>")
            $('#song-player')[0].currentTime = 0
            songPaused = true
        } else {
            $('#song-player')[0].play()
            $('#audio-icon-div').empty()
            $('#audio-icon-div').append("<img id='audio-icon' src='./art/audio.png'/>")
            songPaused = false
        }
    })
})
