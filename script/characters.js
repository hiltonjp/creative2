$(document).ready(function(){
  //get all character data and place into list
  //footerAlign();
  var charDataURL = "http://beta-api-kuroganehammer.azurewebsites.net/api/characters";

  $.ajax({
    url: charDataURL,
    dataType: "json",
    success: function(json) {
      console.log(json);

      // Fill out character selection
      var structure = "<ul class='char_select'>";
      var selection = "";
      json.forEach(function(character){
        structure += "<li class='char_option' value='" + character.MainImageUrl + "' id='" + character.OwnerId + "' movesURL='" + character.Links[1].Href + "' attrURL='" + character.Links[2].Href + "'><button class='char_button'>" + character.DisplayName + "</button></li>";

        // Mobile Character Selection
        selection += "<option value='" + character.MainImageUrl + "' OwnerId='"+ character.OwnerId + "' movesURL='" + character.Links[1].Href + "' attrURL='" + character.Links[2].Href + "' theme='" + character.ColorTheme + "'>" + character.DisplayName + "</option>";
      });
      structure += "</ul>";

      $(".left").append(structure);
      // Mobile Character Selection
      $("#fighter").append(selection);

      // Mobile Character Selection onClick
      $("#fighter").change(function() {
        $("#tempChoice").remove();

        //needed for ajax methods
        var id = $("#fighter > option:selected").attr('OwnerId') - 1 ;
        var name = $("#fighter > option:selected").text();

        // recolor page based on provided color theme
        recolorUI($("#fighter > option:selected").attr('theme'));

        //change picture and character name
        $("#char_pic").attr("src",$(this).val());
        $("#character_name").text(name);

        var movesURL = $("#fighter > option:selected").attr('movesURL');
        var attrURL = $("#fighter > option:selected").attr('attrURL');

        gatherPageData(movesURL,attrURL);
      });

      function recolorUI(theme) {
        var adjusted = shadeColor(theme,0.6);

        console.log(theme);

        $(".left").css("background-color",theme);
        $(".choice").css("background-color",theme);
        $("#fighter").css("background-color",adjusted);
        $("body").css("background-color",adjusted);
        $("#attributes_box").css("background-color",theme);
        $("#attacks_box").css("background-color",theme);
      }

      //make a click handler for all characters in list;
      $("li").on("click",function() {
        $("#tempChoice").remove();

        //needed for ajax methods
        var id = this.id-1;
        var name = $(this).text();


        // change image and character name
        $("#char_pic").attr("src",$(this).attr("value"));
        $("#character_name").text(name);

        // recolor page based on provided color theme
        recolorUI(json[id].ColorTheme);

        var movesURL = $(this).attr("movesURL");
        var attrURL = $(this).attr("attrURL");

        gatherPageData(movesURL,attrURL);
      }); //on "click"



    } //success function
  }); //ajax();

}); //ready()

function gatherPageData(movesURL,attrURL) {
  //set up moves list
  $.ajax({
    url: movesURL,
    dataType: "json",
    success: movesSuccess
  });

  //set up attributes list
  $.ajax({
    url: attrURL,
    dataType: "json",
    success: attrSuccess
  });
}

function movesSuccess(movesJson) {
  console.log(movesJson);

  structure = "<table id='attack_table'>";
    structure += "<tr>";
      structure += "<th>Attack</th>";
      structure += "<th>Base Damage</th>";
    structure += "</tr>";
    movesJson.forEach(function(move) {
      structure += "<tr>";
        structure += "<td>" + move.Name + "</td>";
        structure += "<td>" + move.BaseDamage + "</td>";
      structure += "</td>";
    });
  structure += "</table>";

  $("#attacks_box").empty();
  $("#attacks_box").append(structure);
}

function attrSuccess(attrJson) {
  console.log(attrJson);

  structure = "<table id='attribute_table'>";
    structure += "<tr>";
      structure += "<th>Attribute</th>";
      structure += "<th>Value</th>";
    structure += "</tr>";
    attrJson.forEach(function(attr){
      structure += "<tr>";
        structure += "<td>" + attr.Name + "</td>";
        structure += "<td>" + attr.Values[0].Value + "</td>";
      structure += "</tr>";
    });
  structure += "</table>";
  $("#attributes_box").empty();
  $("#attributes_box").append(structure); //put attributes after attacks
}


function shadeColor(color, percent) {
    var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
    return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
}
