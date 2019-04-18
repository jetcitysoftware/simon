'use strict';

const getChars = (num) => {
  return [...Array(num)].map(i=>(~~(Math.random()*36)).toString(36));
};

const events = io => {

  io.on('connection', socket => {

    console.log(`Socket connected with id ${socket.id}...`);
    console.log('Your app is connected');

    let chars = getChars(3);
    socket.emit('output', `Quick ... type these characters: ${chars.join('  ')}`);

    socket.on('input', payload => {

      const correct = payload === chars.join('');

      socket.emit('output', correct ? 'CORRECT!' : 'Nope, Try Again');

      chars = getChars(3);
      socket.emit('output', `Quick ... type these characters: ${chars.join('  ')}`);

    });
    socket.on('disconnect', () => console.log(`Goodbye client: ${socket.id}`));
  });
};

module.exports = events;
