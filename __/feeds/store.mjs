import {assign} from 'ctx-core/object/lib.mjs'
import {_mixin__store, compute} from 'ctx-core/store/lib.mjs'
import {mixin} from '__/object/lib.mjs'
import {log} from 'ctx-core/logger/lib.mjs'
const logPrefix = '__/feeds/store.mjs'
export const __store__feeds = _mixin__store('__store__feeds', store => {
	mixin(store, {
		add__feed(feed) {
			const {feeds} = store.get()
			feeds.push(feed)
			store.set({feeds})
			persist_feeds(feeds)
		},
		remove__feed(feed) {
			const {feeds} = store.get()
			const index = feeds.indexOf(feed)
			if (typeof index === 'number') {
				feeds.splice(index, 1)
				store.set({feeds})
				persist_feeds(feeds)
			}
		},
		edit__feed(feed, feed__) {
			assign(feed, feed__)
			store.fire('edit__feed', {feed})
		},
		reset__feeds() {
			const json__feeds = localStorage.getItem('feeds')
			const feeds = json__feeds ? JSON.parse(json__feeds) : []
			store.set({feeds})
		}
	})
	store.on('state', async ({changed,current}) => {
		if (changed.feed) {
			log(`${logPrefix}|__update|feed`)
			const {feed} = current
			const response__feed__xml = await fetch__feed__xml(feed)
			const feed__xml = await response__feed__xml.text()
			if (typeof DOMParser !== 'undefined') {
				const parser = new DOMParser()
				const dom = parser.parseFromString(feed__xml, 'text/xml')
				const array__el__entry = dom.documentElement.querySelectorAll('entry')
				const entries__feed = []
				for (let i=0; i < array__el__entry.length; i++) {
					const el__entry = array__el__entry[i]
					const id = _innerText(el__entry.querySelector('id'))
					const published = _innerText(el__entry.querySelector('published'))
					const title = _innerText(el__entry.querySelector('title'))
					const content = _innerText(el__entry.querySelector('content'))
					entries__feed.push({
						id,
						published,
						title,
						content
					})
				}
				store.set({entries__feed})
			}
		}
	})
	store.reset__feeds()
	function persist_feeds(feeds) {
		localStorage.setItem('feeds', JSON.stringify(feeds))
	}
})
export function _innerText(el) {
  return el && el.innerHTML
}
export async function fetch__feed__xml(feed) {
	return fetch(`/feed.xml?url=${encodeURIComponent(feed.url__feed)}`)
}