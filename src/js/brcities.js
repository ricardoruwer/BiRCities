!(function() {
  this.Cities = function() {
    //Default options
    var defaults = {
      stateInput: ".js-state",
      cityInput: ".js-city",
    }

    //Initialize plugin
    this.options = defaults;
    this.arguments = arguments;
    this.init();
  }


  /**
   * Initialize plugin
   */
  Cities.prototype.init = function() {
    //Form argument (default: <form>)
    if (typeof this.arguments[0] === "undefined") {
      this.arguments[0] = "form";
    }

    //Get the user personal options
    if (this.arguments[1] && typeof this.arguments[1] === "object") {
      this.options = extendDefaults(this.options, this.arguments[1]);
    }

    //Get the user's selected form
    this.el = document.querySelectorAll(this.arguments[0])[0];

    //Get Inputs
    var cityInput = this.el.querySelectorAll(this.options.cityInput)[0];
    var stateInput = this.el.querySelectorAll(this.options.stateInput)[0];

    //Get the placeholders (defined by user)
    if (stateInput.firstChild) {
      this.statePlaceholder = stateInput.firstElementChild;
    }

    if (cityInput.firstChild) {
      this.cityPlaceholder = cityInput.firstElementChild;
    }

    //Fill states
    this.states();

    //Initialize change event
    var self = this;
    stateInput.addEventListener("change", function(event) {
      self.cities(event);
    });
  }


  /**
   * Get cities of the given state
   */
  Cities.prototype.cities = function(event) {
    var cityInput = this.el.querySelectorAll(this.options.cityInput)[0];
    var state = event.srcElement.value;

    //If the state is empty
    if (!state) {
      clearInput(cityInput);

      if (this.cityPlaceholder) {
        cityInput.appendChild(this.cityPlaceholder);
      }
      else {
        cityInput.innerHTML = ' ';
      }

      return false;
    }

    //The URL to get cities
    var url = "cities/" + state;

    //Get the cities with Ajax
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        //Clear old results
        clearInput(cityInput);

        //The response
        var response = JSON.parse(xmlhttp.responseText);

        var city;
        for (city in response) {
          if (response.hasOwnProperty(city)) {
            //Append the <option>
            var option = document.createElement("OPTION");
            option.value = city;
            option.text = response[city];
            cityInput.appendChild(option);
          }
        }
      }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  }


  /**
   * Fill the <select> with all states
   */
  Cities.prototype.states = function() {
    var stateInput = this.el.querySelectorAll(this.options.stateInput)[0];
    var url = "states";

    //Placeholder for state <select>
    if (this.statePlaceholder) {
      stateInput.appendChild(this.statePlaceholder);
    }

    //Get the states with Ajax
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var response = JSON.parse(xmlhttp.responseText);

        var state;
        for (state in response) {
          if (response.hasOwnProperty(state)) {
            //Append the <option>
            var option = document.createElement("OPTION");
            option.text = option.value = state;

            //Define the default value
            if (stateInput.getAttribute("value") == option.value) {
              option.selected = true;
            }

            stateInput.appendChild(option);
          }
        }

        //If the selected state isn't null, execute the change event
        var selected = stateInput.options[stateInput.selectedIndex].value;

        if (response.hasOwnProperty(selected)) {
          stateInput.dispatchEvent(new CustomEvent("change"));
        }
      }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  }


  //Clear old inputs
  function clearInput(input) {
    while (input.firstChild) {
      input.removeChild(input.firstChild);
    }
  }


  //Extend Defaults with User Options
  function extendDefaults(source, properties) {
    var property;

    for (property in properties) {
      if (properties.hasOwnProperty(property)) {
        source[property] = properties[property];
      }
    }
    return source;
  }
}());
