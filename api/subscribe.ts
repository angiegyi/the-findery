import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const beehivApiKey = process.env.BEEHIV_API_KEY;
  const beehivPublicationId = process.env.BEEHIV_PUBLICATION_ID;

  if (!beehivApiKey || !beehivPublicationId) {
    console.error('Missing Beehiiv configuration');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    const beehivResponse = await fetch(
      `https://api.beehiiv.com/v2/publications/${beehivPublicationId}/subscriptions`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${beehivApiKey}`,
        },
        body: JSON.stringify({
          email: email.toLowerCase().trim(),
          reactivate_existing: true,
          send_welcome_email: true,
          utm_source: 'waitlist',
          utm_medium: 'website',
        }),
      }
    );

    const data = await beehivResponse.json();

    if (!beehivResponse.ok) {
      console.error('Beehiiv API error:', data);
      return res.status(beehivResponse.status).json({
        error: 'Failed to subscribe to newsletter',
        details: data
      });
    }

    return res.status(200).json({
      success: true,
      subscriberId: data.data?.id
    });
  } catch (error) {
    console.error('Error subscribing to Beehiiv:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
