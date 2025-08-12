import asyncio
import subprocess
import uvicorn
from api.main import app


async def start_api():
    config = uvicorn.Config(app=app, host="127.0.0.1", port=8000, log_level="info")
    server = uvicorn.Server(config)
    await server.serve()


async def main():
    vite_proc = subprocess.Popen("npm run dev", cwd="frontend", shell=True)

    try:
        await start_api()
    finally:
        vite_proc.terminate()
        vite_proc.wait()


if __name__ == "__main__":
    asyncio.run(main())
