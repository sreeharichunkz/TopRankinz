<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;

class ArtisanCommandController extends Controller
{
    public function runCommand(Request $request)
    {
        
        $command = $request->query('command');
        $parameters = $request->except('command');
        $path = $request->query('path', '');

        if ($command) {
            if ($path) {
                // Change the working directory to the specified path
                chdir(base_path($path));
            }

            // Run the Artisan command
            Artisan::call($command,$parameters);

            return response()->json([
                'status' => 'success',
                'message' => Artisan::output(),
            ]);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'Command not specified.',
            ]);
        }
    }
}
