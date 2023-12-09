import { type Participant, type ParticipantMapping, type Person } from './src/types'
import * as crypto from 'crypto'

const shuffleEntries = (): number => 0.5 - Math.random()

export const shuffle = (input: Participant[]): ParticipantMapping[] => {
  const baseKey: string = crypto.randomUUID()
  const participants: Person[] = input.map(p => ({ id: createId(p, baseKey), name: p.name, mail: p.mail }))
  const pairMapping = createPairs(participants)
  debug(pairMapping)
  return pairMapping.map(p => ({ from: p[0].id, to: p[1].id }))
}

const debug = (pairMapping: Array<[Person, Person]>): void => { console.log('DEBUG', pairMapping.map(p => `${p[0].name} with ${p[1].name}`)) }

const createPairs = (participants: Person[]): Array<[Person, Person]> => {
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
  return result
}

const createId = (participant: Participant, baseKey: string): string => {
  return crypto.createHash('md5').update(`${participant.name}${baseKey}`).digest('hex')
}
