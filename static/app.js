var filterEl = document.getElementById('filter');
var typeFilterEl = document.getElementById('type-filter');
var sizeFilterEl = document.getElementById('size-filter');
filterEl.focus();

const FILE_TYPES = {
    images: ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp'],
    documents: ['pdf', 'doc', 'docx', 'txt', 'md', 'rtf', 'odt'],
    videos: ['mp4', 'avi', 'mov', 'mkv', 'webm', 'flv']
};

function filter() {
    var q = filterEl.value.trim().toLowerCase();
    var type = typeFilterEl.value;
    var size = sizeFilterEl.value;
    var elems = document.querySelectorAll('tr.file');

    elems.forEach(function(el) {
        var nameEl = el.querySelector('.name');
        var nameVal = nameEl.textContent.trim().toLowerCase();
        var extension = el.dataset.extension;
        var sizeBytes = parseInt(el.dataset.sizeBytes, 10);
        var isDir = el.querySelector('svg use').getAttribute('xlink:href') === '#folder';

        var nameMatch = nameVal.indexOf(q) !== -1;

        var typeMatch = false;
        if (type === 'all') {
            typeMatch = true;
        } else if (type === 'folders') {
            typeMatch = isDir;
        } else {
            typeMatch = !isDir && FILE_TYPES[type] && FILE_TYPES[type].includes(extension);
        }

        var sizeMatch = false;
        if (size === 'all' || isDir) {
            sizeMatch = true;
        } else {
            const megabyte = 1024 * 1024;
            if (size === 'small') {
                sizeMatch = sizeBytes < megabyte;
            } else if (size === 'medium') {
                sizeMatch = sizeBytes >= megabyte && sizeBytes <= 10 * megabyte;
            } else if (size === 'large') {
                sizeMatch = sizeBytes > 10 * megabyte;
            }
        }

        if (nameMatch && typeMatch && sizeMatch) {
            el.style.display = '';
        } else {
            el.style.display = 'none';
        }
    });
}

function localizeDatetime(e, index, ar) {
    if (e.textContent === undefined) {
        return;
    }
    var d = new Date(e.getAttribute('datetime'));
    if (isNaN(d)) {
        d = new Date(e.textContent);
        if (isNaN(d)) {
            return;
        }
    }
    e.textContent = d.toLocaleString([], {day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit"});
}
var timeList = Array.prototype.slice.call(document.getElementsByTagName("time"));
timeList.forEach(localizeDatetime);
var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
    sURLVariables = sPageURL.split('&'),
    sParameterName,
    i;
    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};
function toggle(className){
    var order = getUrlParameter('order');
    var elements = document.getElementsByClassName(className);
    for(var i = 0, length = elements.length; i < length; i++) {
        var currHref = elements[i].href;
        if(order=='desc'){
            var chg = currHref.replace('desc', 'asc');
            elements[i].href = chg;
        }
        if(order=='asc'){
            var chg = currHref.replace('asc', 'desc');
            elements[i].href = chg;
        }
    }
};
function readableFileSize(size) {
    var units = ['B', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
    var i = 0;
    while(size >= 1024) {
        size /= 1024;
        ++i;
    }
    return parseFloat(size).toFixed(2) + ' ' + units[i];
}
function changeSize() {
    var sizes = document.getElementsByTagName("size");
    for (var i = 0; i < sizes.length; i++) {
        humanSize = readableFileSize(sizes[i].innerHTML);
        sizes[i].innerHTML = humanSize
    }
}
function colorHeader() {
    const h1 = document.querySelector('h1');
    if (!h1) return;
    const links = h1.querySelectorAll('a');
    const colors = ['#4285F4', '#EA4335', '#FBBC05', '#4285F4', '#34A853', '#EA4335'];

    links.forEach((link, linkIndex) => {
        link.style.color = colors[linkIndex % colors.length];
    });
}

// Theme switcher logic
(function() {
    const settingsButton = document.getElementById('settings-button');
    const settingsPanel = document.getElementById('settings-panel');
    const themeButtons = document.querySelectorAll('.theme-button');
    const body = document.body;

    if (!settingsButton) {
        return;
    }

    // Toggle settings panel
    settingsButton.addEventListener('click', () => {
        settingsPanel.classList.toggle('hidden');
    });

    // Function to set the theme
    const setTheme = (theme) => {
        // Remove all theme classes
        body.classList.remove('theme-light', 'theme-blue');

        // Add the selected theme class if it's not the default dark theme
        if (theme !== 'dark') {
            body.classList.add(`theme-${theme}`);
        }

        // Update active state on buttons
        themeButtons.forEach(button => {
            if (button.dataset.theme === theme) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });

        // Save theme to local storage
        localStorage.setItem('theme', theme);
    };

    // Add click event listeners to theme buttons
    themeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const selectedTheme = button.dataset.theme;
            setTheme(selectedTheme);
        });
    });

    // Load saved theme from local storage
    const savedTheme = localStorage.getItem('theme') || 'dark'; // Default to dark theme
    setTheme(savedTheme);
})();
