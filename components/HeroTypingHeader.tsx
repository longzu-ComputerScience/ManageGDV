'use client'

import { useEffect, useState } from 'react'

type Header = {
  title: string
  subtitle: string
  renderTitle?: (text: string) => React.ReactNode
  renderSubtitle?: (text: string) => React.ReactNode
}

const TYPE_SPEED = 40
const DELETE_SPEED = 30
const HOLD_TIME = 2000

export default function HeroTypingStable({
  headers,
}: {
  headers: Header[]
}) {
  const [headerIndex, setHeaderIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [mode, setMode] = useState<'type' | 'hold' | 'delete'>('type')

  const current = headers[headerIndex]
  const title = current.title
  const subtitle = current.subtitle

  const totalLength = title.length + subtitle.length + 1

  useEffect(() => {
    let timer: NodeJS.Timeout

    if (mode === 'type') {
      if (charIndex < totalLength) {
        timer = setTimeout(() => setCharIndex(c => c + 1), TYPE_SPEED)
      } else {
        timer = setTimeout(() => setMode('hold'), HOLD_TIME)
      }
    }

    if (mode === 'hold') {
      timer = setTimeout(() => setMode('delete'), HOLD_TIME)
    }

    if (mode === 'delete') {
      if (charIndex > 0) {
        timer = setTimeout(() => setCharIndex(c => c - 1), DELETE_SPEED)
      } else {
        setHeaderIndex(i => (i + 1) % headers.length)
        setMode('type')
      }
    }

    return () => clearTimeout(timer)
  }, [charIndex, mode, totalLength, headers.length])

  // TÁCH TITLE / SUBTITLE THEO charIndex (KHÔNG DÙNG '\n')
  let titleText = ''
  let subtitleText = ''

  if (charIndex <= title.length) {
    titleText = title.slice(0, charIndex)
  } else {
    titleText = title
    subtitleText = subtitle.slice(0, charIndex - title.length - 1)
  }

  return (
    <div className="text-center min-h-[120px]">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-2">
        {current.renderTitle
          ? current.renderTitle(titleText)
          : titleText}
        <span className="ml-1 animate-pulse">|</span>
      </h1>

      <p className="text-lg sm:text-xl text-slate-700">
        {current.renderSubtitle
          ? current.renderSubtitle(subtitleText)
          : subtitleText}
      </p>
    </div>
  )
}
