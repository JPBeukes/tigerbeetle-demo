# TigerBeetle Demo App

## TigerBeetle Setup

Follow their quickstart guide to install TigerBeetle: https://docs.tigerbeetle.com/quick-start

```bash
# Create the database
pnpm run tb-create

# Start the database
pnpm run tb-start

# Open a tigerbeetle shell
pnpm run tb-shell
```

## Tips

- You need Linux kernel version 5 or higher to run TigerBeetle.
- The TigerBeetle client version must match the TigerBeetle server version. Otherwise you get an "eviction" error.
