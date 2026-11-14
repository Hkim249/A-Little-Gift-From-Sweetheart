from pathlib import Path
import base64
import streamlit as st

# A Little Gift From Sweetheart
# Optimized: artwork is stored as compressed files in ./assets, not embedded in source.

ROOT = Path(__file__).parent
ASSETS = ROOT / "assets"

def image_uri(filename):
    path = ASSETS / filename
    mime = "image/webp"
    encoded = base64.b64encode(path.read_bytes()).decode("ascii")
    return f"data:{mime};base64,{encoded}"

TITLE_BG = image_uri("title_saigon.webp")
ROOM_BG = image_uri("bedroom.webp")
MEE_MEO = image_uri("me_meo.webp")
DANG_KHOA = image_uri("dang_khoa.webp")

st.set_page_config(
    page_title="A Little Gift From Sweetheart",
    page_icon="🌸",
    layout="wide",
    initial_sidebar_state="collapsed",
)

def start_game():
    st.session_state.scene = "room"
    st.session_state.chat_open = False
    st.session_state.reply = None

if "scene" not in st.session_state:
    st.session_state.scene = "title"
if "chat_open" not in st.session_state:
    st.session_state.chat_open = False
if "reply" not in st.session_state:
    st.session_state.reply = None

st.markdown("""
<style>
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&display=swap');
*{box-sizing:border-box}
html,body,.stApp,[data-testid="stAppViewContainer"]{
    margin:0!important;padding:0!important;background:#171321!important
}
#MainMenu,footer,header{visibility:hidden}
.block-container,[data-testid="stMainBlockContainer"]{
    max-width:none!important;width:100%!important;padding:0!important;margin:0!important
}
/* Hide accidental code/preformatted panels so only the game UI is visible. */
div[data-testid="stCode"],.stCode,pre{display:none!important}
div[data-testid="stButton"] button{
    border:3px solid #70465e;border-radius:0;background:#f4c0d0;color:#58384d;
    font-family:'Press Start 2P',monospace;font-size:10px;
    box-shadow:4px 4px 0 #9e7189;padding:.75rem 1rem
}
div[data-testid="stButton"] button:hover{
    background:#ffe0e8;color:#58384d;border-color:#70465e;
    transform:translate(2px,2px);box-shadow:2px 2px 0 #9e7189
}

/* Full-screen title image; invisible hit-area overlays the illustrated START. */
.st-key-title_screen{
    position:fixed!important;inset:0!important;width:100vw!important;height:100vh!important;
    z-index:100!important;margin:0!important;padding:0!important
}
.st-key-title_screen [data-testid="stMarkdownContainer"]{margin:0!important;padding:0!important}
.title-background{position:fixed;inset:0;width:100vw;height:100vh;overflow:hidden}
.title-background img{width:100%;height:100%;display:block;object-fit:fill;image-rendering:pixelated}
.st-key-title_screen div[data-testid="stButton"]{
    position:fixed!important;left:66.5vw!important;top:74.5vh!important;
    width:24vw!important;height:14vh!important;z-index:110!important;margin:0!important;padding:0!important
}
.st-key-title_screen div[data-testid="stButton"] button{
    width:100%;height:100%;min-height:0;padding:0;opacity:0;color:transparent;
    background:transparent;border:0;box-shadow:none
}
.st-key-title_screen div[data-testid="stButton"] button:hover{
    opacity:0;background:transparent;border:0;box-shadow:none;transform:none
}

/* Bedroom scene */
.room-page{
    min-height:100vh;width:100%;padding:18px 2vw 28px;
    background:linear-gradient(180deg,#241d35,#49334b);animation:fadeIn 1s ease both
}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
.room-frame{
    position:relative;width:min(1200px,96vw);margin:0 auto;aspect-ratio:16/9;
    min-height:480px;overflow:hidden;border:5px solid #67485e;
    box-shadow:8px 8px 0 #241d35;background:#b88b9a
}
.room-background{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;image-rendering:pixelated}
.room-tint{position:absolute;inset:0;background:linear-gradient(90deg,rgba(31,23,39,.04),transparent 50%,rgba(31,23,39,.04));pointer-events:none}
.room-title{
    position:absolute;z-index:4;left:1.5%;top:2%;padding:9px 11px;
    color:#604454;background:#fff0df;border:3px solid #805a61;
    box-shadow:3px 3px #b88d87;font:9px 'Press Start 2P';line-height:1.8
}
.khoa-sprite{
    position:absolute;z-index:5;left:48%;bottom:3%;height:66%;max-width:19%;
    width:auto;object-fit:contain;image-rendering:pixelated;
    filter:drop-shadow(3px 4px 0 rgba(25,17,25,.55))
}
.phone-notification{
    position:absolute;z-index:8;right:2%;top:3%;width:min(340px,34%);
    padding:13px 15px;background:#fff5eb;border:4px solid #76536a;
    box-shadow:5px 5px #b88799;animation:popIn .5s ease 1s both;opacity:0
}
@keyframes popIn{from{opacity:0;transform:translateY(-12px)}to{opacity:1;transform:translateY(0)}}
.notification-head{font:8px 'Press Start 2P';line-height:1.8;color:#98647a;border-bottom:2px solid #e5cbd0;padding-bottom:7px}
.notification-message{font:22px 'VT323';line-height:1.15;color:#493447;padding-top:7px}
.hint{color:#f7d8e4;text-align:center;margin:14px auto 8px;font:10px 'Press Start 2P';line-height:1.8}
.chat-panel{
    width:min(720px,94vw);margin:18px auto 30px;padding:17px;
    background:#fff5ec;border:5px solid #76536a;box-shadow:6px 6px #9c7186
}
.chat-header{color:#89576e;font:12px 'Press Start 2P';border-bottom:3px solid #eed9df;padding-bottom:12px;line-height:1.8}
.chat-message{display:flex;align-items:center;gap:13px;margin:15px 0}
.chat-avatar{width:76px;height:92px;object-fit:contain;image-rendering:pixelated;flex:0 0 auto}
.chat-bubble{max-width:80%;padding:10px 14px;color:#573c4b;background:#f8dce7;border:3px solid #d99bb1;font:23px 'VT323';line-height:1.2}
.chat-bubble.player{margin-left:auto;background:#e6edf8;border-color:#aabbd8}
.chat-caption{text-align:center;color:#896a78;font:9px 'Press Start 2P';line-height:1.9;margin:10px 0}
@media(max-width:700px){
    .room-page{padding:8px 1vw 18px}
    .room-frame{min-height:420px;aspect-ratio:4/3}
    .khoa-sprite{height:55%;left:43%;max-width:27%}
    .phone-notification{width:46%;padding:9px}
    .notification-head{font-size:7px}
    .notification-message{font-size:18px}
    .room-title{font-size:7px}
    .chat-panel{padding:12px}
    .chat-avatar{width:58px;height:76px}
}
</style>
""", unsafe_allow_html=True)

