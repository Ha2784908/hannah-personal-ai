import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable

def generate_pdf():
    user = os.path.expanduser("~")
    desktop_onedrive = os.path.join(user, "OneDrive", "Desktop")
    desktop_normal = os.path.join(user, "Desktop")
    
    if os.path.exists(desktop_onedrive):
        target_dir = desktop_onedrive
    elif os.path.exists(desktop_normal):
        target_dir = desktop_normal
    else:
        target_dir = user

    pdf_file = os.path.join(target_dir, "Hannah_Personal_AI_and_Tadashi_Complete_Report.pdf")

    doc = SimpleDocTemplate(
        pdf_file,
        pagesize=letter,
        rightMargin=36, leftMargin=36, topMargin=36, bottomMargin=36
    )

    styles = getSampleStyleSheet()

    primary_purple = colors.HexColor("#6b21a8")
    accent_purple = colors.HexColor("#a855f7")
    dark_text = colors.HexColor("#1e293b")
    light_bg = colors.HexColor("#f8fafc")
    table_header = colors.HexColor("#581c87")

    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=24,
        textColor=primary_purple,
        spaceAfter=6
    )

    subtitle_style = ParagraphStyle(
        'DocSubTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=14,
        textColor=colors.HexColor("#475569"),
        spaceAfter=12
    )

    h2_style = ParagraphStyle(
        'SectionH2',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=13,
        leading=16,
        textColor=primary_purple,
        spaceBefore=10,
        spaceAfter=6
    )

    h3_style = ParagraphStyle(
        'SectionH3',
        parent=styles['Heading3'],
        fontName='Helvetica-Bold',
        fontSize=10.5,
        leading=13,
        textColor=accent_purple,
        spaceBefore=6,
        spaceAfter=4
    )

    body_style = ParagraphStyle(
        'BodyDark',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=12.5,
        textColor=dark_text,
        spaceAfter=5
    )

    bullet_style = ParagraphStyle(
        'BulletText',
        parent=body_style,
        leftIndent=12,
        bulletIndent=4,
        spaceAfter=4
    )

    table_text = ParagraphStyle(
        'TableText',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8,
        leading=10.5,
        textColor=colors.HexColor("#0f172a")
    )

    table_text_header = ParagraphStyle(
        'TableHeaderText',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=11,
        textColor=colors.white
    )

    code_style = ParagraphStyle(
        'CodeSnippet',
        parent=styles['Normal'],
        fontName='Courier',
        fontSize=8,
        leading=10.5,
        textColor=colors.HexColor("#7e22ce")
    )

    story = []

    # Title & Header
    story.append(Paragraph("HANNAH PERSONAL AI & TADASHI &mdash; WORK REPORT", title_style))
    story.append(Paragraph("Comprehensive Technical Summary & Command History Document for Hannah (The Host)", subtitle_style))
    story.append(HRFlowable(width="100%", thickness=2, color=accent_purple, spaceAfter=10))

    # SECTION 1: OVERVIEW OF WORK ACCOMPLISHED
    story.append(Paragraph("1. Executive Overview & Work Accomplished", h2_style))
    
    story.append(Paragraph("A. Tadashi Application Upgrades:", h3_style))
    story.append(Paragraph("&bull; <b>📕 PDF Practice Quiz Generator</b>: Added <code>generate_quiz_from_pdf()</code> using <code>pypdf</code> text extraction and Gemini 2.5 Flash multimodal reasoning. Built endpoint <code>/api/quiz/generate_pdf</code> and drag-and-drop file upload UI.", bullet_style))
    story.append(Paragraph("&bull; <b>📱 Mobile Gateway & Cloudflare Tunnel</b>: Built <code>tunnel_manager.py</code> for local network IP detection (<code>http://192.168.x.x:8888</code>) and account-less Cloudflare HTTPS Tunnels (<code>https://*.trycloudflare.com</code>). Added QR Code modal.", bullet_style))
    story.append(Paragraph("&bull; <b>📱 Mobile Responsive UI</b>: Touch target sizing (48px+), 1-column mobile grid flow, and 16px font input sizing to prevent iOS Safari auto-zoom.", bullet_style))

    story.append(Spacer(1, 4))
    story.append(Paragraph("B. Hannah Personal AI (New Dedicated Web Application):", h3_style))
    story.append(Paragraph("&bull; <b>👑 Dedicated Host Helper Persona</b>: System prompt configured for Hannah (The Host). Always polite and respectful, but 100% honest and fact-checked. Never blindly agrees; politely points out mistakes step-by-step.", bullet_style))
    story.append(Paragraph("&bull; <b>🎨 Royal Purple Glassmorphic UI</b>: Built dedicated web application running on <code>http://localhost:8889</code> with royal purple design tokens (<code>#c084fc</code> & <code>#9333ea</code>).", bullet_style))
    story.append(Paragraph("&bull; <b>🌐 Chinese &bull; English &bull; Arabic Translator</b>: Contextual translation with Pinyin generation, Arabic Right-to-Left (RTL) support, and tone controls (Polite, Casual, Formal, Business).", bullet_style))
    story.append(Paragraph("&bull; <b>✍️ Grammar & Factual Accuracy Auditor</b>: Audits text, PDFs, PowerPoint slides, and screenshots for grammar errors and factual accuracy, producing a clear verdict banner and step-by-step rule breakdown.", bullet_style))
    story.append(Paragraph("&bull; <b>📕 📊 📷 Multimodal File & Screenshot Dropper (Phase 2)</b>: Drag-and-drop file dropzones and <code>Ctrl + V</code> clipboard screenshot paste for PDF, PowerPoint (.pptx), and image files.", bullet_style))
    story.append(Paragraph("&bull; <b>🇨🇳 Chinese Double-Check & Customizable App Links (Phase 3)</b>: Automated back-translation double-check for Chinese. Top bar <code>⚙️ Verification Apps</code> manager for DeepL, Pleco Dict, Baidu Fanyi, Youdao Dict, and Google Translate.", bullet_style))

    story.append(Spacer(1, 6))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor("#cbd5e1"), spaceAfter=8))

    # SECTION 2: COMMAND HISTORY & EXECUTED COMMANDS
    story.append(Paragraph("2. Complete Command History & Requested Commands", h2_style))
    story.append(Paragraph("The following commands were requested and executed on your system during setup and development:", body_style))

    cmd_data = [
        [
            Paragraph("Command Executed", table_text_header),
            Paragraph("Purpose & Description", table_text_header),
            Paragraph("Directory / Location", table_text_header)
        ],
        [
            Paragraph("<code>Rename-Item -Path 'C:\\Users\\hm069\\chinese_diet_project' -NewName 'hannah_personal_ai'</code>", code_style),
            Paragraph("Renamed initial directory to Hannah Personal AI", table_text),
            Paragraph("<code>C:\\Users\\hm069</code>", table_text)
        ],
        [
            Paragraph("<code>uv pip install reportlab pypdf python-pptx fastapi uvicorn google-genai psutil requests</code>", code_style),
            Paragraph("Installed PDF, PPTX, and Web dependencies", table_text),
            Paragraph("<code>C:\\Users\\hm069\\hannah_personal_ai</code>", table_text)
        ],
        [
            Paragraph("<code>C:\\Users\\hm069\\tadashi\\.venv\\Scripts\\python.exe server.py</code>", code_style),
            Paragraph("Launches Hannah Personal AI Web Server on Port 8889", table_text),
            Paragraph("<code>C:\\Users\\hm069\\hannah_personal_ai</code>", table_text)
        ],
        [
            Paragraph("<code>cloudflared.exe tunnel --url http://localhost:8889</code>", code_style),
            Paragraph("Establishes account-less Cloudflare Public HTTPS Tunnel for remote phone access", table_text),
            Paragraph("<code>C:\\Users\\hm069\\hannah_personal_ai\\cloudflared.exe</code>", table_text)
        ],
        [
            Paragraph("<code>powershell -Command \"Get-Process python | Stop-Process -Force\"</code>", code_style),
            Paragraph("Restarts local server process when updating features", table_text),
            Paragraph("<code>System Command</code>", table_text)
        ]
    ]

    cmd_table = Table(cmd_data, colWidths=[200, 210, 130])
    cmd_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), table_header),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor("#cbd5e1")),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [light_bg, colors.white]),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
    ]))
    story.append(cmd_table)

    story.append(Spacer(1, 8))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor("#cbd5e1"), spaceAfter=8))

    # SECTION 3: FILE SYSTEM & ACCESS DIRECTORY
    story.append(Paragraph("3. Quick Reference Directory & Setup", h2_style))
    
    file_ref_data = [
        [Paragraph("Resource Name", table_text_header), Paragraph("Local File Path / Web URL", table_text_header)],
        [Paragraph("<b>Desktop PDF Report</b>", table_text), Paragraph(f"<code>{pdf_file}</code>", code_style)],
        [Paragraph("<b>Hannah AI Folder</b>", table_text), Paragraph("<code>C:\\Users\\hm069\\hannah_personal_ai</code>", code_style)],
        [Paragraph("<b>Hannah AI Web App</b>", table_text), Paragraph("<code>http://localhost:8889</code>", code_style)],
        [Paragraph("<b>One-Click Launcher</b>", table_text), Paragraph("<code>C:\\Users\\hm069\\hannah_personal_ai\\run_hannah_ai.bat</code>", code_style)],
        [Paragraph("<b>Tadashi Web App</b>", table_text), Paragraph("<code>http://localhost:8888</code>", code_style)]
    ]

    ref_table = Table(file_ref_data, colWidths=[180, 360])
    ref_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), primary_purple),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor("#cbd5e1")),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [light_bg, colors.white]),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
    ]))
    story.append(ref_table)

    story.append(Spacer(1, 10))
    story.append(Paragraph("<i>Report generated automatically by Antigravity AI Assistant &bull; 2026</i>", ParagraphStyle('FooterText', parent=styles['Normal'], fontSize=8, textColor=colors.HexColor("#94a3b8"), alignment=1)))

    doc.build(story)
    print(f"SUCCESS: PDF report saved to: {pdf_file}")
    return pdf_file

if __name__ == "__main__":
    generate_pdf()
