<?php

namespace App\Http\Controllers;

use App\Mail\ContactMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function sendEmail(Request $request)
        {
            // Valida i dati del form
            $validatedData = $request->validate([
                'firstName' => 'required|string',
                'lastName' => 'required|string',
                'email' => 'required|email',
                'phoneNumber' => 'required|string',
                'message' => 'required|string',
            ]);
    
            // Invia l'email
            try {
                Mail::to('java.dom-prova@libero.it')->send(new ContactMail($validatedData));
                return response()->json(['message' => 'Email inviata con successo!'], 200);
            } catch (\Exception $e) {
                return response()->json(['message' => 'Si è verificato un errore nell\'invio dell\'email.'], 500);
            }
        }
}
