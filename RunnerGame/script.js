const clown = document.getElementById('clown')
const rock = document.getElementById('rock')
const score = document.getElementById('score')

function jump() {
    clown.classList.add('jump-animation')
    setTimeout(() => {
        clown.classList.remove('jump-animation')
    }, 650)
}
document.addEventListener('keypress', () => {
    if (!clown.classList.contains('jump-animation'))
        jump();

})
setInterval(() => {
    score.innerText++
    const clownTop = parseInt(window.getComputedStyle(clown).getPropertyValue('top'));
    const rockLeft = parseInt(window.getComputedStyle(rock).getPropertyValue('left'));
    if (rockLeft < 0) {
        rock.style.display = 'none';
    } else {
        rock.style.display = '';
    }
    if (rockLeft < 50 && rockLeft > 0 && clownTop > 260){alert("You got a score of : "+ score.innerText + " \n\nPlay Again?")
window.location.reload();}
}, 50)