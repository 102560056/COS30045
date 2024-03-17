const buttons = document.getElementsByTagName("button");
const figures = document.getElementsByTagName("figure");
var activeButton = ''


function OnClick(button) {
    for (var i = 0; i < buttons.length; i++) {
        if (buttons[i] == button) {
            button.classList.toggle("Active")
            activeButton = activeButton == button.innerHTML ? '' : button.innerHTML
        }
        else {
            buttons[i].classList.remove("Active");
            figures[i].display
        }
    }

    for (var i = 0; i < figures.length; i++) {
        figures[i].style.display = "none";
    }

    document.getElementById(activeButton).style.display = "block";
}