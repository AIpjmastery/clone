
export default async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const subscription = await getSubscriptionDetails(token);

  if (subscription) {
    res.status(200).json(subscription);
  } else {
    res.status(500).json({ error: 'Failed to fetch subscription details' });
  }
};
