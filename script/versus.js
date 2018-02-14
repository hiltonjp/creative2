$(document).ready(function(){
  var charDataURL = "http://beta-api-kuroganehammer.azurewebsites.net/api/characters";
  $.ajax({
    url: charDataURL,
    dataType: "json",
    success: function(json) {
      console.log(json);

      // set up character list for selection
      var structure = "";
      json.forEach(function(character){
        structure += "<option value='" + character.MainImageUrl + "' theme='"+ character.ColorTheme +"'>" + character.DisplayName + "</option>";
      });
      $("#fighter1").append(structure);
      $("#fighter2").append(structure);

      // on selection change
      $("#fighter1").change(function() {
        var theme = $("#fighter1 > option:selected").attr('theme');
        var adjusted = shadeColor(theme,0.3);
        var adjusted2 = shadeColor(theme,0.6);

        console.log(theme);
        $("img[name=left_character]").attr("src",$(this).val());
        $("#left_character").css("background-color",adjusted);
        $("#choice1").css("background-color",adjusted);
        $("#fighter1").css("background-color",adjusted2);
      }).trigger("change");

      // on selection change
      $("#fighter2").change(function() {
        var theme = $("#fighter2 > option:selected").attr('theme');
        var adjusted = shadeColor(theme,0.3);
        var adjusted2 = shadeColor(theme,0.6);

        console.log(theme);
        $("img[name=right_character]").attr("src",$(this).val());
        $("#right_character").css("background-color",adjusted);
        $("#choice2").css("background-color",adjusted);
        $("#fighter2").css("background-color",adjusted2);
      }).trigger("change");
    }
  });

  // Begin Fight!!!
  $("#fight_btn").on("click",function(e){
    e.preventDefault();
    var char1 = $("#fighter1 > option:selected").text();
    var char2 = $("#fighter2 > option:selected").text();

    if (char1 !== "Choose" && char2 !== "Choose") {
      if (char1 === "King Dedede" || char2 === "King Dedede") { // Dedede is King, after all.
        $("#battleWinner").text("WINNER:\n King Dedede!");
      } else {
        // choose randomly
        var winner = Math.random();
        console.log(winner);
        if (winner < 0.5) {
          $("#battleWinner").text("WINNER:\n " + char1 + "!");
        } else {
          $("#battleWinner").text("WINNER:\n " + char2 + "!");
        }
      }
    } else {
      $("#battleWinner").text("Please choose your characters!");
    }

  });
});

function shadeColor(color, percent) {
    var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
    return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
}
