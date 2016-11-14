$(document).ready(()=>{

  let stepRight="<img src='./art/stepping right.png' id='step-right'/>"

  let lookRight="<img src='./art/looking right.png' id='look-right'/>"

  let stepLeft="<img src='./art/stepping left.png' id='step-left'/>"

  let lookLeft="<img src='./art/looking left.png' id='look-left'/>"

  let keyPressed=null

  let currentFrame=$("#boy-walking").children()


  $("#boy-walking").append(lookRight)

  $('body').keydown((e)=>{

    // $("#boy-walking").empty()
    if(e.which===39){
      // $("#boy-walking").append(lookRight)
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
      // $("#boy-walking").append(lookLeft)
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
