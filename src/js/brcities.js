!(function () {
  this.Cities = function () {
    //Default options
    var defaults = {
      stateInput: ".js-state",
      cityInput: ".js-city",
      short: false
    }

    this.el = document.querySelector(arguments[0]);
    if ( ! this.el) return false;

    this.options = extendDefaults(defaults, arguments[1]);
    this.arguments = arguments;

    this.init();
  }


  /**
   * Initialize plugin
   */
  Cities.prototype.init = function () {
    var cityInput = this.el.querySelector(this.options.cityInput),
        stateInput = this.el.querySelector(this.options.stateInput);

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
    var cityInput = this.el.querySelector(this.options.cityInput),
        state = event.srcElement.value;

    //If the state is empty
    if ( ! state) {
      clearInput(cityInput);

      if (this.cityPlaceholder) {
        cityInput.appendChild(this.cityPlaceholder);
      } else {
        cityInput.innerHTML = ' ';
      }

      return false;
    }

    //The URL to get cities
    var url = "/cities/" + state;

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        clearInput(cityInput);

        var response = JSON.parse(xmlhttp.responseText);

        var city;
        for (city in response) {
          if (response.hasOwnProperty(city)) {
            var option = document.createElement("OPTION");
            option.value = city;
            option.text = response[city];

            //Define the default value
            if (cityInput.hasAttribute("value")) {
              if (cityInput.getAttribute("value") == option.value) {
                option.selected = true;
                cityInput.removeAttribute("value");
              }
            }

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
  Cities.prototype.states = function () {
    var stateInput = this.el.querySelector(this.options.stateInput),
        url = "/states";

    if (this.statePlaceholder) {
      stateInput.appendChild(this.statePlaceholder);
    }

    var states = {
      'AC': 'Acre',
      'AL': 'Alagoas',
      'AM': 'Amazonas',
      'AP': 'Amapá',
      'BA': 'Bahia',
      'CE': 'Ceará',
      'DF': 'Distrito Federal',
      'ES': 'Espírito Santo',
      'GO': 'Goiás',
      'MA': 'Maranhão',
      'MT': 'Mato Grosso',
      'MS': 'Mato Grosso do Sul',
      'MG': 'Minas Gerais',
      'PA': 'Pará',
      'PB': 'Paraíba',
      'PR': 'Paraná',
      'PE': 'Pernambuco',
      'PI': 'Piauí',
      'RJ': 'Rio de Janeiro',
      'RN': 'Rio Grande do Norte',
      'RO': 'Rondônia',
      'RS': 'Rio Grande do Sul',
      'RR': 'Roraima',
      'SC': 'Santa Catarina',
      'SE': 'Sergipe',
      'SP': 'São Paulo',
      'TO': 'Tocantins'
    }

    var self = this;

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var response = JSON.parse(xmlhttp.responseText);

        var state;
        for (state in response) {
          if (response.hasOwnProperty(state)) {
            var option = document.createElement("OPTION");

            if (self.options.short) {
              option.text = option.value = state;
            } else {
              option.value = state;
              option.text = states[state];
            }

            //Define the default value
            if (stateInput.hasAttribute("value")) {
              if (stateInput.getAttribute("value") == option.value) {
                option.selected = true;
              }
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
