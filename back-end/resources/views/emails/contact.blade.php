 <!DOCTYPE html>
 <html lang="en">
 <head>
     <meta charset="UTF-8">
     <title>Nuovo messaggio di contatto</title>
 </head>
 <body>
     <p><strong>Nome:</strong> {{ $contactData['firstName'] }}</p>
     <p><strong>Cognome:</strong> {{ $contactData['lastName'] }}</p>
     <p><strong>Email:</strong> {{ $contactData['email'] }}</p>
     <p><strong>Numero Telefonico:</strong> {{ $contactData['phoneNumber'] }}</p>
     <p><strong>Messaggio:</strong></p>
     <p>{{ $contactData['message'] }}</p>
 </body>
 </html>
