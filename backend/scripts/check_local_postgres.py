import asyncio

import asyncpg

DSNS = [
    'postgresql://dk_user:S0zuIBVM_G3Uq2o3GLCqU42DQUiIxNql@localhost:15432/dk_crm',
    'postgresql://postgres:postgres@localhost:15432/postgres',
    'postgresql://dk_user:S0zuIBVM_G3Uq2o3GLCqU42DQUiIxNql@127.0.0.1:15432/dk_crm',
    'postgresql://postgres@localhost:15432/postgres',
]

async def main():
    for dsn in DSNS:
        try:
            conn = await asyncpg.connect(dsn)
            print('CONNECTED', dsn)
            print('DATABASE', await conn.fetchval('select current_database()'))
            print('SCHEMAS', await conn.fetchval('select count(*) from information_schema.tables'))
            await conn.close()
            return
        except Exception as exc:
            print('FAILED', dsn, type(exc).__name__, exc)
    print('NO_CONNECTION')

asyncio.run(main())
