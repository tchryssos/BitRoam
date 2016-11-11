$(document).ready(()=>{

  $('body').keydown((e)=>{
    $("#boy-walking").empty()
    if(e.which===39){
      $("#boy-walking").append("<img src='./art/looking right.png'/>")
    } else if(e.which===37){
      $("#boy-walking").append("<img src='./art/looking left.png'/>")
    }
  })

  $('body').keyup((e)=>{
    $("#boy-walking").empty()
    if(e.which===39){
      $("#boy-walking").append("<img src='./art/looking right.png'/>")
    } else if (e.which===37){
      $("#boy-walking").append("<img src='./art/looking left.png'/>")
    }
  })
})
