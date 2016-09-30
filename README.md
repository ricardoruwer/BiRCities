# BiRCities for Laravel 5

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/456ea02a81164a9c925cb137b97596f1)](https://www.codacy.com/app/ricardoruwer/BiRCities?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=ricardoruwer/BiRCities&amp;utm_campaign=Badge_Grade)
[![Total Downloads](https://poser.pugx.org/ruwer/brcities/downloads)](https://packagist.org/packages/ruwer/brcities)
[![Build Status](https://img.shields.io/github/stars/ricardoruwer/bircities.svg)](https://github.com/ricardoruwer/bircities)

- A **Laravel 5** package containing all Brazilian cities to your database.
- Auto-fill the cities when you select the state. Built using **Vanilla JS**.
- Works well with [Cep Package](https://github.com/ricardoruwer/Cep).

## Installation

Run in your terminal:

```shell
composer require "ruwer/brcities":"dev-master"
```

Open the file **config/app.php** and add to "providers":

```php
'providers' => [
    // ...
    Ruwer\BRcities\BrcitiesServiceProvider::class,
],
```

Let's publish the package files into your project. Run in your terminal:

```shell
php artisan vendor:publish
```

Now you have the following files in your project:
- database/migrations/2014_10_12_000000_create_cities_table.php
- database/seeds/CitiesTableSeeder.php

You also have a copy of **brcities.js** in the following folders of your project:
- public/js/brcities.js
- resources/assets/js/brcities.js

So, run in your terminal:

```shell
composer dump-autoload
php artisan migrate
php artisan db:seed --class="CitiesTableSeeder"
```

Done! :)

## Model

Now you can use your new model **City**, e.g.:
```php
use Ruwer\BRcities\City;

$states = City::select("state")->distinct("state")->orderBy("state")->get();
$pr_cities = City::where("state", "=", "PR")->orderBy("name")->get();
```

## Routes

You also have the following routes returning JSON, e.g.:
- myproject.dev/states
- myproject.dev/cities/PR

## Usage

Create your form:

```html
<form id="form">
  <select name="state" class="js-state"></select>
  <select name="city" class="js-city"></select>
</form>
```

Include the .js file:

```html
<script src="{{ asset('js/brcities.js') }}"></script>
```

Call the script:

```html
<script>
  var cities = new Cities("#form");
</script>
```

## Options

Define the **class**:

```javascript
//My Personal Options
var options = {
  stateInput: ".js-state", //default
  cityInput:  ".js-city", //default
  short: false //default (Long state names)
}

//Call the Script
var cities = new Cities("#form", options);
```

Set **placeholders**:

```html
<select name="state" class="js-state">
    <option value="">Please select...</option>
</select>
<select name="city" class="js-city">
    <option value="">Please select the state first...</option>
</select>
```

**Default** value:

```html
<select name="state" class="js-state" value="PR"></select>
<select name="city" class="js-city" value="3595"></select>
```
