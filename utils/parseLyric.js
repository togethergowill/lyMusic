export function parseLyric(lyric) {
  const reg = /\[(\d{2}):(\d{2}).(\d{2,3})\]/
  let lyricInfo = []
  const lyricLines = lyric.split("\n")
  for (const item of lyricLines) {
    const result = item.match(reg)
    if (!result) continue
    const minute = result[1] * 60 * 1000
    const second = result[2] * 1000
    const mSecond = result[3].length === 2 ? result[3] * 10 : result[3] * 1
    const time = minute + second + mSecond
    const text = item.replace(reg, "")

    lyricInfo.push({ time, text })
  }
  return lyricInfo
}
