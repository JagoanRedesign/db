const fetch = require('node-fetch')
const cheerio = require('cheerio')
const fs = require('fs')

; (async () => {
  const url = 'https://jadwalnonton.com/now-playing/'
  const response = await got(url, {
    headers: {
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
      Host: 'jadwalnonton.com',
      Referer: 'https://jadwalnonton.com/now-playing/',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36'
    }
  }).text()
  const $ = cheerio.load(response)
  $('div.row > div.item.movie').each((_, el) => {
    const $el = $(el)
    const title = $el.find('h2 > a').text()
    const img = $el.find('img.poster').attr('src') as string
    const url = $el.find('a.mojadwal').attr('href')
    const $span = $el.find('div > span.moket')
    const genre = $span.eq(0).text()
    const duration = $span.eq(1).text()
    const playingAt = ($el.find('div > i.icon').attr('class') || '').replace(/icon/, '').trim() as string
    if (title && url) {
      result.push({
        title,
        img,
        url,
        genre,
        duration,
        playingAt
      })
    }
  })

  await fs.writeFileSync('./lainnya/bioskop-now-playing.json', JSON.stringify(result, null, 2))
})()
