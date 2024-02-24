document.addEventListener("DOMContentLoaded", function() {
    const gameWrapper = document.getElementById("gameWrapper");
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    const shipWidth = 20;
    const shipHeight = 30;
    let shipX = canvas.width / 2 - shipWidth / 2;
    let shipY = canvas.height - 50;
    let shipSpeed = 5;
    let shipVelocityX = 0;

    const bulletWidth = 5;
    const bulletHeight = 15;
    let bullets = [];
    let bulletSpeed = 5;

    const enemyWidth = 20;
    const enemyHeight = 20;
    const enemySpeed = 1;
    let enemies = [];
    let enemiesDestroyed = 0;

    let gamePaused = false;

    function drawShip() {
        ctx.fillStyle = "white";
        ctx.fillRect(shipX, shipY, shipWidth, shipHeight);
    }

    function drawBullets() {
        ctx.fillStyle = "white";
        bullets.forEach(bullet => {
            ctx.fillRect(bullet.x, bullet.y, bulletWidth, bulletHeight);
        });
    }

    function drawEnemies() {
        ctx.fillStyle = "red";
        enemies.forEach(enemy => {
            ctx.fillRect(enemy.x, enemy.y, enemyWidth, enemyHeight);
        });
    }

    function drawScore() {
        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.fillText("Enemies Destroyed: " + enemiesDestroyed, 10, 30);
    }

    function updateGameArea() {
        if (!gamePaused) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            drawShip();
            drawBullets();
            drawEnemies();
            drawScore();

            shipX += shipVelocityX;

            if (shipX < 0) {
                shipX = 0;
            }
            if (shipX + shipWidth > canvas.width) {
                shipX = canvas.width - shipWidth;
            }

            bullets.forEach(bullet => {
                bullet.y -= bulletSpeed;
            });

            enemies.forEach(enemy => {
                enemy.y += enemySpeed;
                if (enemy.y > canvas.height) {
                    gameOver();
                }
            });

            bullets = bullets.filter(bullet => bullet.y > 0);

            checkCollisions();
        }

        requestAnimationFrame(updateGameArea);
    }

    function checkCollisions() {
        bullets.forEach((bullet, bulletIndex) => {
            enemies.forEach((enemy, enemyIndex) => {
                if (
                    bullet.x < enemy.x + enemyWidth &&
                    bullet.x + bulletWidth > enemy.x &&
                    bullet.y < enemy.y + enemyHeight &&
                    bullet.y + bulletHeight > enemy.y
                ) {
                    bullets.splice(bulletIndex, 1);
                    enemies.splice(enemyIndex, 1);
                    enemiesDestroyed++;
                }
            });
        });
    }

    function gameOver() {
        console.log("Game Over");
    }

    document.addEventListener("keydown", function(event) {
        if (event.key === "ArrowLeft") {
            shipVelocityX = -shipSpeed;
        }
        if (event.key === "ArrowRight") {
            shipVelocityX = shipSpeed;
        }
        if (event.key === " ") {
            bullets.push({ x: shipX + shipWidth / 2 - bulletWidth / 2, y: shipY });
        }
        if (event.key === "Escape") {
            togglePause();
        }
    });

    document.addEventListener("keyup", function(event) {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            shipVelocityX = 0;
        }
    });

    function createEnemy() {
        enemies.push({ x: Math.random() * (canvas.width - enemyWidth), y: 0 });
        setTimeout(createEnemy, 1000);
    }

    function togglePause() {
        gamePaused = !gamePaused;
    }

    createEnemy();
    updateGameArea();
});


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