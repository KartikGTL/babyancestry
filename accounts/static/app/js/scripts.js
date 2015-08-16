// Helper Functions
/*function login(){
    client.getAccessToken().then(function(accessToken) {
        access_token = accessToken;
        fetch_user(max_fetch);
    });
}

function logout(){
    client.invalidateAccessToken();
    window.location.reload();
}

function get_first_name(full) {
  if (full != undefined){
    var parts = full.split(' ');
    return parts[0].toUpperCase();
  } else {
    return "First Name";   
  }
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

function showContent(){
  $("#top-login").hide();
  $("#top").show();
  $("#content").show();  
}

function filter(gender){
  if (gender == "Male"){
    $('#ancestors .Male').show();
    $('#ancestors .Female').hide();
  }
}

function initialize(){
    var token = getCookie("FS_ACCESS_TOKEN_1");
    console.log(token);
    if (token != ""){
        fetch_user(max_fetch);
    } else {
      $("#top").show();
      $("#top-login").show();
    }
}
*/
// Action Plan
$(document).ready(function(){
  $("#boy-names").click(function(){
    $('.filter .btn#boy-names').addClass('active');
    $('.filter .btn#girl-names').removeClass('active');
    $('.filter .btn#all-names').removeClass('active');
    $('#ancestors .Male').show();
    $('#ancestors .Female').hide();

    $('.footer_btn .U').show();
    $('.footer_btn .A').hide();
  });

  $("#girl-names").click(function(){
    $('.filter .btn#girl-names').addClass('active');
    $('.filter .btn#boy-names').removeClass('active');
    $('.filter .btn#all-names').removeClass('active');
    $('#ancestors .Male').hide();
    $('#ancestors .Female').show();

    $('.footer_btn .U').hide();
    $('.footer_btn .A').show();
  });

  $("#all-names").click(function(){
    $('.filter .btn#all-names').addClass('active');
    $('.filter .btn#boy-names').removeClass('active');
    $('.filter .btn#girl-names').removeClass('active');
    $('#ancestors .Male').show();
    $('#ancestors .Female').show();

    $('.footer_btn .U').show();
    $('.footer_btn .A').show();
  });
});
