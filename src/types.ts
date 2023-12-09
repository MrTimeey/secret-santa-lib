export interface Participant {
  name: string
  mail: string
}

export interface Person extends Participant {
  id: string
}

export interface ParticipantMapping {
  from: string
  to: string
}
