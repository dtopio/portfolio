<x-mail::message>
# New contact form message

**Name:** {{ $contactMessage->name }}
**Email:** {{ $contactMessage->email }}

{{ $contactMessage->message }}

<x-mail::button :url="config('app.url')">
View portfolio
</x-mail::button>

Sent from the contact form on your portfolio site.
</x-mail::message>
