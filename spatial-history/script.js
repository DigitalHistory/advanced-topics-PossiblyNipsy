// initialize the variables we need
// we do this here to make sure we can access them
// whenever we need to -- they have 'global scope'
var my_map; // this will hold the map
var my_map_options; // this will hold the options we'll use to create the map
var my_center = new google.maps.LatLng(51.3898432,30.0933905); // center of map
var my_markers = []; // we use this in the main loop below to hold the markers
// this one is strange.  In google maps, there is usually only one
// infowindow object -- its content and position change when you click on a
// marker.  This is counterintuitive, but we need to live with it.
var infowindow = new google.maps.InfoWindow({content: ""});
var legendHTML = "<h1 style=color:white; font-weight:bold;>Legend <h4 style=color:white; font-weight:bold;>(Click to travel to marker location on map)</h4></h1>";

// I'm complicating things a bit with this next set of variables, which will help us
// to make multi-colored markers
var blueURL = "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";
var redURL = "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
var red_markers = [];
var blue_markers = [];

// this is for fun, if you want it.  With this powerful feature you can add arbitrary
// data layers to your map.  It's cool. Learn more at:
// https://developers.google.com/maps/documentation/javascript/datalayer#load_geojson

var tenCoords = [{lng: 30.18746, lat: 51.297852}, {lng: 30.18251, lat: 51.2939}, {lng: 30.17725, lat: 51.289791}, {lng: 30.174721, lat: 51.28793}, {lng: 30.1735, lat: 51.286911}, {lng: 30.16596, lat: 51.278179}, {lng: 30.165279, lat: 51.277672}, {lng: 30.161869, lat: 51.277599}, {lng: 30.1485, lat: 51.27673}, {lng: 30.13747, lat: 51.276112}, {lng: 30.136801, lat: 51.277222}, {lng: 30.13588, lat: 51.27895}, {lng: 30.13567, lat: 51.279171}, {lng: 30.13253, lat: 51.28083}, {lng: 30.12989, lat: 51.280609}, {lng: 30.129829, lat: 51.280399}, {lng: 30.131571, lat: 51.276211}, {lng: 30.130341, lat: 51.27594}, {lng: 30.12464, lat: 51.275539}, {lng: 30.110001, lat: 51.274761}, {lng: 30.105709, lat: 51.274761}, {lng: 30.103649, lat: 51.275162}, {lng: 30.10129, lat: 51.276192}, {lng: 30.09466, lat: 51.273621}, {lng: 30.08243, lat: 51.273151}, {lng: 30.076481, lat: 51.27327}, {lng: 30.06621, lat: 51.272411}, {lng: 30.05711, lat: 51.27187}, {lng: 30.052771, lat: 51.271709}, {lng: 30.05374, lat: 51.273209}, {lng: 30.054079, lat: 51.273972}, {lng: 30.05423, lat: 51.2747}, {lng: 30.0546, lat: 51.275162}, {lng: 30.0473, lat: 51.277012}, {lng: 30.04389, lat: 51.278091}, {lng: 30.038179, lat: 51.27927}, {lng: 30.032579, lat: 51.280869}, {lng: 30.032261, lat: 51.281681}, {lng: 30.03224, lat: 51.28265}, {lng: 30.035139, lat: 51.287029}, {lng: 30.035049, lat: 51.287521}, {lng: 30.034149, lat: 51.28793}, {lng: 30.027821, lat: 51.289749}, {lng: 30.026449, lat: 51.290298}, {lng: 30.024879, lat: 51.29052}, {lng: 30.02346, lat: 51.290501}, {lng: 30.02203, lat: 51.290821}, {lng: 30.01619, lat: 51.29258}, {lng: 30.01469, lat: 51.292171}, {lng: 30.010651, lat: 51.29335}, {lng: 30.00168, lat: 51.294392}, {lng: 29.99892, lat: 51.294819}, {lng: 29.998159, lat: 51.294498}, {lng: 29.997391, lat: 51.293468}, {lng: 29.996019, lat: 51.29298}, {lng: 29.994579, lat: 51.292721}, {lng: 29.978514, lat: 51.297401}, {lng: 29.976025, lat: 51.297401}, {lng: 29.97139, lat: 51.293701}, {lng: 29.970102, lat: 51.298584}, {lng: 29.947443, lat: 51.301964}, {lng: 29.947529, lat: 51.302876}, {lng: 29.950018, lat: 51.303413}, {lng: 29.952507, lat: 51.30835}, {lng: 29.96126, lat: 51.30743}, {lng: 29.96315, lat: 51.325989}, {lng: 29.949671, lat: 51.3283}, {lng: 29.910789, lat: 51.32814}, {lng: 29.89852, lat: 51.328411}, {lng: 29.890619, lat: 51.328461}, {lng: 29.87508, lat: 51.330021}, {lng: 29.873541, lat: 51.327759}, {lng: 29.847193, lat: 51.328896}, {lng: 29.791479, lat: 51.3283}, {lng: 29.784019, lat: 51.330448}, {lng: 29.78385, lat: 51.339458}, {lng: 29.780588, lat: 51.341335}, {lng: 29.760504, lat: 51.344608}, {lng: 29.757242, lat: 51.343803}, {lng: 29.74436, lat: 51.344391}, {lng: 29.741535, lat: 51.342731}, {lng: 29.740591, lat: 51.34005}, {lng: 29.735355, lat: 51.338547}, {lng: 29.737415, lat: 51.335064}, {lng: 29.730806, lat: 51.334473}, {lng: 29.72368, lat: 51.328781}, {lng: 29.727116, lat: 51.326534}, {lng: 29.732952, lat: 51.325623}, {lng: 29.738617, lat: 51.32423}, {lng: 29.744453, lat: 51.32262}, {lng: 29.745998, lat: 51.321171}, {lng: 29.742393, lat: 51.320312}, {lng: 29.733725, lat: 51.321171}, {lng: 29.729347, lat: 51.319565}, {lng: 29.718018, lat: 51.318115}, {lng: 29.707546, lat: 51.317738}, {lng: 29.696989, lat: 51.321384}, {lng: 29.695787, lat: 51.338871}, {lng: 29.69965, lat: 51.348518}, {lng: 29.688829, lat: 51.350449}, {lng: 29.682655, lat: 51.356667}, {lng: 29.676733, lat: 51.362831}, {lng: 29.679909, lat: 51.36937}, {lng: 29.68454, lat: 51.374668}, {lng: 29.511423, lat: 51.365242}, {lng: 29.512196, lat: 51.368889}, {lng: 29.512367, lat: 51.372906}, {lng: 29.508247, lat: 51.374298}, {lng: 29.504042, lat: 51.37521}, {lng: 29.503183, lat: 51.38089}, {lng: 29.501381, lat: 51.384628}, {lng: 29.493999, lat: 51.387478}, {lng: 29.488159, lat: 51.390629}, {lng: 29.495541, lat: 51.397919}, {lng: 29.511938, lat: 51.403755}, {lng: 29.520864, lat: 51.40424}, {lng: 29.527559, lat: 51.404827}, {lng: 29.532194, lat: 51.406918}, {lng: 29.53434, lat: 51.409538}, {lng: 29.538202, lat: 51.413128}, {lng: 29.544291, lat: 51.417889}, {lng: 29.547211, lat: 51.417671}, {lng: 29.55442, lat: 51.418739}, {lng: 29.563, lat: 51.41901}, {lng: 29.571409, lat: 51.418152}, {lng: 29.58094, lat: 51.415741}, {lng: 29.593731, lat: 51.40889}, {lng: 29.63201, lat: 51.415798}, {lng: 29.67046, lat: 51.421692}, {lng: 29.684029, lat: 51.421745}, {lng: 29.703598, lat: 51.423031}, {lng: 29.73844, lat: 51.4249}, {lng: 29.788141, lat: 51.428059}, {lng: 29.789, lat: 51.426613}, {lng: 29.796467, lat: 51.430145}, {lng: 29.803762, lat: 51.433411}, {lng: 29.812429, lat: 51.43539}, {lng: 29.819555, lat: 51.433571}, {lng: 29.827452, lat: 51.43325}, {lng: 29.831142, lat: 51.434212}, {lng: 29.834919, lat: 51.432018}, {lng: 29.837923, lat: 51.427952}, {lng: 29.844532, lat: 51.429825}, {lng: 29.849253, lat: 51.433304}, {lng: 29.84865, lat: 51.436878}, {lng: 29.85714, lat: 51.438381}, {lng: 29.86315, lat: 51.440842}, {lng: 29.87277, lat: 51.45031}, {lng: 29.88204, lat: 51.462132}, {lng: 29.894819, lat: 51.47031}, {lng: 29.90959, lat: 51.473888}, {lng: 29.91354, lat: 51.47266}, {lng: 29.91877, lat: 51.46759}, {lng: 29.924009, lat: 51.45871}, {lng: 29.929239, lat: 51.45668}, {lng: 29.933359, lat: 51.457748}, {lng: 29.952761, lat: 51.47261}, {lng: 29.970869, lat: 51.484161}, {lng: 29.99439, lat: 51.48875}, {lng: 30.019711, lat: 51.49036}, {lng: 30.051041, lat: 51.491161}, {lng: 30.081079, lat: 51.489929}, {lng: 30.10631, lat: 51.491531}, {lng: 30.136181, lat: 51.493881}, {lng: 30.16116, lat: 51.494099}, {lng: 30.18725, lat: 51.490841}, {lng: 30.200809, lat: 51.486938}, {lng: 30.21686, lat: 51.479351}, {lng: 30.23901, lat: 51.459671}, {lng: 30.24519, lat: 51.454861}, {lng: 30.247679, lat: 51.452244}, {lng: 30.25428, lat: 51.436241}, {lng: 30.270596, lat: 51.419979}, {lng: 30.278835, lat: 51.413876}, {lng: 30.287418, lat: 51.408524}, {lng: 30.288448, lat: 51.386673}, {lng: 30.293255, lat: 51.37146}, {lng: 30.296511, lat: 51.356129}, {lng: 30.292391, lat: 51.347118}, {lng: 30.289135, lat: 51.339085}, {lng: 30.274879, lat: 51.333401}, {lng: 30.252914, lat: 51.328789}, {lng: 30.245018, lat: 51.331364}, {lng: 30.236429, lat: 51.332111}, {lng: 30.22888, lat: 51.330608}, {lng: 30.22716, lat: 51.329159}, {lng: 30.22583, lat: 51.327599}, {lng: 30.22489, lat: 51.325859}, {lng: 30.224409, lat: 51.323959}, {lng: 30.22201, lat: 51.309368}, {lng: 30.21987, lat: 51.306839}, {lng: 30.21652, lat: 51.304428}, {lng: 30.212049, lat: 51.303028}, {lng: 30.207029, lat: 51.30188}, {lng: 30.2006, lat: 51.30167}, {lng: 30.20034, lat: 51.300968}, {lng: 30.193211, lat: 51.300701}, {lng: 30.18869, lat: 51.298752}];

