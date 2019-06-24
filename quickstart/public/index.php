<?php
require_once ('../../vendor/autoload.php');

use Twilio\Jwt\AccessToken;
use Twilio\Jwt\Grants\VideoGrant;
// Required for all Twilio access tokens
$twilioAccountSid = '';
$twilioApiKey = '';
$twilioApiSecret = '';

// A unique identifier for this user
$userIdentity = 'Zaphod';
// The specific Room we'll allow the user to access
$roomName = '42';

// Create access token, which we will serialize and send to the client
$token = new AccessToken(
        $twilioAccountSid, $twilioApiKey, $twilioApiSecret, 3600, $userIdentity
);

// Create Video grant
$videoGrant = new VideoGrant();
$videoGrant->setRoom($roomName);

// Add grant to token
$token->addGrant($videoGrant);
// render token to string
//echo $token->toJWT();
die();

?><!DOCTYPE html>
<html>
<head>
    <title>Stream Stuff</title>
    <link rel="stylesheet" href="index.css">
</head>
<body>
<button id="btn-mute">Mute</button>
<div id="remote-media-div"></div>

<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
<script src="index.js"></script>
</body>
</html>