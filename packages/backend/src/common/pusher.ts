import { resolve } from 'node:path';
import { config } from 'dotenv';
import * as PusherServer from 'pusher';

const __DEV__ = process.env.NODE_ENV === 'development';

const envConfig = config({
  path: __DEV__
    ? resolve(process.cwd(), '../../.dev.env')
    : resolve(process.cwd(), '../../.prod.env'),
});

export const pusherServer = new PusherServer({
  appId: envConfig.parsed.PUSHER_APP_ID!,
  key: envConfig.parsed.NEXT_PUBLIC_PUSHER_APP_KEY!,
  secret: envConfig.parsed.PUSHER_APP_SECRET!,
  cluster: envConfig.parsed.PUSHER_APP_CLUSTER!,
  useTLS: true,
});
