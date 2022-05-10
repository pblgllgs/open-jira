
interface SeedData {
    entries: SeedEntry[]
}

interface SeedEntry {
    description: string;
    createdAt: number;
    status: string;
}


export const seedData: SeedData = {
    entries: [
        {
            description:
                'Pending: Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum mollitia quae consectetur, rem eaque accusantium beatae tempora architecto delectus, nostrum pariatur tempore dolorum eos temporibus saepe eveniet dolor. Non, perferendis.',
            status: 'pending',
            createdAt: Date.now(),
        },
        {
            description:
                'In-Progress: Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum mollitia quae consectetur, rem eaque accusantium beatae tempora architecto delectus, nostrum pariatur tempore dolorum eos temporibus saepe eveniet dolor. Non, perferendis.',
            status: 'in-progress',
            createdAt: Date.now() - 1000000,
        },
        {
            description:
                'Finished: Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum mollitia quae consectetur, rem eaque accusantium beatae tempora architecto delectus, nostrum pariatur tempore dolorum eos temporibus saepe eveniet dolor. Non, perferendis.',
            status: 'finished',
            createdAt: Date.now() - 100000,
        },
    ]
}