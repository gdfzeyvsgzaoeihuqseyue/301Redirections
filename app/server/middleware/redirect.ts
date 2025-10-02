export default defineEventHandler((event) => {
  const host = event.req.headers.host || ''
  const url = event.req.url || '/'

  // EasyQuictTrack
  if (host.includes('stlk.netlify.app')) {
    event.res.writeHead(301, { Location: `https://eqt.netlify.app${url}` })
    event.res.end()
    return
  }

  // Suitops
  if (host.includes('newtes.netlify.app')) {
    event.res.writeHead(301, { Location: `https://suitops.netlify.app${url}` })
    event.res.end()
    return
  }
})
