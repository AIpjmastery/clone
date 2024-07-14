
export default async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const result = await cancelSubscription(token);

  if (result.success) {
    res.status(200).json(result.subscription);
  } else {
    res.status(500).json({ error: 'Failed to cancel subscription' });
  }
};
