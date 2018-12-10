
function sayHello() {
  alert("hello");
}

function changeImage(id, type) {
  var img = document.getElementById(id);

  if(type == undefined) {
    if(img.src.indexOf("alt") == -1) {
      type = "alt";
    }
    else type = "default";
  }
  console.log(type);
  if(type == "default") {
    img.src = "media/people/" + id + ".jpeg";
  }
  else if(type == "alt") {
    img.src = "media/people/" + id + "alt.jpg";
  }

}
