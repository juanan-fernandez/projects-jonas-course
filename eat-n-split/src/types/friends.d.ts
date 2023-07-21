export type FriendId = string

export interface Friend {
	name: string
	avatar: string
	debts: number
}

export interface FriendWithId extends Friend {
	id: FriendId
}
