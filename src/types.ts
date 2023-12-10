export interface Participant {
  name: string
  mail: string
}

export interface Person extends Participant {
  id: string
}

export interface PersonMapping {
  from: Person
  to: Person
}
