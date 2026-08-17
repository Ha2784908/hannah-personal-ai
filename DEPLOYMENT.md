# 🌐 24/7 Free Cloud Deployment Guide — Hannah Personal AI

This guide shows how to deploy **Hannah Personal AI** to **Render.com** (or Hugging Face Spaces) so that it runs **24 hours a day, 7 days a week** for free. Your sister will be able to access the app anytime on her phone or computer without needing your laptop turned on!

---

## Option 1: 1-Click Deployment on Render.com (Recommended - 100% Free 24/7)

1. **Sign Up / Log In**:
   - Go to [https://render.com](https://render.com) and create a free account (or log in with GitHub/Google).

2. **Create New Web Service**:
   - Click **`New +`** &rarr; Select **`Web Service`**.
   - Connect your GitHub repository (or upload the `hannah_personal_ai` folder).

3. **Configure Settings**:
   - **Name**: `hannah-personal-ai`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `python server.py`

4. **Add Environment Variable**:
   - Scroll down to **Environment Variables**:
     - Key: `GEMINI_API_KEY`
     - Value: `[Your Gemini API Key]`

5. **Deploy**:
   - Click **`Create Web Service`**.
   - Render will build and launch your server in ~2 minutes!
   - You will get a permanent, 24/7 URL like: **`https://hannah-personal-ai.onrender.com`**

---

## Option 2: Run 24/7 Cloudflare Tunnel on Your Computer

If you prefer running it locally on your computer:
1. Double-click [`run_hannah_ai.bat`](file:///C:/Users/hm069/hannah_personal_ai/run_hannah_ai.bat).
2. Open `http://localhost:8889` &rarr; Click `📱 Phone Access` &rarr; Enable `🌐 Public HTTPS Tunnel`.
3. Copy the `https://...` link and send it to your sister!

---

## 👑 Sister / Host Customization:
Inside the web app, click **`⚙️ Verification Apps`** at the top right, enter your sister's name in **`👑 Who is The Host?`**, and click **`Save`**. The AI will address her as The Host!
