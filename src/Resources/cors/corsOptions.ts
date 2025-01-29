import  env  from '../constants/env';
import allowedOrigins, { allowedOriginPatterns } from './allowedOrigins';

import { CorsOptions } from 'cors';

const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
        if (env.APP_ENV === 'development') {
            callback(null, true);
            return;
        }

        const isAllowedOrigin = allowedOrigins.indexOf(origin!) !== -1 || !origin;
        const matchesPattern =
            origin && allowedOriginPatterns.some((pattern) => pattern.test(origin));

        if (isAllowedOrigin || matchesPattern) {
            callback(null, true);
        } else {
            callback(new Error(`${origin} Is Not allowed by CORS`));
        }
    },

    optionsSuccessStatus: 200,
    credentials: true,
};

export default corsOptions;
