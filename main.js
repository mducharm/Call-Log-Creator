

// Constructor for Section object
function Section(name, string) {
    this.name = name; // header
    this.string = string; // string that is added to call log
    this.items = []; // array of list items
}

function getOrStoreObject() {
    var getData = localStorage.getItem("data");

    // if it doesn't exist, create inital sections:
    if (getData === null) {
        var initSection = new Section("Call Status", "");
        var initSection2 = new Section("Identify Plan", "Identified Plan: ");
        var initSection3 = new Section("General", "Discussed the following: ");
        initSection.items = [
            "V2V",
            "LVM",
            "PUHU",
            "NIS"
        ];
        initSection2.items = [
            "FA",
            "OOP",
            "Payment Plan",
            "Military Benefits",
            "Private Loans",
            "Scholarships",
            "Tuition Reimbursement",
            "Tuition Assistance",
            "Third - Party"
        ];
        initSection3.items = [
            "FAFSA",
            "Types of Loans",
            "Responsible Borrowing",
            "Tuition Cost",
            "Reviewed Scholarship",
            "Disbursement & Refunds",
            "SAP Policy",
            "Tuition Due Date",
            "TuP Role"
        ];
        var data = {
            "section0": initSection,
            "section1": initSection2,
            "section2": initSection3,
        }
        localStorage.setItem("data", JSON.stringify(data));
        return data;
    } else {
        // parse if it already exists in localStorage
        data = JSON.parse(getData);
        return data;
    }
}

var data = getOrStoreObject();

// Iterate through all Section objects within data
// Generates elements and adds to DOM
var i;
for (i = 0; i < Object.keys(data).length; i++) {
    // vars for data keys & section.items 
    var dataKeys = Object.keys(data);
    var sectionItems = data[dataKeys[i]].items;

    // Create Elements
    var container = document.createElement("DIV");
    var header = document.createElement("DIV");
    var list = document.createElement("UL");

    container.id = dataKeys[i];

    header.classList.add("list-header");
    var headerText = document.createTextNode(data[dataKeys[i]].name);
    header.appendChild(headerText);

    var dropdown = document.getElementById("sectionDropdown");
    var option = document.createElement("option");
    var optionText = document.createTextNode(data[dataKeys[i]].name);
    option.value = dataKeys[i];
    option.appendChild(optionText);
    dropdown.appendChild(option);

    list.id = dataKeys[i] + "UL";

    var logInput = document.createElement("input");
    var logInputBtn = document.createElement("span");
    logInput.id = dataKeys[i] + "Input";
    logInput.className = "logInput";
    logInputBtn.textContent = "Save";
    logInputBtn.className = "addBtn";
    logInputBtn.style = "width: 20%;";

    list.appendChild(logInput);
    list.appendChild(logInputBtn);

    // Add items to each section
    var h;
    for (h = 0; h < sectionItems.length; h++) {
        var item = document.createElement("LI");
        var text = document.createTextNode(sectionItems[h]);
        var span = document.createElement("SPAN");
        var x = document.createTextNode("\u00D7");
        span.className = "close";
        span.onclick = function () {
            var div = this.parentElement;
            // var text = div.textContent.substring(0, div.textContent.length - 1);

            // div.style.display = "none";

            // removes from page:
            div.parentElement.removeChild(div);
        }

        span.appendChild(x);
        item.appendChild(text);
        item.appendChild(span);
        list.appendChild(item);


    }

    // Add finished header & list elements to container
    container.appendChild(header);
    container.appendChild(list);

    // Add section container to main container
    document.getElementById("list-container").appendChild(container);
}


// adds close button to each list item
// var myNodeList = document.getElementsByTagName("LI");
// var i;
// for (i = 0; i < myNodeList.length; i++) {
//     var span = document.createElement("SPAN");
//     var txt = document.createTextNode("\u00D7");
//     span.className = "close";
//     span.appendChild(txt);
//     myNodeList[i].appendChild(span);
// }

// click on close button to delete element
// var close = document.getElementsByClassName("close");
// var i;
// for (i = 0; i < close.length; i++) {
//     close[i].onclick = function () {
//         var div = this.parentElement;
//         var text = div.textContent.substring(0, div.textContent.length - 1);

//         // div.style.display = "none";

//         // removes from page:
//         div.parentElement.removeChild(div);
//     }
// }

// Iterates through each list, adding event listeners
var i;
for (i = 0; i < Object.keys(data).length; i++) {
    var dataKeys = Object.keys(data);
    var queryList = document.querySelector("#" + dataKeys[i]);
    queryList.addEventListener('click', function (ev) {
        if (ev.target.tagName === 'LI') {
            // change CSS if toggled
            ev.target.classList.toggle('checked');

            var callLogString = "";

            // Iterate through each list and generate log based on checked items
            var h;
            for (h = 0; h < Object.keys(data).length; h++) {
                var listID = dataKeys[h] + "UL";
                var inputID = dataKeys[h] + "Input";

                // get all checked items within list:
                var checkedItems = document.getElementById(listID).getElementsByClassName("checked");


                if (checkedItems.length > 0) {

                    // Start callLogString with section's text input, only add space if not blank
                    if (document.getElementById(inputID).value !== ""){
                        callLogString += document.getElementById(inputID).value + " ";
                    }
                    
                    // Add checked items to callLogString
                    var x;
                    for (x = 0; x < checkedItems.length; x++) {
                        if (x !== checkedItems.length - 1) {
                            callLogString += checkedItems[x].firstChild.data + ", ";
                        } else {
                            callLogString += checkedItems[x].firstChild.data + "\n";
                        }
                    }
                }
            }

            document.getElementById("callLog").innerHTML = callLogString;

        }
    }, false);
}



// Create new list item when clicking add

function newElement() {
    // Creates li element and adds to section
    var li = document.createElement("li");
    var dropdownValue = document.getElementById("sectionDropdown").value;
    var inputValue = document.getElementById("myInput").value;
    var t = document.createTextNode(inputValue);
    li.appendChild(t);
    if (inputValue === '') {
        alert("Blank");
    } else {
        document.getElementById(dropdownValue + "UL").appendChild(li);
    }
    document.getElementById("myInput").value = "";

    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    span.onclick = function () {
        var div = this.parentElement;
        // var text = div.textContent.substring(0, div.textContent.length - 1);

        // div.style.display = "none";

        // removes from page:
        div.parentElement.removeChild(div);
    }

    li.appendChild(span);

    // for (i = 0; i < close.length; i++) {
    //     close[i].onclick = function () {
    //         var div = this.parentElement;
    //         div.style.display = "none";
    //     }
    // }
}
console.log(getOrStoreObject());
function newSection() {
    var inputValue = document.getElementById("myInput2").value;
    if (inputValue === '') {
        alert("Section Input Blank");
    } else {
        var sectionObject = new Section(inputValue, "");
        data["section"+Object.keys(data).length] = sectionObject;
        localStorage.setItem("data", JSON.stringify(data));

        
    }
}

function copyText() {
    var copyText = document.getElementById("callLog");
    copyText.select();
    document.execCommand("copy");
}