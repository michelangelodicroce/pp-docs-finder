import { db } from 'database';

export default function userHandler(req, res) {
  const { query, method } = req

  if (method !== 'GET') {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${method} Not Allowed`)

    return
  }

  const { id } = query
  const document = db.find(({ OriginalLocation }) => OriginalLocation.includes(id))

  if (!document) {
    res.status(404).end()

    return
  }

  res.status(200).json(document)
}
