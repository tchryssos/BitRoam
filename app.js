$(document).ready(()=>{

  let stepRight="<img src='./art/stepping right.png' id='step-right'/>"

  let lookRight="<img src='./art/looking right.png' id='look-right'/>"

  let stepLeft="<img src='./art/stepping left.png' id='step-left'/>"

  let lookLeft="<img src='./art/looking left.png' id='look-left'/>"

  let keyPressed=null

  let currentFrame=$("#boy-walking").children()

  let background1Position=Math.random()
  let background2Position=Math.random()
  let cloudsPosition=Math.random()

  function clouds1Move(){
    setInterval(()=>{
      cloudsPosition=cloudsPosition+1
      $("#clouds-1-div").css('background-position-x', cloudsPosition)
    }, 200)
  }

  clouds1Move()

  function clouds2Move(){
    setInterval(()=>{
      cloudsPosition=cloudsPosition+1
      $("#clouds-2-div").css('background-position-x', cloudsPosition)
    }, 250)
  }

  clouds2Move()

  // function clouds3Move(){
  //   setInterval(()=>{
  //     cloudsPosition=cloudsPosition+1
  //     $("#clouds-3-div").css('background-position-x', cloudsPosition)
  //   }, 100)
  // }
  //
  // clouds3Move()


  function hills1Right(){
    background1Position=background1Position-10;

    $("#hills-1-div").css('background-position-x', background1Position)
  }

  function hills1Left(){
    background1Position=background1Position+10;

    $("#hills-1-div").css('background-position-x', background1Position)
  }

  function hills2Left(){
    background2Position=background2Position+4

    $("#hills-2-div").css('background-position-x', background2Position)
  }

  function hills2Right(){
    background2Position=background2Position-4

    $("#hills-2-div").css('background-position-x', background2Position)
  }

  $("#boy-walking").append(lookRight)

  $('body').keydown((e)=>{

    // $("#boy-walking").empty()
    if(e.which===39){

      hills1Right()
      hills2Right()

      if (keyPressed) return

      keyPressed=setInterval(()=>{
        if ($("#boy-walking").children()[0].id==="look-right"){
          $("#boy-walking").empty()
          $("#boy-walking").append(stepRight)
        } else {
          $("#boy-walking").empty()
          $("#boy-walking").append(lookRight)
        }
      }, 250)

    } else if(e.which===37){

      hills1Left()
      hills2Left()

      if (keyPressed) return
      keyPressed=setInterval(()=>{
      if ($("#boy-walking").children()[0].id==="look-left"){
        $("#boy-walking").empty()
        $("#boy-walking").append(stepLeft)
      } else {
        $("#boy-walking").empty()
        $("#boy-walking").append(lookLeft)
      }
      }, 250)
    }
  })

  $('body').keyup((e)=>{
    if(e.which===39){
      $("#boy-walking").empty()
      clearInterval(keyPressed)
      keyPressed=null
      $("#boy-walking").append(lookRight)

    } else if (e.which===37){
      $("#boy-walking").empty()
      clearInterval(keyPressed)
      keyPressed=null
      $("#boy-walking").append(lookLeft)
    }
  })


})
