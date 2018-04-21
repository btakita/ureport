import {assign} from 'ctx-core/object/lib.mjs'
import {_mixin__store, compute} from 'ctx-core/store/lib.mjs'
import {mixin} from '__/object/lib.mjs'
export const __store__feeds = _mixin__store('__store__feeds', store => {
	mixin(store, {
		add__feed(feed) {
			const {feeds} = store.get()
			feeds.push(feed)
			store.set({feeds})
		},
		edit__feed(feed, feed__) {
			assign(feed, feed__)
			store.fire('edit__feed', {feed})
		},
		reset__feeds() {
			store.set({feeds: []})
		}
	})
	store.reset__feeds()
})