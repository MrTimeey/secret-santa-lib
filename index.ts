import { type Participant, type Person, type PersonMapping } from './src/types'
import * as crypto from 'crypto'

const shuffleEntries = (): number => 0.5 - Math.random()

export const shuffle = (input: Participant[]): PersonMapping[] => {
  const baseKey: string = crypto.randomUUID()
  const participants: Person[] = input.map(p => ({ id: createId(p, baseKey), name: p.name, mail: p.mail }))
  return createPairs(participants)
}

const createPairs = (participants: Person[]): PersonMapping[] => {
  let result: Array<[Person, Person]> = []
  let counter: number = 0
  while (result.length === 0 && counter !== 500) {
    counter++
    const sourcePersons = participants.sort(shuffleEntries)
    let targetPersons = [...participants].sort(shuffleEntries)
    for (const sourcePerson of sourcePersons) {
      const randomTargetPerson = targetPersons.filter(p => p.id !== sourcePerson.id).length !== 0 ? targetPersons.filter(p => p.id !== sourcePerson.id)[0] : undefined
      if (randomTargetPerson === undefined) {
        result = []
        break
      }
      targetPersons = targetPersons.filter(p => p.id !== randomTargetPerson.id)
      result.push([sourcePerson, randomTargetPerson])
    }
  }
  return result.map(tuple => ({ from: tuple[0], to: tuple[1] }))
}

const createId = (participant: Participant, baseKey: string): string => {
  return crypto.createHash('md5').update(`${participant.name}${baseKey}`).digest('hex')
}
