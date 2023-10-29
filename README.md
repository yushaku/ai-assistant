# AI Assistant

## Techstacks

- Nextjs (front-end, back-end, apis)
  - typescript, tailwind, next-auth
- Database (PostgreSQL and prisma)
- storages (vercel bolb)
- deployment (vercel.com)

## highlevel design

```mermaid
flowchart TB
1(user) ----> 2(internet)
2 ---->3(frontend)

subgraph Nextjs
3 <----> 4(backend)
end

4 ----> 5(database)
5 ----> 4

4 ----> 6(vector storage)
6 ----> 4
```

## demo app

## use prisma with vercel postges

- pnpm prisma db push
- pnpm prisma studio