var thirtyCoords = [{lng: 30.12039, lat: 51.119141}, {lng: 30.09786, lat: 51.130379}, {lng: 30.098289, lat: 51.131161}, {lng: 30.09181, lat: 51.132187}, {lng: 30.091574, lat: 51.132286}, {lng: 30.089697, lat: 51.132584}, {lng: 30.088924, lat: 51.132587}, {lng: 30.08807, lat: 51.13271}, {lng: 30.084686, lat: 51.131485}, {lng: 30.082647, lat: 51.129074}, {lng: 30.068562, lat: 51.128227}, {lng: 30.062542, lat: 51.128971}, {lng: 30.060089, lat: 51.130119}, {lng: 30.05752, lat: 51.129292}, {lng: 30.056738, lat: 51.129318}, {lng: 30.055929, lat: 51.129372}, {lng: 30.05509, lat: 51.129822}, {lng: 30.04899, lat: 51.130322}, {lng: 30.046053, lat: 51.130524}, {lng: 30.042994, lat: 51.130737}, {lng: 30.036514, lat: 51.131008}, {lng: 30.036278, lat: 51.130009}, {lng: 30.034679, lat: 51.130665}, {lng: 30.033232, lat: 51.131363}, {lng: 30.03162, lat: 51.132271}, {lng: 30.025442, lat: 51.133846}, {lng: 30.022438, lat: 51.134644}, {lng: 30.01968, lat: 51.135551}, {lng: 30.019121, lat: 51.128632}, {lng: 30.008898, lat: 51.128044}, {lng: 29.99864, lat: 51.127579}, {lng: 29.992558, lat: 51.127445}, {lng: 29.987097, lat: 51.127445}, {lng: 29.979458, lat: 51.127789}, {lng: 29.971809, lat: 51.127979}, {lng: 29.96838, lat: 51.130669}, {lng: 29.962971, lat: 51.130939}, {lng: 29.9592, lat: 51.13509}, {lng: 29.91894, lat: 51.13089}, {lng: 29.91757, lat: 51.142139}, {lng: 29.911221, lat: 51.142899}, {lng: 29.9083, lat: 51.13789}, {lng: 29.90126, lat: 51.136059}, {lng: 29.89311, lat: 51.135681}, {lng: 29.888821, lat: 51.133259}, {lng: 29.885811, lat: 51.133961}, {lng: 29.8841, lat: 51.137138}, {lng: 29.888821, lat: 51.137569}, {lng: 29.888729, lat: 51.142521}, {lng: 29.87903, lat: 51.14645}, {lng: 29.87525, lat: 51.147148}, {lng: 29.874571, lat: 51.149471}, {lng: 29.881519, lat: 51.14957}, {lng: 29.884701, lat: 51.152802}, {lng: 29.88641, lat: 51.156361}, {lng: 29.8859, lat: 51.160179}, {lng: 29.887791, lat: 51.16357}, {lng: 29.88315, lat: 51.171108}, {lng: 29.880751, lat: 51.171589}, {lng: 29.88135, lat: 51.186821}, {lng: 29.879629, lat: 51.196659}, {lng: 29.878429, lat: 51.20118}, {lng: 29.87414, lat: 51.206772}, {lng: 29.87114, lat: 51.207039}, {lng: 29.87011, lat: 51.210861}, {lng: 29.868219, lat: 51.221931}, {lng: 29.86813, lat: 51.2272}, {lng: 29.85878, lat: 51.232792}, {lng: 29.843149, lat: 51.23671}, {lng: 29.824789, lat: 51.244289}, {lng: 29.81423, lat: 51.25058}, {lng: 29.797409, lat: 51.252892}, {lng: 29.783331, lat: 51.255089}, {lng: 29.77458, lat: 51.255569}, {lng: 29.769171, lat: 51.25375}, {lng: 29.75853, lat: 51.253529}, {lng: 29.735689, lat: 51.251492}, {lng: 29.720591, lat: 51.25127}, {lng: 29.7108, lat: 51.258469}, {lng: 29.72024, lat: 51.266739}, {lng: 29.73638, lat: 51.270401}, {lng: 29.749769, lat: 51.271042}, {lng: 29.75835, lat: 51.272331}, {lng: 29.761789, lat: 51.28038}, {lng: 29.750629, lat: 51.287899}, {lng: 29.729509, lat: 51.287361}, {lng: 29.68763, lat: 51.282532}, {lng: 29.659821, lat: 51.271358}, {lng: 29.651751, lat: 51.26041}, {lng: 29.634239, lat: 51.251171}, {lng: 29.60849, lat: 51.255459}, {lng: 29.597679, lat: 51.257721}, {lng: 29.58704, lat: 51.255138}, {lng: 29.57382, lat: 51.25922}, {lng: 29.56266, lat: 51.260731}, {lng: 29.542919, lat: 51.258469}, {lng: 29.532619, lat: 51.264172}, {lng: 29.51511, lat: 51.269112}, {lng: 29.50687, lat: 51.271149}, {lng: 29.488331, lat: 51.26535}, {lng: 29.48078, lat: 51.252239}, {lng: 29.475969, lat: 51.23827}, {lng: 29.483179, lat: 51.231392}, {lng: 29.470131, lat: 51.22924}, {lng: 29.447821, lat: 51.2286}, {lng: 29.421379, lat: 51.232899}, {lng: 29.41177, lat: 51.237202}, {lng: 29.4049, lat: 51.243}, {lng: 29.411079, lat: 51.232899}, {lng: 29.39941, lat: 51.227089}, {lng: 29.386709, lat: 51.221291}, {lng: 29.375031, lat: 51.223652}, {lng: 29.36611, lat: 51.19978}, {lng: 29.37332, lat: 51.198269}, {lng: 29.37126, lat: 51.186871}, {lng: 29.39151, lat: 51.18536}, {lng: 29.398041, lat: 51.18235}, {lng: 29.40353, lat: 51.180199}, {lng: 29.428591, lat: 51.187729}, {lng: 29.44129, lat: 51.191818}, {lng: 29.449881, lat: 51.185791}, {lng: 29.46739, lat: 51.184719}, {lng: 29.48764, lat: 51.18515}, {lng: 29.496571, lat: 51.189449}, {lng: 29.52095, lat: 51.186661}, {lng: 29.535021, lat: 51.181919}, {lng: 29.54635, lat: 51.178692}, {lng: 29.55699, lat: 51.176971}, {lng: 29.58103, lat: 51.16901}, {lng: 29.607809, lat: 51.170078}, {lng: 29.637329, lat: 51.168579}, {lng: 29.650379, lat: 51.1591}, {lng: 29.644199, lat: 51.14941}, {lng: 29.61742, lat: 51.1464}, {lng: 29.597509, lat: 51.146832}, {lng: 29.58206, lat: 51.14101}, {lng: 29.574499, lat: 51.133469}, {lng: 29.54875, lat: 51.129162}, {lng: 29.524719, lat: 51.125931}, {lng: 29.48764, lat: 51.12529}, {lng: 29.457769, lat: 51.12809}, {lng: 29.43786, lat: 51.1255}, {lng: 29.428249, lat: 51.123779}, {lng: 29.34963, lat: 51.160179}, {lng: 29.328341, lat: 51.158031}, {lng: 29.32766, lat: 51.125931}, {lng: 29.319071, lat: 51.129162}, {lng: 29.30431, lat: 51.162331}, {lng: 29.303619, lat: 51.168362}, {lng: 29.287491, lat: 51.212261}, {lng: 29.28422, lat: 51.21677}, {lng: 29.281481, lat: 51.223869}, {lng: 29.280621, lat: 51.231071}, {lng: 29.268089, lat: 51.263741}, {lng: 29.300699, lat: 51.272758}, {lng: 29.30397, lat: 51.2705}, {lng: 29.308769, lat: 51.270931}, {lng: 29.31118, lat: 51.273941}, {lng: 29.32045, lat: 51.27351}, {lng: 29.331949, lat: 51.276951}, {lng: 29.326799, lat: 51.270828}, {lng: 29.33246, lat: 51.26997}, {lng: 29.336241, lat: 51.269321}, {lng: 29.35495, lat: 51.27351}, {lng: 29.386709, lat: 51.308609}, {lng: 29.386709, lat: 51.31097}, {lng: 29.39769, lat: 51.321491}, {lng: 29.39357, lat: 51.345188}, {lng: 29.393921, lat: 51.363419}, {lng: 29.39477, lat: 51.380459}, {lng: 29.35787, lat: 51.376492}, {lng: 29.374861, lat: 51.390419}, {lng: 29.383619, lat: 51.39513}, {lng: 29.39254, lat: 51.398338}, {lng: 29.40954, lat: 51.401772}, {lng: 29.428761, lat: 51.40284}, {lng: 29.43821, lat: 51.40134}, {lng: 29.44644, lat: 51.39888}, {lng: 29.463949, lat: 51.391281}, {lng: 29.477341, lat: 51.38892}, {lng: 29.486441, lat: 51.389992}, {lng: 29.491079, lat: 51.392879}, {lng: 29.490391, lat: 51.39502}, {lng: 29.491289, lat: 51.396839}, {lng: 29.49091, lat: 51.398022}, {lng: 29.503481, lat: 51.419628}, {lng: 29.51026, lat: 51.436699}, {lng: 29.51211, lat: 51.442719}, {lng: 29.514641, lat: 51.44857}, {lng: 29.519569, lat: 51.453999}, {lng: 29.52652, lat: 51.457001}, {lng: 29.53245, lat: 51.457851}, {lng: 29.540091, lat: 51.458038}, {lng: 29.54755, lat: 51.45681}, {lng: 29.565319, lat: 51.45269}, {lng: 29.578501, lat: 51.451839}, {lng: 29.584551, lat: 51.452671}, {lng: 29.592489, lat: 51.454159}, {lng: 29.597811, lat: 51.45871}, {lng: 29.60248, lat: 51.472401}, {lng: 29.605659, lat: 51.479431}, {lng: 29.6145, lat: 51.48811}, {lng: 29.620041, lat: 51.491669}, {lng: 29.62536, lat: 51.493351}, {lng: 29.66823, lat: 51.500511}, {lng: 29.68119, lat: 51.501419}, {lng: 29.697069, lat: 51.500938}, {lng: 29.71072, lat: 51.500031}, {lng: 29.71994, lat: 51.496021}, {lng: 29.72514, lat: 51.488541}, {lng: 29.72831, lat: 51.4841}, {lng: 29.73617, lat: 51.47245}, {lng: 29.74213, lat: 51.453999}, {lng: 29.74848, lat: 51.44804}, {lng: 29.75956, lat: 51.443062}, {lng: 29.765989, lat: 51.44239}, {lng: 29.771959, lat: 51.443199}, {lng: 29.78908, lat: 51.444801}, {lng: 29.799419, lat: 51.44603}, {lng: 29.809589, lat: 51.44582}, {lng: 29.828051, lat: 51.444698}, {lng: 29.837919, lat: 51.442471}, {lng: 29.8423, lat: 51.440418}, {lng: 29.84882, lat: 51.438061}, {lng: 29.856331, lat: 51.439259}, {lng: 29.86212, lat: 51.44183}, {lng: 29.87096, lat: 51.45079}, {lng: 29.88023, lat: 51.462559}, {lng: 29.89362, lat: 51.471062}, {lng: 29.90469, lat: 51.474079}, {lng: 29.909929, lat: 51.474751}, {lng: 29.91482, lat: 51.473331}, {lng: 29.920919, lat: 51.468121}, {lng: 29.92366, lat: 51.462349}, {lng: 29.92585, lat: 51.459351}, {lng: 29.92967, lat: 51.457851}, {lng: 29.93259, lat: 51.45887}, {lng: 29.936541, lat: 51.462021}, {lng: 29.95096, lat: 51.473042}, {lng: 29.970181, lat: 51.484909}, {lng: 29.994221, lat: 51.489819}, {lng: 30.01825, lat: 51.491322}, {lng: 30.050859, lat: 51.492279}, {lng: 30.081421, lat: 51.491112}, {lng: 30.10597, lat: 51.492821}, {lng: 30.13567, lat: 51.494949}, {lng: 30.16124, lat: 51.495171}, {lng: 30.188021, lat: 51.492069}, {lng: 30.20175, lat: 51.48801}, {lng: 30.21806, lat: 51.480629}, {lng: 30.231449, lat: 51.46962}, {lng: 30.24416, lat: 51.458488}, {lng: 30.256001, lat: 51.44453}, {lng: 30.27317, lat: 51.43367}, {lng: 30.29385, lat: 51.42345}, {lng: 30.306641, lat: 51.419552}, {lng: 30.325609, lat: 51.413342}, {lng: 30.345011, lat: 51.406429}, {lng: 30.34724, lat: 51.403221}, {lng: 30.347321, lat: 51.397541}, {lng: 30.34861, lat: 51.38372}, {lng: 30.34853, lat: 51.372311}, {lng: 30.34938, lat: 51.358219}, {lng: 30.346809, lat: 51.354092}, {lng: 30.33625, lat: 51.34911}, {lng: 30.3335, lat: 51.344818}, {lng: 30.349131, lat: 51.332809}, {lng: 30.366289, lat: 51.320469}, {lng: 30.38698, lat: 51.304428}, {lng: 30.395729, lat: 51.301048}, {lng: 30.404659, lat: 51.299122}, {lng: 30.41667, lat: 51.29734}, {lng: 30.43676, lat: 51.298199}, {lng: 30.448, lat: 51.29847}, {lng: 30.45916, lat: 51.296589}, {lng: 30.464911, lat: 51.294121}, {lng: 30.47006, lat: 51.289291}, {lng: 30.47349, lat: 51.28194}, {lng: 30.47298, lat: 51.275501}, {lng: 30.47864, lat: 51.269272}, {lng: 30.487061, lat: 51.267071}, {lng: 30.497959, lat: 51.265511}, {lng: 30.50989, lat: 51.266312}, {lng: 30.523359, lat: 51.265942}, {lng: 30.533581, lat: 51.263149}, {lng: 30.545851, lat: 51.25396}, {lng: 30.554649, lat: 51.249931}, {lng: 30.557091, lat: 51.24295}, {lng: 30.557949, lat: 51.23634}, {lng: 30.55538, lat: 51.23177}, {lng: 30.5516, lat: 51.23037}, {lng: 30.548849, lat: 51.230129}, {lng: 30.544821, lat: 51.23064}, {lng: 30.53787, lat: 51.232521}, {lng: 30.530569, lat: 51.235802}, {lng: 30.520269, lat: 51.234779}, {lng: 30.510361, lat: 51.232521}, {lng: 30.50667, lat: 51.23037}, {lng: 30.50238, lat: 51.2258}, {lng: 30.523359, lat: 51.210079}, {lng: 30.52924, lat: 51.205158}, {lng: 30.52984, lat: 51.20266}, {lng: 30.528601, lat: 51.200531}, {lng: 30.52594, lat: 51.197201}, {lng: 30.52113, lat: 51.193352}, {lng: 30.51482, lat: 51.189449}, {lng: 30.514441, lat: 51.18848}, {lng: 30.515039, lat: 51.187519}, {lng: 30.516319, lat: 51.186279}, {lng: 30.52087, lat: 51.184769}, {lng: 30.533581, lat: 51.184662}, {lng: 30.535419, lat: 51.184151}, {lng: 30.53821, lat: 51.182892}, {lng: 30.53933, lat: 51.181278}, {lng: 30.539579, lat: 51.179501}, {lng: 30.537701, lat: 51.17791}, {lng: 30.53529, lat: 51.17643}, {lng: 30.532419, lat: 51.175549}, {lng: 30.529539, lat: 51.174931}, {lng: 30.525209, lat: 51.174309}, {lng: 30.52087, lat: 51.174229}, {lng: 30.514561, lat: 51.175201}, {lng: 30.506371, lat: 51.177132}, {lng: 30.50272, lat: 51.177078}, {lng: 30.49976, lat: 51.17638}, {lng: 30.48963, lat: 51.167278}, {lng: 30.490749, lat: 51.137508}, {lng: 30.493919, lat: 51.13073}, {lng: 30.497101, lat: 51.126579}, {lng: 30.50263, lat: 51.123749}, {lng: 30.50894, lat: 51.121059}, {lng: 30.513321, lat: 51.116291}, {lng: 30.5165, lat: 51.111549}, {lng: 30.516581, lat: 51.107422}, {lng: 30.516411, lat: 51.104221}, {lng: 30.51568, lat: 51.103111}, {lng: 30.51272, lat: 51.10239}, {lng: 30.50869, lat: 51.101791}, {lng: 30.50079, lat: 51.100929}, {lng: 30.493919, lat: 51.099739}, {lng: 30.488171, lat: 51.097988}, {lng: 30.48534, lat: 51.096191}, {lng: 30.409809, lat: 51.09058}, {lng: 30.40346, lat: 51.088638}, {lng: 30.39809, lat: 51.08794}, {lng: 30.394569, lat: 51.08733}, {lng: 30.38166, lat: 51.087669}, {lng: 30.35968, lat: 51.09037}, {lng: 30.347321, lat: 51.092201}, {lng: 30.34329, lat: 51.092579}, {lng: 30.33205, lat: 51.095379}, {lng: 30.32655, lat: 51.100449}, {lng: 30.32029, lat: 51.103519}, {lng: 30.32037, lat: 51.107941}, {lng: 30.316681, lat: 51.112301}, {lng: 30.312389, lat: 51.11871}, {lng: 30.31076, lat: 51.121731}, {lng: 30.300369, lat: 51.120171}, {lng: 30.297029, lat: 51.121571}, {lng: 30.292561, lat: 51.120708}, {lng: 30.28904, lat: 51.1213}, {lng: 30.28055, lat: 51.118172}, {lng: 30.27754, lat: 51.117531}, {lng: 30.277201, lat: 51.1157}, {lng: 30.25548, lat: 51.11047}, {lng: 30.2384, lat: 51.113838}, {lng: 30.23214, lat: 51.11483}, {lng: 30.2251, lat: 51.115318}, {lng: 30.22448, lat: 51.11636}, {lng: 30.22143, lat: 51.116692}, {lng: 30.21834, lat: 51.11676}, {lng: 30.216631, lat: 51.115898}, {lng: 30.21154, lat: 51.116402}, {lng: 30.21092, lat: 51.117378}, {lng: 30.205811, lat: 51.117512}, {lng: 30.205271, lat: 51.12048}, {lng: 30.19969, lat: 51.12064}, {lng: 30.198879, lat: 51.119881}, {lng: 30.198641, lat: 51.118118}, {lng: 30.19615, lat: 51.118038}, {lng: 30.195379, lat: 51.112148}, {lng: 30.185341, lat: 51.112888}, {lng: 30.18051, lat: 51.112888}, {lng: 30.169701, lat: 51.112621}, {lng: 30.16152, lat: 51.11372}, {lng: 30.15753, lat: 51.113731}, {lng: 30.1556, lat: 51.114891}, {lng: 30.151199, lat: 51.115349}, {lng: 30.14835, lat: 51.11541}, {lng: 30.145691, lat: 51.11552}, {lng: 30.14382, lat: 51.11866}, {lng: 30.13764, lat: 51.118469}, {lng: 30.13097, lat: 51.11768}, {lng: 30.12719, lat: 51.117378}, {lng: 30.12425, lat: 51.117989}];

