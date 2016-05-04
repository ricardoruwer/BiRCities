<?php

//Return states
Route::get('/states', 'Ruwer\BRcities\BrcitiesController@states');

//Return cities of the given state
Route::get('/cities/{state}', 'Ruwer\BRcities\BrcitiesController@cities');