if st.session_state.scene == "title":
    with st.container(key="title_screen"):
        st.markdown(
            f'<div class="title-background"><img src="{TITLE_BG}" alt="A Little Gift From Sweetheart — Saigon riverside"></div>',
            unsafe_allow_html=True
        )
        if st.button("START", key="start_game"):
            start_game()
            st.rerun()
else:
    notice = ""
    if not st.session_state.chat_open:
        notice = """
        <div class="phone-notification">
          <div class="notification-head">TIN NHẮN MỚI · MẸ MEO</div>
          <div class="notification-message">em chuẩn bị xong rùi, anh qua rước em nhóoo</div>
        </div>"""

    st.markdown(f"""
    <div class="room-page">
      <div class="room-frame">
        <img class="room-background" src="{ROOM_BG}" alt="Phòng ngủ pixel art">
        <div class="room-tint"></div>
        <div class="room-title">PHÒNG CỦA ĐĂNG KHOA</div>
        <img class="khoa-sprite" src="{DANG_KHOA}" alt="Đăng Khoa">
        {notice}
      </div>
    </div>
    """, unsafe_allow_html=True)

    if not st.session_state.chat_open:
        st.markdown('<div class="hint">ĐIỆN THOẠI CỦA ĐĂNG KHOA RUNG LÊN...</div>', unsafe_allow_html=True)
        if st.button("📱  MỞ TIN NHẮN", key="open_chat"):
            st.session_state.chat_open = True
            st.rerun()
    else:
        st.markdown(f"""
        <div class="chat-panel">
          <div class="chat-header">MẸ MEO <span style="float:right;font-size:8px">ĐANG HOẠT ĐỘNG</span></div>
          <div class="chat-message">
            <img class="chat-avatar" src="{MEE_MEO}" alt="Mẹ Meo">
            <div class="chat-bubble">em chuẩn bị xong rùi, anh qua rước em nhóoo</div>
          </div>
        """, unsafe_allow_html=True)

        if st.session_state.reply is None:
            st.markdown('<div class="chat-caption">ĐĂNG KHOA NÊN TRẢ LỜI THẾ NÀO?</div>', unsafe_allow_html=True)
            choices = [
                "okeyy, anh qua liền",
                "em đợi xíu nhé, anh đang quaa",
                "anh sắp tới rồi",
                "kê anh đi đâyy",
            ]
            for i, choice in enumerate(choices):
                if st.button(choice, key=f"reply_{i}", use_container_width=True):
                    st.session_state.reply = choice
                    st.rerun()
        else:
            st.markdown(
                f'<div class="chat-message"><div class="chat-bubble player">{st.session_state.reply}</div></div>',
                unsafe_allow_html=True
            )
            st.markdown(f"""
              <div class="chat-message">
                <img class="chat-avatar" src="{MEE_MEO}" alt="Mẹ Meo">
                <div class="chat-bubble">dạaaa</div>
              </div>
              <div class="chat-caption">MẸ MEO ĐÃ NHẮN LẠI ♡</div>
            """, unsafe_allow_html=True)
        st.markdown("</div>", unsafe_allow_html=True)
