document.addEventListener("DOMContentLoaded", function () {
  var searchButtons = document.getElementsByClassName("searchButton");
  var list = document.getElementById("list");
  var myLocalTodos = JSON.parse(localStorage.getItem("my-todos")) || [];

  if (myLocalTodos.length !== 0) {
    myLocalTodos.forEach(function (value) {
      if (checkInput(value)) {
        addGoogleText(value);
      } else {
        addValidLink(value);
      }
    });
  }
  function handleSearchGoogle() {
    var searchText = this.innerText;
    var searchQuery = encodeURIComponent(searchText);
    var searchURL = "https://www.google.com/search?q=" + searchQuery;
    window.open(searchURL, "_blank");
  }

  Array.from(searchButtons).forEach(function (button) {
    button.addEventListener("click", handleSearchGoogle);
  });

  var inputElement = document.getElementById("queryText");
  var addBtn = document.getElementById("add-btn");

  function checkInput(input) {
    var linkRegex =
      /^(https?:\/\/)?([\w-]+(\.[\w-]+)+\/?)([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])?$/;
    return linkRegex.test(input);
  }

  function addGoogleText() {
    var myAnchor = document.createElement("a");
    myAnchor.classList.add("searchButton");
    myAnchor.setAttribute("href", inputElement.value);
    myAnchor.setAttribute("target", "blank");
    myAnchor.textContent = input;
    if (!myLocalTodos.includes(input)) {
      myLocalTodos.push(input); //add in array
    }
    localStorage.setItem("my-todos", JSON.stringify(myLocalTodos)); //push in same key array
    list.append(myAnchor);
  }

  function addValidLink(input) {
    var element = document.createElement("a");
    element.classList.add("searchButton");
    element.innerText = input;
    if (!myLocalTodos.includes(input)) {
      myLocalTodos.push(input); //add in array
    }
    localStorage.setItem("my-todos", JSON.stringify(myLocalTodos)); //push in same key array
    element.addEventListener("click", handleSearchGoogle);
    list.append(element);
  }

  addBtn.addEventListener("click", function () {
    var input = inputElement.value;

    if (checkInput(input)) {
      addGoogleText(input);
    } else {
      addValidLink(input);
    }
  });
});
