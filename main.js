

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
        var initSection0 = new Section("Call Status", "");
        var initSection1 = new Section("Identify Plan", "Identified Plan: ");
        var initSection2 = new Section("General", "Reviewed: ");
        var initSection3 = new Section("Next Step", "Next Step: ");
        var initSection4 = new Section("Emails", "Emails Needed: ");
        initSection0.items = [
            "V2V",
            "LVM",
            "PUHU",
            "NIS"
        ];
        initSection1.items = [
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
        initSection2.items = [
            "FAFSA",
            "DRT",
            "Types of Loans",
            "Responsible Borrowing",
            "Tuition Cost",
            "Reviewed Scholarships",
            "Disbursement & Refunds",
            "SAP Policy",
            "Tuition Due Date",
            "TuP Role"
        ];
        initSection3.items = [
            "FAFSA",
            "Verification Docs",
            "Accept Award",
            "Entrance Counseling",
            "MPN",

        ];
        initSection4.items = [
            "Intro",
            "Payment Options",
            "School Resources & Policies",
            "FA Award Information",
        ];
        var data = {
            "section0": initSection0,
            "section1": initSection1,
            "section2": initSection2,
            "section3": initSection3,
            "section4": initSection4,
        }
        localStorage.setItem("data", JSON.stringify(data));
        return data;
    } else {
        // parse if it already exists in localStorage
        data = JSON.parse(getData);
        return data;
    }
}

function getOrStoreObject2() {
    var getData = localStorage.getItem("data2");

    // if it doesn't exist, create inital sections:
    if (getData === null) {
        var initSection0 = new Section("Call Status", "");
        var initSection1 = new Section("General", "Discussed: ");
        var initSection2 = new Section("Next Step", "Next Step: ");
        var initSection3 = new Section("Emails", "Emails Needed: ");
        initSection0.items = [
            "V2V",
            "LVM",
            "PUHU",
            "NIS"
        ];
        initSection1.items = [
            "Program Requirements",
            "EC Role",
            "Employment Background",
            "Cost",
        ];
        initSection2.items = [
            "APP",
            "OTR",
            "SO Transcript",
            "LOR",
            "FAFSA",
        ];
        initSection3.items = [
            "Post-INT",
            "ACP",
            "OTR",
            "Orientation links",
        ];
        var data = {
            "section0": initSection0,
            "section1": initSection1,
            "section2": initSection2,
            "section3": initSection3,
        }
        localStorage.setItem("data2", JSON.stringify(data));
        return data;
    } else {
        // parse if it already exists in localStorage
        data = JSON.parse(getData);
        return data;
    }
}

function choosePreset() {
    var dropdown = document.getElementById("presetDropdown");
    var dropdownVal = dropdown.options[dropdown.selectedIndex].text;

    if (dropdownVal == "Tuition Planner") {
        localStorage.setItem("chosenPreset", "data");
        location.reload();
    } else if (dropdownVal == "Enrollment Counselor") {
        localStorage.setItem("chosenPreset", "data2");
        location.reload();
    }
}

var chosenPreset = localStorage.getItem("chosenPreset");

