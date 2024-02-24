function toggleNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

function search() {
  var searchTerm = document.getElementById("searchInput").value;
  alert("Vous avez recherché : " + searchTerm);
}

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.querySelector('.scroll-to-top').style.display = "block";
  } else {
    document.querySelector('.scroll-to-top').style.display = "none";
  }
}

function scrollToTop() {
  document.body.scrollTop = 0; 
  document.documentElement.scrollTop = 0; 
}

window.onscroll = function() {
  scrollFunction();
};

function redirectToCart() {
    window.location.href = "panier.php";
}

function redirectToProfil() {
    window.location.href = "profil.php";
}