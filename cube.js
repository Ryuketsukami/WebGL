
var gl;
var points;

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas ); // this is like a one line initialization
    if ( !gl ) { alert( "WebGL isn't available" ); }


    var vertices = new Float32Array([-1, -1, 0, 0, 1, -1]);//typed array in javascript is a javascript object that acts like a c type aray, and probably works faster
    var new_vertices = [
        vec4( -0.5, -0.5, 0.5, 1.0 ),
        vec4( -0.5, 0.5, 0.5, 1.0 ),
        vec4( 0.5, 0.5, 0.5, 1.0 ),
        vec4( 0.5, -0.5, 0.5, 1.0 ),
        vec4( -0.5, -0.5, -0.5, 1.0 ),
        vec4( -0.5, 0.5, -0.5, 1.0 ),
        vec4( 0.5, 0.5, -0.5, 1.0 ),
        vec4( 0.5, -0.5, -0.5, 1.0 )];

    var vertexColors = [ // could have done the same as above, but decided to do javascript array of javascript array
        [ 0.0, 0.0, 0.0, 1.0], // black
        [ 1.0, 0.0, 0.0, 1.0], // this is all rgb
        [ 1.0, 1.0, 0.0, 1.0],
        [ 0.0, 1.0, 0.0, 1.0],
        [ 0.0, 0.0, 1.0, 1.0],
        [ 0.0, 0.0, 1.0, 1.0],
        [ 0.0, 1.0, 1.0, 1.0],
        [ 1.0, 1.0, 1.0, 1.0]
    ];
    //  Configure WebGL

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    //  Load shaders and initialize attribute buffers

    var program = initShaders( gl, "vertex-shader", "fragment-shader" ); // these are the two shaders assigned in the html file, this program is some kind of container for all the stuff and shaders we will be using, we can also set a lot of program objects and switch them back and forth
    gl.useProgram( program );

    // Load the data into the GPU

    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    //gl.bufferData( gl.ARRAY_BUFFER,vertices, gl.STATIC_DRAW ); // now our data is on the gpu

    // Load the cube instead

    gl.bufferData( gl.ARRAY_BUFFER,vertices, gl.STATIC_DRAW )

    // Associate out shader variables with our data buffer

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    render();
};


function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.TRIANGLE_FAN, 0, 3 );
}