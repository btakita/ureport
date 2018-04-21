import fetch from 'node-fetch'
import stream from 'stream'
export async function get(req, res, next) {
	const {url} = req.query
	const response__url = await fetch(url)
	// TODO: Pass Stream to output
	const text = await response__url.text()
	res.end(text)
}