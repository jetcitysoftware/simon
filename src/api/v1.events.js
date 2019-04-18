'use strict';

const getChars = (num) => {
  return [...Array(num)].map(i=>(~~(Math.random() * 36)).toString(36));
};

const events = io => {

  io.on('connection', socket => {

    console.log(`Socket connected with id ${socket.id}...`);
    console.log('Your app is connected');

    let num = 1;
    let wins = 0;

    let chars = getChars(num);
    socket.emit('output', `Quick ... type these characters: ${chars.join('  ')}`);

    socket.on('input', payload => {

      const correct = payload === chars.join('');

      let message = '';

      if ( correct ) {
        message = 'CORRECT!';
        num++;
        wins++;
      }
      else {
        message =  `You Lose, but you had ${wins} Correct Guesses!`;
        num = 1;
        wins = 0;
      }

      socket.emit('output', message);

      chars = getChars( num );

      socket.emit('output', `GO: ${chars.join(' ')}`);

    });
    socket.on('disconnect', () => console.log(`Goodbye client: ${socket.id}`));
  });
};

module.exports = events;
