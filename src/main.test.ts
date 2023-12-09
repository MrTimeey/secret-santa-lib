import { expect, test } from 'vitest'
import { shuffle } from '../index'

test('Test shuffle', () => {
  const input = [
    { name: 'Tim', mail: 'a@b.c' },
    { name: 'Tom', mail: 'a@b.c' },
    { name: 'Timo', mail: 'a@b.c' }
  ]
  const result = shuffle(input)
  expect(result).length(3)

  const from = result.map(r => r.from)
  const to = result.map(r => r.to)
  expect(from).toContain(to[0])
  expect(from).toContain(to[1])
  expect(from).toContain(to[2])
})
