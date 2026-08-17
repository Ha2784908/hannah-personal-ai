import os
import sys
import socket
import subprocess
import re
import threading
import time
import urllib.request

PROJECT_DIR = os.path.dirname(os.path.abspath(__file__))
CLOUDFLARED_EXE = os.path.join(PROJECT_DIR, "cloudflared.exe")

_tunnel_process = None
_public_url = None
_tunnel_lock = threading.Lock()

def get_local_ip():
    """Retrieve primary local network IP address of host computer."""
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.settimeout(1.0)
        s.connect(('10.254.254.254', 1))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except Exception:
        try:
            return socket.gethostbyname(socket.gethostname())
        except Exception:
            return "127.0.0.1"

def ensure_cloudflared():
    """Ensure cloudflared.exe binary exists."""
    if os.path.exists(CLOUDFLARED_EXE):
        return True
    try:
        url = "https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-windows-amd64.exe"
        urllib.request.urlretrieve(url, CLOUDFLARED_EXE)
        return os.path.exists(CLOUDFLARED_EXE)
    except Exception:
        return False

def _monitor_tunnel_output(proc):
    global _public_url
    for line in iter(proc.stdout.readline, ''):
        if not line:
            break
        match = re.search(r'https://[a-zA-Z0-9-]+\.trycloudflare\.com', line)
        if match:
            with _tunnel_lock:
                _public_url = match.group(0)

def start_tunnel(port: int = 8889):
    global _tunnel_process, _public_url
    with _tunnel_lock:
        if _tunnel_process and _tunnel_process.poll() is None and _public_url:
            return {"success": True, "public_url": _public_url}
        
        if not ensure_cloudflared():
            return {"success": False, "error": "Could not download or find cloudflared binary."}

        _public_url = None
        cmd = [CLOUDFLARED_EXE, "tunnel", "--url", f"http://localhost:{port}"]
        
        try:
            _tunnel_process = subprocess.Popen(
                cmd,
                stdout=subprocess.PIPE,
                stderr=subprocess.STDOUT,
                text=True,
                bufsize=1,
                creationflags=subprocess.CREATE_NO_WINDOW if sys.platform == "win32" else 0
            )
            
            t = threading.Thread(target=_monitor_tunnel_output, args=(_tunnel_process,), daemon=True)
            t.start()
            
            start_time = time.time()
            while time.time() - start_time < 12:
                if _public_url:
                    break
                time.sleep(0.3)
                
            if _public_url:
                return {"success": True, "public_url": _public_url}
            else:
                return {"success": False, "error": "Tunnel started but public URL generation timed out."}
        except Exception as e:
            return {"success": False, "error": str(e)}

def stop_tunnel():
    global _tunnel_process, _public_url
    with _tunnel_lock:
        if _tunnel_process and _tunnel_process.poll() is None:
            try:
                _tunnel_process.terminate()
                _tunnel_process.wait(timeout=3)
            except Exception:
                try:
                    _tunnel_process.kill()
                except Exception:
                    pass
        _tunnel_process = None
        _public_url = None
        return {"success": True}

def get_network_info(port: int = 8889):
    local_ip = get_local_ip()
    local_url = f"http://{local_ip}:{port}"
    with _tunnel_lock:
        active = _tunnel_process is not None and _tunnel_process.poll() is None and _public_url is not None
        pub_url = _public_url if active else None
        
    return {
        "local_ip": local_ip,
        "local_url": local_url,
        "public_url": pub_url,
        "tunnel_active": active
    }