var tenKm = new google.maps.Polygon({
  paths: tenCoords,
  strokeColor: 'red',
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: 'red',
  fillOpacity: 0.5,
  map: my_map,
});
var thirtyKm = new google.maps.Polygon({
  paths: thirtyCoords,
  strokeColor: 'orange',
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: 'orange',
  fillOpacity: 0.5,
  map:my_map,
});
/* a function that will run when the page loads.  It creates the map
 and the initial marker.  If you want to create more markers, do it here. */
function initializeMap() {
    my_map_options = {
        center:  my_center, // to change this value, change my_center above
        zoom: 10,  // higher is closer-up
        mapTypeId: google.maps.MapTypeId.HYBRID // you can also use TERRAIN, STREETMAP, SATELLITE
    };

    // this one line creates the actual map
    my_map = new google.maps.Map(document.getElementById("map_canvas"),
                                 my_map_options);
    // this is an *array* that holds all the marker info
    var all_my_markers =
            [{position: new google.maps.LatLng(51.3898432,30.0933905),
              map: my_map,
              icon: redURL, // this sets the image that represents the marker in the map to the one
                             // located at the URL which is given by the variable blueURL, see above
              title: "Chernobyl Reactor #4",
              window_content: "<h3 style=color:white>Reactor #4</h3><p> This is the reactor that exploded, presently encased in a large sarcophagus</p>" + '<img title="the sarcophagus as it exists today. Source: BBC" src="http://ichef.bbci.co.uk/wwfeatures/wm/live/1600_900/images/live/p0/4n/3c/p04n3c88.jpg" id="picture"/>'
             },
             {position: new google.maps.LatLng(51.4040078,30.052143),
              map: my_map,
              icon: blueURL, // this sets the image that represents the marker in the map
              title: "Pripyat",
              window_content: "<h3 style=color:white>Pripyat</h3><p> An abandoned city that housed plant workers and their families. There are <a href='https://chernobyl-tour.com/english/'>tours</a> that take one through the ghost town.</p>"
            },
            {position: new google.maps.LatLng(50.4468248,30.5516682),
             map: my_map,
             icon: redURL, // this sets the image that represents the marker in the map
             title: "Kiev",
             window_content: '<h3 style=color:white>Kiev</h3><p> This is Kiev, current capital of Ukraine. If the plant were closer to the city, the catastrophe would have been far greater.</p>'
           },
            {position: new google.maps.LatLng(/*51.303568,30.212978*/),
             map: my_map,
             icon: redURL,
             title: "10km Exclusion Zone Border",
             window_content: "<h3 style='color: red'>Border of the 10km Exclusion Zone</h3> <p>This is where the 10km Exlcusion Zone ends, over the Pripyat River. Note that the river travels south through Chernobyl city, connecting to the Dnieper river that runs right through Kiev.</p>"
           },
            {position: new google.maps.LatLng(/*51.100949,30.501776*/),
             map: my_map,
             icon: redURL,
             title: "10km Exclusion Zone Border",
             window_content: "<h3 style='color:orange'>Border of the 30km Exclusion Zone</h3> <p>Although containing lower amounts of radiation, the area within this zone is still considered unsafe to inhabit. Note that it covers part of the Dnieper river, connecting to Kiev.</p>"
           },
            ];

    for (j = 0; j < all_my_markers.length; j++) {
        var marker =  new google.maps.Marker({
            position: all_my_markers[j].position,
            map: my_map,
            icon: all_my_markers[j].icon,
            title: all_my_markers[j].title,
            window_content: all_my_markers[j].window_content});

        // this next line is ugly, and you should change it to be prettier.
        // be careful not to introduce syntax errors though.
      legendHTML +=
        "<div class=\"pointer\" onclick=\"locateMarker(my_markers[" + j + "])\"> " +
          marker.window_content + "</div>";
        marker.info = new google.maps.InfoWindow({content: marker.window_content});
        var listener = google.maps.event.addListener(marker, 'click', function() {
            // if you want to allow multiple info windows, uncomment the next line
            // and comment out the two lines that follow it
            //this.info.open(this.map, this);
            infowindow.setContent (this.window_content);
            infowindow.open(my_map, this);
        });
        my_markers.push({marker:marker, listener:listener});
        if (all_my_markers[j].icon == blueURL ) {
            blue_markers.push({marker:marker, listener:listener});
        } else if (all_my_markers[j].icon == redURL ) {
            red_markers.push({marker:marker, listener:listener});
        }

    }
    document.getElementById("map_legend").innerHTML = legendHTML;
  my_map.data.addGeoJson(myGeoJSON);

  my_map.data.setStyle(function (feature) {
    var thisColor = feature.getProperty("myColor");
    return {
      fillColor: thisColor,
      strokeColor: thisColor,
      strokeWeight: 5
    };

});
}

// this hides all markers in the array
// passed to it, by attaching them to
// an empty object (instead of a real map)
function hideMarkers (marker_array) {
    for (var j in marker_array) {
        marker_array[j].marker.setMap(null);
    }
}
// by contrast, this attaches all the markers to
// a real map object, so they reappear
function showMarkers (marker_array, map) {
    for (var j in marker_array) {
        marker_array[j].marker.setMap(map);
    }
}

//global variable to track state of markers

var markersHidden = false;

function toggleMarkers (marker_array, map) {
  for (var j in marker_array) {
    if (markersHidden) {
      marker_array[j].marker.setMap(map);
    } else {
      marker_array[j].marker.setMap(null);
    }
  }
  markersHidden = !markersHidden;
}


// I added this for fun.  It allows you to trigger the infowindow
// form outside the map.
function locateMarker (marker) {
    console.log(marker);
    my_map.panTo(marker.marker.position);
    google.maps.event.trigger(marker.marker, 'click');
}
