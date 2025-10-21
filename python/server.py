import json
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],        # <--- allow everything
    allow_credentials=True,
    allow_methods=["*"],        # allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],        # allow all headers
)

clients = []

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    clients.append(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            # Broadcast to everyone except sender
            for client in clients:
                if client != websocket:
                    await client.send_text(data)
    except WebSocketDisconnect:
        clients.remove(websocket)

# FastAPI example
@app.get("/movies")
def get_movies():
    with open("movie_data.json") as f:
        return json.load(f)