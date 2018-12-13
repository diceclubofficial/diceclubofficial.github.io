
function sayHello() {
  alert("hello");
}


function generateMemberTiles() {
  var targetdiv = document.getElementById('targetdiv');

  function Person(first, last, year, pos) {
    this.firstName = first;
    this.lastName = last;
    this.graduationYear = year;
    this.position = pos;

    this.fullName = function() {
      return this.firstName + " " + this.lastName;
    }
    this.abbreviation = function() {
      return this.graduationYear == "-" ? this.firstName.toLowerCase().substring(this.firstName.indexOf(" ") + 1).charAt(0) + this.lastName.toLowerCase() : this.firstName.toLowerCase().charAt(0) + this.lastName.toLowerCase();
    }
  }

  // sections correspond to html tags and sectionHeadings correspond to h3 tags
  var sections = ["executiveInformation", "subexecutiveInformation", "facultyInformation", "memberInformation"];
  var sectionHeadings = ["Executive Staff", "Sub-Executive Staff", "Faculty", "Members"];

  // initialize html string
  var html = "<h2>Staff</h2>";

  // go through each section and do stuff
  for(var sectionPos in sections) {
    // make people array that contains every person
    var rawData = document.getElementById(sections[sectionPos]).innerHTML.trim();
    var people = rawData.split(",");

    html += "<h3>" + sectionHeadings[sectionPos] + "</h3>";
    if(sections[sectionPos] == "memberInformation") html += "<div class='staff__section' id='members'>";
    else html += "<div class='staff__section'>";

    // go through each piece of information for every person
    for(var personInfo of people) {
      // make items array that contains each individual piece of information
      var items = personInfo.split(" ");
      // replace underscores with spaces
      for(var i in items) {
        items[i] = items[i].replace(/_/g, " ");
      }
      // make person object to hold all the info and make more calculations
      var person = new Person(items[0], items[1], items[2], items[3]);

      // add innerHTML (headers and image)
      html += "<div class='staff__section__membertile'>";
      // only add graduation year if not faculty
      if(person.graduationYear == "-") html += "<h4>" + person.fullName() + "</h4>";
      else html += "<h4>" + person.fullName() + " \'" + person.graduationYear + "</h4>";
      // only show position if not member
      if(sections[sectionPos] != "memberInformation") html += "<h5>" + person.position + "</h5>";
      // image
      html += "<img src='media/people/" + person.abbreviation() + ".jpeg' alt='" + person.fullName() + "' id='" + person.abbreviation() + "'";
      // change image on mouseover only if executive staff
      if(sections[sectionPos] == "executiveInformation") {
        html += "onmouseover='changeImage(\"" + person.abbreviation() + "\");' onmouseout='changeImage(\"" + person.abbreviation() + "\");'>";
      }
      else {
        html += ">";
      }

      html += "</div>";
    }
    html += "</div>";
  }
  targetdiv.innerHTML = html;
}

function changeImage(id, type) {
  var img = document.getElementById(id);

  if(type == undefined) {
    if(img.src.indexOf("alt") == -1) {
      type = "alt";
    }
    else type = "default";
  }
  if(type == "default") {
    img.src = "media/people/" + id + ".jpeg";
  }
  else if(type == "alt") {
    img.src = "media/people/" + id + "alt.jpg";
  }
}
