
export default (() => {
  let counter = 0;
  return function( prefix ) {
    let guid = (+new Date()).toString( 32 ),
      i = 0;
    for ( ; i < 5; i++ ) {
      guid += Math.floor( Math.random() * 65535 ).toString( 32 );
    }
    return (prefix || 'wu_') + guid + (counter++).toString( 32 );
  };
})()
