const allowedOrigins = [
    'http://localhost:2001',
,
   
    // Add frontend url
];

export const allowedOriginPatterns = [
    //add frontend url regex
    /^http:\/\/localhost:(\d)+$/,
    /.+\.local$/,
    // Add other patterns as needed
];

export default allowedOrigins;