if (chosenPreset == null) {
    // defaults to TuP one
    var data = getOrStoreObject();
    localStorage.setItem("chosenPreset", "data");
    chosenPreset = localStorage.getItem("chosenPreset"); // sets chosenPreset from null to "data"
} else if (chosenPreset == "data") {
    var data = getOrStoreObject(); // gets data for TuP
    // change preset option to selected
    var dropdown = document.getElementById("presetDropdown");
    for (i = 0; i < dropdown.options.length; i++) {
        if (dropdown.options[i].value == "data") {
            dropdown.options[i].selected = true;
        }
    }
} else if (chosenPreset == "data2") {
    // EC preset
    var data = getOrStoreObject2();
    // change preset option to selected
    var dropdown = document.getElementById("presetDropdown");
    for (var i = 0; i < dropdown.options.length; i++) {
        if (dropdown.options[i].value == "data2") {
            dropdown.options[i].selected = true;
        }
    }
}

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

    // Creates section header
    header.classList.add("list-header");
    var headerText = document.createTextNode(data[dataKeys[i]].name);
    header.appendChild(headerText);

    // Add section options to dropdown menus
    var dropdown = document.getElementById("sectionDropdown");
    var delDropdown = document.getElementById("delSectionDropdown");
    var option = document.createElement("option");
    var optionText = document.createTextNode(data[dataKeys[i]].name);
    option.value = dataKeys[i];
    option.appendChild(optionText);
    var delOption = option.cloneNode(true);

    dropdown.appendChild(option); // adds to addItem dropdown
    delDropdown.appendChild(delOption); // adds to delete dropdown

    list.id = dataKeys[i] + "UL";


    // Create the log input for each section
    var logInput = document.createElement("input");
    var logInputBtn = document.createElement("span");
    logInput.id = dataKeys[i] + "Input";
    logInput.className = "logInput";
    logInput.placeholder = "Add tagline...";
    logInput.value = data[dataKeys[i]].string;
    // this saves input any time the user types anything in the text box
    logInput.onkeyup = function () {
        var sectionName = this.parentElement.parentElement.id;
        data[sectionName].string = this.value;
        localStorage.setItem(chosenPreset, JSON.stringify(data));
    };
    // logInputBtn.textContent = "Save";
    // logInputBtn.className = "addBtn";
    // logInputBtn.style = "width: 20%;";

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
            // Removes item from local storage and html

            var div = this.parentElement;
            var sectionID = this.parentElement.parentElement.parentElement.id;
            var text = div.textContent.substring(0, div.textContent.length - 1);

            // Get index of text in data and remove from section.items
            var index = data[sectionID].items.indexOf(text);
            data[sectionID].items.splice(index, 1);
            // sets section.items to a new array with the value filtered out
            localStorage.setItem(chosenPreset, JSON.stringify(data));

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
                var listID = Object.keys(data)[h] + "UL";
                var inputID = Object.keys(data)[h] + "Input";


                // get all checked items within list:
                var checkedItems = document.getElementById(listID).getElementsByClassName("checked");

                if (checkedItems.length > 0) {

                    // Start callLogString with section's text input, only add space if not blank
                    if (document.getElementById(inputID).value !== "") {
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
    // Check if blank
    var inputValue = document.getElementById("myInput").value;
    if (inputValue === '') {
        alert("Item Input Blank");
    } else {
        var dropdownValue = document.getElementById("sectionDropdown").value;

        // Saves item into local storage
        data[dropdownValue].items.push(inputValue);
        localStorage.setItem(chosenPreset, JSON.stringify(data));

        // Create li element, add input text to it, append it to section element
        var li = document.createElement("li");

        var t = document.createTextNode(inputValue);
        li.appendChild(t);



        document.getElementById("myInput").value = ""; // reset input to blank
        var span = document.createElement("SPAN");
        var txt = document.createTextNode("\u00D7");
        span.className = "close";
        span.appendChild(txt);

        // on click, remove from page
        span.onclick = function () {
            // Removes item from local storage and html
            var div = this.parentElement;
            var sectionID = this.parentElement.parentElement.parentElement.id;
            var text = div.textContent.substring(0, div.textContent.length - 1);

            // Get index of text in data and remove from section.items
            var index = data[sectionID].items.indexOf(text);
            data[sectionID].items.splice(index, 1);
            // sets section.items to a new array with the value filtered out
            localStorage.setItem(chosenPreset, JSON.stringify(data));

            // removes from page:
            div.parentElement.removeChild(div);
        }

        // Adds event listener to new item
        li.addEventListener('click', function (ev) {
            if (ev.target.tagName === 'LI') {
                // change CSS if toggled
                ev.target.classList.toggle('checked');
                li.classList.toggle('checked');

                var callLogString = "";
                var dataKeys = Object.keys(data);
                // Iterate through each list and generate log based on checked items
                var h;
                for (h = 0; h < Object.keys(data).length; h++) {
                    var listID = dataKeys[h] + "UL";
                    var inputID = dataKeys[h] + "Input";

                    // get all checked items within list:
                    var checkedItems = document.getElementById(listID).getElementsByClassName("checked");


                    if (checkedItems.length > 0) {

                        // Start callLogString with section's text input, only add space if not blank
                        if (document.getElementById(inputID).value !== "") {
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

        li.appendChild(span);
        document.getElementById(dropdownValue + "UL").appendChild(li);
    }




    // for (i = 0; i < close.length; i++) {
    //     close[i].onclick = function () {
    //         var div = this.parentElement;
    //         div.style.display = "none";
    //     }
    // }
}

// Creates new section, adds it to DOM and saves to localStorage
function newSection() {
    var inputValue = document.getElementById("myInput2").value;

    // Create array of section names to check for already existing sections
    var sectionNames = [];
    for (i = 0; i < Object.keys(data).length; i++) {
        sectionNames.push(data["section" + i].name);
    }

    if (inputValue === '') { // if blank
        alert("Section Input Blank");
    } else if (sectionNames.includes(inputValue)) { // if in use
        alert("Section name already in use");
    } else { // runs code to create new section
        var sectionObject = new Section(inputValue, "");
        var sectionKey = "section" + Object.keys(data).length;
        data[sectionKey] = sectionObject;
        localStorage.setItem(chosenPreset, JSON.stringify(data));

        // Adds section option to dropdown
        var dropdown = document.getElementById("sectionDropdown");
        var option = document.createElement("option");
        var optionText = document.createTextNode(sectionObject.name);
        option.value = sectionKey;
        option.appendChild(optionText);
        dropdown.appendChild(option);

        // Add section options to dropdown menus
        option.appendChild(optionText);
        var delOption = option.cloneNode(true);

        // dropdown.appendChild(option); // adds to addItem dropdown
        delDropdown.appendChild(delOption); // adds to delete dropdown

        // Add to DOM
        var container = document.createElement("DIV");
        var header = document.createElement("DIV");
        var list = document.createElement("UL");

        container.id = sectionKey;

        // Creates section header
        header.classList.add("list-header");
        var headerText = document.createTextNode(data[sectionKey].name);
        header.appendChild(headerText);



        list.id = sectionKey + "UL";


        // Create the log input for each section
        var logInput = document.createElement("input");
        logInput.id = sectionKey + "Input";
        logInput.className = "logInput";
        logInput.value = data[sectionKey].string;
        // this saves input any time the user types anything in the text box
        logInput.onkeyup = function () {
            var sectionName = this.parentElement.parentElement.id;
            data[sectionName].string = this.value;
            localStorage.setItem(chosenPreset, JSON.stringify(data));
        };
        list.appendChild(logInput);

        // Add finished header & list elements to container
        container.appendChild(header);
        container.appendChild(list);

        // Add section container to main container
        document.getElementById("list-container").appendChild(container);
        document.getElementById("myInput2").value = ""; //resets input 

    }
}

function delSection() {
    // Prompts to see if you want to delete section
    var dropdown = document.getElementById("delSectionDropdown");
    var dropdownVal = dropdown.options[dropdown.selectedIndex].text;

    if (confirm("Are you sure you wish to delete " + dropdownVal + "?")) { // deletes section

        // Removes item from local storage and html
        var sectionElement = document.getElementById(dropdown.value);
        delete data[dropdown.value]; // deletes section key  
        localStorage.setItem(chosenPreset, JSON.stringify(data));

        console.log(data);
        // Removes from DOM:
        sectionElement.parentElement.removeChild(sectionElement);

        // Remove from dropdown menus        
        var addItemsDropdown = document.getElementById("sectionDropdown");

        var delOption = dropdown.options[dropdown.selectedIndex]
        var addOption = addItemsDropdown.options[dropdown.selectedIndex];

        delOption.parentElement.removeChild(delOption);
        addOption.parentElement.removeChild(addOption);


    } else {
        // does not delete
    }
}

function resetBtn() {
    if (confirm("Are you sure you wish to reset back to default settings? This cannot be reversed.")) {
        localStorage.clear();
        location.reload();
    } else {
        // does not reset
    }

}

// Allows you to hit enter to add items
var addItemInput = document.getElementById("myInput");
addItemInput.addEventListener('keypress', function (event) {
    if (event.keyCode == 13) {
        newElement();
    }
});

// Allows you to hit enter to add sections
var addSectionInput = document.getElementById("myInput2");
addSectionInput.addEventListener('keypress', function (event) {
    if (event.keyCode == 13) {
        newSection();
    }
});

function copyText() {
    var copyText = document.getElementById("callLog");
    copyText.select();
    document.execCommand("copy");
}

function exportJSON() {
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({"data": JSON.parse(localStorage.getItem("data")), "data2": JSON.parse(localStorage.getItem("data2"))}));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "CallLogSettings.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}


// Handle imported JSON
// var reader = new FileReader();
// var fileToRead = document.getElementById('file-input').files[0];

// reader.addEventListener("loadend", function() {
//     console.log(reader.result);
//     console.log(reader.readAsText(fileToRead));
// });



function importJSON() {
    var reader = new FileReader();
    var fileToRead = document.getElementById('file-input').files[0];

    reader.addEventListener("loadend", function () {
        // console.log(reader.result);
        try {
            var parsedStr = JSON.parse(reader.result);
            localStorage.setItem("data", JSON.stringify(parsedStr["data"]));
            localStorage.setItem("data2", JSON.stringify(parsedStr["data2"]));
            location.reload();
        } catch (error) {
            console.log(error);
        }
    });
    try {
        if (fileToRead) {
            reader.readAsText(fileToRead);
        } else {
            alert("No file imported.");
        }
        
    } catch (error) {
        console.log(error);
    }
}
