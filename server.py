import os
import uvicorn
import psutil
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional

import analyzer
import tunnel_manager

app = FastAPI(title="Hannah Personal AI", version="1.0.0")

# CORS middleware for global cross-origin access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request Schemas
class TranslateRequest(BaseModel):
    text: str
    source_lang: Optional[str] = "Auto"
    target_lang: Optional[str] = "English"
    tone: Optional[str] = "Polite"
    host_name: Optional[str] = "Hannah"

class GrammarCheckRequest(BaseModel):
    text: str
    language: Optional[str] = "Auto"
    host_name: Optional[str] = "Hannah"

class ChatRequest(BaseModel):
    message: str
    host_name: Optional[str] = "Hannah"

# API Endpoints
@app.get("/api/health")
def health_check():
    return {"status": "online", "name": "Hannah Personal AI", "version": "1.0.0"}

@app.get("/api/system/stats")
def get_stats():
    cpu_usage = psutil.cpu_percent(interval=0.5)
    ram = psutil.virtual_memory()
    return {
        "cpu_percent": cpu_usage,
        "ram_used_gb": round(ram.used / (1024**3), 2),
        "ram_total_gb": round(ram.total / (1024**3), 2),
        "ram_percent": ram.percent
    }

@app.post("/api/translate")
def handle_translate(req: TranslateRequest):
    return analyzer.translate_text(req.text, req.source_lang, req.target_lang, req.tone, host_name=req.host_name or "Hannah")

@app.post("/api/translate/file")
async def handle_translate_file(
    file: UploadFile = File(...),
    instruction: Optional[str] = Form(""),
    source_lang: Optional[str] = Form("Auto"),
    target_lang: Optional[str] = Form("English"),
    tone: Optional[str] = Form("Polite"),
    host_name: Optional[str] = Form("Hannah")
):
    content = await file.read()
    return analyzer.translate_uploaded_file(
        file_bytes=content,
        filename=file.filename,
        mime_type=file.content_type,
        instruction=instruction,
        source_lang=source_lang,
        target_lang=target_lang,
        tone=tone,
        host_name=host_name or "Hannah"
    )

@app.post("/api/grammar_check")
def handle_grammar_check(req: GrammarCheckRequest):
    return analyzer.check_grammar_and_facts(req.text, req.language, host_name=req.host_name or "Hannah")

@app.post("/api/grammar_check/file")
async def handle_grammar_check_file(
    file: UploadFile = File(...),
    instruction: Optional[str] = Form(""),
    language: Optional[str] = Form("Auto"),
    host_name: Optional[str] = Form("Hannah")
):
    content = await file.read()
    return analyzer.check_grammar_uploaded_file(
        file_bytes=content,
        filename=file.filename,
        mime_type=file.content_type,
        instruction=instruction,
        language=language,
        host_name=host_name or "Hannah"
    )

@app.post("/api/chat")
def handle_chat(req: ChatRequest):
    return analyzer.chat_with_hannah(req.message, host_name=req.host_name or "Hannah")

@app.get("/api/system/network_info")
def get_network_info():
    port = int(os.environ.get("PORT", 8889))
    return tunnel_manager.get_network_info(port=port)

@app.post("/api/system/tunnel/start")
def start_public_tunnel():
    port = int(os.environ.get("PORT", 8889))
    return tunnel_manager.start_tunnel(port=port)

@app.post("/api/system/tunnel/stop")
def stop_public_tunnel():
    return tunnel_manager.stop_tunnel()

# Static files setup with multi-directory lookup
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
WEB_DIR = os.path.join(BASE_DIR, "web")

if os.path.exists(WEB_DIR):
    app.mount("/static", StaticFiles(directory=WEB_DIR), name="static")
else:
    app.mount("/static", StaticFiles(directory=BASE_DIR), name="static")

@app.get("/static/style.css")
def get_style():
    path = os.path.join(WEB_DIR, "style.css")
    if not os.path.exists(path):
        path = os.path.join(BASE_DIR, "style.css")
    if os.path.exists(path):
        with open(path, "r", encoding="utf-8") as f:
            return HTMLResponse(content=f.read(), media_type="text/css")
    raise HTTPException(status_code=404, detail="style.css not found")

@app.get("/static/app.js")
def get_app_js():
    path = os.path.join(WEB_DIR, "app.js")
    if not os.path.exists(path):
        path = os.path.join(BASE_DIR, "app.js")
    if os.path.exists(path):
        with open(path, "r", encoding="utf-8") as f:
            return HTMLResponse(content=f.read(), media_type="application/javascript")
    raise HTTPException(status_code=404, detail="app.js not found")

@app.get("/")
def read_root():
    index_path = os.path.join(WEB_DIR, "index.html")
    if not os.path.exists(index_path):
        index_path = os.path.join(BASE_DIR, "index.html")
    
    if os.path.exists(index_path):
        with open(index_path, "r", encoding="utf-8") as f:
            return HTMLResponse(content=f.read())
    return HTMLResponse(content="<h1>Hannah Personal AI Backend Running</h1><p>Note: index.html not found.</p>")

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8889))
    print(f"Hannah Personal AI Server launching on http://0.0.0.0:{port}...")
    uvicorn.run("server:app", host="0.0.0.0", port=port)
