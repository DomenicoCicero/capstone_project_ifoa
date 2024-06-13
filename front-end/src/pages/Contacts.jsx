import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";

import { LuMapPin, LuPhone, LuMail, LuFacebook, LuInstagram } from "react-icons/lu";
import { useState } from "react";
import axios from "axios";

const Contacts = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    message: "",
  });

  // const handleSubmit = e => {
  //   e.preventDefault();
  //   axios
  //     .post(`/api/send-email`, formData)
  //     .then(response => {
  //       console.log(response.data.message); // Log per debug
  //       alert("Email inviata con successo!");
  //       setFormData({
  //         firstName: "",
  //         lastName: "",
  //         email: "",
  //         phoneNumber: "",
  //         message: "",
  //       });
  //       // if (response.status === 200) {
  //       //   // gestire alert
  //       //   console.log("email inviata con successo");
  //       //   setFormData({
  //       //     firstName: "",
  //       //     lastName: "",
  //       //     email: "",
  //       //     phoneNumber: "",
  //       //     message: "",
  //       //   });
  //       // } else {
  //       //   throw new Error("Errore nell'invio della mail");
  //       // }
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };

  return (
    <>
      <Container>
        <Row className="my-5 justify-content-center">
          <Col sm={12} md={10} lg={5} className="mb-2 mb-lg-4 py-4">
            <h3 className="fw-bold">
              Hai domande o hai bisogno di maggiori informazioni sui nostri servizi?
              <br />
              Non esitare a contattarci.
            </h3>
            <div className="icon-box mt-4">
              <p className="text-myGrey"> DOVE TROVARCI</p>
              <p>
                <LuMapPin strokeWidth={1} fill="#f48f02" className="styled-icon text-white" />
                Via Roma..., 90020 Palermo - PA
              </p>
              <p className="mt-4 text-myGrey">CONTATTACI</p>
              <p>
                <LuPhone strokeWidth={0} fill="#f48f02" className="styled-icon me-1 text-white" />
                3333333333
              </p>
              <p>
                <LuMail strokeWidth={1} fill="#f48f02" className="styled-icon me-1 text-white" />
                ciao@gmail.com
              </p>
              <p className="mt-4 text-myGrey">SEGUICI SUI SOCIAL</p>
              <Link type="button" id="first-button" className="icon-circle me-2">
                <LuFacebook />
              </Link>
              <Link type="button" id="first-button" className="icon-circle">
                <LuInstagram />
              </Link>
            </div>
          </Col>

          <Col sm={12} md={10} lg={6} className="offset-lg-1 mb-4 py-4">
            <Form>
              {/* <Form onSubmit={handleSubmit}> */}
              <Row className="mb-3">
                <Form.Group as={Col} controlId="firstName">
                  <Form.Label className="label-of-forms">Nome</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nome"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={e => {
                      setFormData({
                        ...formData,
                        firstName: e.target.value,
                      });
                    }}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="lastName">
                  <Form.Label className="label-of-forms">Cognome</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Cognome"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={e => {
                      setFormData({
                        ...formData,
                        lastName: e.target.value,
                      });
                    }}
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="email">
                  <Form.Label className="label-of-forms">Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="La tua mail"
                    name="email"
                    required
                    value={formData.email}
                    onChange={e => {
                      setFormData({
                        ...formData,
                        email: e.target.value,
                      });
                    }}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="phoneNumber">
                  <Form.Label className="label-of-forms">Numero di Telefono</Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="Numero di telefono"
                    name="phoneNumber"
                    required
                    value={formData.phoneNumber}
                    onChange={e => {
                      setFormData({
                        ...formData,
                        phoneNumber: e.target.value,
                      });
                    }}
                  />
                </Form.Group>
              </Row>
              <Form.Group className="mb-4" controlId="message">
                <Form.Label className="label-of-forms">Messaggio</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  placeholder="Scrivi quì il tuo messaggio"
                  name="message"
                  required
                  value={formData.message}
                  onChange={e => {
                    setFormData({
                      ...formData,
                      message: e.target.value,
                    });
                  }}
                />
              </Form.Group>

              <Button type="submit" id="first-button" className="px-4">
                Invia Messaggio
              </Button>
            </Form>
          </Col>
        </Row>
        <div className="d-flex justify-content-start mt-5">
          <Button type="button" id="first-button" onClick={() => navigate("/")}>
            Torna alla HomePage
          </Button>
        </div>
      </Container>
    </>
  );
};

export default Contacts;

// 1.
// import React, { useState } from 'react';

// const ContactForm = () => {
//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         message: ''
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prevState => ({
//             ...prevState,
//             [name]: value
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         // Invia i dati al backend per l'invio dell'email
//         try {
//             const response = await fetch('/api/send-email', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(formData),
//             });

//             if (response.ok) {
//                 alert('Email inviata con successo!');
//                 setFormData({
//                     name: '',
//                     email: '',
//                     message: ''
//                 });
//             } else {
//                 alert('Si è verificato un problema nell\'invio dell\'email.');
//             }
//         } catch (error) {
//             console.error('Errore durante l\'invio dell\'email:', error);
//             alert('Si è verificato un errore durante l\'invio dell\'email.');
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Nome" required />
//             <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
//             <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Messaggio" rows="4" required />
//             <button type="submit">Invia</button>
//         </form>
//     );
// };

// export default ContactForm;

// 2. rotta
// use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Route;
// use App\Http\Controllers\ContactController;

// Route::post('/send-email', [ContactController::class, 'sendEmail']);

// 3. controller
// php artisan make:controller ContactController

// 4.
// <?php

// namespace App\Http\Controllers;

// use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Mail;
// use App\Mail\ContactMail;

// class ContactController extends Controller
// {
//     public function sendEmail(Request $request)
//     {
//         // Valida i dati del form
//         $validatedData = $request->validate([
//             'name' => 'required|string',
//             'email' => 'required|email',
//             'message' => 'required|string',
//         ]);

//         // Invia l'email
//         try {
//             Mail::to('tua@email.com')->send(new ContactMail($validatedData));
//             return response()->json(['message' => 'Email inviata con successo!'], 200);
//         } catch (\Exception $e) {
//             return response()->json(['message' => 'Si è verificato un errore nell\'invio dell\'email.'], 500);
//         }
//     }
// }

// 5. classe mail
// php artisan make:mail ContactMail

// 6.
// <?php

// namespace App\Mail;

// use Illuminate\Bus\Queueable;
// use Illuminate\Contracts\Queue\ShouldQueue;
// use Illuminate\Mail\Mailable;
// use Illuminate\Queue\SerializesModels;

// class ContactMail extends Mailable
// {
//     use Queueable, SerializesModels;

//     public $contactData;

//     public function __construct($contactData)
//     {
//         $this->contactData = $contactData;
//     }

//     public function build()
//     {
//         return $this->view('emails.contact')
//                     ->from($this->contactData['email'])
//                     ->subject('Nuovo messaggio di contatto dal sito eCommerce');
//     }
// }

// 7. Crea una nuova vista per l'email in resources/views/emails/contact.blade.php:

// 8.
// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <title>Nuovo messaggio di contatto</title>
// </head>
// <body>
//     <p><strong>Nome:</strong> {{ $contactData['name'] }}</p>
//     <p><strong>Email:</strong> {{ $contactData['email'] }}</p>
//     <p><strong>Messaggio:</strong></p>
//     <p>{{ $contactData['message'] }}</p>
// </body>
// </html>
