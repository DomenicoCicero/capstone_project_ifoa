{{-- <x-mail::message>
# Introduction

The body of your message.

<x-mail::button :url="''">
Button Text
</x-mail::button>

Thanks,<br>
{{ config('app.name') }}
</x-mail::message> --}}

@component('mail::message')
# Benvenuto, {{ $user->name }}!

Grazie per esserti registrato sul nostro sito.

@component('mail::button', ['url' => ''])
Vai al sito
@endcomponent

Grazie,<br>
{{ config('app.name') }}
@endcomponent