function random_color() {
    return Math.floor(Math.random()*16777215).toString(16);
}

function rainbowize_text(text) {
    res = '';
    for (let i = 0; i < text.length; i++) {
        const color = Math.floor(Math.random()*16777215).toString(16)
        res += `<span style='color:#${color}'>${text.charAt(i)}</span>`;
    }
    return res;
}

const initial_state = new Map();

function rainbow(element) {
    if (element.style && element.childNodes.length == 1) {
        initial_state.set(element, element.innerHTML)
        element.innerHTML = rainbowize_text(element.innerText)
    } else {
        element.childNodes.forEach(child => {
            rainbow(child)
        });
    }
}

function derainbow(element) {
    for (let [key, value] of initial_state) {
        key.innerHTML = value
    }
    initial_state.clear()
}

function wrap_text_in_spans(element) {
    for (let i = 0; i < element.childNodes.length; i++) {
        if (element.childNodes[i].nodeType == Node.TEXT_NODE) {
            const text = element.childNodes[i].data;
            element.replaceChild(document.createElement('span'), element.childNodes[i]);
            element.childNodes[i].innerHTML = text;
        }
    }
}

function rainbowize_contents() {
    if (contents.childNodes.length > 1) {
        wrap_text_in_spans(contents);
    }
    rainbow(contents);
}

window.onload = () => {
    const sidebar_checkbox = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('sidebar');
    const rainbow_checkbox = document.getElementById('rainbow-toggle');

    if (localStorage.getItem("rainbowEnabled") == "true") {
        rainbow_checkbox.checked = true;
        rainbowize_contents();
    }

    sidebar_checkbox.addEventListener('change', () => {
        sidebar.style.transform = sidebar_checkbox.checked ? 'translate(-100%, 0)' : 'none';
    });

    rainbow_checkbox.addEventListener('change', () => {
        if (rainbow_checkbox.checked) {
            localStorage.setItem("rainbowEnabled", "true")
            rainbowize_contents()
        } else {
            derainbow(contents);
            localStorage.setItem("rainbowEnabled", "false")
        }
    });

}
