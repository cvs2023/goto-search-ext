document.addEventListener("DOMContentLoaded", function () {
  var searchCards = document.getElementsByClassName("searchCard");
  var list = document.getElementById("list");
  var myLocalTodos = JSON.parse(localStorage.getItem("my-todos")) || [];

  var flag = 1;

  /* fetching local storage intially */
  if (myLocalTodos.length !== 0) {
    myLocalTodos.forEach(function (value) {
      if (checkValidInput(value)) {
        addValidLink(value);
      } else {
        addGoogleText(value);
      }
    });
  }
  /* after showing prev added gotos we make the flag zero  */
  flag = 0;

  /* make it google link and open in new tab */
  function handleSearchGoogle() {
    var searchText = this.innerText;
    var searchQuery = encodeURIComponent(searchText);
    var searchURL = "https://www.google.com/search?q=" + searchQuery;

    window.open(searchURL, "_blank");
  }

  /* showing static cards into ui */
  Array.from(searchCards).forEach(function (button) {
    button.addEventListener("click", handleSearchGoogle);
  });

  var inputElement = document.getElementById("queryText");
  var addBtn = document.getElementById("add-btn");

  /* check whether input is valid link or not */
  function checkValidInput(input) {
    var linkRegex =
      /^(https?:\/\/)?([\w-]+(\.[\w-]+)+\/?)([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])?$/;
    return linkRegex.test(input);
  }

  /* if its a normal text for google search use addGoogleText */

  function addGoogleText(input) {
    var myAnchor = document.createElement("a");
    myAnchor.classList.add("searchCard");
    myAnchor.setAttribute("href", input);
    myAnchor.setAttribute("target", "blank");
    myAnchor.textContent = input;

    /* for intially loading local storage data into ui and after that below if condition will work */
    if (flag == 1) {
      list.append(myAnchor);
    }

    /*  whatever goes into ui list and local */
    if (!myLocalTodos.includes(input)) {
      myLocalTodos.push(input); //add in array
      localStorage.setItem("my-todos", JSON.stringify(myLocalTodos)); //push in same key array
      list.append(myAnchor);
    }
  }
  /* if its a valid link use addValidLink */
  function addValidLink(input) {
    var element = document.createElement("a");
    element.classList.add("searchCard");
    element.innerText = input;

    /* for intially loading local storage data into ui and after that below if condition will work */
    if (flag == 1) {
      list.append(element);
    }
    /*  whatever goes into ui list and local */
    if (!myLocalTodos.includes(input)) {
      myLocalTodos.push(input); //add in array
      localStorage.setItem("my-todos", JSON.stringify(myLocalTodos)); //push in same key array
      element.addEventListener("click", handleSearchGoogle);
      list.append(element);
    }
  }

  /* add dynamic  goto search text and add acc to link or text*/
  addBtn.addEventListener("click", function () {
    var input = inputElement.value;

    if (checkValidInput(input)) {
      addValidLink(input);
    } else {
      addGoogleText(input);
    }
  });
});
