$(document).ready(function(){
  //get all character data and place into list
  //footerAlign();
  var charDataURL = "http://beta-api-kuroganehammer.azurewebsites.net/api/characters";

  $.ajax({
    url: charDataURL,
    dataType: "json",
    success: function(json) {
      console.log(json);
      var structure = "<ul class='char_select'>";
      var selection = "";
      json.forEach(function(character){
        structure += "<li class='char_option' id='" + character.OwnerId + "'><button class='char_button'>" + character.DisplayName + "</button></li>";
        selection += "<option value='" + character.MainImageUrl + "' OwnerId='"+ character.OwnerId +"' theme='" + character.ColorTheme + "'>" + character.DisplayName + "</option>";
      });
      structure += "</ul>";
      $(".left").append(structure);
      $("#fighter").append(selection);

      $("#fighter").change(function() {
        $("#tempChoice").remove();

        var id = $("#fighter > option:selected").attr('OwnerId');
        id = id -1;
        var theme = $("#fighter > option:selected").attr('theme');
        var adjusted = shadeColor(theme,0.3);
        var adjusted2 = shadeColor(theme,0.6);

        console.log(theme);
        $("#char_pic").attr("src",$(this).val());

        $(".left").css("background-color",theme);
        $(".choice").css("background-color",theme);
        $("#fighter").css("background-color",adjusted2);
        $("body").css("background-color",adjusted2);
        $("#attributes_box").css("background-color",theme);
        $("#attacks_box").css("background-color",theme);

        $("#character_name").text(json[id].DisplayName);
        var movesURL = json[id].Links[1].Href;
        var attrURL = json[id].Links[2].Href;
        ///*
        $.ajax({
          url: movesURL,
          dataType: "json",
          success: function(movesJson) {
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
        }); //set up moves list

        $.ajax({
          url: attrURL,
          dataType: "json",
          success: function(attrJson) {
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
        });

      });

      //make a click handler for all characters in list;
      $("li").on("click",function() {
        $("#tempChoice").remove();
        var id = this.id-1;
        $("#char_pic").attr("src",json[id].MainImageUrl);

        /*Color Maniputlation*/
      	var color1 = json[id].ColorTheme;
      	var color2 = shadeColor(color1,0.6);

        $(".left").css("background-color",color1);
        $(".choice").css("background-color",color1);
        $("#fighter").css("background-color",color2);
        $("body").css("background-color",color2);
        $("#attributes_box").css("background-color",color1);
        $("#attacks_box").css("background-color",color1);

        $("#character_name").text(json[id].DisplayName);
        var movesURL = json[id].Links[1].Href;
        var attrURL = json[id].Links[2].Href;
        ///*
        $.ajax({
          url: movesURL,
          dataType: "json",
          success: function(movesJson) {
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
        }); //set up moves list

        $.ajax({
          url: attrURL,
          dataType: "json",
          success: function(attrJson) {
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
        }); //set up attributes list
        //*/
      }); //on "click"



    } //success function
  }); //ajax();

}); //ready()

function shadeColor(color, percent) {
    var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
    return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
}
