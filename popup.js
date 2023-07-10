document.addEventListener("DOMContentLoaded", function () {
  var searchButtons = document.getElementsByClassName("searchButton");
  var list = document.getElementById("list");

  (() => {
    var localText = localStorage.getItem("text");
    if (checkInput(localText)) {
      addGoogleText(localText);
    } else {
      addValidLink(localText);
    }
  })();
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
    list.append(myAnchor);
  }

  function addValidLink(input) {
    var element = document.createElement("a");
    element.classList.add("searchButton");
    element.innerText = input;
    localStorage.setItem("text", input);

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
