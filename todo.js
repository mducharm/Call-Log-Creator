
// adds close button to each list item
var myNodeList = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodeList.length; i++) {
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    myNodeList[i].appendChild(span);
}

// click on close button to hide item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
        var div = this.parentElement;
        div.style.display = "none";
    }
}

var list = document.querySelector('ul');
list.addEventListener('click', function (ev) {
    if (ev.target.tagName === 'LI') {
        ev.target.classList.toggle('checked');

        // update call log box based on checked items
        var checkedItems = document.getElementsByClassName("checked");
        var i;
        var callLogString = "V2V \nDiscussed the following: ";
        for (i = 0; i < checkedItems.length; i++) {
            if (i !== checkedItems.length - 1) {
                callLogString += checkedItems[i].firstChild.data + ", ";
            } else {
                callLogString += checkedItems[i].firstChild.data + " ";
            }
            document.getElementById("callLog").innerHTML = callLogString;
        }
        console.log(callLogString);
        console.log(ev);
        console.log(ev.target.childNodes[0].data);
    }
}, false);

// Create new list item when clicking add

function newElement() {
    var li = document.createElement("li");
    var inputValue = document.getElementById("myInput").value;
    var t = document.createTextNode(inputValue);
    li.appendChild(t);
    if (inputValue === '') {
        alert("Blank");
    } else {
        document.getElementById("myUL").appendChild(li);
    }
    document.getElementById("myInput").value = "";

    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);

    for (i = 0; i < close.length; i++) {
        close[i].onclick = function () {
            var div = this.parentElement;
            div.style.display = "none";
        }
    }
}

function copyText() {
    var copyText = document.getElementById("callLog");
    copyText.select();
    document.execCommand("copy");
}