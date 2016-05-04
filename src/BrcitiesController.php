<?php

namespace Ruwer\BRcities;

use App\Http\Controllers\Controller;
use Ruwer\BRcities\City;

class BrcitiesController extends Controller
{
    /**
     * Return all states from the database.
     */
    public function states()
    {
        return City::select('state')->distinct('state')->orderBy('state')->pluck('state', 'state');
    }

    /**
     * Return all cities for the given state.
     */
    public function cities($state)
    {
        return City::where('state', '=', $state)->orderBy('name')->pluck('name', 'id');
    }
}
