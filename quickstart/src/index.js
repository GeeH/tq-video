const {connect, createLocalTracks} = require('twilio-video');
const axios = require('axios');

const dateNow = new Date();
const roomName = '30ILB3WBNCVTTWP';
const url = "https://www.twilio.com/quest/video/token/" + roomName + "/" + dateNow.getTime();

const localTracks = createLocalTracks({
    audio: true,
    video: {width: 320}
}).then(tracks => {
    document.getElementById('remote-media-div').appendChild(tracks[1].attach());
});

axios.get(url)
    .then(function (response) {
        const token = response.data.token;

        connect(token, {
            name: roomName,
            track: localTracks,
        })
            .then(room => {
                console.log(room);
                console.log(`Successfully joined a Room: ${room}`);

                let muteButton = document.getElementById('btn-mute');
                muteButton.onclick = function () {

                    room.localParticipant.audioTracks.forEach(track => {
                        if (track.isEnabled) {
                            track.disable();
                            muteButton.innerText = "Unmute";
                        } else {
                            track.enable();
                            muteButton.innerText = "Mute";
                        }
                    });
                };

                room.on('participantConnected', participant => {
                    console.log(`A remote Participant connected: ${participant}`);

                    participant.tracks.forEach(track => {
                        document.getElementById('remote-media-div').appendChild(track.attach());
                    });

                    participant.on('trackSubscribed', track => {
                        document.getElementById('remote-media-div').appendChild(track.attach());
                    });

                });
            }, error => {
                console.error(`Unable to connect to Room: ${error.message}`);
            });
    });
