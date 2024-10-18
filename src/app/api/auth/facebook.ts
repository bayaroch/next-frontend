/* eslint-disable no-console */
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { accessToken } = req.body;
    console.log('Client Secret:', process.env.FACEBOOK_CLIENT_SECRET);

    try {
      // eslint-disable-next-line no-console

      // Exchange the short-lived token for a long-lived token
      const exchangeResponse = await fetch(
        `${process.env.NEXT_PUBLIC_GRAPH_API_URL}/oauth/access_token?grant_type=fb_exchange_token&client_id=${process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID}&client_secret=${process.env.FACEBOOK_CLIENT_SECRET}&fb_exchange_token=${accessToken}`
      );
      const exchangeData = await exchangeResponse.json();

      if (exchangeData.error) {
        throw new Error(exchangeData.error.message);
      }

      const longLivedToken = exchangeData.access_token;

      // Verify the token with Facebook
      const userResponse = await fetch(
        `${process.env.NEXT_PUBLIC_GRAPH_API_URL}/me?access_token=${longLivedToken}&fields=id,name,email,picture`
      );
      const userData = await userResponse.json();

      if (userData.error) {
        throw new Error(userData.error.message);
      }

      // Here you would typically:
      // 1. Check if the user exists in your database
      // 2. If not, create a new user
      // 3. Generate a session token for your app

      // For this example, we'll just return the Facebook data
      res.status(200).json({
        user: {
          id: userData.id,
          name: userData.name,
          email: userData.email,
          picture: userData.picture.data.url,
        },
        token: process.env.NEXTAUTH_SECRET,
      });
    } catch (error) {
      res.status(400).json({ error: 'Invalid token' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
