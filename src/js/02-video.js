import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const STORAGE_KEY = 'videoplayer-current-time';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
    
const onPlay = function ({ duration, percent, seconds }) {
    const currentTime = seconds;
    localStorage.setItem(STORAGE_KEY, currentTime);
};

player.on('timeupdate', throttle(onPlay, 1000)); 
    
player.getVideoTitle().then(function(title) {
    console.log('title:', title);
    });

player.setCurrentTime(localStorage.getItem(STORAGE_KEY));