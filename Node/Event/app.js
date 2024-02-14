//원하면 이벤트를 만들고 콜백함수를 등록할 수도 있다.

const EventEmitter = require('events');

const emitter = new EventEmitter();

const callback1 = (args) => {
    console.log('first callback', args);
};

emitter.on('lee', callback1);


emitter.on('lee', (args)=>{
    console.log('second callback', args)
})

emitter.emit('lee', {message:1})
emitter.emit('lee', {message:2})

//특정 이벤트에 등록된 콜백함수 제거함
emitter.removeListener('lee',callback1);
emitter.emit('lee', {message:3})